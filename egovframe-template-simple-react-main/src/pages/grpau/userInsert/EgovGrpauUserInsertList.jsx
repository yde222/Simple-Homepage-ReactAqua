import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
// import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovPaging from 'components/EgovPaging';
import CODE from 'constants/code';

function EgovGrpauUserInsertList(props) {
    console.group("EgovGrpauUserInsertList");
    console.log("[Start] EgovGrpauUserInsertList ------------------------------");
    console.log("EgovGrpauUserInsertList [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
//    console.log("EgovAdminNoticeList [history] : ", history);

    // const bbsId = NOTICE_BLDN_ID;
    let searchCnd = '0';
    let searchKeyword = '';

    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || {  pageIndex: 1, sbscrbSttus: '0',searchCnd: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});

    const [listTag, setListTag] = useState([]);

// checkbox
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

    const retrieveList = useCallback( (searchCondition) => {
        console.groupCollapsed("EgovGrpauUserInsertList.retrieveList()");

        const retrieveListURL = '/uss/umt/EgovUserManage.do';
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
                setMasterBoard(resp.result.brdMstrVO);
                setPaginationInfo(resp.result.paginationInfo);
                setUser(resp.result.user);

                let mutListTag = [];
                mutListTag.push(<p className="no_data">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

                let resultCnt = resp.result.resultCnt * 1;
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                let pageSize = resp.result.paginationInfo.pageSize;

                // 리스트 항목 구성
                // 김평권 코멘트,,, 추출된 항목명과 일치시키지 않으면 500 에러발생
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                    var tmpSttus;
                        console.log("--------listIdx---------"+listIdx);
                        console.log("--------resultCnt---------"+resultCnt);
                        if(item.sttus==='P'){
                            tmpSttus = '승인(P)';
                        } else if(item.sttus==='A'){
                            tmpSttus = '신청(A)';
                        } else if(item.sttus==='D'){
                            tmpSttus = '삭제(D)';
                        }
                    mutListTag.push(
                        <Link to={{pathname: URL.GRPAU_USER_INSERT_DETAIL}} 
                        state={{
                            userId : item.userId,
                        }} 
                        key={listIdx} className="list_item" >
                            <div>{listIdx}</div>
                            <div style = {{width : '450px'}}>{item.userId}</div>

                        	<Link to={{pathname: URL.GRPAU_USER_INSERT_DETAIL}} 
                                state={{
                                    userId : item.userId,
                            }}
                            key={listIdx} className="list_item"  style = {{paddingRight : '200px'}}>
                                <div style = {{width : '160px', paddingRight : '80px'}}>{item.userNm}</div>
                                <div>{item.emailAdres}</div>
                                <div>{item.moblphonNo}</div>
                                <div>{item.sbscrbDe}</div>
                                <div style = {{paddingLeft : '10px'}}>{tmpSttus}</div>
                        </Link>
                        </Link>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovGrpauUserInsertList.retrieveList()");
    },[]);

    //복수건 삭제
const multiDel = (checkedList) => {
    const formData = new FormData();
    const deleteBoardURL = "/uss/umt/user/EgovUserDelete.do";

    var tmpList="";
    //checkedList.map((checked) => tmpList = tmpList + checked.props.state.roleCode + ",");
    checkedList.map((checked) => tmpList = tmpList + checked.props.state.userId + ",");
//    checkedList.map((checkedList) => tmpList = tmpList + checkedList.props.to.state.authorCode + ",");
//   alert("담긴 userId -->"+JSON.stringify(checkedList[0].props.state.userId));
    
    if(formConfirm(formData)) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
//            authorCode: authorCode,
            checkedList: tmpList
        })
    }
//    alert(authorCode);

    EgovNet.requestFetch(deleteBoardURL,
        requestOptions,
        (resp) => {
            console.log("====>>> 사용자 삭제 확인 = ", resp);
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("선택된 사용자가 삭제되었습니다.")
                    navigate(URL.GRPAU_USER_INSERT,   
                        {state: {
//                            authorCode: authorCode
                    }
                });
                setCheckedList([]);
                retrieveList(searchCondition);
            } else {
                alert("ERR : " + resp.resultMessage);
            }
        }
    );
    }
}
const formConfirm = () => {
if (window.confirm("삭제하시겠습니까?")) {
    return true;
}else {
    return false;
    
    }
}

    useEffect(() => {
        retrieveList(searchCondition);
    }, []);

    
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            console.log('checkedList:', checkedList);
        },
        [checkedList]
    );

    console.log("------------------------------EgovGrpauUserInsertList [End]");
    console.groupEnd("EgovGrpauUserInsertList");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>사용자 등록관리</li>
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
                        <h2 className="tit_2">사용자목록</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="sbscrbSttus">
                                        <select id="sbscrbSttus" name="sbscrbSttus" title="조건"
										onChange={(e) => setSearchCondition({ ...searchCondition, sbscrbSttus: e.target.value })}
                                        >
                                            <option value="0">상태(전체)</option>
                                            <option value="A">가입신청(A)</option>
                                            <option value="D">삭제(D)</option>
                                            <option value="P">승인(P)</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="searchCnd">
                                        <select id="searchCnd" name="searchCnd" title="조건"
										onChange={(e) => setSearchCondition({ ...searchCondition, searchCnd: e.target.value })}
                                        >
                                            <option value="0">사용자ID</option>
                                            <option value="1">사용자이름</option>
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
                                    <Link to={URL.GRPAU_USER_INSERT_CREATE} className="btn btn_blue_h46 pd35">등록</Link>
                                </li>
                                <li>
                                    <div><button className="btn btn_blue_h46 pd35" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                multiDel(checkedList)} 
                                            } >삭제</button>
                                    </div>   
                                 </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 test--> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD007">
                            <div className="head">
                                <span>번호</span>
                                <span style = {{paddingLeft : '100px'}}>사용자ID</span>
                                <span style = {{paddingRight : '70px'}}>사용자이름</span>
                                <span style = {{width : '170px', paddingRight : '80px'}}>사용자이메일</span>
                                <span>전화번호</span>
                                <span>등록일</span>
                                <span style = {{paddingRight : '140px'}}>가입상태</span>
                            </div>
                            <div className="result">
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
                                {/* <span>{listTag}</span> */}
                            </div>
                        </div>
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


export default EgovGrpauUserInsertList;