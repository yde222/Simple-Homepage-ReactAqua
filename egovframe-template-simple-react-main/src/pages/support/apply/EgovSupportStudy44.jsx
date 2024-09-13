//https://phrygia.github.io/react/2021-09-21-react-modal/
// modal


import React, { useState } from 'react';
import Modal from './Modal44.js';

function App() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={openModal}>모달팝업</button>
      {/* header 부분에 텍스트를 입력한다. */}
      {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
      <Modal open={modalOpen} close={closeModal} header="Modal heading">
        팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요!
      </Modal>
    </React.Fragment>
  );
}

export default App;
