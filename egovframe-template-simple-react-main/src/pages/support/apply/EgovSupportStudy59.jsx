//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://beta.reactjs.org/learn/state-as-a-snapshot
//https://beta.reactjs.org/learn/queueing-a-series-of-state-updates

//Here’s a little experiment to show you how this works. In this example, 
//you might expect that clicking the “+3” button would increment the counter three times because it calls setNumber(number + 1) three times.

//See what happens when you click the “+3” button:
///여기에 이것이 어떻게 작동하는지 보여주는 작은 실험이 있습니다. 이 예에서
//"+3" 버튼을 클릭하면 setNumber(숫자 + 1)을 세 번 호출하기 때문에 카운터가 세 번 증가할 것이라고 예상할 수 있습니다.

//"+3" 버튼을 클릭하면 어떻게 되는지 확인합니다

//Here is what this button’s click handler tells React to do:

//setNumber(number + 1): number is 0 so setNumber(0 + 1).
//React prepares to change number to 1 on the next render.
//setNumber(number + 1): number is 0 so setNumber(0 + 1).
//React prepares to change number to 1 on the next render.
//setNumber(number + 1): number is 0 so setNumber(0 + 1).
//React prepares to change number to 1 on the next render.
//Even though you called setNumber(number + 1) three times, in this render’s event handler number is always 0, so you set the state to 1 three times. This is why, after your event handler finishes, React re-renders the component with number equal to 1 rather than 3.

//You can also visualize this by mentally substituting state variables with their values in your code. Since the number state variable is 0 for this render, its event handler looks like this:
//다음은 이 버튼의 클릭 핸들러가 React에게 지시하는 내용입니다.

//setNumber(숫자 + 1): 숫자는 0이므로 setNumber(0 + 1)입니다.
//React는 다음 렌더링에서 숫자를 1로 변경할 준비를 합니다.
//setNumber(숫자 + 1): 숫자는 0이므로 setNumber(0 + 1)입니다.
//React는 다음 렌더링에서 숫자를 1로 변경할 준비를 합니다.
//setNumber(숫자 + 1): 숫자는 0이므로 setNumber(0 + 1)입니다.
//React는 다음 렌더링에서 숫자를 1로 변경할 준비를 합니다.
//setNumber(숫자 + 1)을 세 번 호출했지만 이 렌더링의 이벤트 핸들러 번호는 항상 0이므로 상태를 세 번 1로 설정합니다. 이것이 이벤트 핸들러가 완료된 후 React가 3이 아닌 1과 같은 번호로 구성 요소를 다시 렌더링하는 이유입니다.

//상태 변수를 코드의 해당 값으로 정신적으로 대체하여 이를 시각화할 수도 있습니다. 이 렌더링에 대해 숫자 상태 변수가 0이므로 이벤트 핸들러는 다음과 같습니다.

import { useState } from 'react';
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
