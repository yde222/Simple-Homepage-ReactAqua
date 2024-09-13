//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://beta.reactjs.org/learn/state-as-a-snapshot
//https://beta.reactjs.org/learn/queueing-a-series-of-state-updates

//Challenge 1 of 1: Implement a traffic light 
//Here is a crosswalk light component that toggles when the button is pressed:

//Add an alert to the click handler. When the light is green and says “Walk”, clicking the button should say “Stop is next”. When the light is red and says “Stop”, clicking the button should say “Walk is next”.

//Does it make a difference whether you put the alert before or after the setWalk call?

//챌린지 1/1: 신호등 구현
//다음은 버튼을 눌렀을 때 토글되는 횡단보도 조명 구성요소입니다.

//클릭 핸들러에 경고를 추가합니다. 표시등이 녹색이고 "Walk"라고 표시되면 버튼을 클릭하면 "Stop is next"라고 표시되어야 합니다. 표시등이 빨간색이고 "Stop"이라고 표시되면 버튼을 클릭하면 "Walk is next"라고 표시되어야 합니다.

//setWalk 호출 전후에 경고를 넣느냐에 따라 차이가 있습니까?

//Whether you put it before or after the setWalk call makes no difference. That render’s value of walk is fixed. Calling setWalk will only change it for the next render, but will not affect the event handler from the previous render.

//This line might seem counter-intuitive at first:

//alert(walk ? 'Stop is next' : 'Walk is next');
//But it makes sense if you read it as: “If the traffic light shows ‘Walk now’, the message should say ‘Stop is next.‘” The walk variable inside your event handler matches that render’s value of walk and does not change.

//You can verify that this is correct by applying the substitution method. When walk is true, you get:

// setWalk 호출 전후에 넣든 상관 없습니다. 해당 렌더의 걷기 값은 고정되어 있습니다. setWalk를 호출하면 다음 렌더링에 대해서만 변경되지만 이전 렌더링의 이벤트 핸들러에는 영향을 미치지 않습니다.

//이 줄은 처음에는 직관에 반하는 것처럼 보일 수 있습니다.

//alert(walk ? '다음은 정지' : '다음은 걷기');
//그러나 다음과 같이 읽으면 의미가 있습니다. "신호등이 '지금 걷기'를 표시하면 메시지에 '다음은 중지가 있습니다.'"라는 메시지가 표시되어야 합니다.

//대체 방법을 적용하여 이것이 맞는지 확인할 수 있습니다. walk가 참이면 다음을 얻습니다.
//결과:

import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
 alert(walk ? 'Stop is next' : 'Walk is next');
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}

