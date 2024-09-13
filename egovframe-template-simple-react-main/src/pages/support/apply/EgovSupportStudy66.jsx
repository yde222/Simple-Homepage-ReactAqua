//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://beta.reactjs.org/learn/state-as-a-snapshot
//https://beta.reactjs.org/learn/queueing-a-series-of-state-updates

//Queueing a Series of State Updates

//일련의 상태 업데이트 대기열에 넣기

// Challenge 1 of 2: Fix a request counter 
// You’re working on an art marketplace app that lets the user submit multiple orders for an art item at the same time. Each time the user presses the “Buy” button, 
// the “Pending” counter should increase by one. After three seconds, the “Pending” counter should decrease, and the “Completed” counter should increase.

// However, the “Pending” counter does not behave as intended. When you press “Buy”, it decreases to -1 (which should not be possible!). 
// And if you click fast twice, both counters seem to behave unpredictably.

// Why does this happen? Fix both counters.

// 챌린지 1/2: 요청 카운터 수정
// 사용자가 미술품에 대한 여러 주문을 동시에 제출할 수 있는 미술 마켓플레이스 앱을 만들고 있습니다. 사용자가 "구매" 버튼을 누를 때마다
// "Pending" 카운터는 1씩 증가해야 합니다. 3초 후에 "보류" 카운터는 감소하고 "완료" 카운터는 증가해야 합니다.

// 그러나 "Pending" 카운터는 의도한 대로 동작하지 않습니다. "매수"를 누르면 -1로 감소합니다(이는 불가능합니다!).
// 그리고 빠르게 두 번 클릭하면 두 카운터 모두 예측할 수 없게 동작하는 것 같습니다.

// 왜 이런 일이 발생합니까? 두 카운터를 수정하십시오.

//Solution
//Inside the handleClick event handler, the values of pending and completed correspond to what they were at the time 
//of the click event. For the first render, pending was 0, so setPending(pending - 1) becomes setPending(-1), 
//which is wrong. Since you want to increment or decrement the counters, 
//rather than set them to a concrete value determined during the click, you can instead pass the updater functions:

//해결책
//handleClick 이벤트 핸들러 내에서 보류 및 완료 값은 당시 값에 해당합니다.
//클릭 이벤트. 첫 번째 렌더링의 경우 보류는 0이므로 setPending(pending - 1)은 setPending(-1)이 됩니다.
//잘못되었습니다. 카운터를 증가시키거나 감소시키고 싶기 때문에,
//클릭하는 동안 결정된 구체적인 값으로 설정하는 대신 업데이터 함수를 대신 전달할 수 있습니다.

import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

//  async function handleClick() {
//    setPending(pending + 1);
//    await delay(3000);
//    setPending(pending - 1);
//    setCompleted(completed + 1);
//  }
//개선
 async function handleClick() {
    setPending(p => p + 1);
    await delay(3000);
    setPending(p => p - 1);
    setCompleted(c => c + 1);
  }
  return (
    <>
      <h3>
        Pending: {pending}
      </h3>
      <h3>
        Completed: {completed}
      </h3>
      <button onClick={handleClick}>
        Buy     
      </button>
    </>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
