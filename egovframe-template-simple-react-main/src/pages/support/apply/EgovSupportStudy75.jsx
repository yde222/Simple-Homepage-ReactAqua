//https://y00njaekim.github.io/react/useEffect/
//https://y00njaekim.github.io/tags/#react
//[React] 리액트 useEffect 개념 및 사용 방법

import React, {useState, useEffect} from 'react';
//import './App.css';


function App() {
  return <Modal></Modal>;
}

//
//  }, [click]);
//없으면


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