---
layout        : post
title         : "&#91;노래 맞추기&#93;React+Express+Socket.io로 웹앱 만들기 8일차"
date          : 2021.06.09
category      : React
comments      : true
tags          : [React, JavaScript, HTML, CSS, sass, Socket.io, Express, NodeJS]
icon          : react
---

* content
{:toc}

## 채팅 구현 하는 날

그 전에 어제 하던 고민이 해결이 됬다.
딱 자러가는데, 갑자기 생각이 들더라.

그냥 방을 만들고 메인화면에서 확인을 하게 해주고,
그 방을 클릭해서 들어가면 닉네임을 입력하고, 유저를 등록 하는 것이다.

이러니 실수로 클릭해서 들어가는 사람도 닉네임 입력을 안하면 유저로 등록이 안되니
계산도 줄이고, 실수도 줄이고 

그냥 일석이조 였다.

그래서 이제 드디어 채팅이다.

socket.io가 등장한다.

채팅을 구현하기 위한 첫 걸음.

과연 완성할 수 있을까..

### 첫 시도.

일단 첫번째로, 서버에서 socket.io를 불러오고 연결하고

유저를 등록하는것 부터 했다.

```javascript
const io = require("socket.io")

// app.io에서 socket.io를 쓰게따!!
app.io = io()

// 유저 색 설정.
let usercolor = [
  "red", "blue", "yellow", "green", "purple", "white", "chocolate", "cyan"
]

app.io.on('connection', (socket)=>{
    console.log("user connect")

    // 유저가 연결되면, 유저 데이터를 react로 넘겨줌.
    socket.on("add-user", (data)=>{

        // 받아온 데이터는
        /*
            data = {
                room : '방의 정보',
                username : '유저가 입력한 닉네임',
            }
        */

        // 유저의 방 번호를 찾는 중.
        let idx = room.rooms.findIndex(i => i.title === data.room.title)

        let userN = room.rooms[idx].users.length
        // 유저 정보 입력중
        let user = {
            nickname : data.username,
            color : usercolor[userN],
            roomMaster : false,
            score : 0
        }
        // 만약 유저가 하나도 없으면 방장으로 설정
        if(userN == 0) user.roomMaster = true;
        // 서버에도 유저를 넣어줌.
        room.rooms[idx].users.push(user);


        // 클라이언트들에게 유저 정보를 업데이트한 방 정보를 보내줌.
        app.io.emit("AddUsr", room.rooms[idx])
    })


    // 연결해제하면 연결해제
    socket.on("disconnect", (data)=>{
        console.log("disconnect",data);
    })
})
```
> app.js (Express)

이렇게 하고 클라이언트도 설정을 해줬다.


```jsx

// 유저 등록 과정
const adduser = ()=>{
    // 일단 닉네임을 받아온다.
    let Name = document.getElementById("newNickname").value;

    //닉네임이 존재하지 않으면 실행 안함.
    if(Name !== ""){

        // 닉네임과 방정보를 보내줌
        props.socket.emit("add-user", {
            room : rooms[idx],
            username : Name
        });
        // 유저가 업데이트된 방정보를 받아옴.
        props.socket.on("AddUsr", (Room)=>{
            // 방을 dispatch해주고,
            dispatch(changeRoom({
                title : rooms[idx].title,
                room : Room
            }))
            
            // 받아왔을 때, 받아온 유저와 지금 보낸 닉네임이 같으면,
            // 자기자신 정보를 업데이트함.
            if(Name === Room.users[Room.users.length-1].nickname){
                setUser(Room.users[Room.users.length-1])
            }
        })
    }
}

// 유저 닉네임을 받기 위한 창.
const nameWindow = (
    <div className="addUsr">
        <span className="nameInfo">닉네임 입력</span><br/>
        <input type="text" id="newNickname"/><br/>
        <button className="nameOk" onClick={adduser}>확인</button>
    </div>
)
```
> chat.js (React)

좋아 이럼 완전 잘 되어야 할 텐데...

왠지 계속 오류가 뜨더라. 
찾아보니 socket.io도 CORS오류였다.

대체 CORS가 문데....

아무튼 이것도 

```javascript
app.io = io(
    cors: {
      origin: ["https://localhost:3000/"],
      methods:["GET","POST"]
    }
)
```
> app.js

cors를 추가 해주니 해결이 되더라
너무 좋다.

설정해주니, 유저를 추가하면
바로바로 scoreboard도 업데이트가 되고,

이제 채팅을 구현할 차례다.


### 채팅을 보내보자.

```jsx
const Message = (props)=>{

    const chatt = useRef()

    useEffect(()=>{
        // 채팅을 받아오는것.
        /*
            data = {
                user : "유저 데이터",
                chat : "채팅 보낸 데이터"
            }
        */
        props.socket.on("send-chat-server", (data)=>{
            chatt.current.innerHTML += `
                <span className="chatMsg">
                    <span style="color : ${data.user.color}">
                        ${data.user.nickname}
                    </span> 
                    : ${data.chat}<br/>
                </span>
            `
            // 채팅을 받아오면, 스크롤을 제일 아래로 내려준다.
            // 그대로면 불편하니까...
            $(".chat")[0].scrollTop = chatt.current.scrollHeight
        })
    }, [])


    // 채팅 보내기.
    const sendMsg = ()=>{
        //  input을 셀렉팅
        let input = document.querySelector("#input")
        props.socket.emit("send-chat-client", {
            // 유저 데이터.
            user : props.user,
            chat : input.value
        })
        // 채팅을 보내고 나면, input element를 비워줌.
        input.value = "";
    }

    return (
        <div>
            <div className="chat" style={{overflow:"auto"}} ref={chatt}></div>
            {/* Enter를 눌러도 채팅이 보내지게 넣어줌. */}
            <input className="input" type="text" onKeyDown={(e)=>{if(e.key==="Enter"){sendMsg()}}}/>
            {/* 보내는 버튼 */}
            <button onClick={sendMsg}>chatTest</button>
        </div>
    )
}
```
> chat.js (React)


```javascript
app.io.on('connection', (socket)=>{
    ...
    // 받은걸 그냥 다시 보내줌
    socket.on("send-chat-client", (data)=>{
        app.io.emit("send-chat-server", data)
    })
})
```
> app.js (Express)

간단히 해결되긴 했다.

그냥 받은걸 그대로 사용자들에게 뿌려주기만 하면 됬으니.

끝났다고 생각한 순간.


아 그럼 방이 여러개면... 어떡하지??

### 방을 나누자.

다행히도 socket.io가 room기능을 지원했다.


처음 방에 접속하면, _join-room_ 으로 방의 제목을 보내 방에 접속한다.
```jsx
useEffect(()=>{
    props.socket.emit("join-room", {title : rooms[idx].title})
}, [])
```
> chat.js (React) 


```javascript
socket.on("join-room", (data)=>{
    socket.join(data.title);
})
```
> connect.js (Express)
> socket으로 하는 작업이 많아져서, connect.js로 코드를 분리했다.

그리고 각각의 방에 데이터를 보낼때 
```javascript
app.io.in("방의 이름").emit("command", data)
```
이 형태로 보내주면 되었다.


```javascript
socket.on("send-chat-client", (data)=>{
    console.log(data);
    app.io.in(data.title).emit("send-chat-server", data)
})
```
> connect.js (Express)
> 유저를 추가하고, 지우는것도 다 추가를 해줬다.

그리고 data에 방의 이름을 넣어줘서, 
어디로 보낼지 명시해주면 된다.
```jsx
// props로 socket을 받아옴.
props.socket.emit("send-chat-client", {
    user : props.user,
    chat : input.value
    title : props.title
})
```
> chat.js (Express)



### 채팅 구현 끝!!!

이제 socket.io로 게임시작, 게임 종료,
맞았을 때의 동작, 스킵할때의 동작을 만들어야 한다.

실시간으로 데이터를 통신할 수 있어서 확실히 편한거 같다.

이제 정말 완성이 코앞이다.

만들어졌을 때가 기대가 된다.