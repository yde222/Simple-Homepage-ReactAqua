//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://beta.reactjs.org/learn/state-as-a-snapshot
//https://beta.reactjs.org/learn/queueing-a-series-of-state-updates

//Queueing a Series of State Updates
//Setting a state variable will queue another render. But sometimes you might want to perform multiple operations 
//on the value before queueing the next render. To do this, it helps to understand how React batches state updates.

//You will learn
//What “batching” is and how React uses it to process multiple state updates
//How to apply several updates to the same state variable in a row
//React batches state updates 
//You might expect that clicking the “+3” button will increment the counter three times because it calls setNumber(number + 1) three times:

//일련의 상태 업데이트 대기열에 넣기
//상태 변수를 설정하면 다른 렌더링을 대기열에 추가합니다. 하지만 때로는 여러 작업을 수행해야 할 수도 있습니다.
// 다음 렌더링을 대기하기 전에 값에. 이렇게 하려면 React가 상태 업데이트를 일괄 처리하는 방법을 이해하는 것이 도움이 됩니다.

//당신은 배울 것이다
//"일괄 처리"란 무엇이며 React가 이를 사용하여 여러 상태 업데이트를 처리하는 방법
//동일한 상태 변수에 여러 업데이트를 연속으로 적용하는 방법
//React 배치 상태 업데이트
//"+3" 버튼을 클릭하면 setNumber(숫자 + 1)을 세 번 호출하기 때문에 카운터가 세 번 증가할 것이라고 예상할 수 있습니다.

//Updating the same state multiple times before the next render 

//It is an uncommon use case, but if you would like to update the same state variable multiple times 
//before the next render, instead of passing the next state value like setNumber(number + 1), 
//you can pass a function that calculates the next state based on the previous one in the queue, like setNumber(n => n + 1). 
//It is a way to tell React to “do something with the state value” instead of just replacing it.

//Try incrementing the counter now:

//다음 렌더링 전에 동일한 상태를 여러 번 업데이트

//일반적이지 않은 사용 사례이지만 다음 렌더링 전에 동일한 상태 변수를 여러 번 업데이트하려는 경우 setNumber(숫자 + 1)과 같이 다음 상태 값을 전달하는 대신 
//setNumber(n => n + 1)과 같이 대기열의 이전 상태를 기반으로 다음 상태를 계산하는 함수를 전달할 수 있습니다. 
//이는 React에게 상태 값을 단순히 교체하는 대신 "상태 값으로 무언가를 수행"하도록 지시하는 방법입니다.

//지금 카운터를 증가시키십시오.
//결과 +3

//However, as you might recall from the previous section, each render’s state values are fixed, so the value of number inside the first render’s event handler is always 0, 
//no matter how many times you call setNumber(1):

//setNumber(0 + 1);
//setNumber(0 + 1);
//setNumber(0 + 1);
//But there is one other factor at play here. React waits until all code in the event handlers has run before processing your state updates. 
//This is why the re-render only happens after all these setNumber() calls.

//This might remind you of a waiter taking an order at the restaurant. 
//A waiter doesn’t run to the kitchen at the mention of your first dish! Instead, they let you finish your order, let you make changes to it, and even take orders from other people at the table.


//
//그러나 이전 섹션에서 기억할 수 있듯이 각 렌더링의 상태 값은 고정되어 있으므로 setNumber(1)를 몇 번 호출하더라도 첫 번째 렌더링의 이벤트 핸들러 내부의 숫자 값은 항상 0입니다.

//setNumber(0 + 1);
//setNumber(0 + 1);
//setNumber(0 + 1);
//그러나 여기에는 또 다른 요인이 작용합니다. React는 상태 업데이트를 처리하기 전에 이벤트 핸들러의 모든 코드가 실행될 때까지 기다립니다. 이것이 모든 setNumber() 호출 후에만 
//다시 렌더링이 발생하는 이유입니다.

//이것은 레스토랑에서 주문을 받는 웨이터를 연상시킬 수 있습니다. 웨이터는 당신의 첫 요리를 언급할 때 부엌으로 달려가지 않습니다! 대신 주문을 완료하고 변경할 수 있으며 테이블에 있는 
//다른 사람의 주문도 받을 수 있습니다.

import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}

// Here, n => n + 1 is called an updater function. When you pass it to a state setter:

// React queues this function to be processed after all the other code in the event handler has run.
// During the next render, React goes through the queue and gives you the final updated state.
// setNumber(n => n + 1);
// setNumber(n => n + 1);
// setNumber(n => n + 1);
// Here’s how React works through these lines of code while executing the event handler:

// setNumber(n => n + 1): n => n + 1 is a function. React adds it to a queue.
// setNumber(n => n + 1): n => n + 1 is a function. React adds it to a queue.
// setNumber(n => n + 1): n => n + 1 is a function. React adds it to a queue.
// When you call useState during the next render, React goes through the queue. The previous number state was 0, so that’s what React passes to the first updater function as the n argument. Then React takes the return value of your previous updater function and passes it to the next updater as n, and so on:

// queued update	n	returns
// n => n + 1	0	0 + 1 = 1
// n => n + 1	1	1 + 1 = 2
// n => n + 1	2	2 + 1 = 3
// React stores 3 as the final result and returns it from useState.

// This is why clicking “+3” in the above example correctly increments the value by 3.
//     여기서 n => n + 1을 업데이트 함수라고 합니다. 상태 setter에 전달할 때:                                                                                                             
                                                                                                                                                                 
//     React는 이벤트 핸들러의 다른 모든 코드가 실행된 후 처리되도록 이 함수를 큐에 넣습니다.                                                                                                         
//     다음 렌더링 동안 React는 대기열을 통과하여 최종 업데이트된 상태를 제공합니다.                                                                                                               
//     setNumber(n => n + 1);                                                                                                                                       
//     setNumber(n => n + 1);                                                                                                                                       
//     setNumber(n => n + 1);                                                                                                                                       
//     이벤트 핸들러를 실행하는 동안 React가 이러한 코드 줄을 통해 작동하는 방법은 다음과 같습니다.                                                                                                      
                                                                                                                                                                 
//     setNumber(n => n + 1): n => n + 1은 함수입니다. React는 그것을 대기열에 추가합니다.                                                                                             
//     setNumber(n => n + 1): n => n + 1은 함수입니다. React는 그것을 대기열에 추가합니다.                                                                                             
//     setNumber(n => n + 1): n => n + 1은 함수입니다. React는 그것을 대기열에 추가합니다.                                                                                             
//     다음 렌더링 중에 useState를 호출하면 React가 대기열을 통과합니다. 이전 숫자 상태는 0이었으므로 React가 첫 번째 업데이트 함수에 n 인수로 전달한 값입니다. 
//그런 다음 React는 이전 업데이트 함수의 반환 값을 가져와 다음 업데이트 프로그램에 n으로 전달합니다.
                                                                                                                                                                 
//     대기 업데이트 n 반환                                                                                                                                                 
//     n => n + 100 + 1 = 1                                                                                                                                         
//     n => n + 111 + 1 = 2                                                                                                                                         
//     n => n + 1 2 2 + 1 = 3                                                                                                                                       
//    React는 최종 결과로 3을 저장하고 useState에서 반환합니다.                                                                                                                      
                                                                                                                                                                 
//    이것이 바로 위의 예에서 "+3"을 클릭하면 값이 3씩 올바르게 증가하는 이유입니다.                                                                                                              