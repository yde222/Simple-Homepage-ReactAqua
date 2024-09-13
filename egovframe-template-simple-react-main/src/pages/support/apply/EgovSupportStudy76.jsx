//https://y00njaekim.github.io/react/Component/
//How to use ‘React Component’

//function Modal () 을 이용하여 Component 를 만들었다. 
//만들어진 Component 는 App () 안에서 html tag 와 같이 사용된다. 
//이 때 App() 을 부모 컴포넌트, Modal() 을 자식 컴포넌트 라고 한다.

//우선, 컴포넌트의 첫 글자는 대문자로 시작하자. 관습이다.

//다음으로, return() 안에 있는 html(jsx) 는 하나의 태그로 묶어야 한다.

import React, { useState } from 'react';

function App (){
  return (
    <div>
      HTML 잔뜩있는 곳
      ...
      <Modal></Modal>
    </div>
  )
}

function Modal(){
  return (
    <div >
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
