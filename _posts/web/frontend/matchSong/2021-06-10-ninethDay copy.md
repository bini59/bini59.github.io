---
layout        : post
title         : "&#91;노래 맞추기&#93;React+Express+Socket.io로 웹앱 만들기 9일차"
date          : 2021.06.10
category      : React
comments      : true
tags          : [React, JavaScript, HTML, CSS, sass, Socket.io, Express, NodeJS]
icon          : react
thumbnail     : "/style/image/thumbnail/matchSong.png"
---

* content
{:toc}

## 오늘은 할게 많네

socket.io로 할걸 다 해야한다.


### 방을 구성하는것 부터

일단 방의 구조부터.

```
room : {
    genre : Array(string),
    title : string,
    users : Array(user),
    Song : Array(song),
    songN : Arrary(int)
}

user : {
    nickname : stirng,
    color : string,
    roomMaster : bool,
    score : int
}

song : {
    title : string,
    hint : Array(hint),
    ans : Array(string),
    url : string,
    duration : int,
    genre : string
}

hint : {
    category : string,
    context : string,
    time : int
}
```

이렇게 구성되어 있다.

이제 그럼 방을 만들어보자.

_select.js_ 즉 방을 만드는 창에서
곡 개수와, 방이름을 정해서 방을 만드는 요청을 보낸다.

그럼 서버에서
방의 이름을 설정하고, Songs(노래들이 있는 배열)에서 노래 개수에 맞게 랜덤으로
노래를 뽑아서 가져온다.

```javascript
// 랜덤으로 배열을 설정하는 함수
const random = (num)=>{
    let arr = []
    while(arr.length < num){
        let x= Math.random()
        let t = Math.floor(x*songs.length)
        if(arr.indexOf() === -1) arr.push(t)
    }
    return arr
}

router.post('/add', function(req, res, next) {
    let Room = req.body;
    // 노래를 랜덤으로 뽑아온 결과
    let songNum = random(Room.songN[1]);
    // 다 넣어줌.
    for(let i = 0; i < Room.songN[1]; i++){
        Room.Song.push(songs[songNum[i]]);
    }
    room.rooms.push(Room);
    // 만들어진 방을 다시 전송해줌.
    res.json(JSON.stringify(room))
});
```
짜잔~~ 완성

### 이제 답을 맞추어 볼까요.

유저가 채팅을 하는 도중
그게 정답이라면 정답이라고 알려준다.

```javascript
room.rooms[data.idx].Song[room.rooms[data.idx].songN[0]].ans.map((i)=>{
    // 채팅과 정답이 같다면
    if(i===data.chat){
        /*
            사실 바로 밑에 코드는 문제가 있었음.
            이러면 문제가 끝나지도 않았는데, 방의 정보가 바뀌어서 
            힌트가 떠버린다거나, 정답을 다른걸 쳐서 맞춰버리면 계속 문제가 넘어가버린다거나
            여러 문제가 생김.
        */
        // 정답인데 아직 게임이 끝나지 않으면
        if(room.rooms[data.idx].songN[0] < room.rooms[data.idx].songN[1])
            // 현재 노래를 하나 증가시켜줘서 다음노래로 만듬
            room.rooms[data.idx].songN[0]+=1

        // 유저들 중에
        room.rooms[data.idx].users.map(i => {
            // 정답을 맞춘유저의
            if(i.nickname === data.user.nickname){
                // 점수를 올려줌
                i.score += 1
                // 그리고 맞았다는 반응을 넘겨줌.
                /*
                    만약 이걸 이때 안하고 밖에서 넘겨주면,
                    정답이라는 반응을 여러번 보내게됨.

                    따라서 맞은사람일때만 정답 반응을 보내줌
                 */
                app.io.in(data.title).emit("correct", {
                    room : room.rooms[data.idx],
                    user : data.user
                })
            }
        })
    }
})
```
> connect.js (Express)

그럼 React는 이걸 받아서 정답이라고,
처리를 해준다

```jsx
useEffect(()=>{
    // 정답 반응을 받으면
    props.socket.on("correct", (data)=>{
        // 정답이라고 채팅창에 표시해주고
        $(".chat")[0].innerHTML += `<span><span style="color : ${data.user.color}; font-weigth:bold">${data.user.nickname}</span><span> 정답입니다</span></span></br>`
        // 방을 새로고침 해준다.
        dispatch(changeRoom({
            title : rooms[idx].title,
            room : data.room
        }))
    })
}, [])
```
> chat.js (React)

이제 이러면 곡이 나오고 정답을 입력하면
정답처리를 해주고, 다음곡으로 넘어간다.


### 스킵 기능 추가!!

노래를 맞추고, 더 이상 안듣고 다음 노래로 넘어가는 기능
스킵

스킵기능을 만들어야 한다.

```jsx
const Message = (props)=>{
    ...

    const skip = ()=>{
        socket.emit("vote-skip", {
            user : props.user,
            title : props.title,
            idx : props.idx,
        })
    }

    return (
        <div>
            <div className="chat" style={{overflow:"auto"}} ref={chatt}></div>
            <input className="input" type="text" onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    sendMsg()
                }
                else if(e.ctrlKey===true && e.code ==="Slash" ){
                    skip()
                }
            }}/>
            <div className="skip">스킵에 투표하시려면 ctrl+/를 누르세요 ( <span id="skipProgress">0</span> / <span id="totalUsr"></span> )</div>
        </div>
    )
}

```
> chat.js (React)

일단 채팅창에서 ctrl+/를 누르면 
유저 정보, 방 정보와 함께 
스킵이벤트를 서버에 전송을 해준다.

그럼 서버에서

```javascript
let skip = {

}
...
// 게임이 시작하면, 스킵투표현황을 초기화 시킨다.
socket.on("start-game", (data)=>{ 
    skip[data.room] = [];
})

socket.on("vote-skip", (data)=>{
    // 만약 이벤트를 보낸 유저가 스킵투표를 하지 않았다면
    if(skip[data.title].findIndex(i => i === data.user.nickname) === -1){
        // 스킵투표한 사람에 넣어준다.
        skip[data.title].push(data.user.nickname);
        // 그리고 스킵투표를 했다고 알려준다.
        app.io.in(data.title).emit("notice-skip", {num : skip[data.title].length})
    }

    // 그리고 만약 모두 스킵투표를 했다면,
    if(skip[data.title].length === room.rooms[data.idx].users.length){
        // 곡이 스킵되었다고 알려준다.
        app.io.in(data.title).emit("skipped", {
            data : "skip"
        });
    }
})
```

그럼 React는 스킵이 됬다고 알아들은 후

```jsx
useEffect(()=>{
    
    socket.on("skipped", (data)=>{
        // 스킵이 되었다고 알리고
        $(".chat")[0].innerHTML += `<span><span style="color:red">!</span> 스킵하셨습니다</span></br>`        
        $(".chat")[0].scrollTop = $(".chat")[0].scrollHeight;
        // 타이머를 꺼준다.
        props.timerOff();
        // 그리고 게임을 다시시작한다.
        // 모든유저가 게임을 시작한다는 요청을 날리면,
        // 게임을 여러번 시작하게 된다.
        // 방장만 게임시작 요청을 날려, 한번만 시작하게 했다.
        if(props.user.roomMaster)
            socket.emit("req-start-game", {
                title : room.title,
                idx : props.idx,
                first : 0
            })
    })
}, [room])
```

다음 곡을 재생한다.



### 거의 다 왔다.

이제 진짜 거의 다 만든 셈이다.

마지막으로 엔딩 장면만 만들어주면 되는데,

오늘은 시간이 없다.

그 외에 자잘자잘한 버그도 있을 거라 생각을 한다.
친구들과 테스트 해보면서 하나하나 고쳐 나가야겠다.