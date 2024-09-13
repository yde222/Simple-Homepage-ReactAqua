//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://beta.reactjs.org/learn/state-as-a-snapshot
//https://beta.reactjs.org/learn/queueing-a-series-of-state-updates

//Queueing a Series of State Updates

//일련의 상태 업데이트 대기열에 넣기

//결과,,, +6 
//        setNumber(number + 5);
//        setNumber(n => n + 1);

//결과,,, +5 
//        setNumber(number + 5);
//        setNumber(number + 5);

// What happens if you update state after replacing it 
// What about this event handler? What do you think number will be in the next render?

// Here’s what this event handler tells React to do:

// setNumber(number + 5): number is 0, so setNumber(0 + 5). React adds “replace with 5” to its queue.
// setNumber(n => n + 1): n => n + 1 is an updater function. React adds that function to its queue.
// During the next render, React goes through the state queue:

// queued update	n	returns
// “replace with 5”	0 (unused)	5
// n => n + 1	5	5 + 1 = 6
// React stores 6 as the final result and returns it from useState.

// 상태를 교체한 후 상태를 업데이트하면 어떻게 됩니까?
// 이 이벤트 핸들러는 어떻습니까? 다음 렌더링에서 숫자가 무엇이라고 생각하십니까?

// 다음은 이 이벤트 핸들러가 React에게 지시하는 내용입니다.

// setNumber(숫자 + 5): 숫자는 0이므로 setNumber(0 + 5)입니다. React는 대기열에 "5로 바꾸기"를 추가합니다.
// setNumber(n => n + 1): n => n + 1은 업데이트 함수입니다. React는 해당 함수를 대기열에 추가합니다.
// 다음 렌더링 동안 React는 상태 대기열을 통과합니다.

// 대기 중인 업데이트 n 반환
// "5로 바꾸기" 0(미사용) 5
// n => n + 1 5 5 + 1 = 6
// React는 최종 결과로 6을 저장하고 useState에서 반환합니다.

import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>Increase the number</button>
    </>
  )
}