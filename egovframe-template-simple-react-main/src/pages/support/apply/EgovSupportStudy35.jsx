//https://www.daleseo.com/react-checkboxes/

//checkbox
//React의 useState() 훅(hook) 함수로 service와 marketing 상태를 만든 후에, 
//서비스 이용약관과 마케팅 수신을 나타내는 두 개의 <Checkbox/> 컴포넌트에 
//checked와 onChange prop을 통해서 연결해주겠습니다.
import React from 'react';
import Checkbox35 from './Checkbox35';


function App() {
  const [service, setService] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);
  return (
    <article>
      <header>
        <h3>체크박스</h3>
      </header>
      <Checkbox35 checked={service} onChange={setService}>
        (필수) 서비스 이용약관
      </Checkbox35>
      <Checkbox35 checked={marketing} onChange={setMarketing}>
        (선택) 마케팅 수신
      </Checkbox35>
      <footer>
        <button disabled={!service}>회원 가입</button>
      </footer>
    </article>
  );
}

export default App;