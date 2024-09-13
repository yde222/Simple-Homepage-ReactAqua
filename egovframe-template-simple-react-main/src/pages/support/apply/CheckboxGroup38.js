import React from "react";
import CheckboxContext38 from "./CheckboxContext38";
//우선 label prop으로 해당 체크박스 그룹의 목적을 텍스트로 받아서 
//HTML의 <legend> 요소를 이용하여 표시해주겠습니다. 
//그리고 HTML의 <fieldset> 요소를 이용하여 
//children prop으로 넘어온 모든 체크박스들을 묶어주겠습니다.

function CheckboxGroup38({
  label,
  children,
  disabled: groupDisabled,
  values,
  onChange
}) {
  const isDisabled = (disabled) => disabled || groupDisabled;

  const isChecked = (value) => values.includes(value);

  const toggleValue = ({ checked, value }) => {
    if (checked) {
      onChange(values.concat(value));
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <fieldset>
      <legend>{label}</legend>
      <CheckboxContext38.Provider value={{ isDisabled, isChecked, toggleValue }}>
        {children}
      </CheckboxContext38.Provider>
    </fieldset>
  );
}
export default CheckboxGroup38;