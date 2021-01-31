---
layout        : post
title         : 추상클래스와 인터페이스
date          : 2021.01.03
category      : Object-Oriented-Programing
comments      : true
tags          : [Object-Oriented-Programing, interface, abstract-class]
icon          : book
---

* content
{:toc}

## 추상클래스, 인터페이스

&nbsp;너무도 헷갈리는 개념 둘이다. 사실 별로 크게 차이가 나지도 않긴 하지만.

&nbsp;일단 추상클래스가 무엇인지 알아보자.
추상클래스란 구현부가 없는 메서드가 하나 이상 있는 클래스를 추상 클래스라 한다. 

```java
public class Keyboard{
	private int keypressure;
	
	public abstract void Keydown();
	public void turnOn(){
		System.out.println(“turn On keyboard”);
	}
}
```
&nbsp;이렇게 Keydown()메서드의 구현부가 없는 것. 이것이 추상클래스이다.

&nbsp;그럼 인터페이스는 무엇일까.
> 인터페이스는 너무 많은 의미로 쓰인다.  여기서는 객체지향 프로그래밍에서 사용하는 새로운 의미의 인터페이스 이다.

&nbsp;인터페이스는 구현부가 없는 메서드<i>**만**</i> 있는 클래스이다. 
```java
public interface mouse{
	public void click();
	public void wheel();
}
```
&nbsp;이렇게 구현부가 하나도 없는 메서드만 있는 것 이게 인터페이스(interface)이다.

&nbsp;둘의 공통점과 차이점을 알아보자.

### 공통점
1. 인스터스화 할 수 없다.
2. 다른 객체에 책임을 부여하기 위한 목적이다.

### &nbsp;첫번째, 인스턴스화 할 수 없다. 
위의 예제를 가져와 보자.
```java
public class Keyboard{
	private int keypressure;
	
	public abstract void Keydown();
	public void turnOn(){
		System.out.println(“turn On keyboard”);
	}
}

public interface mouse{
	public void click();
}
```
&nbsp;메서드에 구현부가 없는 곳이 있다. 아직 이 행동이 정확히 무엇을 할 지 모르는 추상적인 형태이기 때문에,
이 클래스. 인터페이스는 인스턴스화 해서 사용할 수 없다.

### &nbsp;둘째, 책임을 부여하기 위해서 사용한다.
&nbsp;이 두 클래스, 인터페이스의 용도는 결국 객체에 책임을 부여하기 위함이다.
&nbsp;이미 전에 
[2장](https://bean0234.github.io/oop/2020/09/23/Chapter2.html)에서 설명했듯이 객체는 책임으로 이루어져 있다.
추상클래스와 인터페이스는 이 책임을 부여한다.

&nbsp;예를 들어
마우스 인터페이스가 있고, 어떤 특정 마우스가 마우스를 구현(implements)한다 하면
```java
public interface mouse{
	public void click();
}
public class gamingMouse implements mouse{
	public void click(){
		System.out.println(“Click the mouse!!”);
	}
}
```
&nbsp;특정 마우스(gamingMouse)는 click함수를 구현하지 않으면 사용할 수가 없다. 즉, gamingMouse에 click이라는 책임을 부여한 것이다.

### 차이점
1. 추상클래스는 상속(inheritance)을 통해서, 인터페이스는 구현(implements)을 통해서 책임을 부여한다.
2. 추상클래스는 구현부가 있는 메서드, 속성(attributes)가 있을 수 있지만, 인터페이스는 어떤 메서드도 구현부가 없고 속성 또한 존재하지 않는다. 

### 추상클래스는 상속, 인터페이스는 구현

&nbsp;이건 간단하다. 
먼저 추상클래스를 보자.
```java
public class Keyboard{
	private int keypressure;
	
	public abstract void Keydown();
	public void turnOn(){
		System.out.println(“turn On keyboard”);
	}
}
public class mechanicalKeyboard extends Keyboard{
	private int keypressure;
	
	public abstract void Keydown(){
		System.out.println(“key down”);
	}
	public void turnOn(){
		System.out.println(“turn On keyboard”);
	}
}
```
&nbsp;이렇게 상속의 형태로 사용하면 된다.
> 예제는 자바언어로 진행되고 있기에, 자바언어에서는 다중상속을 지원하지 않는다. 따라서 추상클래스도 하나만 상속받을 수 있다.

&nbsp;다음으로 인터페이스이다.
사실 인터페이스는 위쪽에서도 잠깐 나왔다.
```java
public interface mouse{
	public void click();
}
public class gamingMouse implements mouse{
	public void click(){
		System.out.println(“Click the mouse!!”);
	}
}
```
&nbsp;이렇게 implements키워드를 이용해서 인터페이스를 구현할 수 있다.

> 자바언어에서 상속과는 다르게 인터페이스는 몇개든 더 구현 할 수 있다.

### 둘째 추상클래스는 속성, 구현부있는 메서드가 있지만 인터페이스에는 존재하지 않는다.

&nbsp;제목 그대로 
추상클래스는 속성, 메서드 있는 구현부가 존재해도 상관없다.
하지만 인터페이스는 일체의 구현부가 존재하면 안된다.

&nbsp;위의 예제를 다시 보아도
```java
public class Keyboard{
	private int keypressure;
	
	public abstract void Keydown();
	public void turnOn(){
		System.out.println(“turn On keyboard”);
	}
}

public interface mouse{
	public void click();
}
```

&nbsp;이 사실을 확인 할 수 있다.



<hr>
&nbsp;사실 두가지의 차이점 공통점이라 하였지만, 너무 언어에 따라 다르다.
c++에서는 interface 문법이 존재하지 않고, 다중상속으로 인터페이스를 지원하며
프로토타입 언어들중 몇개는 둘을 통합해서 사용기도 하는 등 많은 차이가 있으니 참고하면 좋을거 같다. 

&nbsp;이 부분에 대해서 
내가 공부하면서 얻어 낸 결론은 이것이다.

**인터페이스 와 추상클래스 모두 객체에 책임을 부여하는 도구이다.**


