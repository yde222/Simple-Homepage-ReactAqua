//https://y00njaekim.github.io/react/useEffect/

import React, { useState, useEffect } from "react";
//모든 컴포넌트는 생명주기가 있다. 생명 주기가 있다는 의미는 모든 컴포넌트가 ✔️ 등장
// ✔️ 업데이트(재렌더링) ✔️ 퇴장 을 거치며 자기 역할을 수행한다는 것이다.

//Why to use useEffect()
//App 컴포넌트를 거친 후 Modal 컴포넌트가 등장한다. 
//Modal 컴포넌트 안에는 click 이라는 state  가 존재하며 state 값이 변경될 때마다 
//해당 컴포넌트는 업데이트(재렌더링) 된다.

//이 때, 재렌더링 된다 의 의미가 무엇일까?

//바로 function Modal()  에 적힌 모든 코드가 처음부터 끝까지 다시 실행된다는 의미이다.

//여기서부터 useEffect()  를 사용하는 이유가 시작된다. 우리는 이런 질문을 할 수 있다. 
//정말 모든 코드가 다시 실행되어야 하는 걸까? 이게 효율적이라고 할 수 있을까?
//이에 대한 답변으로 useEffect 가 존재한다. 우리가 useEffect 안에 적는 코드들은 Modal 
//컴포넌트가 등장, 업데이트, 퇴장 하는 순간순간에서 무조건적으로 다시 실행되는 것이 아니라 
//특정 조건이 성립할 때만 다시 실행된다.

//즉, 아래 그림에서 빨간색으로 칠해진 부분은 Modal() 이 등장할 때, 업데이트 될 때 
//무조건 실행되지만 파란색으로 칠해진 부분은 특정 조건을 만족해야만 실행된다.

//그 조건이 무엇인지에 대해서는 How to use useEffect() 에서 살펴보자.

//How to use useEffect()
//useEffect() 는 useEffect( ( ) => { }, [ ] ) 와 같은 형식을 갖고있다.
//Why to use useEffect() 에서 서술했 듯, useEffect() 안에 있는 코드는 특정 조건이 
//성립할 경우에만 반복적으로 실행된다.

//그 경우는 바로 useEffect( ( ) => { }, [ ] ) 에서 두 번째 인자로 사용되는 
//[ ] 에 의해 결정된다. 
//이 대괄호 안에는 특정 state 변수 명을 적는다. 그 state 가 변경되었을 때, 
//리액트는 useEffect() 안에 있는 함수를 실행한다.

//그렇기에 [ ] 가 비어있는 경우에는, 해당 컴포넌트가 등장할 경우에만 useEffect 안에 있는 함수가 실행될 뿐, 
//특정 state 가 업데이트 될 때는 실행되지 않는다.

function App() {
  return <Modal></Modal>;
}

function Modal() {
  const [click, setClick] = useState(0);
console.log('This is Modal!');

  useEffect(() => {
    console.log('Hello useEffect!');
    console.log(`${click} click detected`);
    return () => {
      console.log('Bye useEffect!');
    };
  }, [click]);
  return (
    <div>
      <button
        onClick={() => {
          setClick(click + 1);
        }}
      >
        버튼
      </button>
      <div>총 {click}회 클릭하셨습니다.</div>
    </div>
  );
}

export default App;