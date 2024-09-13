import React, { useContext } from "react";
import LangContext from "./LangContext41";

//https://www.daleseo.com/react-context/
//React Hooks에서 추가된 useContext 함수를 이용하면 좀 더 깔끔하게 Context에 
//저장되어 있는 전역 데이터에 접근할 수 있습니다. Button 컴포넌트는 useContext 함수에 
//LangContext를 넘김으로써 사용자 언어 설정값을 읽습니다. 
function Button41({ toggleLang }) {
  const lang = useContext(LangContext);
  return <button onClick={toggleLang}>{lang}</button>;
}
export default Button41;