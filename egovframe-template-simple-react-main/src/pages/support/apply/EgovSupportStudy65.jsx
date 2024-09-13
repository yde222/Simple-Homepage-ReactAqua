//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://beta.reactjs.org/learn/state-as-a-snapshot
//https://beta.reactjs.org/learn/queueing-a-series-of-state-updates

//Queueing a Series of State Updates

//일련의 상태 업데이트 대기열에 넣기

// Here’s how React works through these lines of code while executing this event handler:

// setNumber(number + 5): number is 0, so setNumber(0 + 5). React adds “replace with 5” to its queue.
// setNumber(n => n + 1): n => n + 1 is an updater function. React adds that function to its queue.
// setNumber(42): React adds “replace with 42” to its queue.
// During the next render, React goes through the state queue:

// queued update	n	returns
// “replace with 5”	0 (unused)	5
// n => n + 1	5	5 + 1 = 6
// “replace with 42”	6 (unused)	42
// Then React stores 42 as the final result and returns it from useState.

// To summarize, here’s how you can think of what you’re passing to the setNumber state setter:

// An updater function (e.g. n => n + 1) gets added to the queue.
// Any other value (e.g. number 5) adds “replace with 5” to the queue, ignoring what’s already queued.
// After the event handler completes, React will trigger a re-render. During the re-render, 
// React will process the queue. Updater functions run during rendering, so updater functions 
// must be pure and only return the result. Don’t try to set state from inside of them or run 
// other side effects. In Strict Mode, React will run each updater function twice (but discard the second result) to help you find mistakes.
// 이 이벤트 핸들러를 실행하는 동안 React가 이러한 코드 줄을 통해 작동하는 방법은 다음과 같습니다.

// setNumber(숫자 + 5): 숫자는 0이므로 setNumber(0 + 5)입니다. React는 대기열에 "5로 바꾸기"를 추가합니다.
// setNumber(n => n + 1): n => n + 1은 업데이트 함수입니다. React는 해당 함수를 대기열에 추가합니다.
// setNumber(42): React는 대기열에 "replace with 42"를 추가합니다.
// 다음 렌더링 동안 React는 상태 대기열을 통과합니다.

// 대기 중인 업데이트 n 반환
// "5로 바꾸기" 0(미사용) 5
// n => n + 15 5 + 1 = 6
// "42로 바꾸기" 6(미사용) 42
// 그런 다음 React는 최종 결과로 42를 저장하고 useState에서 반환합니다.
// 결과 42
// 요약하자면 다음은 setNumber 상태 setter에 전달하는 내용에 대해 생각할 수 있는 방법입니다.

// 업데이트 기능(예: n => n + 1)이 대기열에 추가됩니다.
// 다른 값(예: 숫자 5)은 이미 대기 중인 항목을 무시하고 "5로 바꾸기"를 대기열에 추가합니다.
// 이벤트 핸들러가 완료된 후 React는 다시 렌더링을 트리거합니다. 다시 렌더링하는 동안
// React는 큐를 처리할 것입니다. 업데이터 기능은 렌더링 중에 실행되므로 업데이트 기능
// 순수해야 하며 결과만 반환해야 합니다. 내부에서 상태를 설정하거나 실행하지 마십시오.
// 다른 부작용. Strict 모드에서 React는 실수를 찾는 데 도움이 되도록 각 업데이트 기능을 두 번 실행합니다(그러나 두 번째 결과는 버립니다)

import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(42);
      }}>Increase the number</button>
    </>
  )
}