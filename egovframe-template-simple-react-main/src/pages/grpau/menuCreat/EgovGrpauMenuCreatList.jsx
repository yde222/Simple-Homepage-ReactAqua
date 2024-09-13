import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import Modal from './Modal44.js';
import CheckboxTree from 'react-checkbox-tree';

import { empires as nodes } from './menuCreatData';
import CODE from 'constants/code';


import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovPaging from 'components/EgovPaging';

function EgovGrpauMenuCreatList(props) {
    console.group("EgovGrpauMenuCreatList");
    console.log("[Start] EgovGrpauMenuCreatList ------------------------------");
    console.log("EgovGrpauMenuCreatList [props] : ", props);
	const navigate = useNavigate();
    const location = useLocation();
//    console.log("EgovAdminNoticeList [history] : ", history);

//    const bbsId = NOTICE_BLDN_ID;
    let searchCnd = '0';
    let searchWrd = '';

    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { pageIndex: 1, searchCondition: '0', searchKeyword: ''});// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [searchConditionModal, setSearchConditionModal] = useState(location.state?.searchCondition || { pageIndex: 1, searchCondition: '0', searchKeyword: ''});// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [masterBoard, setMasterBoard] = useState({});
    const [BoardDetail, setBoardDetail] = useState({});
    const [user, setUser] = useState({});
    const [groupSort, setGroupSort] = useState({});
    const [groupCode, setGroupCode] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});

	//모달에 넘길 파라메터
    const authorCode = '';

	//chkbox
    //const [checkedList, setCheckedList] = useState([]);
    //const [isChecked, setIsChecked] = useState(true);
        
    // const checkedItemHandler = (value, isChecked) => {
    //     if(isChecked) {
    //         setCheckedList(
    //             (prev) => [...prev, value]
    //         );
    //         return;
    //     }

    // 	if(!isChecked && checkedList.includes(value)) {
    //     	setCheckedList(checkedList.filter((item) => item !== value));
    //     	return;
    // 	}
    // 	return;
	// };
    // const checkHandler = (e, value) => {
    //     setIsChecked(!isChecked);
    //     checkedItemHandler(value, e.target.checked);
    // };

    const [listTag, setListTag] = useState([]);

	//checkbox-tree
	const [checked, setChecked] = useState([
//        'userInsert',
//        'userGroup',
//       'userAuthority',
//        'menuMan',
	    ]);
    const [expanded, setExpanded] = useState([
//        'grapu',
//        'user',
//        'userAuthor',
//        'menu',
        '6000000',
        '6010000',
        '6020000',
        '6030000',
    	]);
	//일단 menuMan 형식 맞추기, 
    const retrieveDetailCom22Id = (searchCondition) => {

//		alert('retrieveDetailCom22Id');


	}
	
//복수건 추가
const multiIns = (checkedList) => {
    const formData = new FormData();
    //document.menuCreatManageForm.action = "<c:url value='/sym/mnu/mcm/EgovMenuCreatInsert.do'/>";
    const createBoardURL = "/sym/mnu/mcm/EgovMenuCreatInsert.do";

    var tmpList="";
    //checkedList && checkedList.map((checked) => tmpList = tmpList + checked.props.state.menuNo + ",");
    checkedList && checkedList.map((checked) => tmpList = tmpList + checked + ",");
    //alert("담긴 checkedList[0] -->"+JSON.stringify(checkedList[0]));
    //alert("담긴 checkedList -->"+JSON.stringify(checkedList));
	//담긴 checkedList -->["6010100","6010200"]
    if(formConfirm(formData)) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            authorCode: searchConditionModal.searchKeyword,
            checkedList: tmpList
        })
    }
//    alert(groupCode);

    EgovNet.requestFetch(createBoardURL,
        requestOptions,
        (resp) => {
            console.log("====>>> 데이터 추가 확인 = ", resp);
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("선택된 데이터가 생성되었습니다.")
                    navigate(URL.GRPAU_MEMU_CREAT,   
                        {state: {
                    }
                });
//                setCheckedList([]);
                retrieveList(searchCondition);
            } else {
                alert("ERR : " + resp.resultMessage);
            }
        }
    );
    }
}
const formConfirm = () => {
if (window.confirm("생성하시겠습니까?")) {
    return true;
}else {
    return false;
    
    }
}

	
  	const [modalOpen, setModalOpen] = useState(false);
  	const openModal = (code) => {
    	setModalOpen(true);
		searchConditionModal.searchKeyword = code;
//		alert('authorCode'+searchConditionModal.searchKeyword);
//		retrieveDetailCom22Id(searchCondition);

  	};
  	const closeModal = () => {
    	setModalOpen(false);
  	};
	
    	const onCheck = (value) => {
        	setChecked(value);
    	};

    	const onExpand = (value) => {
        	setExpanded(value);
    	};
    const retrieveList = useCallback( (searchCondition) => {
        console.groupCollapsed("EgovGrpauMenuCreatList.retrieveList()");


        const retrieveListURL = '/sym/mnu/mcm/EgovMenuCreatManageSelect.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
//                setMasterBoard(resp.result.brdMstrVO);
//				setBoardDetail(resp.result.groupManageVO);
                setPaginationInfo(resp.result.paginationInfo);
                setUser(resp.result.user);

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
					var tmpYeoBu;
                        if(item.chkYeoBu===0){
							tmpYeoBu = 'N';
						}else{
							tmpYeoBu = 'Y';
						}
					
                    mutListTag.push(
                        <div to={{pathname: URL.GRPAU_USER_GROUP_DETAIL}} 
                        state={{
                            groupId: item.groupId
                        }} 
                        key={listIdx} className="list_item" >
                            <div>{item.authorCode}</div>
                            <div>{item.authorNm}</div>
                            <div>{item.authorDc}</div>
                            <div>{tmpYeoBu}</div>
                        	<div to={{pathname: URL.GRPAU_MEMU_CREAT_MODAL}} 
                        		state={{
                            		authorCode: item.authorCode,
	                        	}} 
 							> 
                 
										<button className="btn btn_skyblue_h46 w_100" type="button"
                                        	onClick={() => openModal(item.authorCode)}>메뉴생성</button>
                            
            	            </div>
                        </div>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovGrpauMenuCreatList.retrieveList()");
    },[]);


useEffect(function() {
    retrieveList(searchCondition);
    // eslint-disable-next-line react-hooks/exhaustive-deps

}, [props]);


    console.log("------------------------------EgovGrpauMenuCreatList [End]");
    console.groupEnd("EgovGrpauMenuCreatList");

	// const onSubmit = useCallback(
    //     (e) => {
    //         e.preventDefault();

    //         console.log('checkedList:', checkedList);
    //     },
    //     [checkedList]
    // );

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>메뉴생성 관리</li>
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
                            <h1 className="tit_1">그룹및권한 관리</h1>
                        </div>
                        
                        {/* <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2> */}
                        <h2 className="tit_2">메뉴생성 관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="sel1">
                                        <select id="sel1" name="sel1" title="조건"
										onChange={(e) => setSearchCondition({ ...searchCondition, searchCondition: e.target.value })}
                                        >
                                            <option value="1">보안설정대상 ID</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="f_search w_500">
                                        <input type="text" name="" defaultValue={searchCondition && searchCondition.searchKeyword} placeholder=""
                                            onChange={(e) => setSearchCondition({ ...searchCondition, searchKeyword: e.target.value })}
                                        />
                                        <button type="button"
                                            onClick={() => retrieveList(searchCondition)}>조회</button>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 test--> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list">
                            <div className="head">
                                <span>권한코드</span>
                                <span>권한명</span>
                                <span>권한설명</span>
                                <span>메뉴생성여부</span>
                                <span>메뉴생성</span>
                            </div>
                            <div className="result">
                                <span>{listTag}</span>
                            </div>
                        </div>
    <React.Fragment>
      {/* header 부분에 텍스트를 입력한다. */}
      {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
      <Modal open={modalOpen} close={closeModal} header={"메뉴생성"}>
                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="sel1">
                                        <select id="sel1" name="sel1" title="조건"
										onChange={(e) => setSearchConditionModal({ ...searchConditionModal, searchConditionModal: e.target.value })}
                                        >
                                            <option value="1">코드</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="f_search w_500">
                                        <input type="text" name="" defaultValue={searchCondition && searchConditionModal.searchKeyword}  readOnly="readOnly" placeholder=""
                                            onChange={(e) => setSearchConditionModal({ ...searchConditionModal, searchKeyword: e.target.value })}
                                        />
                                        <button type="button"
                                            onClick={() => retrieveDetailCom22Id(searchCondition)}>조회</button>
                                    </span>
                                </li>
								<li>
                                    <div><button className="btn btn_blue_h46 pd35" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                multiIns(checked)} 
                                            } >생성</button>
                                    </div>   
                                 </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 test--> */}
        <CheckboxTree
            checked={checked}
            expanded={expanded}
            nodes={nodes}
            onlyLeafCheckboxes
            onCheck={onCheck}
            onExpand={onExpand}
        />

      </Modal>
    </React.Fragment>
                        {/* <!--// 게시판목록 --> */}

                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <EgovPaging pagination={paginationInfo} moveToPage={passedPage => {
                                retrieveList({ ...searchCondition, pageIndex: passedPage })
                            }} />
                            {/* <!--/ Paging --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovGrpauMenuCreatList;