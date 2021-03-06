---
layout        : post
title         : "&#91;Algorithm&#93;자주하는 실수들"
date          : 2021.06.17
category      : Algorithm
comments      : true
tags          : [Algorithm]
icon          : algorithm
thumbnail     : "/style/image/thumbnail/algorithm.png"
---


* content
{:toc}

## 코딩하면서 자주 하는 실수들.

코딩을 하다보면 정말 정말 정말 많은 실수가 생긴다.

이런 실수들을 조금이나마 줄이고, 발생했을 때도 빨리 알아차리면 좋겠다.

### 배열 index 접근 오류

정말 코딩하면서 제일 많이 발생하는 오류가 아닐까 싶다.

접근하려는 인덱스가 존재하지 않아서, 멈추고, 오류가 발생한다.

오류가 발생하면 괜찮지만, 

```cpp
int arr[10];
int arr2[10];
```

정말 만의 하나의 경우로 이 배열 두개의 메모리가 이어진 상태로 만들어져서
오류가 발생하지 않으면 정말 큰일이다. 

오류인지도 모르고 작성하다가, 한참 뒤에 뭐가 문젠지 하나하나 찾아가야한다.

정말 화가 나는 경우다.


이 실수, 오류를 막는 법! 대공개!!

바로 이걸 안나게 코드를 짜면 된다.
뭐 우쩌겠나. 배열에 접근할 때 한번 더 확인하고,
철저히 계산해서 접근을 하도록 한다.

그리고, 이 오류가 발생하는 많은 경우 중 하나가
배열을 1부터 시작해서 접근해서 틀리는 경우다.

```cpp
#include <string>

string day[7] = {
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
}

// 월요일이면 1, 화요일이면 2 순서대로 반환함.
int returnDay()
...

int main(){
    cout << day[returnDay()] << endl;
}
```

이런 경우에는 일요일이 나오면 day[7]에 접근해서,
배열 범위 밖을 접근해서 오류가 발생한다.

이런 오류를 방지하기 위해서,
나는 배열을 항상 그냥 첫번째 원소는 비워둔다.

하나 정도 안쓰는 공간을 만들어서, 실수를 대부분없애는건
꽤나 편리하다고 생각한다.


### off-by-one 오류

하나를 부족하게 세거나, 더 세서 틀리는 오류들을 말한다.

예를 들어서,
전신주를 200m구간에 10m간격으로 세워야 한다.
그럼 전신주가 몇개나 필요할까.

총 21개가 필요하다.
단순하게 200/10으로 계산하면 마지막이나 처음 한개를 세지 않고 설치하게 된다.

이렇게 하나를 잘못 더하거나 빼서 틀리는 오류들이다.


### 상수오타.

말 그대로 오타다.

```cpp
string day[7] = {
    "Modnay", // Monday
    "Tuesday",
    "Wendesday", // Wednesday
    "Thursday",
    "Friday",
    "Satruday", //Saturday
    "Sunday"
}
```

이런 오타나

1억을 적어야하는데, 
1000000
이렇게 0의 개수를 하나 빼먹는다던가.

이런 오타의 종류다.


### stack overflow

대부분 너무 많은 재귀호출로 인해서 발생한다.

컴파일러마다, 언어마다 재귀호출의 한계는 다르다.

재귀호출을 사용할 때는 한계를 잘 파악하고,
넘지않도록 조심해서 사용하자.

### 연산자 우선순위

연산자 우선순위에 의해서
예상하지 않은 결과가 나오는 경우도 있다.

```cpp
int main() {
    int x = 4;
    printf("%d", x+4*5)
}
```
정말 간단하지만,

내 의도가 x+4를 하고 거기에 5를 곱하는 경우라면,
연산자의 우선순위가 _'*'_가 먼저이기 때문에,
x+(4*5)가 되버린다.

이런 경우
(x+4)*5 이렇게 괄호를 붙여 우선순위를 바꾸어 줘야한다.

위 예는 정말 간단한 예를 가져왔지만,
연산이 복잡해지면 연산자 우선순위를 계산하기가 복잡해진다.

헷갈린다 싶으면, 꼭 원하는 연산이 이루어지도록 괄호를 잘 붙이자.


## 실수들을 알아 보았다.

정말 사소한 실수들이다.

이 실수들이 쌓이고 쌓이면, 나중에 어디서부터 고칠지
정말 막막..해진다. 

이런 실수들은 정말 꼼꼼하게 확인하고, 챙기는 방법밖에 없다.

확실히 계산하고, 어영부영 넘어가지 말기.
꼭 두번씩 보기.