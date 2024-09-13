//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://beta.reactjs.org/learn/state-as-a-snapshot
//https://beta.reactjs.org/learn/queueing-a-series-of-state-updates

//State over time 
//Well, that was fun. Try to guess what clicking this button will alert:
//시간 경과에 따른 상태
//음, 재미있었어요. 이 버튼을 클릭하면 어떤 알림이 표시되는지 추측해 보세요.
//return
// alert는 0
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

//  return (
//    <>
//      <h1>{number}</h1>
//      <button onClick={() => {
//        setNumber(number + 5);
//        alert(number);
//      }}>+5</button>
//    </>
//  )
//}
//But what if you put a timer on the alert, 
//so it only fires after the component re-rendered? Would it say “0” or “5”? Have a guess!
//하지만 경고에 타이머를 설정하면 어떻게 될까요?
//구성 요소가 다시 렌더링된 후에만 실행됩니까? "0" 또는 "5"라고 할까요? 추측하다!
//return
// alert는 0
//Surprised? If you use the substitution method, you can see the “snapshot” of the state passed to the alert.
//놀란? 대체 방법을 사용하면 경고에 전달된 상태의 "스냅샷"을 볼 수 있습니다.

//The state stored in React may have changed by the time the alert runs, but it was scheduled using a snapshot of the state at the time the user interacted with it!

//A state variable’s value never changes within a render, even if its event handler’s code is asynchronous. Inside that render’s onClick, the value of number continues to be 0 even after setNumber(number + 5) was called. Its value was “fixed” when React “took the snapshot” of the UI by calling your component.

//Here is an example of how that makes your event handlers less prone to timing mistakes. Below is a form that sends a message with a five-second delay. Imagine this scenario:

//You press the “Send” button, sending “Hello” to Alice.
//Before the five-second delay ends, you change the value of the “To” field to “Bob”.
//What do you expect the alert to display? Would it display, “You said Hello to Alice”? Or would it display, “You said Hello to Bob”? Make a guess based on what you know, and then try it:
//React에 저장된 상태는 경고가 실행될 때까지 변경되었을 수 있지만 사용자가 상호 작용한 시점의 상태 스냅샷을 사용하여 예약되었습니다!

//이벤트 핸들러의 코드가 비동기인 경우에도 상태 변수의 값은 렌더링 내에서 절대 변경되지 않습니다. 해당 렌더링의 onClick 내부에서 setNumber(숫자 + 5)가 호출된 후에도 숫자 값은 계속 0입니다. 그 값은 React가 구성 요소를 호출하여 UI의 "스냅샷을 찍을" 때 "고정"되었습니다.

//다음은 이벤트 핸들러가 타이밍 실수에 덜 취약하게 만드는 방법의 예입니다. 아래는 5초 지연으로 메시지를 보내는 양식입니다. 다음 시나리오를 상상해 보십시오.

//"Send" 버튼을 누르면 "Hello"가 Alice에게 전송됩니다.
//5초 지연이 끝나기 전에 "To" 필드의 값을 "Bob"으로 변경합니다.
//알림이 무엇을 표시할 것으로 예상합니까? "You said Hello to Alice"가 표시됩니까? 아니면 "You said Hello to Bob"이라고 표시됩니까? 알고 있는 내용을 바탕으로 추측한 다음 시도해 보십시오.
 return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
