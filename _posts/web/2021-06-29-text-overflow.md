---
layout        : post
title         : "&#91;CSS&#93;CSS로 너무 긴 글 말 줄임표 넣기."
date          : 2021.06.29
category      : CSS
comments      : true
tags          : [Web, CSS]
icon          : css
thumbnail     : "/style/image/thumbnail/web.png"
---


* content
{:toc}


## 결론부터 말하자면.


**한줄에 걸쳐 생략하는 것.**
> <p class="test">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut sapien pharetra nisi convallis posuere. Etiam eget varius sapien, vel sagittis augue. Etiam quis ipsum quam. Maecenas eu suscipit mi.</p>

```css
(selector){
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
```

**여러줄에 걸쳐 생략하는 것.**
> <p class="test2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut sapien pharetra nisi convallis posuere. Etiam eget varius sapien, vel sagittis augue. Etiam quis ipsum quam. Maecenas eu suscipit mi.Maecenas mollis ipsum vel lacus tincidunt bibendum. Fusce pharetra luctus tincidunt. Suspendisse potenti. Suspendisse at ornare purus, a finibus mi.</p>

```css
(selector){
    overflow: hidden; 
    display: -webkit-box; 
    -webkit-line-clamp: 3; /* 라인수 */ 
    -webkit-box-orient: vertical; 
    line-height: 1.2em; 
    height: 3.6em; /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */ }
}
```

### 쓰이는 태그 확인하기.

하나하나 살펴보자.

#### overflow

*overflow*는 element내의 contents가 element의 지정된 범위를 넘어갔을 때, 어떻게 처리할 것에 대한 부분이다.

|속성|내용|
|---|----|
|visible(*default*)|contents를 없애지 않는다. contents가 element의 레이아웃을 넘어가도 표시된다.|
|hidden|contents를 element 박스에 맞춰서 없앤다.<br/> 스크롤을 제공하지 않고, 할수도 없다.(단, 코드를 통해서는 스크롤이 가능하다)|
|clip|hidden과 마찬가지로, contents를 element 박스에 맞춰서 없앤다.<br/>이 경우에는 코드를 통해서도 스크롤이 불가능하다.|
|scroll|스크롤을 표시한다. 다만, contents가 넘치지 않더라도 스크롤을 형성한다.|
|auto|스크롤이 필요할 경우(contents가 넘칠 때) 스크롤을 표시하고, 아니면 visible과 같이 작동한다.|


#### white-space

*white-space*는 text-contents안의 공백을 어떻게 처리하는 방법이다.

|속성|내용|
|---|----|
|nomal(*default*)|연속적으로 나타나는 공백을 하나로 합친다. 텍스트가 너무 길다면 줄 바꿈이 일어난다.|
|nowrap|연속적으로 나타나는 공백을 하나로 합친다.<br> 줄 바꿈은 \<br\>태그에 의해서만 일어난다.(즉 너무 길어서 넘치면 잘린다)|
|pre|연속적인 공백을 그대로 둔다. 줄 바꿈은 개행문자나 \<br\>태그에 의해서만 일어난다.|
|pre-wrap|연속적인 공백을 그대로 둔다. <br>줄 바꿈은 개행문자나 \<br\>태그에 의해서 일어나고, 너무 길어도 줄 바꿈이 일어난다.|
|pre-line|연속적으로 나타나는 공백을 하나로 합친다. <br>줄 바꿈은 개행문자나 \<br\>태그에 의해서 일어나고, 너무 길어도 줄 바꿈이 일어난다.|
|break-space|pre-wrap과 비슷하지만, <br>1. 공백문자도 줄의 끝에 위치할 수 있다. <br>2. 공백문자의 사이에서도 줄 바꿈을 할 수 있다.<br>의 차이점이 있다.|

#### text-overflow

*text-overflow*는 text가 element의 범위를 넘어섰을때의 처리법이다.

|속성|내용|
|---|----|
|clip(*default*)|text가 element의 범위를 벗어나면, 그 뒤를 생략한다. text는 하나의 문자안에서도 잘릴 수 있다.|
|ellipsis|text가 element의 범위를 벗어나면, clip된 text의 뒤를 '...'으로 생략한다.<br> 이 text는 element의 안에서 잘려서 element의 안에 위치한다.|

#### -webkit-box-orient

*-webkit-box-orient*는 
*display*가 *-webkit-box*로 설정되어 있을때만 쓰인다.

즉 display를 box모델로 써야 쓸 수 있다.

|속성|내용|
|---|----|
|horizontal(*default*)|box안의 contents를 가로로(수평으로) 배치한다.|
|vertical|box안의 contents를 세로로(수직으로) 배치한다.|
|inline-axis|축을 따라서 elements를 가로로(수평으로) 배치한다.|
|block-axis|축을 따라서 elements를 세로로(수직으로) 배치한다.|


#### -webkit-line-clamp

*-webkit-line-clamp*는 *-webkit-box-orient*가 vertical 즉, 수직일때 사용가능한 속성이다.
contents를 몇줄까지 표시할것인지에 대한 속성이다.

|속성|내용|
|---|----|
|none(*default*)|몇줄까지 표시할건지 제한두지 않는다.|
|(integer)|(integer)줄까지 컨텐츠를 표시한다. <br>0초과의 값이 들어가야한다.|

#### line-height

*line-height*는 각 줄의 높이를 결정한다.
굉장히 간단한 옵션이다.

|속성|내용|
|---|----|
|normal(*default*)|contents의 font-size*1.2의 값을 가진다.|
|number(integer)|contents의 font-size*number의 값을 설정해준다.|
|length|정확한 line의 높이를 설정한다. em, rem, px... 다양한 값들이 들어간다.|
|percentage|contents의 font-size에 비례한 높이를 설정한다.|


### 텍스트를 한줄로 바꿔서 생략시키기.

한번 해보도록 하자.

```css
(selector){
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```
위에 적힌 대로 이 방법대로 생략을 시킨다.

먼저 
```css
{white-space: nowrap;}
```
> <div style="white-space: nowrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut sapien pharetra nisi convallis posuere. Etiam eget varius sapien, vel sagittis augue. Etiam quis ipsum quam. Maecenas eu suscipit mi.</div><br>굉장히 보기가 싫다.



으로 text를 한줄로 만들어준다.
(이 과정에서 줄 바꿈을 \<br\>태그로 만들어주면 각 줄마다 text가 생략되어 나온다.)

그리고
```css
{overflow: hidden;}
```
으로 넘치는 텍스트를 clip(잘라) 해 준다.
> <div style="white-space: nowrap;overflow:hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut sapien pharetra nisi convallis posuere. Etiam eget varius sapien, vel sagittis augue. Etiam quis ipsum quam. Maecenas eu suscipit mi. </div><br>이제야 좀 낫네

그리고 
```css
{text-overflow: ellipsis;}
```
으로 clipped(잘린) text를 말줄임표 "..."로 생략표시를 한다.

> <div style="white-space: nowrap;overflow:hidden;text-overflow:ellipsis">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut sapien pharetra nisi convallis posuere. Etiam eget varius sapien, vel sagittis augue. Etiam quis ipsum quam. Maecenas eu suscipit mi. </div><br>깔끔하네요.


### 여러줄로 만들어서 생략시키자.

```css
(selector){
    overflow: hidden; 
    display: -webkit-box; 
    -webkit-line-clamp: 3; /* 라인수 */ 
    -webkit-box-orient: vertical; 
    line-height: 1.2em; 
    height: 3.6em; /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */ 
}
```
한 줄로 줄이는 것 보단 좀 많다.
생각해보니 그저 생략표시하는건데 이렇게 길다니.
좀 뭔가 잘못된거 같긴하다.

아무튼 첫번째는,
```css
{display: -webkit-box;}
```
으로 content의 display속성을 box속성으로 바꿔준다.

```css
{
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; 
    line-height: 1.2em; 
    height: 3.6em;
}
```
contents를 수직으로 배치하고, 라인의 수를 정하자.
그리고 컨텐츠가 넘치면 잘라주도록 하자.

적당히 line의 높이와, 전체 컨텐츠의 높이도 정해주자.

> <div style="width:500px;display:-webkit-box; -webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow:hidden;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur, nulla eu efficitur ullamcorper, ante urna condimentum sem, fringilla sollicitudin massa felis nec urna. Donec rutrum magna ac lorem semper, quis consequat purus iaculis. Nulla ultrices tincidunt congue. Maecenas euismod, ligula quis malesuada feugiat, augue libero vulputate nulla, vitae tristique mi lorem eget mauris. Sed ut condimentum turpis. Vestibulum lobortis ultrices elit, vel ultrices lorem iaculis ut. Donec ac consectetur turpis, et efficitur eros.</div><br>3줄로 잘렸다!!

생략표시도 잘 뜨고, 잘 되긴하는데... 
고민이 생겼다.
```css
{text-overflow: ellipsis;}
```
이 속성이 없어도 왜 생략 표시가 뜨는걸까...
심히 거슬린다.


## 아무튼 종료!!

&nbsp;텍스트가 근본없이 중간에서 잘리는게 마음에 안들어서 찾아서 *...*을 붙이는걸 찾아버렸다.
궁금해 미쳐버릴거 같았는데, 생각보다 간단했다. 마지막에 뭔가 심히 거슬리긴 했는데, 더 찾아봐야 할거같다.


<style>
.test{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.test2{
    overflow: hidden; 
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-line-clamp: 3; /* 라인수 */ 
    -webkit-box-orient: vertical; 
    word-wrap:break-word; 
    line-height: 1.2em; 
    height: 3.6em; /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */ }
}
</style>