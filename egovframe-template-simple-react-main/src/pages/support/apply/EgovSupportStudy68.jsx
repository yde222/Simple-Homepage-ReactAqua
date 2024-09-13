//https://sig03.medium.com/react%EC%97%90%EC%84%9C-state%EA%B0%80-%EB%B0%94%EB%A1%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-7332d6c05d31#:~:text=%EA%B2%B0%EB%A1%A0%3A%20useState%20%EC%97%90%EC%84%9C%20state%20%EA%B0%92%EC%9D%80%20%ED%95%9C%20%EB%B2%88%EB%A7%8C%20%EB%B0%94%EB%80%90%EB%8B%A4.,%EC%9D%B4%EB%A5%BC%20%ED%94%BC%ED%95%98%EA%B3%A0%20%EC%8B%B6%EC%9C%BC%EB%A9%B4%20state%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A5%BC%20%ED%95%A8%EC%88%98%EB%A1%9C%20%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EB%A9%B4%20%EB%90%9C%EB%8B%A4.

//https://react.dev/learn/updating-objects-in-state

// Updating Objects in State
// State can hold any kind of JavaScript value, including objects. 
//But you shouldn’t change objects that you hold in the React state directly. 
//Instead, when you want to update an object, you need to create a new one 
//(or make a copy of an existing one), and then set the state to use that copy.

// You will learn
// How to correctly update an object in React state
// How to update a nested object without mutating it
// What immutability is, and how not to break it
// How to make object copying less repetitive with Immer
// What’s a mutation? 
// You can store any kind of JavaScript value in state.

// const [x, setX] = useState(0);
// So far you’ve been working with numbers, strings, and booleans. 
//These kinds of JavaScript values are “immutable”, meaning unchangeable or “read-only”. 
//You can trigger a re-render to replace a value:


// 상태의 객체 업데이트
// 상태는 객체를 포함하여 모든 종류의 JavaScript 값을 보유할 수 있습니다. 
//그러나 React 상태에 있는 객체를 직접 변경해서는 안 됩니다. 대신 개체를 업데이트하려면 새 개체를 생성(또는 기존 개체의 복사본을 만든 다음)

// 해당 복사본을 사용하도록 상태를 설정해야 합니다.

// 당신은 배울 것이다
// React 상태에서 객체를 올바르게 업데이트하는 방법
// 중첩 객체를 변경하지 않고 업데이트하는 방법
// 불변성은 무엇이며 깨지지 않는 방법
// Immer로 개체 복사를 덜 반복적으로 만드는 방법
// 돌연변이란?(변경이란?, 김평권)
// 모든 종류의 JavaScript 값을 상태에 저장할 수 있습니다.

// const [x, setX] = useState(0);
// 지금까지 숫자, 문자열 및 부울로 작업했습니다. 이러한 종류의 JavaScript 값은 "불변"이며, 이는 변경할 수 없거나 
//"읽기 전용"을 의미합니다. 다시 렌더링을 트리거하여 값을 바꿀 수 있습니다.

// setX(5);

// The x state changed from 0 to 5, but the number 0 itself did not change. 
// It’s not possible to make any changes to the built-in primitive values like numbers, 
// strings, and booleans in JavaScript.

// Now consider an object in state:

// const [position, setPosition] = useState({ x: 0, y: 0 });
// Technically, it is possible to change the contents of the object itself. This is called a mutation:

// position.x = 5;
// However, although objects in React state are technically mutable, 
// you should treat them as if they were immutable—like numbers, booleans, and strings. 
// Instead of mutating them, you should always replace them.

// setX(5);

// x 상태가 0에서 5로 변경되었지만 숫자 0 자체는 변경되지 않았습니다.
// 숫자와 같은 기본 기본 값을 변경할 수 없습니다.
// JavaScript의 문자열 및 부울.

// 이제 상태에 있는 객체를 고려합니다.

// const [position, setPosition] = useState({ x: 0, y: 0 });
// 기술적으로 객체 자체의 내용을 변경하는 것이 가능합니다. 이것을 돌연변이라고 합니다.

// 위치.x = 5;
// 그러나 React 상태의 객체는 기술적으로 변경 가능하지만,
// 숫자, 부울, 문자열과 같이 변경할 수 없는 것처럼 취급해야 합니다.
// 변경하는 대신 항상 교체해야 합니다.

// Treat state as read-only 
// In other words, you should treat any JavaScript object that you put into state as read-only.

// This example holds an object in state to represent the current pointer position. 
// The red dot is supposed to move when you touch or move the cursor over the preview area. 
// But the dot stays in the initial position:

// 상태를 읽기 전용으로 취급
// 즉, 상태에 넣은 모든 JavaScript 객체를 읽기 전용으로 취급해야 합니다.

// 이 예제는 현재 포인터 위치를 나타내는 상태의 개체를 보유합니다.
// 미리 보기 영역 위로 커서를 터치하거나 이동할 때 빨간색 점이 이동하도록 되어 있습니다.
// 그러나 점은 초기 위치에 유지됩니다.

// The problem is with this bit of code.

// onPointerMove={e => {
//   position.x = e.clientX;
//   position.y = e.clientY;
// }}
// This code modifies the object assigned to position from the previous render. 
// But without using the state setting function, React has no idea that object has changed. 
// So React does not do anything in response. It’s like trying to change the order 
// after you’ve already eaten the meal. While mutating state can work in some cases, 
// we don’t recommend it. You should treat the state value you have access to in a render as read-only.

// To actually trigger a re-render in this case, create a new object 
// and pass it to the state setting function:

// onPointerMove={e => {
//   setPosition({
//     x: e.clientX,
//     y: e.clientY
//   });
// }}
// With setPosition, you’re telling React:

// Replace position with this new object
// And render this component again
// Notice how the red dot now follows your pointer when you touch or hover over the preview area:

// 문제는 이 코드에 있습니다.
// onPointerMove={e => {
// position.x = e.clientX;
// position.y = e.clientY;
// }}
// 이 코드는 이전 렌더링에서 위치에 할당된 개체를 수정합니다.
// 하지만 상태 설정 기능을 사용하지 않으면 React는 객체가 변경된 것을 알 수 없습니다.
// 따라서 React는 응답으로 아무 것도 하지 않습니다. 순서를 바꾸려는 것과 같습니다.
// 이미 식사를 마친 후. 상태 변경이 경우에 따라 작동할 수 있지만
// 권장하지 않습니다. 렌더링에서 액세스할 수 있는 상태 값을 읽기 전용으로 취급해야 합니다.

// 이 경우 실제로 다시 렌더링을 트리거하려면 새 개체를 만듭니다.
// 상태 설정 함수에 전달합니다.

// onPointerMove={e => {
// 설정위치({
// x: e.clientX,
// y: e.clientY
// });
// }}
// setPosition을 사용하면 React에 다음과 같이 알릴 수 있습니다.

// 위치를 이 새 객체로 교체
// 그리고 이 컴포넌트를 다시 렌더링합니다.
// 미리 보기 영역을 터치하거나 가리키면 빨간색 점이 포인터를 어떻게 따라가는지 확인합니다.

import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
 		onPointerMove={e => {
   			setPosition({
 			x: e.clientX,
 			y: e.clientY
 		});
 	}}   
   style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}




