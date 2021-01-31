---
layout        : post
title         : 상속
date          : 2020.10.17
category      : Object-Oriented-Programing
comments      : true
tags          : [Object-Oriented-Programing, inheritance]
---

* content
{:toc}

### 상속
  

&nbsp;상속은 어떤 한 클래스의 속성과 메서드를 다른 클래스에서도 쓸 수 있게 하는 것이다.

&nbsp;예를 들어, 어떤 게임의 몬스터를 전부 만들게 되었다고 해보자.


모든 몬스터 전부
<span type="hidden" id="slime"></span>

```java
public class slime{
	private int hp;
	private int ATK;
	private int DEF;

	public void tackle()
	/*
		 등등
	*/
}
  

public class wolf{
	private int hp;
	private int ATK;
	private int DEF;

	public void bite()
	/*
		 등등
	*/
}
```
  
&nbsp;만들고 보니 hp, ATK, DEF 등 슬라임과 늑대는 서로 공통적으로 가지는 속성들이 많다. 다른 몬스터들을 생각해봐도, 이 속성들은 가지고 있어야 몬스터라 부를 수 있다.

  
그럼 *'몬스터'* 클래스를 만들고



```java
public class Monster{
	private int hp;
	private int ATK;
	private int DEF;
}
```

&nbsp;슬라임이 이 Monster클래스를 상속받게되면 Monster의 속성 hp, ATK, DEF를 굳이 정의하지 않아도 쓸 수 있다.

```java
public class slime extends Monster{
	public void tackle()
}
```

> 이때 상속받는 slime은 '자식클래스', '서브클래스'라고 부르고, 상속하는 Monster는 '부모클래스', '슈퍼클래스'라고한다.


&nbsp;즉, Monster 라는 하나의 집단을 만들어서 관리할 수 있다.

&nbsp;만약 몬스터에 '크리티컬' 속성을 넣으려한다. 몬스터의 종류가 100만가지라면, 크리티컬 속성을 일일이 100만번 넣어 주어야 할 것이다. 100만번을 넣는다는 것은 현실적으로 힘들 뿐더러, 인간이라면 넣다가 다른 클래스에 넣어버리는 등 여러가지 실수가 발생 할 수 있다. 상속을 이용한다면, 모든 몬스터가 Monster 클래스에 '크리티컬' 속성을 넣는 것으로 한번에 적용받게 된다. 따라서 많은 시간을 절약하고, 사람이라서 발생할 오류를 줄여준다.

