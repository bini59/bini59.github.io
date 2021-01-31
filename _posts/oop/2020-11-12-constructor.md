---
layout        : post
title         : 생성자
date          : 2020.11.12
category      : Object-Oriented-Programing
comments      : true
tags          : [Object-Oriented-Programing, constructor]


---

* content
{:toc}

### 생성자

&nbsp;객체를 인스턴스화 할 때, 초기 상태를 지정해 주기 위해서 __*생성자*__ &nbsp; 개념을 사용한다. 

&nbsp;각 언어마다 생성자를 지정하는 방법이 다양한데, VisualBasic 에서는 New 키워드로, Swift는 init 키워드로, Java와 C#같은 경우에는 클래스의 이름과 동일한 메서드로 생성자를 지정한다.

&nbsp;우리는 계속 사용해오던 Java를 사용하여 알아보록 하자. 


&nbsp;상속 [Slime]({{site.baseurl}}/oop/2020/10/17/Chapter3.html#slime) 클래스의 생성자를 만들어보자.


```java
public class slime{

	private int hp;
	private int ATK;
	private int DEF;
	
	public slime(){ // 반환값이 없다!
		this.hp = 500;
		this.ATK = 30;
		this.DEF = 10;
	}
	public void tackle()
	/*
	등등
	*/
}
```

&nbsp;위를 보면, 생성자에는 반환값이 존재하지 않는 것을 볼 수 있다. 결국, 생성자가 초기상태를 지정하고 객체를 반환하여서 반환값이 있을 이유가 없기 때문이다.


&nbsp;생성자는 일반 메서드와 같이 없거나, 1개 이상의 parameter를 받을 수 있다.
```java
public class slime{

	private int hp;
	private int ATK;
	private int DEF;
	
	public slime(int Hp, int ATK, int DEF){ 
		this.hp = Hp;
		this.ATK = ATK;
		this.DEF = DEF;
	}
	public void tackle()
	/*
	등등
	*/
}
```

&nbsp;또한, 저번 장에서 설명했던, [오버로딩]({{site.baseurl}}/oop/2020/10/23/Chapter4.html#overloading)을 이용해서 여러개의 생성자를 사용할 수 있다.

```java
public class slime{

	private int hp;
	private int ATK;
	private int DEF;

	public slime(){ 
		this.hp = 500;
		this.ATK = 30;
		this.DEF = 10;
	}
	public slime(int Hp, int ATK, int DEF){
		this.hp = Hp;
		this.ATK = ATK;
		this.DEF = DEF;
	}
	public void tackle()
	/*
	등등
	*/
}
```

&nbsp;그럼 생성자를 정의하지 않았을 때의 경우는 어떻게 될까? 이때까지 해왔던것들은 모두 잘못된 것일까? 

생성자를 정의하지 않으면, 자동으로 하나의 생성자가 만들어진다.
```java
public  class  slime{

	private int hp;
	private int ATK;
	private int DEF;

	public slime(){
		super(); // super()는 부모클래스의 생성자를 말한다.
	}
	
	public void tackle()
	/*
	등등
	*/
}
```

> Java에서, 한 클래스가 따로 어떤 클래스로부터 상속을 받는다고 표시하지 않으면, Java의 Object 클래스를 상속받게 된다.