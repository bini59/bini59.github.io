---
layout        : post
title         : 이중 우선순위 큐
date          : 2021.03.25
category      : Data-Structure
comments      : true
tags          : [Data-structure, Algorithm, queue]
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

```C++
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
> 이중 우선순위 큐에서 삭제하는 연산.

나름 열심히 생각해서 짜본 건데...

시간초과가 난다. 도대체 뭐가 문제인지 잘 모르겠다..

입력받는건  scanf로 하는데 느린건가??
백준에서는  scanf가 느리지 않다고 하던데. 더 빠른 방법이 있는건지 모르겠다.

열심히 찾아보면서 inline타입으로 설정해서 좀 더 빠르게 해봤는데, 역시 무용지물..

이쯤되니 그냥 내가 잘못한거같다...

생각해보니 최악의 경우 O(n^2logn) 까지 시간복잡도가 올라가는 거같은데..

음.. 그냥 전체를 탐색하는것 보다는 빠를거같아서 이렇게 해봤는데 똑같은건가 보다..


## 2021.03.26 찾아내따..

고민고민하다가 방법을 찾아냈다.

최대힙에서 삭제하는건 결국 최대값이 나온다.

그래서 저장해두는 배열을 배열이 아니라 최대힙으로 만들어 두었다.
그랬더니, 추가에는 O(logn) 비교에는  O(1)로 시간복잡도를 상당히 줄일 수 있었다.


최종 코드는 이렇게...

아.. 직접구현으로 해보려 했지만, 너무 복잡하고 사실 그렇게 크게 의미가 있나 싶었다.
ㅡ냥 라이브러리를 잘 쓰는걸루....
```C++
#include <queue>
#include <cstdio>

using namespace std;

int main(){
    /*
        32비트 정수라 long long int 를 써줘야한다. 이거때ㅐㅁ 또 한 30분 보낸듯...
    */

    //최대힙과, 최대힙에서 삭제한걸 저장하는 최대힙
    priority_queue<long long int> qM, Marray;

    //최소힙과, 최대힙에서 삭제한걸 저장하는 최소힙
    priority_queue<long long int> qm, marray;

    //총 반복횟수
    int n;
    //각 테스트 케이스의 명령 갯수
    int TEST;

    //명령어 변수
    char command;
    long long int num;

    scanf("%d", &n);
    for(int i = 0; i < n; i++){
        scanf("%*c%d", &TEST);    
        /*
            힙들을 전부 초기화 해줘야 했었다..

            이거 안해서 계속 틀리고 있었음.. ㅜㅜ 문제 이해 잘못하고 있었어..
        */
        qM = priority_queue<long long int>();
        qm = priority_queue<long long int>();
        marray = priority_queue<long long int>();
        Marray = priority_queue<long long int>();
        for (int j = 0; j < TEST; j++){
            scanf("%*c%c %lld", &command, &num);
            //입력, 둘다 넣어줌. 최소힙은 부호를 바꿔서 넣는것으로 만듬. 
            if(command == 'I'){
                qM.push(num);
                qm.push(-num);
            }
            /삭제연산
            else if(command=='D'){
                int temp;
                //제거연산을 할때는 항상 qM이 비지 않았을때만..
                if(num == 1 && !qM.empty()){
                    /*
                        제일 처음으로 해줄건, 혹시 저장해둔 게 있다면 지우기..
                        만약, 저장해둔게 있다면,
                        temp에 최대힙의 첫번째 원소를 넣고
                        최대힙의 첫번째 원소와, 저장해둔것의 첫번재 원소를 비교한다.
                        만약 같다면, 이미 제거된 원소이므로 둘다 제거해준다.
                    */
                    while(!Marray.empty()){
                        temp = qM.top();
                        if(temp == Marray.top()){qM.pop(); Marray.pop();}
                        else {break;}
                    }
                    /*
                        만약 위의 과정을 통해 qM이 비게 된다면...
                        continue로 넘어가기 
                        아니면 marray에 top원소 넣어주고 pop으로 하나 제거하기
                    */
                    if(qM.empty())
                        continue;
                    marray.push(-qM.top()); qM.pop();
                }
                else if(num == -1 && !qm.empty()){
                    /*
                        반대쪽도 마찬가지
                        만약, 저장해둔게 있다면,
                        temp에 최소힙의 첫번째 원소를 넣고
                        최소힙의 첫번째 원소와, 저장해둔것의 첫번재 원소를 비교한다.
                        만약 같다면, 이미 제거된 원소이므로 둘다 제거해준다.
                    */ 
                    while(!marray.empty()){
                        temp = -qm.top();
                        if(temp == -marray.top()){ qm.pop(); marray.pop();}
                        else {break;}
                    }
                    //역시나 반대쪽도 위와 마찬가지로 진행
                    if(qm.empty())   
                        continue;
                    Marray.push(-qm.top()); qm.pop();
                }
            }
        }
        //연산이 모두 마치고 나머지 제거못한 원소 제거하기.
        long long int temp;
        if(!Marray.empty()){
            while(!qM.empty() && !Marray.empty()){
                temp = qM.top();
                if(temp == Marray.top()){
                    qM.pop();
                    Marray.pop();
                }
                else
                    break;
            }
        }
        if(!marray.empty()){
            while(!qm.empty() && !marray.empty()){
                temp = -qm.top();
                if(temp == -marray.top()){
                    qm.pop();
                    marray.pop();
                }
                else
                    break;
            }
        }
        if((qm.empty()|| qM.empty())){
            printf("EMPTY\n");
        }
        else{
            printf("%lld %lld\n",qM.top(),-qm.top());
        }
    }   
}


```
