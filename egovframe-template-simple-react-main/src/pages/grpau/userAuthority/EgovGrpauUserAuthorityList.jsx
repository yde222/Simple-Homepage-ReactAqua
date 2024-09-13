import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovPaging from 'components/EgovPaging';

function EgovGrpauUserAuthorityList(props) {  
    console.group("EgovGrpauUserAuthorityList");
    console.log("[Start] EgovGrpauUserAuthorityList ------------------------------");
    console.log("EgovGrpauUserAuthorityList [props] : ", props);
	const navigate = useNavigate();

    const location = useLocation();

    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || {pageIndex: 1 ,searchCnd: '0', searchKeyword: ''  });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [masterBoard, setMasterBoard] = useState({}); 
    const [boardDetail, setBoardDetail] = useState({});
    const [user, setUser] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({}); 
	//const tmpAuthorManageList = [{ authorCode: "ROLE_ADMIN", authorNm: "관리자" }, { authorCode: "ROLE_ANONYMOUS", authorNm: "오픈기능" }, { authorcode: "ROLE_USER_MEMBER", authorNm: "사용자" }];
	//const tmpAuthorManageList = [{ code: "ROLE_ADMIN", codeNm: "관리자" }, { code: "ROLE_ANONYMOUS", codeNm: "오픈기능" }, { code: "ROLE_USER_MEMBER", codeNm: "사용자" }];

	//chkbox
    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
        
    const checkedItemHandler = (value, isChecked) => {
        if(isChecked) {
            setCheckedList(
                (prev) => [...prev, value]
            );
            return;
        }

    	if(!isChecked && checkedList.includes(value)) {
        	setCheckedList(checkedList.filter((item) => item !== value));
        	return;
    	}
    	return;
	};
	
    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);
    };

    const [listTag, setListTag] = useState([]);

	//등록 파라메터
    //var tmpUserIdList=""; 
    const [tmpUserIdList, setTmpUserIdList] = useState({});
    const [tmpUniqIdList, setTmpUniqIdList] = useState({});
    //var tmpAuthorCodeList="";
    const [tmpAuthorCodeList, setTmpAuthorCodeList] = useState({});
    //var tmpMberTyCodeList="";
    const [tmpMberTyCodeList, setTmpMberTyCodeList] = useState({});
    const [tmpRegYnList, setTmpRegYnList] = useState({});


	//select(항목자체)
    const [tmpAuthorManageList, setTmpAuthorManageList] = useState([]);
	const [selectList0, setSelectList0] = useState();
	const [selectList1, setSelectList1] = useState();
	const [selectList2, setSelectList2] = useState();
	const [selectList3, setSelectList3] = useState();
	const [selectList4, setSelectList4] = useState();
	const [selectList5, setSelectList5] = useState();
	const [selectList6, setSelectList6] = useState();
	const [selectList7, setSelectList7] = useState();
	const [selectList8, setSelectList8] = useState();
	const [selectList9, setSelectList9] = useState();


    const retrieveList = useCallback( (searchCondition) => {
        console.log("--------retrieveList----retrieveDetailOrgnztId-----");

        const retrieveListURL = '/sec/rgm/EgovAuthorGroupList.do';
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
                console.log("--------resp.result.authorManageList---------"+resp.result.authorManageList);
                console.log("--------setTmpAuthorManageList---------"+JSON.stringify(tmpAuthorManageList));

				setMasterBoard(resp.result.brdMstrVO);
				setBoardDetail(resp.result.authorGroupVO);
                setPaginationInfo(resp.result.paginationInfo);
                setUser(resp.result.user);
	//등록 파라메터
    //tmpUserIdList=resp.result.checkedUserIdList; 
    setTmpUserIdList(resp.result.checkedUserIdList);
    setTmpUniqIdList(resp.result.checkedUniqIdList);
    setTmpAuthorCodeList(resp.result.checkedAuthorCodeList);
    setTmpMberTyCodeList(resp.result.checkedMberTyCodeList);
    setTmpRegYnList(resp.result.checkedRegYnList);
    
// 나중에 사용해야함,,,권한코드
        setTmpAuthorManageList(resp.result.authorManageList);

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
					// EgovAuthorGroupManage.jsp fncManageChecked
					// var selectAuthor = document.listForm.authorManageCombo;
					// 값이 없을 경우, 콤보의 첫번째 값을 셋   
					if(item.authorCode == null || item.authorCode == undefined){

//						if (index === 2 || index === 3) { 
//                       	alert("index " + index + " " +resp.result.authorManageList[0].code);
//						}
						item.authorCode = resp.result.authorManageList[0].code;
					}
//						if (index === 2 || index === 3) { 
//                        	alert("index  item.authorCode" + index + " " +item.authorCode);
//						}
					if (index === 0) 	setSelectList0({ ...selectList0, code: item.authorCode });
					if (index === 1) 	setSelectList1({ ...selectList1, code: item.authorCode });
					if (index === 2) 	setSelectList2({ ...selectList2, code: item.authorCode });
					if (index === 3) 	setSelectList3({ ...selectList3, code: item.authorCode });
					if (index === 4) 	setSelectList4({ ...selectList4, code: item.authorCode });
					if (index === 5) 	setSelectList5({ ...selectList5, code: item.authorCode });
					if (index === 6) 	setSelectList6({ ...selectList6, code: item.authorCode });
					if (index === 7) 	setSelectList7({ ...selectList7, code: item.authorCode });
					if (index === 8) 	setSelectList8({ ...selectList8, code: item.authorCode });
					if (index === 9) 	setSelectList9({ ...selectList9, code: item.authorCode });
                    

                    mutListTag.push(
                        <Link to={{pathname: URL.GRPAU_USER_AUTHORITY}} 
                        state={{
                            userId: item.userId,
                            userNm: item.userNm,
                            groupId: item.groupId
                        }} 
                        key={listIdx} className="list_item" >
                            <div>{item.userId}</div>
                            <div>{item.userNm}</div>
                            <div>{item.mberTyNm}</div>
                                <div>
                                    <label className="f_select" htmlFor="authorCode">
										{index === 0 &&
											<select
                                                id="authorCode"
                                                name="authorCode"
                                                title="권한유형선택"
                                                onChange={(e) => setSelectList0({ ...selectList0, code: e.target.value })}
                                                defaultValue={item.authorCode}
                                            >
                                                {resp.result.authorManageList.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
															{option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
										}
										{index === 1 &&
											<select
                                                id="authorCode"
                                                name="authorCode"
                                                title="권한유형선택"
                                                onChange={(e) => setSelectList1({ ...selectList1, code: e.target.value })}
                                                defaultValue={item.authorCode}
                                            >
                                                {resp.result.authorManageList.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
															{option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
										}
										{index === 2 &&
											<select
                                                id="authorCode"
                                                name="authorCode"
                                                title="권한유형선택"
                                                onChange={(e) => setSelectList2({ ...selectList2, code: e.target.value })}
                                                defaultValue={item.authorCode}
                                            >
                                                {resp.result.authorManageList.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
															{option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
										}
										{index === 3 &&
											<select
                                                id="authorCode"
                                                name="authorCode"
                                                title="권한유형선택"
                                                onChange={(e) => setSelectList3({ ...selectList3, code: e.target.value })}
                                                defaultValue={item.authorCode}
                                            >
                                                {resp.result.authorManageList.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
															{option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
										}
										{index === 4 &&
											<select
                                                id="authorCode"
                                                name="authorCode"
                                                title="권한유형선택"
                                                onChange={(e) => setSelectList4({ ...selectList4, code: e.target.value })}
                                                defaultValue={item.authorCode}
                                            >
                                                {resp.result.authorManageList.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
															{option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
										}
										{index === 5 &&
											<select
                                                id="authorCode"
                                                name="authorCode"
                                                title="권한유형선택"
                                                onChange={(e) => setSelectList5({ ...selectList5, code: e.target.value })}
                                                defaultValue={item.authorCode}
                                            >
                                                {resp.result.authorManageList.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
															{option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
										}
										{index === 6 &&
											<select
                                                id="authorCode"
                                                name="authorCode"
                                                title="권한유형선택"
                                                onChange={(e) => setSelectList6({ ...selectList6, code: e.target.value })}
                                                defaultValue={item.authorCode}
                                            >
                                                {resp.result.authorManageList.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
															{option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
										}
										{index === 7 &&
											<select
                                                id="authorCode"
                                                name="authorCode"
                                                title="권한유형선택"
                                                onChange={(e) => setSelectList7({ ...selectList7, code: e.target.value })}
                                                defaultValue={item.authorCode}
                                            >
                                                {resp.result.authorManageList.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
															{option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
										}
										{index === 8 &&
											<select
                                                id="authorCode"
                                                name="authorCode"
                                                title="권한유형선택"
                                                onChange={(e) => setSelectList8({ ...selectList8, code: e.target.value })}
                                                defaultValue={item.authorCode}
                                            >
                                                {resp.result.authorManageList.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
															{option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
										}
										{index === 9 &&
											<select
                                                id="authorCode"
                                                name="authorCode"
                                                title="권한유형선택"
                                                onChange={(e) => setSelectList9({ ...selectList9, code: e.target.value })}
                                                defaultValue={item.authorCode}
                                            >
                                                {resp.result.authorManageList.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
															{option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
										}
                                    </label>
                                </div>
                            <div>{item.regYn}</div>
                        </Link>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovGrpauUserAuthorityList.retrieveList()");
    },[]);


    //권한코드   
    const retrieveDetailOrgnztId = () => {

        console.log("setAuthorNmOptions111 : retrieveDetailOrgnztId");

        const retrieveDetailURL = '/sec/rgm/EgovUserInsertOrgView.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
//                userId : userId,
            })
        }
         EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
           function (resp) {


    console.log("setAuthorNmOptions222 : ", resp.result.authorManageList);
// 나중에 사용해야함 
        setTmpAuthorManageList(resp.result.authorManageList);
    console.log("setAuthorNmOptions333 : ", tmpAuthorManageList);

                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) { 
                    console.log("retrieveDetailOrgnztId 권한코드 습득");
 
				//일람표시
                retrieveList(searchCondition); 


                }

            }
        );
    }

	//삭제
	const mutiDel = (checkedList) => {
    const formData = new FormData();
    const deleteBoardURL = "/sec/rgm/EgovAuthorGroupDelete.do";

    var tmpList="";
    checkedList && checkedList.map((checked) => tmpList = tmpList + checked.props.state.userId + ",");
    
    if(formConfirm(formData)) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            checkedList: tmpList,
            checkedUserIdList: tmpUserIdList,
            checkedUniqIdList: tmpUniqIdList,
    })
    }

    EgovNet.requestFetch(deleteBoardURL,
        requestOptions,
        (resp) => {
            console.log("====>>> 권한 등록취소 확인 = ", resp);
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("선택된 권한이 등록취소 되었습니다.")
                    navigate(URL.GRPAU_USER_AUTHORITY,   
                        {state: {
                    }
                });
                setCheckedList([]);

				//retrieveDetailOrgnztId();
                retrieveList(searchCondition);
            } else {
                alert("ERR : " + resp.resultMessage);
            }
        }
	    );
	    }
	}
	const formConfirm = () => {
	if (window.confirm("등록취소 하시겠습니까?")) {
	    return true;
	}else {
	    return false;
	    
	    }
	}

	//등록
	const mutiIns = (checkedList) => {
        const formData = new FormData();
        const deleteBoardURL = "/sec/rgm/EgovAuthorGroupInsert.do";
    
        var tmpList="";
        checkedList && checkedList.map((checked) => tmpList = tmpList + checked.props.state.userId + ",");
//        alert("담긴 userId -->"+JSON.stringify(checkedList[0].props.state.userId));
//        alert("담긴 tmpAuthorManage몽땅 -->"+JSON.stringify(tmpAuthorManageList[0]));
//        alert("담긴 props -->"+JSON.stringify(checkedList[0].props));

        var tmpAuthorCodeParamList="";
if(selectList0 != null)
	tmpAuthorCodeParamList = tmpAuthorCodeParamList + JSON.stringify(selectList0.code) + ",";
if(selectList1 != null)
	tmpAuthorCodeParamList = tmpAuthorCodeParamList + JSON.stringify(selectList1.code) + ",";
if(selectList2 != null)
	tmpAuthorCodeParamList = tmpAuthorCodeParamList + JSON.stringify(selectList2.code) + ",";
if(selectList3 != null)
	tmpAuthorCodeParamList = tmpAuthorCodeParamList + JSON.stringify(selectList3.code) + ",";
if(selectList4 != null)
	tmpAuthorCodeParamList = tmpAuthorCodeParamList + JSON.stringify(selectList4.code) + ",";
if(selectList5 != null)
	tmpAuthorCodeParamList = tmpAuthorCodeParamList + JSON.stringify(selectList5.code) + ",";
if(selectList6 != null)
	tmpAuthorCodeParamList = tmpAuthorCodeParamList + JSON.stringify(selectList6.code) + ",";
if(selectList7 != null)
	tmpAuthorCodeParamList = tmpAuthorCodeParamList + JSON.stringify(selectList7.code) + ",";
if(selectList8 != null)
	tmpAuthorCodeParamList = tmpAuthorCodeParamList + JSON.stringify(selectList8.code) + ",";
if(selectList9 != null)
	tmpAuthorCodeParamList = tmpAuthorCodeParamList + JSON.stringify(selectList9.code) + ",";
       
        if(formInsConfirm(formData)) {
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                checkedList: tmpList,
	    		checkedUserIdList: tmpUserIdList,
	    		checkedUniqIdList: tmpUniqIdList,
				//tmpAuthorCodeList(list),,, 여기는 list값이 아니라, egovAuthorManageService.selectAuthorAllList(authorManageVO) 취득값을 파싱
                checkedAuthorCodeList: tmpAuthorCodeParamList,
                checkedMberTyCodeList: tmpMberTyCodeList,
                checkedRegYnList: tmpRegYnList,
            })
        }
    
        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> 권한 등록 확인 = ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                        alert("선택된 권한이 등록 되었습니다.")
                        navigate(URL.GRPAU_USER_AUTHORITY,   
                            {state: {
                        }
                    });
                    setCheckedList([]);
					//retrieveDetailOrgnztId();
                    retrieveList(searchCondition);
                } else {
                    alert("ERR : " + resp.resultMessage);
                }
            }
            );
            }
        }
        const formInsConfirm = () => {
        if (window.confirm("등록 하시겠습니까?")) {
            return true;
        }else {
            return false;
            
            }
        }

    useEffect(function () {
        retrieveList(searchCondition); 
    return function () {
        }
// 로그가 많이 나와,,, 체크가 안됨
//    }, [props, retrieveList(searchCondition)]);
    }, [props]);


    console.log("------------------------------EgovGrpauUserAuthorityList [End]");
    console.groupEnd("EgovGrpauUserAuthorityList");

	const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            console.log('checkedList:', checkedList);
        },
        [checkedList]
    );

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>사용자별 권한관리</li>
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
                        <h2 className="tit_2">사용자별권한관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="searchCnd">
                                        <select id="searchCnd" name="searchCnd" title="조건"
										onChange={(e) => setSearchCondition({ ...searchCondition, searchCnd: e.target.value })}
                                        >
                                            <option value="0">사용자 ID</option>
                                            <option value="1">사용자 명</option>
                                            <option value="2">그룹</option>
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
								<li>
                                    <div><button className="btn btn_blue_h46 w_100"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                mutiIns(checkedList)} 
                                            } >권한등록</button>
                                    </div>   
                                 </li>
								<li>
                                    <div><button className="btn btn_blue_h46 w_100"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                mutiDel(checkedList)} 
                                            } >등록취소</button>
                                    </div>   
                                 </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 test--> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list">
                            <div className="head">
                                <span>사용자 ID</span>
                                <span>사용자 명</span>
                                <span>사용자 유형</span>
                                <span>권한</span>
                                <span>등록 여부</span>
                            </div>
                            <div className='result'>
                             {/* 체크박스 부분 */}
                                <form onSubmit={onSubmit}>
                                    {listTag.map((item, idx) => ( 
                                        <div className='list_item' key={idx}>
                                        <input 
                                            type="checkbox" 
                                            id={item}
                                            checked={checkedList.includes(item)}
                                            onChange={(e) => {
                                                checkHandler(e, item);
                                            }}
                                        />
                                        <label htmlFor={item}>{item}</label>
                                    </div>
                                    ))}
                                </form>
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}

                        <div className="board_bot">
                            {/* <!-- Paging -->  */}
                            <EgovPaging pagination={paginationInfo} moveToPage={passedPage => {
								//retrieveDetailOrgnztId();  
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


export default EgovGrpauUserAuthorityList;