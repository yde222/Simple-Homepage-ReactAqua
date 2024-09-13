import React from 'react';
import Hello from './Hello';
import './app1.css';



function App() {
  const name = 'react  study: https://react.vlpt.us/basic/04-jsx.html  ';
	const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }
  return (
    <>
 {/* 주석은 화면에 보이지 않습니다 */}
      <Hello 
        // 열리는 태그 내부에서는 이렇게 주석을 작성 할 수 있습니다.
      />
      <div style={style}>{name}</div>
      <div className="gray-box"></div>   
	 </>
  );
}

/* 주석입니다. 주석은 주석입니다. 백인홍*/
export default App;