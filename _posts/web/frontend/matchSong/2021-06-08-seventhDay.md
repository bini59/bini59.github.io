---
layout        : post
title         : "&#91;노래 맞추기&#93;React+Express+Socket.io로 웹앱 만들기 7일차"
date          : 2021.06.07
category      : React
comments      : true
tags          : [React, JavaScript, HTML, CSS, sass, Socket.io, Express, NodeJS]
icon          : react
---

* content
{:toc}

## 서버를 적용시켜보자.

Nodejs의 Express를 사용해서 웹서버를 쓸 생각이다.

### 먼저 express부터.

일단, express-generator를 이용해서 

express앱을 생성했다. 

오늘의 계획은 이렇다.

처음 서버에 접속하면 방을 받아온다.

서버에서 방 목록을 가지게 한다.

사용자가 방을 만들면, 서버에서 방 정보를 구성한 후,
방을 저장하고, 사용자에게도 뿌려준다.


일단은 epress 기본 상태.
```javascript
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

### 방을 받아오자.

일단 처음 사이트에 접속하면, 
현재 서버에 존재하는 방을 받아오기로 했다.

먼저 서버에서의 설정.

```javascript
/*
    express의 모든 파일에서 
    room을 사용하기 위해 app.js에서 global로 설정했다.
*/
global.room = {
  rooms : []
}

// room router도 만들어 주었다.
const RoomRouter = require('./routes/room');

app.use('/room', RoomRouter);
```
> app.js (Express)


```javascript
var express = require('express');
var router = express.Router();

// /room으로 들어오면 room만 받는다.
router.post('/', (req, res)=>{
    // glo
    res.json(JSON.stringify(room))
})

module.exports = router;
```
> room.js (Express)

_'/room'_ 주소로 들어오게 되면, 서버에서
방들의 목록을 보내주기로 했다.

그래서 **React**쪽에서도 설정을 해주었다.

```jsx
useEffect(()=>{
    // /room으로 데이터를 요청한다.
    const recipeUrl = "https://localhost:3001/room";
    const requestMetadata = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({})
    };
    fetch(recipeUrl, requestMetadata).then(res => res.json())
    // 요청한 데이터(방들의 목록)를 받아서 dispatch해준다.
    .then(json => dispatch(changeRooms(JSON.parse(json).rooms)))
}, [])

```

이렇게 하면 완성!

이라고 생각을 했는데, 계속 방을 받아오지를 못한다. 

뭐가 문제일까.. 라고 생각하면서 오류메세지를 찾아보니
CORS문제라고 한다.

보안상의 문제로 CORS를 해줘야 접속이 가능하다는데
자세한건 다시 공부하고, 일단 적용하기로 했다.

```javascript
const cors = require("cors");

app.use(cors());
```
> app.js (Express)

매우 간단해서 좋더라.




### 방을 생성하자.

다음으로 방생성시 방을 받고, 방을 보내주는걸 작성했다.
방을 받는 주소는 _'/room/add'_

먼저 서버에서는

```javascript
var express = require('express');
var router = express.Router();

// /room으로 들어오면 room만 받는다.
router.post('/', (req, res)=>{
    console.log(room)
    res.json(JSON.stringify(room))
})

// /room/add 로 들어오면 방을 추가한다.
router.post('/add', function(req, res, next) {
    /*
        일단은 방을 그냥 넣어주는것만 했다.
        방을 구성하는건(노래를 넣고, 곡 개수를 정하고 등등) 다음 시간에 계속.
     */
    // 일단 방을 받아와서 그걸 넣어주고
    room.rooms.push(req.body);
    // 방을 다시 사용자에게 보낸다.
    res.json(JSON.stringify(room))
});

module.exports = router;
```
> room.js (Express)

이렇게 방을 만든걸 받으면
(방을 구성하고.... 만들어야 한다.)
방을 다시 사용자 쪽으로 보내준다.


좋다 이제 React쪽이다.

```jsx
const sendServer = (room)=>{
    // 보낼 주소 (react와 express를 동시에 켜서 3001번 포트로 열었다.)
    const recipeUrl = "https://localhost:3001/room/add";
    const requestMetadata = {
        method: 'POST',
        headers: {
            // json형태로 보내고, json형태로 받는다.
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        // room을 json형태로 보냄
        body: JSON.stringify(room)
    };
    // 보내고 다시 받는것.
    fetch(recipeUrl, requestMetadata)
    .then(res => res.json())
    // 받은 방목록을 redux에 dispatch해줌. (방 목록 갱신)
    .then(json=>dispatch(changeRooms(JSON.parse(json))))
}
```
> select.js (React)

사용자가 방의 정보를 구성하고, 확인 버튼을 누르면
방 정보를 _'/room/add'_ 로 보낸다.

그리고 다시 받아온 방 정보를 dispatch해준다.

그럼 rooms를 subscribe하고 있던 main page는 
자동으로 다시 렌더링해서 
새로운 방 목록을 보여준다!!

### 후우우...

사실 방을 만들고 바로 게임화면으로 이동하려 했다.

근데 그러려면, ComponentWillMount 이 lifecycle을 사용하는 함수가 필요한데,
function형태의 Component에는 이 함수가 없다.

그래서 여기저기(StackOverflow, StackOverflow, StackOverflow...)를 둘러봤는데도
도통 모르겠더라.

이거까지 하고싶었는데...