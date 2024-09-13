//https://peter-coding.tistory.com/223
//[React] Reducer를 통해 state 관리하기

import React, { useReducer, useState } from "react";
//# payload ; 사용에 있어서 전송되는 데이터
//# reducer ; state를 업데이트 하는 역할 / state ; reducer가 불리는 시점의 data값이 들어감 / action ; 요구의 내용
//# 여기서 money ; reducer에서 return된 값이 들어갈 곳 / dispatch ; state 업데이트를 위한 요구
const reducer = (state, action) => {
  console.log("reduer가 일을 합니다!", state, action);
  switch (action.type) {
    case "DEPOSIT":
      return state + action.payload;
    case "WITHDRAW":
      return state - action.payload;
    default:
      return state;
  }
};

const Test = () => {
  const [money, dispatch] = useReducer(reducer, 0);
  const [number, setNumber] = useState(0);

  return (
    <div style={{ fontSize: "30px" }}>
      <h2>useReducer 은행에 오신것을 환영합니다.</h2>
      <p>잔고: {money}원</p>
      <input
        type="number"
        value={number}
        onChange={(e) => {
          setNumber(parseInt(e.target.value));
        }}
        step="1000"
      />
      <button
        onClick={() => {
          dispatch({ type: "DEPOSIT", payload: number });
        }}
      >
        예금
      </button>
      <button
        onClick={() => {
          dispatch({ type: "WITHDRAW", payload: number });
        }}
      >
        출금
      </button>
    </div>
  );
};

export default Test;