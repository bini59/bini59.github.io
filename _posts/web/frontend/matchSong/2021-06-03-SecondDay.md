---
layout        : post
title         : "&#91;노래 맞추기&#93;React+Express+Socket.io로 웹앱 만들기 2일차"
date          : 2021.06.03
category      : React
comments      : true
tags          : [React, JavaScript, HTML, CSS, sass, Socket.io, Express, NodeJS]
icon          : note
---

* content
{:toc}

## 일단 스타일링 부터.

너무 리액트가 답답해서, 일단 스타일링부터 하기로 했다.
근데 쓰던 css만 쓰면 너어어어어무 답답할거같아서 sass를 조금 들고왔다.

css만 쓰다가 갑자기 sass를 쓰니까 너무 편하더라.


### scss
```scss
.main{
    text-align: center;
    margin: {
        left: 10%;
        right: 10%;
        top: 20%; 
    };  
}

#mainTitle{
    margin : {
        bottom: 10%;
    }
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161));
	white-space: nowrap;
	text-align: center;
    font : {
        family: Malgun Gothic;
        style: normal;
        weight: bold;
        size: 40px;
    }
	color: rgba(112,112,112,1);
	letter-spacing: 0.05px;
}


.mainBtn {
	filter: drop-shadow(0px 4px 7px rgba(0, 0, 0, 0.161));
	width: 20%;
	height: 122px;
	text-align: center;
	font : bold 39px "Malgun Gothic", serif;
	color: #707070;
	letter-spacing: 0.05px;
	background-color: rgba(255,255,255,1);
	border-radius : 25px;
	border : solid 1px rgba(112,112,112,1);
    &:hover{
        background-color: #ECECEC;
    }
    @at-root #btn1{
        margin-right: 20%;
    }
} 
```
> 1일차에 만들었던 메인화면의 scss파일. 정말 직관적이고, 불필요하게 반복되는 코드들이 없다.

이렇게 슥슥 만들어주는 sass를 이용해서 이번에는 게임을 하는 게임화면을 만들었다.
아무래도 스타크래프트에서 가져온거다 보니까, 그 느낌을 그대로 살리고 싶었다.


### 게임화면
```javascript
class Song extends Component{

    // 왠지 쓸거같아서 써둔건데 안썼네...
    constructor(props){
        super(props);

        this.state = {

        }
    }
    render(){
        return(
            <div className="quiz">
                {/*
                    이 temp는 대체 왜 필요했던걸까... 
                    제작 마지막 까지 이 temp가 남아있었다는 사실...
                    쉽지 않다.
                */}
                <div className="temp">
                    <div className="title">
                        <span className="remainSong">남은곡 ( 100 / 100 )</span><br/>
                        <span className="description"><span className="_1">음악</span>을 듣고 <span className="_2">답</span>을 입력하세요</span><br/>
                        <span className="remainSec">- 60초 -</span>
                    </div>
                    <div className="hint">
                        <span className="hintMsg">가수힌트</span> : 가수이름<br/>
                        <span className="hintMsg">초성힌트</span> : 초성
                    </div>
                    <div className="ans">
                        <span className="ansMsg">답</span> : 답나오는 칸
                    </div>
                </div>
                {/* 
                    이 밑의 두개는 따로 만들어준 
                    Component들 굳이 코드는 안가져왔다.
                */}
                <Chat />
                <Input />
            </div>
        );
    }
}
```

![게임화면](/style/image/react-MatchSong/gameScreen.png)

> 이 때 사진이 없어서 ㅜㅜ 완성본에서 찍어왔습니다. 

역시 오늘도 기능같은건 싹 빼고, 디자인만 주구장창 했다.

이렇게 보니 정말 한게 없구나?

사실 이 정도면 그냥 sass로 스타일 하는것만 보여주는거 같은데!
내일은 과연.. 어떤 변경이 있을지!