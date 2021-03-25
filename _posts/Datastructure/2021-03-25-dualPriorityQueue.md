---
layout        : post
title         : 이중 우선순위 큐
date          : 2021.03.25
category      : Data-Structure
comments      : true
tags          : [Data-structure, Algorithm]
icon          : note
---

* content
{:toc}

## 백준 7662번...

이중 우선순위 큐.

우선순위는 큐에 들어가는 정수값 자체를 우선순위로 하는

이중 우선순위 큐이다.

최대힙과, 최소힙을 이용해서 구현을 해 보았다.

최대값을 제거할때는 최대힙에서 삭제연산을 하고, 삭제한 요소를 저장해둔다.
그리고 최소값을 제거할때 만약 제거하는 요소가 저장해둔 배열에 있다면, 한번더 삭제한다.

```C
void pop(heap *h, heap *h2, int num){
    int temp;
    //최대값 삭제
    if(num == 1){
        temp = popM(h);
        for(int i = h->numsize-1; i > -1 ; i--){
            if(temp == h->nums[i]){
                temp = popM(h);
                h->nums[i] = h->nums[h->numsize--];
            }
        }
    }
    //최소값 삭제
    else{
        temp = popm(h);
        for(int i =  h->numsize-1; i > -1; i--){
            if(temp == h->nums[i]){
                temp = popm(h);
                h->nums[i] = h->nums[h->numsize--];
            }
        }
    }
    if(temp != -1)
        h2->nums[h2->numsize++] = temp;
    
    
}
```
- 이중 우선순위 큐에서 삭제하는 연산.

나름 열심히 생각해서 짜본 건데...

시간초과가 난다. 도대체 뭐가 문제인지 잘 모르겠다..

입력받는건  scanf로 하는데 느린건가??
백준에서는  scanf가 느리지 않다고 하던데. 더 빠른 방법이 있는건지 모르겠다.

열심히 찾아보면서 inline타입으로 설정해서 좀 더 빠르게 해봤는데, 역시 무용지물..

이쯤되니 그냥 내가 잘못한거같다...

생각해보니 최악의 경우 O(n^2logn) 까지 시간복잡도가 올라가는 거같은데..

음.. 그냥 전체를 탐색하는것 보다는 빠를거같아서 이렇게 해봤는데 똑같은건가 보다..