import React , { useState } from 'react';
//<label> 요소로 <input> 요소와 children prop 모두 감싸주겠습니다.
function Checkbox35({ children, disabled, checked, onChange }) {
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
export default Checkbox35;