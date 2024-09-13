//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://beta.reactjs.org/learn/state-as-a-snapshot
//https://beta.reactjs.org/learn/queueing-a-series-of-state-updates

//Queueing a Series of State Updates

//일련의 상태 업데이트 대기열에 넣기

// Challenge 2 of 2: Implement the state queue yourself 
// In this challenge, you will reimplement a tiny part of React from scratch! 
// the correct result for each of those cases. 
// If you implement it correctly, all four tests should pass.

// You will receive two arguments: baseState is the initial state (like 0), 
// and the queue is an array which contains a mix of numbers (like 5) 
// and updater functions (like n => n + 1) in the order they were added.

// Your task is to return the final state, just like the tables on this page show!
// It’s not as hard as it sounds.

// Scroll through the sandbox preview. Notice that it shows four test cases. 
// They correspond to the examples you’ve seen earlier on this page. 
// Your task is to implement the getFinalState function so that it returns 

// 과제 2/2: 상태 대기열을 직접 구현
// 이 챌린지에서는 React의 작은 부분을 처음부터 다시 구현하게 됩니다!
// 생각보다 어렵지 않습니다.

// 샌드박스 미리보기를 스크롤합니다. 4개의 테스트 케이스를 보여줍니다.
// 이 페이지의 앞부분에서 본 예제에 해당합니다.
// 귀하의 임무는 getFinalState 함수를 구현하여 반환되도록 하는 것입니다.
// 각각의 경우에 대한 올바른 결과입니다.
// 올바르게 구현했다면 네 가지 테스트를 모두 통과해야 합니다.

// 두 가지 인수를 받게 됩니다. baseState는 초기 상태(예: 0)이고
// 그리고 큐는 숫자의 혼합을 포함하는 배열입니다(예: 5).
// 및 업데이트 함수(예: n => n + 1)가 추가된 순서대로.

// 당신의 임무는 이 페이지의 표가 보여주는 것처럼 최종 상태를 반환하는 것입니다!

//결과
// Base state: 0

// Queue: [1, 1, 1]

// Expected result: 1

// Your result: 1 (correct)

// Base state: 0

// Queue: [n => n+1, n => n+1, n => n+1]

// Expected result: 3

// Your result: 3 (correct)

// Base state: 0

// Queue: [5, n => n+1]

// Expected result: 6

// Your result: 6 (correct)

// Base state: 0

// Queue: [5, n => n+1, 42]

// Expected result: 42

// Your result: 42 (correct)

import { getFinalState } from './processQueue67.js';

function increment(n) {
  return n + 1;
}
increment.toString = () => 'n => n+1';

export default function App() {
  return (
    <>
      <TestCase
        baseState={0}
        queue={[1, 1, 1]}
        expected={1}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          increment,
          increment,
          increment
        ]}
        expected={3}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
        ]}
        expected={6}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
          42,
        ]}
        expected={42}
      />
    </>
  );
}

function TestCase({
  baseState,
  queue,
  expected
}) {
  const actual = getFinalState(baseState, queue);
  return (
    <>
      <p>Base state: <b>{baseState}</b></p>
      <p>Queue: <b>[{queue.join(', ')}]</b></p>
      <p>Expected result: <b>{expected}</b></p>
      <p style={{
        color: actual === expected ?
          'green' :
          'red'
      }}>
        Your result: <b>{actual}</b>
        {' '}
        ({actual === expected ?
          'correct' :
          'wrong'
        })
      </p>
    </>
  );
}
