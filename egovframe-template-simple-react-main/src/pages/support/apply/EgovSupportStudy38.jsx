//https://www.daleseo.com/react-checkboxes/
//공부35의 보완

//checkbox38
import React from 'react';
import Checkbox38 from './Checkbox38';
import CheckboxGroup38 from "./CheckboxGroup38";

function App() {
  const [colors, setColors] = React.useState(["green"]);
  return (
    <article>
      <header>
        <h3>체크박스 그룹</h3>
      </header>
      <CheckboxGroup38
        label="좋아하는 색깔은?"
        values={colors}
        onChange={setColors}
      >
        <Checkbox38 value="red">빨강</Checkbox38>
        <Checkbox38 value="yellow">노랑</Checkbox38>
        <Checkbox38 value="green">초록</Checkbox38>
        <Checkbox38 value="blue">파랑</Checkbox38>
        <Checkbox38 value="violet" disabled>
          보라
        </Checkbox38>
      </CheckboxGroup38>
      <footer>[{colors.join(",")}]을 좋아하시군요!</footer>
    </article>
  );
}

export default App;