---
layout        : post
title         : "&#91;Algorithm&#93;문제 풀이에 C/C++을 쓰면서"
date          : 2021.05.15
category      : Algorithm
comments      : true
tags          : [Algorithm, C/C++]
icon          : algorithm
thumbnail     : "/style/image/thumbnail/algorithm.png"
---

* content
{:toc}


## C/C++을 사용하면서.

C/C++이지만 C++을 중점으로 설명한다.
C로도 풀려면 풀 수 있는 문제가 많지만, 너무 불편하고 정말 그 개념조차 모를때 말고는 
C++을 써서 푸는게 좋다고 생각한다.

실제 프로그램을 만드는것이 아니라, 문제풀이에 있어서 필요하다고 생각되는 것들이다.

### STL(STandard Library) 활용하기.

C++에는 다양한 STL이 있다.

vector, queue, stack… 등 많은 STL이 이미 만들어져있다.

이 각각의 자료구조, 알고리즘을 아예 몰라서 공부하는 목적이 아니다!
그렇다면 STL을 잘 활용하는것도 중요하다.

일일이 하나하나 구현하면 시간도 오래걸릴 뿐만 아니라, 
혹시 어딘가 잘못 구현한다면 그걸 찾느라 하나하나 뒤져봐야 할 수도 있다.

또 직접구현한 코드가 비효율적이라면,
맞는 알고리즘도 시간이나, 공간복잡도를 넘어서 문제풀이를 못할 수도 있다.

나는 그래서 항상 문제를 풀때 제일 위쪽에 사용할만한 STL을
주석처리 해둔후 필요하면 주석을 풀어서 사용한다.

ex)

```C++
//쓸거같은 STL 목록
#include <iostream> // iosteam은 입출력을 담당해서 항상 쓰이니 항상 풀어둔다.
//#include <vector>
//#include <queue>
//#include <stack>
//#include <cmath>
//#include <algorithm>
//#include <string>
```

제일 위쪽에 이렇게 먼저 써놓고 위의 것 말고도 필요하면 더 추가해서 쓰는 식으로 한다.


### scanf, printf쓰기 '\n' 쓰기

cin, cout을 쓰게되면, C의 stdio와 동기화를 시켜주기 때문에
scanf, printf보다 느리게 작동한다.

```C++
std::ios::sync_with_stdio(false);
```

이 코드를 적용시켜주면, stdio와의 동기화를 끊기 때문에, 속도는 더 빨라지지만
stdio를 사용하지 않기 때문에 printf, scanf는 사용할 수 없다.

또한
```C++
cin.tie(NULL);
cout.tie(NULL);
```
이 코드를 적용시켜서 cin과 cout이 연결되있는걸 끊어주면 조금 더 빨라진다.

물론 저 두개 코드를 써서 빨라지게 해도 되지만,

그냥 printf, scanf를 쓰는게 
문제를 풀어오면서 조금 더 편했던거 같다.

또한! cout을 쓰게 된다면

```C++
std::cout >> "Hello world!" >> endl;
```

이렇게 'endl'구문을 써주게 되는데, endl은 출력이 끝나고 버퍼를 한번 비워주기 때문에
출력할게 굉장히 많아진다면 시간이 오래걸린다.

'\n'을 사용하면 그런 과정없이 바로바로 줄 바꾸기만 해주기 때문에

많은 수의 라인을 출력한다면 꼭 '\n'을 쓰길 바란다.


### 배열을 사용하게 된다면.

프로그래밍 세계에서 배열은 항상 0번 부터 시작을 한다.

하지만 우리는 현실에서 항상 1부터 숫자를 세기 시작한다.
이 때문에 많이 헷갈려서, 계산하는데 불편함이 생길 수 있다.

배열을 사용할때는 첫 원소를 1번인덱스부터 넣어서 사용하는것이 편하다
그러면 계산할때도 0을 제외하고 계산해서 헷갈일 일도 많이 줄어들것이다.


### 데이터의 범위 확인하기.

이 부분은 진짜 잊을만하면 꼭 튀어나와서 화가 난다.

문제를 풀다보면 대부분의 문제는 int범위 안에서 해결이 된다.


근데, 가끔가다가 int범위를 넘어서는 것들이 나온다.
습관적으로 모든 변수를 int범위로 잡고 문제를 풀다가 틀리는 경우가 생긴다.

문제는 int형을 초과해도 오류를 뱉지 않고 저장이 되기때문에 발견하기가 쉽지 않다.

범위는 처음부터 int범위를 초과하거나, 혹은 계산중에 초과하는 경우가 생기거나, 계산을 마치고 결과값이 넘어가는 등 다양하다.
범위를 초과하는 것이 있는지 꼭 다 확인을 해보고 있다면 long long int를 사용해서 범위때문에 고민하지 않도록 해보자.


```C++
typedef long long ll; //long long은 너무 길어서 ll로 재정의해서 사용하면 편하다.
```


### 자주쓰는것은 정해두자.

1차원 배열, 2차원 배열등 문제에 거의 빠짐없이 써야하는 자료구조등이 있다.
이런 자료구조의 이름을 매번 다르게 짓다보면 혼동이 생기고, 또 이름을 짓느라, 그 이름이 무슨 자료구조인지 찾느라

문제풀이 시간도 길어지고, 사소한 이름때문에 머리에 혼란을 줄 수 있다.

그런걸 방지 하기 위해서 
자료구조의 이름을 미리미리 지어두어 헷갈리지 않게 하는것이 필요하다.

예를 들어
```C++
vector<vector<int>> pln; // 2차원배열
vector<int> ary; // 1차원배열
queue<int> q; // 큐
stack<int> s; // 스택
```
등등 미리미리 정해두는 것이 좋을거같다.




C/C++ 쓰면서 내가 꼭 필요하다고 생각하는 테크닉들을 정리 해보았다.

나는 이것들을 모아 하나의 템플릿으로 만들어두고, 문제를 풀때마다 복사해서 쓴다.

```C++
//쓸거같은 STL 목록
#include <iostream>
//#include <vector>
//#include <queue>
//#include <stack>
//#include <cmath>
//#include <algorithm>
//#include <string>

using namespace std;

/*
scanf, printf 쓰기.

cout 을 쓸때는 꼭 endl 말고 \n 쓰기.

아니면 밑에꺼 꼭 쓰기, 시간 개걸림.

*/



/*
범위 때문에 문제 안풀릴때는, 

index 0은 무시하고 1부터 시작해보기.. 은근 저거때문에 화날때가 많은거같음...
*/



/*
꼭 데이터 범위 확인하기!!
long long 범위 잘 확인해서 풀기.
*/
//typedef long long ll;


//자주 쓸 데이터들
//vector<vector<int>> pln; // 2차원 배열
//vector<int> ary; // 1차원 배열
//queue<int> q; // 큐
//stack<int> s; // 스택


int main(){
	// 혹시나 cin, cout을 쓰게 딘다면...
	//cin.tie(NULL); 
	//ios::sync_with_stdio(false);

	int result = 0;
	
}
```

상당히 유용하고, 사소한 문제를 미리미리 해결해 둘 수 있어 좋다고 생각한다.

지금은 이것뿐이지만, 공부하면서 더 필요한 테크닉이 있다면 추가해 나갈 계획이다.