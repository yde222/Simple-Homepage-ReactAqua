import React , { useState } from 'react';

function Counter4() {
  const [number, setNumber] = useState(0);

//그 대신에 기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도 값을 업데이트 할 수 있습니다.
//setNumber를 사용할 때 그 다음 상태를 파라미터로 넣어준것이 아니라, 값을 업데이트 하는 함수를 파라미터로 넣어주었습니다.
  const onIncrease = () => {
    //setNumber(number + 1);
	setNumber(prevNumber => prevNumber + 1);
  }

  const onDecrease = () => {
    //setNumber(number - 1);
	setNumber(prevNumber => prevNumber - 1);
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );}

export default Counter4;