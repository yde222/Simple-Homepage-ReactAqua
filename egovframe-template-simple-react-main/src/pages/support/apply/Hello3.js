import React from 'react';

function Hello3({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      { isSpecial && <b>*</b> }
      안녕하세요!! {name}
    </div>
  );
}

Hello3.defaultProps = {
  name: '이름없음'
}

export default Hello3;