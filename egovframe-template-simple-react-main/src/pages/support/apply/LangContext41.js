import { createContext } from "react";

//https://www.daleseo.com/react-context/
//전역 데이터를 관리하기 위해서 React 패키지에서 제공하는 createContext라는 함수를 사용합니다. 
//개념적으로 React Context는 전역 데이터를 담고 있는 하나의 저장 공간이라고 생각할 수 있습니다.
const LangContext41 = createContext("en");

export default LangContext41;