//https://m-kenomemo.com/react-form/
//radio button

import { useState } from "react";

const ContentArea = () => {
  // データ
  const items = ['아이템１', '아이템２', '아이템３', '그외'];

  // 選択した値を管理（初期値：ラジオ１）
  const [val, setVal] = useState('아이템１');

  // ラジオボタンの値がチェンジされた時
  const handleChange = (e) => {
    setVal(e.target.value);
	alert('setVal= '+ val);// old 상태
	alert('parameter= '+ e.target.value); //new 상태
  };

  return (
    <>
      <h2>라디오 보턴</h2>
      <p className="center">「그외」를 선택하면, 입력란이 표시됩니다.</p>
      <div className="container">
        {items.map((item) => {
          return (
            <div key={item}>
              <input
                id={item}
                type="radio"
                value={item}
                onChange={handleChange}
                checked={item === val}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          );
        })}

        <p>선택한 것은「{val}」입니다.</p>
        {val === '그외' && (
          <p>
            <input type="text" />
          </p>
        )}
      </div>
    </>
  );
};
export default ContentArea;
