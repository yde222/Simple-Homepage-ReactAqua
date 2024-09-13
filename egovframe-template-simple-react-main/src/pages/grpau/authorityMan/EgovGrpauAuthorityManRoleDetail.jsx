import React, { useState, useEffect, useCallback } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovPaging from 'components/EgovPaging';

function EgovGrpauAuthorityManRoleDetail(props) {
    console.log("EgovGrpauAuthorityManRoleDetail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauAuthorityManRoleDetail [location] : ", location);

    const authorCode = location.state.authorCode;
    console.log("EgovGrpauAuthorityManRoleDetail [authorCode] : ", authorCode);

    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});
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

    const [tmpRoleIdList, setTmpRoleIdList] = useState({});
    const [tmpRegYnList, setTmpRegYnList] = useState({});

    //등록여부
    const bbsTyBCodeOptions = [{ value: "Y", label: "등록" }, { value: "N", label: "미등록" }];

    let searchKeyword = '';
    //이전 화면의 권한코드를 검색창에 세트
    searchKeyword = authorCode;

    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { pageIndex: 1 });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시

	//select 항목
	//const [selectList, setSelectList] = useState([]);
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


    
	 //목록
 	const retrieveDetail = useCallback( (searchCondition) => {
    console.groupCollapsed("롤관리 시작.retrieveDetail()");

	    searchCondition.searchKeyword = searchKeyword; //"ROLE_ADMIN"
    	const retrieveDetailURL = '/sec/ram/EgovAuthorRoleList.do';
    	const requestOptions = {
        	method: "POST",
        	headers: {
            	'Content-type': 'application/json'
        	},
        	body: JSON.stringify(searchCondition)
    	}
       // alert({authorCode});

    EgovNet.requestFetch(retrieveDetailURL,
        requestOptions,
        (resp) => {
            setMasterBoard(resp.result.brdMstrVO);
            setBoardDetail(resp.result.authorRoleManageVO);
            setPaginationInfo(resp.result.paginationInfo);
            console.log("--------authorRoleManageVO 확인---------"+resp.result.authorRoleManageVO);
            console.log("--------paginationInfo 확인---------"+resp.result.paginationInfo);
            setUser(resp.result.user);

			//등록 파라메터
		    setTmpRoleIdList(resp.result.checkedRoleIdList);
		    setTmpRegYnList(resp.result.checkedRegYnList);

            let mutListTag = [];
            
            let resultCnt = resp.result.resultCnt * 1;
            let currentPageNo = resp.result.paginationInfo.currentPageNo;
           //alert("현재페이지-->"+currentPageNo);
            let pageSize = resp.result.paginationInfo.pageSize;

            // 리스트 항목 구성
            resp.result.resultList.forEach(function (item, index) {
                if (index === 0) mutListTag = []; // 목록 초기화
                console.log("--------currentPageNo result.resultList--boardDetail.regYn-------"+boardDetail.regYn);    
                console.log("--------currentPageNo result.resultList--item.regYn-------"+item.regYn);    

                var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                    console.log("--------currentPageNo 확인---------"+currentPageNo);    
                    console.log("--------listIdx---------"+listIdx);
                    console.log("--------resultCnt---------"+resultCnt);

					if (index === 0) 	setSelectList0({ ...selectList0, regYn: item.regYn });
					if (index === 1) 	setSelectList1({ ...selectList1, regYn: item.regYn });
					if (index === 2) 	setSelectList2({ ...selectList2, regYn: item.regYn });
					if (index === 3) 	setSelectList3({ ...selectList3, regYn: item.regYn });
					if (index === 4) 	setSelectList4({ ...selectList4, regYn: item.regYn });
					if (index === 5) 	setSelectList5({ ...selectList5, regYn: item.regYn });
					if (index === 6) 	setSelectList6({ ...selectList6, regYn: item.regYn });
					if (index === 7) 	setSelectList7({ ...selectList7, regYn: item.regYn });
					if (index === 8) 	setSelectList8({ ...selectList8, regYn: item.regYn });
					if (index === 9) 	setSelectList9({ ...selectList9, regYn: item.regYn });
                //link div 조사필요, div인 경우, 다른 항목 클릭시에 첫번째에 체크표시,,, 그러나 link의 경우, AuthorCode 값이 사라짐    
                mutListTag.push(
                    <div to={{pathname: URL.GRPAU_AUTHORITY_MAN_ROLE_DETAIL}} 
                    state={{
                        roleCode: item.roleCode
                    }} 
                    key={listIdx} className="list_item" >
                        <div>{item.roleCode}</div>
                        <div>{item.roleNm}</div>
                        <div>{item.roleTyp}</div>
                        <div>{item.roleSort}</div>
                        <div>{item.roleDc}</div>
                        <div style={{width: "230px"}}>{item.creatDt}</div>
                        <div>                     
                            <li className="third_1 L">
                            <label className="f_select w_180" htmlFor="regYn">
								{index === 0 &&
                                <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="등록여부선택"
                                                onChange={(e) => setSelectList0({ ...selectList0, regYn: e.target.value })}
                                                defaultValue={item.regYn} 
                                            >
                                                {bbsTyBCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                </select>
								}	
								{index === 1 &&
                                <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="등록여부선택"
                                                onChange={(e) => setSelectList1({ ...selectList1, regYn: e.target.value })}
                                                defaultValue={item.regYn} 
                                            >
                                                {bbsTyBCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                </select>
								}	
								{index === 2 &&
                                <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="등록여부선택"
                                                onChange={(e) => setSelectList2({ ...selectList2, regYn: e.target.value })}
                                                defaultValue={item.regYn} 
                                            >
                                                {bbsTyBCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                </select>
								}	
								{index === 3 &&
                                <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="등록여부선택"
                                                onChange={(e) => setSelectList3({ ...selectList3, regYn: e.target.value })}
                                                defaultValue={item.regYn} 
                                            >
                                                {bbsTyBCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                </select>
								}	
								{index === 4 &&
                                <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="등록여부선택"
                                                onChange={(e) => setSelectList4({ ...selectList4, regYn: e.target.value })}
                                                defaultValue={item.regYn} 
                                            >
                                                {bbsTyBCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                </select>
								}	
								{index === 5 &&
                                <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="등록여부선택"
                                                onChange={(e) => setSelectList5({ ...selectList5, regYn: e.target.value })}
                                                defaultValue={item.regYn} 
                                            >
                                                {bbsTyBCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                </select>
								}	
								{index === 6 &&
                                <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="등록여부선택"
                                                onChange={(e) => setSelectList6({ ...selectList6, regYn: e.target.value })}
                                                defaultValue={item.regYn} 
                                            >
                                                {bbsTyBCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                </select>
								}	
								{index === 7 &&
                                <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="등록여부선택"
                                                onChange={(e) => setSelectList7({ ...selectList7, regYn: e.target.value })}
                                                defaultValue={item.regYn} 
                                            >
                                                {bbsTyBCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                </select>
								}	
								{index === 8 &&
                                <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="등록여부선택"
                                                onChange={(e) => setSelectList8({ ...selectList8, regYn: e.target.value })}
                                                defaultValue={item.regYn} 
                                            >
                                                {bbsTyBCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                </select>
								}	
								{index === 9 &&
                                <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="등록여부선택"
                                                onChange={(e) => setSelectList9({ ...selectList9, regYn: e.target.value })}
                                                defaultValue={item.regYn} 
                                            >
                                                {bbsTyBCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                </select>
								}	

                            </label>
                            </li>

                        </div>
                    </div>
                );
            });
            setListTag(mutListTag);
            //alert("resultList mutListTag roleNm 12345"+JSON.stringify(mutListTag[0].roleNm));
            //alert("resultList ListTag roleNm 67890"+JSON.stringify(listTag[0].roleNm));
            setCheckedList([]); //체크 값 초기화
        },
        function (resp) {
            console.log("err response : ", resp);
        }
    );
},[]);
   
// 롤정보 등록처리 
    const onClickInsertBoardArticle = ( checkedList) => {
		const formData = new FormData();
        var tmpRegYnOutList="";

        const deleteBoardURL = "/sec/ram/EgovAuthorRoleInsert.do";
        var tmpList="";
        // 근거, alert에서 parsing구조파악
        checkedList.map((checked) => tmpList = tmpList + checked.props.state.roleCode + ",");

if(selectList0 != null)
	tmpRegYnOutList = tmpRegYnOutList + JSON.stringify(selectList0.regYn) + ",";
if(selectList1 != null)
	tmpRegYnOutList = tmpRegYnOutList + JSON.stringify(selectList1.regYn) + ",";
if(selectList2 != null)
	tmpRegYnOutList = tmpRegYnOutList + JSON.stringify(selectList2.regYn) + ",";
if(selectList3 != null)
	tmpRegYnOutList = tmpRegYnOutList + JSON.stringify(selectList3.regYn) + ",";
if(selectList4 != null)
	tmpRegYnOutList = tmpRegYnOutList + JSON.stringify(selectList4.regYn) + ",";
if(selectList5 != null)
	tmpRegYnOutList = tmpRegYnOutList + JSON.stringify(selectList5.regYn) + ",";
if(selectList6 != null)
	tmpRegYnOutList = tmpRegYnOutList + JSON.stringify(selectList6.regYn) + ",";
if(selectList7 != null)
	tmpRegYnOutList = tmpRegYnOutList + JSON.stringify(selectList7.regYn) + ",";
if(selectList8 != null)
	tmpRegYnOutList = tmpRegYnOutList + JSON.stringify(selectList8.regYn) + ",";
if(selectList9 != null)
	tmpRegYnOutList = tmpRegYnOutList + JSON.stringify(selectList9.regYn) + ",";
//        alert("selectList1="+JSON.stringify(selectList1));
//        alert("authorCode="+JSON.stringify(authorCode));
    
		if(formConfirm(formData)) {
		const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                authorCode: authorCode,
                checkedRoleIdList: tmpRoleIdList,
                checkedRegYnList: tmpRegYnOutList,
                checkedList: tmpList
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("선택된 권한-롤정보가 갱신되었습니다. ")
                    setCheckedList([]);  //완료 후 체크값 초기화
                    retrieveDetail(searchCondition);
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
	  }
    }

	const formConfirm = (formData) => {
	if (window.confirm("등록여부를 갱신하시겠습니까?")) {
		return true;
	}else {
		return false;
		
		}
	}
	
    useEffect(function () {
        retrieveDetail(searchCondition);
        return function () {
        }
    }, [props]);

    console.groupEnd("EgovGrpauAuthorityManRoleDetail");
    
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
                        <li><Link to={URL.GRPAU}>권한및그룹 관리</Link></li>
                        <li><Link to={URL.GRPAU_AUTHORITY_MAN}>권한관리</Link></li>
                        {/* <li>{masterBoard && masterBoard.bbsNm}</li> */}
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents NOTICE_VIEW" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">권한관리</h1>
                        </div>
                        <h2 className="tit_2">롤정보조회</h2>
                   {/* <!-- 검색조건 --> */}
                   <div className="condition">
                            <ul>
                            <li className="third_1 L">
                                    <label className="f_select" htmlFor="searchCnd">
                                        <select id="searchCnd" name="searchCnd" title="조건"
										onChange={(e) => setSearchCondition({ ...searchCondition, searchCnd: e.target.value })}
                                        >
                                            <option value="1">권한 코드</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="f_search w_500">
                                    <input className="f_input2 w_full" id="searchKeyword" name="searchKeyword" type="text"
                                        defaultValue={searchKeyword} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, searchKeyword: e.target.value })}
                                        maxLength="60" />
                                        <button type="button"
                                            onClick={() => retrieveDetail(searchCondition)}>조회</button>
                                    </span>
                                </li>
                                <li>
                                    <a className="btn btn_blue_h46 pd35" onClick={(e) => {
                                        e.preventDefault();
                                        onClickInsertBoardArticle( checkedList);
                                    }}>등록</a> &nbsp;&nbsp;
                                </li>
                                <li>
  
                                 </li>
                            </ul>
                        </div>
                        {/* <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list">
                            <div className="head">
                            <span style={{width: "216px"}}>롤 ID</span>
                                <span>롤 명</span>
                                <span>롤 타입</span>
                                <span>롤 Sort</span>
                                <span>롤 설명</span>
                                <span>등록일자</span>
                                <span>등록여부</span>
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

                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <EgovPaging pagination={paginationInfo} moveToPage={passedPage => {
                                retrieveDetail({ ...searchCondition, pageIndex: passedPage });
                            }}></EgovPaging>
                            {/* <!--/ Paging --> */}
                        </div>

                        <div className="board_btn_area">
                            <div className="left_col btn3">
                            </div>
                            <div className="right_col btn1">
                                <Link to={{
                                        pathname: URL.GRPAU_AUTHORITY_MAN,
                                        state: {
                                            //authorCode: authorCode,
                                            searchCondition: searchCondition
                                        }
                                }} className="btn btn_blue_h46 w_100">목록</Link>
                            </div>
                        </div>
                    </div>
                        {/* <!-- 게시판 상세보기 --> */}

                        {/* <!--// 본문 --> */}
                </div>
            </div>
        </div>
    );
}


export default EgovGrpauAuthorityManRoleDetail;