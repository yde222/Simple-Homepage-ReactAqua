import React from "react";
import LangContext from "./LangContext41";

//https://www.daleseo.com/react-context/
//먼저 Provider와 대응하는 Consumer를 이용하여 Context에 저장되어 있는 전역 데이터에 
//접근할 수 있습니다. Consumer는 render props을 받기 때문에, 
//Title 컴포넌트는 children으로 넘기는 함수의 인자로 사용자 언어 설정값을 읽습니다.
function Title41() {
  return (
    <LangContext.Consumer>
      {(lang) => {
        const text = lang === "en" ? "Context" : "컨텍스트";
        return <h1>{text}</h1>;
      }}
    </LangContext.Consumer>
  );
}
export default Title41;