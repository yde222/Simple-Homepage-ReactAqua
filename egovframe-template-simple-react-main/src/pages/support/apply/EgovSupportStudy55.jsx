
//https://leego.tistory.com/entry/React-Portal%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%9C-%EB%AA%A8%EB%8B%AC%EC%B0%BD-%EB%A7%8C%EB%93%A4%EA%B8%B0
//[React] Portal을 사용한 모달창 만들기

import { useState } from "react";
import styled from "styled-components";
import Modal from './ModalBasic55';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const onClickButton = () => {
    setIsOpen(true);
  };

  return (
    <AppWrap>
      <Button onClick={onClickButton}>Click Me !</Button>
      {isOpen && (<Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />)}
    </AppWrap>
  );
}

const Button = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background-color: #fa9f98;
  border-radius: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #fac2be;
  }
`;

const AppWrap = styled.div`
  text-align: center;
  margin: 50px auto;
`;
export default App;