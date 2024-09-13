import React from 'react';
import InputSample7 from './InputSample7';
//import Wrapper from './Wrapper';

function App() {
	// https://react.vlpt.us/basic/10-useRef.html
	//리액트를 사용하는 프로젝트에서도 가끔씩 DOM 을 직접 선택해야 하는 상황이 발생 할 때도 있습니다. 
	
  return (
    <>
 {/*  true false에 따라 표시내용이 다름. 주석은 화면에 보이지 않습니다 */}
      <InputSample7 
        // 열리는 태그 내부에서는 이렇게 주석을 작성 할 수 있습니다.
      />
      </>
  );
}

export default App;