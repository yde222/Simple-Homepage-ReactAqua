//https://unit-15.tistory.com/71
//[React] prop-types 사용법
 import React from 'react';
import Test from './Test77'; // Test 컴포넌트를 불러옵니다.

function App() {
    return (
        <Test greeting="hello"  
              count="5" /> 
    );
}

export default App;