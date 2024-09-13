import React, {useRef, useState} from 'react';
import styled from "styled-components";

//https://anerim.tistory.com/213
//npm i react-select

// 시간 option 만들기 - 시(hour)
let hour = [];
for (let i = 1; i < 25; i++) {
  let op = {};
  
  // 시간을 00시로 나타내기 위해
  op.value = ('0' + i).slice(-2);
  op.label = ('0' + i).slice(-2) + '시';
  
  hour.push(op);
}

const MakeSelect = () => {
	const [timeValue, setTimeValue] = useState('');

//	return (
	
                                <label htmlFor="passwordHint">비밀번호 힌트<span className="req">필수</span>
                                            <select
                                                onChange={(e) => setTimeValue({ ...timeValue, passwordHint: e.target.value })}
                                            >
								                options={hour}
                                            </select>
                                        </label>

//    )
}

export default MakeSelect;
