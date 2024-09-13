//https://peter-coding.tistory.com/235

import React, { useState } from "react";
import Header from "../components2/Header";

const SignUpPrivacy = () => {
  const list = [
    {
      id: 0,
      index: "1",
      content:
        "네이버 이용약관, 개인정보 수집 및 이용, 위치기반서비스 이용약관(선택), 프로모션 정보 수신(선택)에 모두 동의합니다.",
    },
    { id: 1, index: "2", content: "네이버 이용약관 동의(필수)" },
    { id: 2, index: "3", content: "개인정보 수집 및 이용 동의(필수)" },
    { id: 3, index: "4", content: "위치기반서비스 이용약관 동의(선택)" },
    { id: 4, index: "5", content: "프로모션 정보 수신 동의(선택)" },
  ];

  const [checkedList, setCheckedList] = useState([]);
  const handleCheckbox = (checked, value) => {
    if (checked) {
      setCheckedList([...checkedList, value]);
    } else {
      setCheckedList(checkedList.filter((el) => el !== value));
    }
  };

  return (
    <div className="SignUpPrivacy">
      <Header />
      <section>
        {list.map((it) => {
          return (
            <label key={it.id}>
              <input
                type="checkbox"
                value={it.index}
                onChange={(e) => {
                  handleCheckbox(e.target.checked, e.target.value);
                }}
                checked={checkedList.includes(it.index) ? true : false}
              />
              {it.content}
            </label>
          );
        })}
      </section>
    </div>
  );
};

export default SignUpPrivacy;
