//https://velog.io/@sparrowscout/react-select-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
// npm i react-select
// yarn add react-select
//글쓰기 화면 구현에 드롭박스 여러개가 들어가면서, 그리고 그 속에 옵션들이 들어가면서 이거저거 찾다가 라이브러리를 찾았다.
//옵션 값 중에서 handler 검색도 걍 됨 ... 아무것도 추가 안했는데 ...

import React, { useState } from 'react';
import Select from "react-select"; //라이브러리 import

const Write = () => {
	const online = [
 	{ value: "online", label: "온라인" },
 	{ value: "offlone", label: "오프라인" }
	] //원래는 select 태그 안에 들어가는 애들을 배열로 만들어준다.

	const [selectOnline, setSelectOnline] = useState(online[0]);
//안에 들어가는 값을 받아야해서 state사용

	return(
		<Select options={online} //위에서 만든 배열을 select로 넣기
		onChange={setSelectOnline} //값이 바뀌면 setState되게
		defaultValue={online[0]} /> //사용자가 값을 선택하지 않아도 기본 값으로 '온라인'=={online[0]}이 값으로 들어갈 수 있게
	)
}
export default Write;
