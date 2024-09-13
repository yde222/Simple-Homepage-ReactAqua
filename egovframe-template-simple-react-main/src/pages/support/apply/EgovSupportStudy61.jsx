//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://beta.reactjs.org/learn/state-as-a-snapshot
//https://beta.reactjs.org/learn/queueing-a-series-of-state-updates

import { useState } from 'react';

//You press the “Send” button, sending “Hello” to Alice.
//Before the five-second delay ends, you change the value of the “To” field to “Bob”.
//What do you expect the alert to display? Would it display, “You said Hello to Alice”? Or would it display, “You said Hello to Bob”? Make a guess based on what you know, and then try it:

//"Send" 버튼을 누르면 "Hello"가 Alice에게 전송됩니다.
//5초 지연이 끝나기 전에 "To" 필드의 값을 "Bob"으로 변경합니다.
//알림이 무엇을 표시할 것으로 예상합니까? "You said Hello to Alice"가 표시됩니까? 아니면 "You said Hello to Bob"이라고 표시됩니까? 알고 있는 내용을 바탕으로 추측한 다음 시도해 보십시오.
//정답:alert Alice

//React keeps the state values “fixed” within one render’s event handlers. You don’t need to worry whether the state has changed while the code is running.

//But what if you wanted to read the latest state before a re-render? You’ll want to use a state updater function, covered on the next page!

//Recap
//Setting state requests a new render.
//React stores state outside of your component, as if on a shelf.
//When you call useState, React gives you a snapshot of the state for that render.
//Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers.
//Every render (and functions inside it) will always “see” the snapshot of the state that React gave to that render.
//You can mentally substitute state in event handlers, similarly to how you think about the rendered JSX.
//Event handlers created in the past have the state values from the render in which they were created.

//React는 한 렌더링의 이벤트 핸들러 내에서 상태 값을 "고정"으로 유지합니다. 코드가 실행되는 동안 상태가 변경되었는지 여부를 걱정할 필요가 없습니다.

//하지만 다시 렌더링하기 전에 최신 상태를 읽으려면 어떻게 해야 할까요? 다음 페이지에서 다루는 상태 업데이트 기능을 사용하고 싶을 것입니다!

//요약
//설정 상태는 새로운 렌더링을 요청합니다.
//React는 선반에 있는 것처럼 구성 요소 외부에 상태를 저장합니다.
//useState를 호출하면 React는 해당 렌더링 상태의 스냅샷을 제공합니다.
//변수 및 이벤트 핸들러는 재렌더링을 "생존"하지 않습니다. 모든 렌더링에는 자체 이벤트 핸들러가 있습니다.
//모든 렌더링(및 그 내부의 함수)은 항상 React가 해당 렌더링에 제공한 상태의 스냅샷을 "볼" 것입니다.
//렌더링된 JSX에 대해 생각하는 것과 유사하게 이벤트 핸들러에서 정신적으로 상태를 대체할 수 있습니다.
//과거에 생성된 이벤트 핸들러는 생성된 렌더링의 상태 값을 가집니다.
export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You said ${message} to ${to}`);
    }, 5000);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

