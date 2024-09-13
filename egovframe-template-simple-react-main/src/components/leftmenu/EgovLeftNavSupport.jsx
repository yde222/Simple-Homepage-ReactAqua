import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavSupport() {
    return (
        <div className="nav">
            <div className="inner">
                <h2>낙수(落水)가 바위를 뚫는다.</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.SUPPORT_DOWNLOAD} className={({ isActive }) => (isActive ? "cur" : "")}>자료실</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_QNA} className={({ isActive }) => (isActive ? "cur" : "")}>묻고답하기</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_APPLY} className={({ isActive }) => (isActive ? "cur" : "")}>서비스신청</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY1} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부1:style설정</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY2} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부2:props설정</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY3} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부3:조건부 렌더링</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY4} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부4:useState Hook</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY5} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부5:input 상태</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY6} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부6:여러개 input 상태</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY7} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부7:useRef로 특정 DOM</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY8} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부8:배열 렌더링</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY9} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부9:배열에 항목 추가하기</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY10} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부10:배열에 항목 제거하기</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY11} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부11:배열에 항목 수정하기</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY12} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부12:useEffect를 사용하여 마운트/언마운트/</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY13} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부13:useMemo 를 사용하여 연산한 값 재사용</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY14} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부14:useCallback 을 사용하여 함수 재사용하기</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY15} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부15:React.memo 를 사용한 컴포넌트 리렌더링 방지</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY21} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부21::백인홍(배열에 항목 수정하기.)</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY22} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부22::백인홍(Header, 메인, Footer로 간단하게 레이아웃을 나눠보자.)</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY23} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부23::백인홍(react-select 배열출력.)</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY31} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부31:react에서-select-box-컴포넌트-만들기</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY32} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부32:(코딩중)시간 option 만들기 - 시(hour)</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY33} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부33:(코딩중)Select의 defaultValue 를 state를 이용하여 동적 변경 시키기.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY34} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부34:Select의 배열(복수건).</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY35} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부35:checkBox.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY36} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부36:multi check 계산.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY37} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부37:radio button.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY38} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부38: checkBox group.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY39} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부39: react-select(handler 검색).</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY40} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부40: checkbox control.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY41} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부41: contextType Context.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY42} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부42: selected sample.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY43} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부43: useEffect sample.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY44} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부44: modal sample.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY45} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부45: scroll sample.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY46} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부46: Reducer sample.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY47} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부47: (코딩중)parent child component sample.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY48} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부48: hierarchy tree sample.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY49} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부49: (코딩중)StyledTreeExample .</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY50} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부50: 드롭다운 메뉴 만들기 .</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY51} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부51: checkbox-tree 만들기 .</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY52} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부52: HiddenCheckboxesExample .</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY53} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부53: CheckboxesExample makeLargeDataSet.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY54} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부54: (코딩중)모달창(Modal) 초간단 구현 방법.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY55} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부55: Portal을 사용한 모달창 만들기.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY56} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부56: setState가 잘못된 값을 주는 이유.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY57} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부57: 56번개선,,,3. setState의 updater 인자에 함수 사용.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY58} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부58: "send"를 누르면 setIsSent(true)가 React에게 UI를 다시 렌더링하도록 지시.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY59} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부59: "+3" 버튼을 클릭하면 setNumber(숫자 + 1)을 세 번 호출.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY60} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부60: 시간 경과에 따른 상태 alert.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY61} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부61: 시간 경과에 따른 상태 message.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY62} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부62: 신호등 구현 message.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY63} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부63: setNumber(숫자 + 1).</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY64} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부64: setNumber(숫자 + 5).</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY65} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부65: setNumber(42).</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY66} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부66: setPending().</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY67} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부67: getFinalState 함수.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY68} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부68: current pointer position.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY69} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부69: objects with the spread syntax.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY70} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부70: with a single event handler(값은 69와 동일).</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY71} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부71: Updating a nested object.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY72} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부72: from 'use-immer'.</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY73} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부73: 다국어 선택 </NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY74} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부74: 4명챗룸  </NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY75} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부75: useEffect 개념  </NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY76} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부76: Component 사용법  </NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY77} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부77: prop-types 사용법  </NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY78} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부78: 새로운 글을 업로드  </NavLink></li>
                    <li><NavLink to={URL.SUPPORT_STUDY79} className={({ isActive }) => (isActive ? "cur" : "")}>리액트공부79: map 처리  </NavLink></li>
               </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavSupport;