---
layout        : post
title         : "&#91;React&#93;React 시작하기"
date          : 2021.06.06
category      : React
comments      : true
tags          : [React, JavaScript, HTML]
icon          : react
thumbnail      : "/style/image/thumbnail/react.png"
---

* content
{:toc}

## 리액트


### 리액트는 무엇일까


```html
<html>
<head>
    <title>Example</title>
    <meta charset="utf8">
</head>

    <script>
        function changeWord(word){
            document.querySelector('.title')[0].innerText = "Hello " + word;
            document.querySelector('.description')[0].innerText = "welcome to " + word
        }
    </script>

    <h1 class="title">Hello React!</h1>

    <div>
        <button onclick="changeWord('React')">React</button>
        <button onclick="changeWord('HTML')">HTML</button>
        <button onclick="changeWord('JavaScript')">JavaScript</button>
    </div>
    <p class="description">
        welcome to React!
    </p>

</html>
```

우리가 버튼을 누르면 어떤 html문서의 제목과 내용을 바꿔야 한다고 생각을 하자.
그냥 순수 html 과 javascript로 만든다면,

위와 같이 버튼을 만들고, 그 버튼을 누르면,
내가 원하는 element들을 찾아서 하나하나 다 바꾸주는 함수를 작성해야한다.

위의 예제는 간단하게 표현한다고 2개의 element만 바꾸어 주었지만,

바꿀 곳이 너무 많아서 하나하나 칠 수 없는 정도라면,
그걸 타이핑 하다 class이름 혹은 id이름 하나가 틀려서 제대로 바뀌지 않다면,

그걸 일일이 찾아야하고, 수정해주어야 한다.

리액트는 그 귀찮은 작업을 해결해준다.

아래의 코드를 보자.

```jsx
import {useState} from "react";

function App(){
    // name이라는 state변수를 선언한다.
    const [name, setName] = useState("React")

    return (
        <h1>Hello {name}</h1>

        <div>  
            <button onClick={()=>{setName("React")}}>React</button>
            <button onClick={()=>{setName("HTML")}}>HTML</button>
            <button onClick={()=>{setName("JavaScript")}}>JavaScript</button>
        </div>
        <p>Welcome to {name}</p>
    )
}

```

이 코드는 위와 똑같이 작동한다.

정말 직관적이지 않은가??

```JSX
{변수명}
```

이 중괄호 안에 어떤 변수 _(react의 state변수)_ 를 넣어주고,

이 변수를 그에 맞는 함수로 변경시키면,
알아서 React에서 다시 한번 렌더링 해서 화면을 보여준다.


> _정적인 html문서를 동적으로 바꾸는것을 도와주는것 그게 **'React'**다._