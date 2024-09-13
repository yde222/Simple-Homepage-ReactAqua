//https://wazacs.tistory.com/31

//Selected 는 선택된 option이 들어갑니다. 
//onChange는 선택된 option의 value 값을 e.target.value 로 받은 후, 
//Selected 에 setState 시켜줍니다. 
//만약 처음부터 grape가 선택 된 채로 설정 하고 싶다면 Selected 부분에 
//default 값을 넣어주면 됩니다. 

import React, { useState } from "react";
export default function App() {
  const selectList = ["apple", "banana", "grape", "orange"];
  const [Selected, setSelected] = useState("grape");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className="App">
      <h1>Select in React</h1>
      <div>
        <select onChange={handleSelect} value={Selected}>
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <hr />
        <p>
          Selected: <b>{Selected}</b>
        </p>
      </div>
    </div>
  );
}
