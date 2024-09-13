//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://beta.reactjs.org/learn/state-as-a-snapshot
//https://beta.reactjs.org/learn/queueing-a-series-of-state-updates
//You might think of your user interface as changing directly in response to the user event like a click. In React, it works a little differently from this mental model. On the previous page, you saw that setting state requests a re-render from React. This means that for an interface to react to the event, you need to update the state.

//In this example, when you press “send”, setIsSent(true) tells React to re-render the UI:

//클릭과 같은 사용자 이벤트에 대한 응답으로 사용자 인터페이스가 직접 변경된다고 생각할 수 있습니다. 
//React에서는 이 멘탈 모델과 약간 다르게 작동합니다. 이전 페이지에서 설정 상태가 React에서 다시 렌더링을 요청하는 것을 보았습니다. 
//즉, 인터페이스가 이벤트에 반응하려면 상태를 업데이트해야 합니다.

//이 예제에서 "send"를 누르면 setIsSent(true)가 React에게 UI를 다시 렌더링하도록 지시합니다.

//결과
//Your message is on its way!

//Here’s what happens when you click the button:

//1. The onSubmit event handler executes.
//2. setIsSent(true) sets isSent to true and queues a new render.
//3. React re-renders the component according to the new isSent value.
//Let’s take a closer look at the relationship between state and rendering.

// 버튼을 클릭하면 다음과 같은 일이 발생합니다.

//1. onSubmit 이벤트 핸들러가 실행됩니다.
//2. setIsSent(true)는 isSent를 true로 설정하고 새 렌더링을 대기열에 넣습니다.
//3. React는 새로운 isSent 값에 따라 구성 요소를 다시 렌더링합니다.
//상태와 렌더링 간의 관계를 자세히 살펴보겠습니다.

//Rendering takes a snapshot in time 
//“Rendering” means that React is calling your component, which is a function. The JSX you return from that function is like a snapshot of the UI in time. Its props, event handlers, and local variables were all calculated using its state at the time of the render.

//Unlike a photograph or a movie frame, the UI “snapshot” you return is interactive. It includes logic like event handlers that specify what happens in response to inputs. React updates the screen to match this snapshot and connects the event handlers. As a result, pressing a button will trigger the click handler from your JSX.

//When React re-renders a component:

//1.React calls your function again.
//2.Your function returns a new JSX snapshot.
//3.React then updates the screen to match the snapshot you’ve returned.
///렌더링은 시간에 따라 스냅샷을 찍습니다.
//"렌더링"은 React가 함수인 컴포넌트를 호출한다는 의미입니다. 해당 함수에서 반환하는 JSX는 시간에 따른 UI의 스냅샷과 같습니다. 
//소품, 이벤트 핸들러 및 로컬 변수는 모두 렌더링 당시의 상태를 사용하여 계산되었습니다.

//사진이나 동영상 프레임과 달리 반환하는 UI "스냅샷"은 대화형입니다. 여기에는 입력에 대한 응답으로 발생하는 일을 지정하는 이벤트 핸들러와 
//같은 논리가 포함됩니다. React는 이 스냅샷과 일치하도록 화면을 업데이트하고 이벤트 핸들러를 연결합니다. 
//결과적으로 버튼을 누르면 JSX에서 클릭 핸들러가 트리거됩니다.

//React가 컴포넌트를 다시 렌더링할 때:

//1.React는 함수를 다시 호출합니다.
//2. 함수가 새 JSX 스냅샷을 반환합니다.
//3. 그런 다음 React는 반환한 스냅샷과 일치하도록 화면을 업데이트합니다.

//As a component’s memory, state is not like a regular variable that disappears after your function returns. State actually “lives” in React itself—as if on a shelf!—outside of your function. When React calls your component, it gives you a snapshot of the state for that particular render. Your component returns a snapshot of the UI with a fresh set of props and event handlers in its JSX, 
//all calculated using the state values from that render!

//구성 요소의 메모리로서 상태는 함수가 반환된 후 사라지는 일반 변수와 다릅니다. State는 실제로 React 자체에 “살아” 있습니다. 
//마치 선반에 있는 것처럼! – 함수 외부에 있습니다. React는 구성 요소를 호출할 때 해당 특정 렌더링에 대한 상태의 스냅샷을 제공합니다. 
//구성 요소는 해당 렌더링의 상태 값을 사용하여 모두 계산된 JSX의 새로운 소품 및 이벤트 핸들러 세트와 함께 UI의 스냅샷을 반환합니다!

import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}
