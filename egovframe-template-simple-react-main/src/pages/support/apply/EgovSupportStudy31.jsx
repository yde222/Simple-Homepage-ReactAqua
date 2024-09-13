import React, {useRef, useState} from 'react';
import styled from "styled-components";
//react에서-select-box-컴포넌트-만들기
//styled-components 라이브러리와, typescript를 함께 사용하기 위한 라이브러리를 아래 명령어로 설치해줍니다. 
// npm install --save styled-components 
// npm install --save-dev babel-plugin-styled-components @types/styled-components 
// @types/styled-components-react-native
// https://jiny-dongle.tistory.com/13
//https://blog.toycrane.xyz/react%EC%97%90%EC%84%9C-select-box-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-a20e2bf082b2
const OPTIONS = [
	{ value: "apple", name: "사과" },
	{ value: "banana", name: "바나나" },
	{ value: "orange", name: "오렌지" },
];

const SelectBoxWrapper = styled.div`
	display: flex;
`;

export const Select = styled.select`
	margin: 0;
	min-width: 0;
	display: block;
	width: 100%;
	padding: 8px 8px;
	font-size: inherit;
	line-height: inherit;
	border: 1px solid;
	border-radius: 4px;
	color: inherit;
	background-color: transparent;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	&:focus {
		border-color: red;
	}
`;

const IconSVG = styled.svg`
	margin-left: -28px;
	align-self: center;
	width: 24px;
	height: 24px;
`;

const SelectBox = (props) => {
	const handleChange = (e) => {
		// event handler
		console.log(e.target.value);
	};

	return (
		<SelectBoxWrapper>
			<Select onChange={handleChange}>
				{props.options.map((option) => (
					<option
						key={option.value}
						value={option.value}
						defaultValue={props.defaultValue === option.value}
					>
						{option.name}
					</option>
				))}
			</Select>
			<IconSVG
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M10 14L16 6H4L10 14Z"
					fill="#1A1A1A"
				/>
			</IconSVG>
		</SelectBoxWrapper>
	);
};

function App() {
	return <SelectBox options={OPTIONS} defaultValue="banana"></SelectBox>;
}

export default App;
