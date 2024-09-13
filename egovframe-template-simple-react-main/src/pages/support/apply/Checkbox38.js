import React from "react";
import CheckboxContext38 from "./CheckboxContext38";

function Checkbox38({ children, disabled, value, checked, onChange }) {
	//우선 React의 useContext() 훅(hook) 함수를 사용하여 
	//CheckboxContext를 읽어서 context 변수에 할당합니다. 
  const context = React.useContext(CheckboxContext38);

//여기서 해당 <Checkbox/> 컴포넌트가 <CheckboxGroup/> 컴포넌트 안에서 쓰이지 않았다면 
//context가 undefined가 되겠죠? 이것을 이용하면 <Checkbox/> 
//컴포넌트를 단독으로 쓰기 위해서 작성했던 코드가 계속해서 문제없이 동작하도록 별도의 분기문으로 빼줄 수 있습니다.
  if (!context) {
    return (
      <label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={({ target: { checked } }) => onChange(checked)}
        />
        {children}
      </label>
    );
  }

  const { isDisabled, isChecked, toggleValue } = context;
//반대로 context에 어떤 객체가 할당된 경우에는 해당 <Checkbox/> 컴포넌트가 <CheckboxGroup/> 
//컴포넌트 안에서 쓰였다는 의미가 됩니다. 따라서 CheckboxContext에 담겨진 isDisabled(),
// isChecked(), toggleValue() 함수를 
//각각 <input> 요소의 disabled, checked, onChange 속성에서 사용할 수 있겠습니다.
  return (
    <label>
      <input
        type="checkbox"
        disabled={isDisabled(disabled)}
        checked={isChecked(value)}
        onChange={({ target: { checked } }) => toggleValue({ checked, value })}
      />
      {children}
    </label>
  );
}
export default Checkbox38;