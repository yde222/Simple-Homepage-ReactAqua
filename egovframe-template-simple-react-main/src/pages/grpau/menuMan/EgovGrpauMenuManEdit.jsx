import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import Modal from './Modal44.js';
import styled from "styled-components";
//import Modal from './ModalBasic55';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovPaging from 'components/EgovPaging';

function EgovGrpauMenuManEdit(props) {
    console.log("------------------------------");
    console.log("EgovGrpauMenuManEdit [props] : ", props);
    // console.log("**************props********************"+props.defaultValue);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauMenuManEdit [location] : ", location);

    const menuNo = location.state?.menuNo || "";
    console.log("EgovGrpauMenuManEdit [menuNo] : ", menuNo);
 

    const [searchConditionEdit, setSearchConditionEdit] = useState(location.state?.searchCondition || { pageIndex: 1 });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    
    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({});

    const intMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/sym/mnu/mpm/EgovMenuRegistInsert.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/sym/mnu/mpm/EgovMenuDetailSelectUpdt.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {
//		retrieveDetailCom22Id();

        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setBoardDetail({ menuNo: "" });
            return;
        }

    	searchConditionEdit.searchKeyword = menuNo; //
        const retrieveDetailURL = '/sym/mnu/mpm/EgovMenuManageListDetailSelect.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
        	body: JSON.stringify(searchConditionEdit)
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setMasterBoard(resp.result.brdMstrVO);
                // 초기 boardDetail 설정 => ( 답글 / 수정 ) 모드일때...
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardDetail(resp.result.boardVO);
                }
                
                // 초기 setBoardAttachFiles 설정 => (수정) 모드 일때...
                //if (modeInfo.mode === CODE.MODE_MODIFY) {
                //    setBoardAttachFiles(resp.result.resultFiles);
                //}
            }
        );
    }

    const insertBoard = () => {
        const formData = new FormData();
        for (let key in boardDetail) {
            formData.append(key, boardDetail[key]);
            //console.log("boardDetail [%s] ", key, boardDetail[key]);
        }
        
        const requestOptions = {
            method: "POST",
            headers: {

            },
            body: formData
        }

        EgovNet.requestFetch(modeInfo.editURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    navigate({ pathname: URL.GRPAU_MEMU_MAN });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
    }

//modal관련
//   	const [modalOpen, setModalOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
//  const onClickButton = () => {
//    setIsOpen(true);
//  };
const AppWrap = styled.div`
  text-align: center;
  margin: 50px auto;
`;

//   	const handleClick = () => {
//    setIsOpen(true);
//	};
//   // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
//   const openModal = () => {
//     setModalOpen(true);
//   };
//	alert('handleClick');
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
	retrieveDetailCom22Id(searchCondition);

  };
  const closeModal = () => {
    setModalOpen(false);
  };


// //    	open({ onComplete: handleComplete }); 
// //	openModal();
//   		return (
//    <AppWrap>
//      {isOpen && (<Modal
//		open={isOpen}
//        onClose={() => {
//          setIsOpen(false);
//        }}
//      />)}
//    </AppWrap>
//   		);

//	};
    //modal data
  	const progrmFileNm = location.state?.progrmFileNm || "";
    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { pageIndex: 1, searchCondition: '0', searchKeyword: ''  });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [paginationInfo, setPaginationInfo] = useState({});
    const [listTag, setListTag] = useState([]);

//modal 선택
	const jusoDelDetail = (progrmFileNm) => {
		//alert('jusoDelDetail ' + progrmFileNm);//EgovAuthorInsert
        //setBoardDetail.progrmFileNm(progrmFileNm);//setBoardDetail.progrmFileNm is not a function
        boardDetail.progrmFileNm = progrmFileNm;

        document.getElementById('progrmFileNm').value = progrmFileNm;
//		boardDetail.progrmFileNm = progrmFileNm;
		//alert('boardDetail ' + boardDetail.progrmFileNm);// EgovAuthorInsert
	    setModalOpen(false);
	}

    const retrieveDetailCom22Id = (searchCondition) => {

		searchCondition.progrmFileNm = progrmFileNm;
		//    window.open("<c:url value='/sym/prm/EgovProgramListSearch.do'/>",'','width=800,height=600');
        const retrieveDetailURL = '/sym/prm/EgovProgramListSearch.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
//            body: JSON.stringify({
//                authorCode : authorCode,
//            })
        }
         EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            (resp) => {

                setPaginationInfo(resp.result.paginationInfo);

                let mutListTag = [];
                mutListTag.push(<p className="no_data">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

                let resultCnt = resp.result.resultCnt * 1;
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                let pageSize = resp.result.paginationInfo.pageSize;

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                        console.log("--------listIdx---------"+listIdx);
                        console.log("--------resultCnt---------"+resultCnt);
                    mutListTag.push(
                        <div to={{pathname: URL.GRPAU_MEMU_MAN_DETAIL}} 
                        state={{
                            menuNo: item.menuNo
                        }} 
                        key={listIdx} className="list_item" >
                            <div>{item.progrmFileNm}</div>
                            <div>{item.progrmKoreanNm}</div>
                            <div><button className="btn btn_blue_h46" 
                                        onClick={() => jusoDelDetail(item.progrmFileNm)} >선택</button></div>
                        </div>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );
    }

	//retrieveDetailCom22Id();

    useEffect(function () {
        intMode();
        return function () {
        }
    }, []);

    // useEffect(function () {
    //     console.log("boardDetail, boardAttachFiles: useEffect");
    //     return function () {
    //     }
    // }, [boardDetail,boardAttachFiles]);

    console.groupEnd("EgovGrpauMenuManEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU_MEMU_MAN}>메뉴목록 관리</Link></li>
                        <li>메뉴목록등록</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents NOTICE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">그룹및 권한 등록</h1>
                        </div>

                        <h2 className="tit_2">메뉴목록 관리 {modeInfo.modeTitle}</h2>

                        <div className="board_view2">

                            <dl>
                                <dt>
                                    <label htmlFor="menuNo">메뉴번호<span className="req">필수</span></label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="menuNo" name="menuNo" type="text"
                                        defaultValue={boardDetail.menuNo}
                                        onChange={e => setBoardDetail({ ...boardDetail, menuNo: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="menuNo" name="menuNo" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.menuNo}
                                        onChange={e => setBoardDetail({ ...boardDetail, menuNo: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                                <dt>
                                    <label htmlFor="menuOrdr">메뉴순서<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="menuOrdr" name="menuOrdr" type="text"
                                        defaultValue={boardDetail.menuOrdr}
                                        onChange={e => setBoardDetail({ ...boardDetail, menuOrdr: e.target.value })}
                                        maxLength="10" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="menuOrdr" name="menuOrdr" type="text" 
                                        defaultValue={boardDetail.menuOrdr}
                                        onChange={e => setBoardDetail({ ...boardDetail, menuOrdr: e.target.value })}
                                        maxLength="10" />
                                }                                       
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="menuNm">메뉴명<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="menuNm" name="menuNm" type="text"
                                        defaultValue={boardDetail.menuNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, menuNm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                                <dt>
                                    <label htmlFor="upperMenuId">상위메뉴번호<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="upperMenuId" name="upperMenuId" type="text"
                                        defaultValue={boardDetail.upperMenuId}
                                        onChange={e => setBoardDetail({ ...boardDetail, upperMenuId: e.target.value })}
                                        maxLength="10" />
                                        
                                </dd>
                            </dl>

                            <dl>
                                <dt>
                                    <label htmlFor="progrmFileNm">프로그램파일명<span className="req">필수</span></label>
                                </dt>
                                <input className="f_input2 w_full" id="progrmFileNm" name="progrmFileNm" type="text"
                                        defaultValue={boardDetail.progrmFileNm} 
                                        onChange={e => setBoardDetail({ ...boardDetail, progrmFileNm: e.target.value })}
                                        maxLength="60" />
		                        <div to={{pathname: URL.GRPAU_MEMU_MAN_MODAL}} 
        		                		state={{
                		            		progrmFileNm: boardDetail.progrmFileNm,
	                    		    	}} 
 									> 
    <React.Fragment>
										<button className="btn btn_skyblue_h46 w_100" type="button"
                                        	onClick={ openModal}>조회</button>
      {/* header 부분에 텍스트를 입력한다. */}
      {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
      <Modal open={modalOpen} close={closeModal} header={menuNo}>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="sel1">
                                        <select id="sel1" name="sel1" title="조건"
										onChange={(e) => setSearchCondition({ ...searchCondition, searchCondition: e.target.value })}
                                        >
                                            <option value="1">프로그램명</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="f_search w_500">
                                        <input type="text" name="" defaultValue={searchCondition && searchCondition.searchKeyword} placeholder=""
                                            onChange={(e) => setSearchCondition({ ...searchCondition, searchKeyword: e.target.value })}
                                        />
                                        <button type="button"
                                            onClick={() => retrieveDetailCom22Id(searchCondition)}>조회</button>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 test--> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list">
                            <div className="head">
                                <span>프로그램파일명</span>
                                <span>프로그램명</span>
                                <span>선택</span>
                            </div>
                            <div className="result">
                                <span>{listTag}</span>
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}
                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <EgovPaging pagination={paginationInfo} moveToPage={passedPage => {
                                retrieveDetailCom22Id({ ...searchCondition, pageIndex: passedPage })
                            }} />
                            {/* <!--/ Paging --> */}
                        </div>
      </Modal>
    </React.Fragment>

            	            	</div>
                            </dl>

                            <dl>
                                <dt>
                                    <label htmlFor="relateImageNm">관련이미지명</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="relateImageNm" name="relateImageNm" type="text"
                                        defaultValue={boardDetail.relateImageNm} 
                                        onChange={e => setBoardDetail({ ...boardDetail, relateImageNm: e.target.value })}
                                        maxLength="30" />
                                </dd>
                                <dt>
                                    <label htmlFor="relateImagePath">관련이미지경로</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="relateImagePath" name="relateImagePath" type="text"
                                        defaultValue={boardDetail.relateImagePath} 
                                        onChange={e => setBoardDetail({ ...boardDetail, relateImagePath: e.target.value })}
                                        maxLength="30" />
                                </dd>
                            </dl>

                            <dl>
                                <dt>
                                    <label htmlFor="menuDc">메뉴설명</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="menuDc" name="menuDc" type="text"
                                        defaultValue={boardDetail.menuDc} 
                                        onChange={e => setBoardDetail({ ...boardDetail, menuDc: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                            
                                <div className="left_col btn1">
                                    <a href="" className="btn btn_skyblue_h46 w_100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            insertBoard();
                                        }}>저장</a>
                                </div>
                                     
                                <div className="right_col btn1">
                                <Link to={{
                                        pathname: URL.GRPAU_MEMU_MAN,
                                        state: {
                                        }
                                    }} className="btn btn_blue_h46 w_100">목록</Link>                                
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EgovGrpauMenuManEdit;