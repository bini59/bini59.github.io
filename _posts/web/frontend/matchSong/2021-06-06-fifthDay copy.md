---
layout        : post
title         : "&#91;노래 맞추기&#93;React+Express+Socket.io로 웹앱 만들기 5일차"
date          : 2021.06.06
category      : React
comments      : true
tags          : [React, JavaScript, HTML, CSS, sass, Socket.io, Express, NodeJS]
icon          : react
thumbnail     : "/style/image/thumbnail/matchSong.png"
---

* content
{:toc}

## 드디어 만들걸 다 만들었

드디어 React로 일단 다 했다고 생각했다.

그러나...

일단은 버튼들 부터 만들자.


### 채팅 로그

혹시 채팅을 치고 더 늦게 쳤는데 더 먼저 쳤다고 인식되는 것을 확인하기 위한
디버깅 용으로,

또 유저들이 그냥 재미로 보라고 만드는 
유희용으로

두가지 이유나 있어서 채팅 로그는 꼭 필요했다.

채팅 로그 버튼을 누르면, 창이 하나 뚝 뜨고
거기에 채팅로그가 뜨는걸로 하기로 했다.

![채팅로그](/style/image/react-MatchSong/chatlog.png)

이런식으로 뜨게 했다.

> 그 때 사진을 찍어 둘 걸 그랬다. 사진을 다 보여줄 수가 없네 아쉬운대로 코드라도...


```jsx
import React, {Component} from "react";

class Log extends Component{
    constructor(props){
        super(props)

        this.logs = this.props.logs.map((chat)=>{
            let style = {color : chat.color}
            return(
                <li key={chat.username} className="chat">
                    <span style={style}>{chat.username} : </span> {chat.context}
                </li>
            )
        })

    }

    render(){
        return (
            <div className="logBox">
                <ul className="log">{this.logs}</ul>
                <button className="closeBox" onClick={this.props.closeBox}>닫기</button>
            </div>

        );
    }
}

export default Log
```
> log.js


간단히 창을 띄우고 채팅로그를 넣어줬다.

props가 갱신이 되면 로그도 같이 갱신이 될예정이다.
하지만 저걸 작성할 당시는 그런거 모르고 그냥 했었지만.

### 게임 시작, 나가기

```jsx
// 현재 유저가 방장일때
{this.state.user.roomMaster?
    // 게임시작 버튼을 만들고, 게임시작 버튼을 불러온다.
    <button className="gameStart" onClick={this.props.startGame}>게임 시작</button>
: ""}
// 게임 나가기 버튼
<button className="gameExit" onClick={()=>{
    this.props.exitGame(this.state.user.nickname);
    // go to home code
    // main화면으로 가는 코드는 아직.. 두 프로젝트를 합치고 쓰여질 예정이다.
}}>나가기</button>
```
> btns.js

```jsx
<Btns
    // btn에 props의 형태로 함수를 넘겨주어따.
    // 게임 시작
    startGame={()=>{this.state.start()}}
    // 게임 나가기. 유저를 없애버림.
    exitGame={(name)=>{this.users.splice(this.users.findIndex(i=>i.nickname===name), 1)}}
/>
```
> App.js


이렇게 게임도 시작해보고, 게임도 나가보고
마지막으로 유저가 들어오고 나가는데, 유저가 있어야 이게 다 될것아닌가??

그래서 유저를 들어오는것도 만들었다.


### 유저 닉네임 입력

사실 이건 고민을 많이 했다.

유저 닉네임을 어디서 받아야 할까.

방에 들어가기전 방을 클릭했을 때??
아니면 방에 들어가서??


곰곰히 고민을 해본 결과.
방에서 나갈 때 유저를 지워줘야 하고, 
방에 잘못 들어가서 바로 나와버리면 유저를 추가하고 빼는것도 손해고

여러모로 손해라서 방에서 입력을 받는걸로 했다.

![채팅로그](/style/image/react-MatchSong/inputNickname.png)

> 채팅로그 버튼이 있어야 하지만,, 나중에 한 작업 때문에 없다.

```jsx
<Btn
    ...
    addUser={(user)=>{this.users.push(user)}} // 유저를 인수로 받아서 넣어준다.
/>
```
> App.js

```jsx
constructor(props){
        super(props)

        this.adduser = this.adduser.bind(this);
        this.state = {
            // 초기 유저의 상태
            user : {
                nickname : "",
                color : "",
                score : 0,
                roomMaster : true
            },

            // 닉네임 입력창을 토글 시켜주기 위해서
            name : true
        }
        // 닉네임을 입력받기 위한 칸.
        this.name = (
            <div className="addUsr">
                <span className="nameInfo">닉네임 입력</span><br/>
                <input type="text" id="newNickname"/><br/>
                <button className="nameOk" onClick={this.adduser}>확인</button>
            </div>
        )
    }

    adduser(){
        // 유저가 입력한 닉네임을 받아오고
        let name = document.getElementById("newNickname").value;
        /*
            지금은 이름만 저장을 하지만.
            서버와 연결하면 방장인지 아닌지, 
            유저의 색은 무슨색으로 할건지 등을 정해야 한다.
        */
       this.setState({user : {
           nickname : name,
           color : "blue",
           roomMaster : false,
           score : 0
       }})
       // 유저를 추가한다.
       this.props.addUser(this.state.user)
       this.setState({name : false})
    }
```
> Btns.js의 일부

아무튼 이렇게 유저를 입력받는것 까지 완성했다!!


### 하지만.

이 프로젝트를 진행하면서

참 여러모로 불편했었다.

1. 도대체 왜 나는 mainScreen과 gameScreen을 따로 만들지??
2. 여러모로 중복되는 변수들이 많은데, props가 아닌 좀 더 우아하게 쓸 방법이 없을까???

그래서! 친한 개발을 아주 많이 경험해본 지인에게 물어봤다.

그러니 해법을 주더라.

1. redux // 사실상 react의 핵심. 이거 없이도 할 수는 있지만 이게 있으면 죽어라 편함
2. react-router // 굳이 두개를 왜 만들고 있냐고 뭐라 들었음. router 기능으로 간편히 하나의 프로젝트에서 여러개 페이지 제작 가능.

들었을 때는 좋았다.

이런 기능들이 있는게.
코드를 고쳐서라도 이런 기능을 쓰는게 훨씬 개발을 빠르고 쉽게하고,
유지/보수도 쉽게 해줄거라 믿었다.


하지만,
문제는 _**redux**_였다.
이 놈은 쓰려면 무조건 react를 함수형으로 썼어야 했다.

redux가 Hook이라는 걸 사용하기 때문에 무조건 function 형태로 Component를 작성해야 했다.

이때까지 전부 모든 Component가 class형태였는데, 전부 다시 써야 했다.

심지어 class와 function은 비슷하면서도 달라서 많았다. 작업량이

조금조금 절망이 다가오더라..

너무 화가났지만.
그래도 _'공부하는 거니까... 해야지'_ 라는 생각으로 잠이 들었다.


