import React from 'react';
import Hello3 from './Hello3';
import Wrapper from './Wrapper';

function App() {
  //const name = 'react  study: https://react.vlpt.us/basic/06-conditional-rendering.html  ';
  return (
    <Wrapper>
      <Hello3 
        // 열리는 태그 내부에서는 이렇게 주석을 작성 할 수 있습니다.
		name="kim"  color="red" isSpecial={true}
      />
      <Hello3 color="pink" />
    </Wrapper>
  );
}

export default App;