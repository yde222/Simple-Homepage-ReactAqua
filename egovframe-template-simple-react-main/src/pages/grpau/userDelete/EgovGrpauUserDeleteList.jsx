import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';


import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
//import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovPaging from 'components/EgovPaging';

function EgovGrpauUserDeleteList(props) {
    console.group("EgovGrpauUserDeleteList");
    console.log("[Start] EgovGrpauUserDeleteList ------------------------------");
    console.log("EgovGrpauUserDeleteList [props] : ", props);

    const location = useLocation();
//    console.log("EgovAdminNoticeList [history] : ", history);

//    const bbsId = NOTICE_BLDN_ID;
    let searchCnd = '0';
    let searchWrd = '';
//    let selAbsnceAt = 'A';

    //부재여부종류
    const selAbsnceAtOptions = [{ value: "A", label: "부재여부 전체" }, { value: "N", label: "N" }, { value: "Y", label: "Y" }];

    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { pageIndex: 1, searchCnd: '0', searchWrd: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});

    const [listTag, setListTag] = useState([]);

    const retrieveList = useCallback( (searchCondition) => {
        console.groupCollapsed("EgovGrpauUserDeleteList.retrieveList()");

        const retrieveListURL = '/uss/ion/uas/selectUserAbsnceList.do';
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
                        console.log("--------resp.result.resultCnt---------"+resp.result.resultCnt);
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                        console.log("--------resp.result.paginationInfo.currentPageNo---------"+resp.result.paginationInfo.currentPageNo);
                let pageSize = resp.result.paginationInfo.pageSize;
                        console.log("--------resp.result.paginationInfo.pageSize---------"+resp.result.paginationInfo.pageSize);

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                        console.log("--------listIdx---------"+listIdx);
                        console.log("--------resultCnt---------"+resultCnt);
                    // N, regist Y,update    
                    if(item.regYn === "N") {   
                    mutListTag.push(
                        <Link to={{pathname: URL.GRPAU_USER_DELETE_CREATE}} 
                        	state={{
                            userId: item.userId,
                            userNm: item.userNm,
                        }} 
                        key={listIdx} className="list_item" >
                            <div>{listIdx}</div>
                            <div>{item.userId}</div>

                       	<Link to={{pathname: URL.GRPAU_USER_DELETE_CREATE}} 
                            	state={{
                                userId: item.userId,
                                userNm: item.userNm,
                        }}
                        key={listIdx} className="list_item" >
                            <div>{item.userNm}</div>
                            <div style = {{paddingLeft : '295px'}}>{item.userAbsnceAt}</div>
                            <div>{item.regYn}</div>
                            <div>{item.lastUpdusrPnttm}</div>
                        </Link>
                        </Link>
                    );
                    }else{
                        mutListTag.push(
                            <Link to={{pathname: URL.GRPAU_USER_DELETE_DETAIL}} 
                                state={{
                                userId: item.userId,
    //                            bbsId: item.bbsId,
                            }} 
                            key={listIdx} className="list_item" >
                                <div>{listIdx}</div>
                                <div>{item.userId}</div>
    
                               <Link to={{pathname: URL.GRPAU_USER_DELETE_DETAIL}} 
                                    state={{
                                    userId: item.userId,
    //                                bbsId: item.bbsId,
                            }}
                            key={listIdx} className="list_item" >
                                <div>{item.userNm}</div>
                                <div style = {{paddingLeft : '295px'}}>{item.userAbsnceAt}</div>
                                <div>{item.regYn}</div>
                                <div>{item.lastUpdusrPnttm}</div>
                            </Link>
                            </Link>
                        );
    
                    }
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovGrpauUserDeleteList.retrieveList()");
    },[]);

    useEffect(() => {
        retrieveList(searchCondition);
    }, []);

    console.log("------------------------------EgovGrpauUserDeleteList [End]");
    console.groupEnd("EgovGrpauUserDeleteList");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>사용자 부재관리</li>
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
                        <h2 className="tit_2">사용자부재관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                        	<label className="f_select w_180" htmlFor="selAbsnceAt">
                                    <select
                                            id="selAbsnceAtOptions"
                                            name="selAbsnceAtOptions"
                                            title="부재여부선택"
                                            onChange={(e) => setSearchCondition({ ...searchCondition, selAbsnceAt: e.target.value })}
                                            value={searchCondition.selAbsnceAt}
                                        >
                                            {selAbsnceAtOptions.map((option, i) => {
                                                return (
                                                    <option value={option.label} key={option.value}>
                                                    {option.label}
                                                    </option>
                                                )
                                            })}
                                    </select>
                            </label>
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="sel1">
                                        <select id="sel1" name="sel1" title="조건"
										onChange={(e) => setSearchCondition({ ...searchCondition, searchCondition: e.target.value })}
                                        >
                                            <option value="1">사용자명</option>
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
                                    {/* <Link to={URL.GRPAU_USER_DELETE_CREATE} className="btn btn_blue_h46 pd35">등록</Link> */}
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 test--> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD007">
                            <div className="head">
                                <span>번호</span>
                                <span style = {{paddingLeft : '162px'}}>사용자ID</span>
                                <span style = {{paddingRight : '136px'}}>사용자명</span>
                                <span>부재여부</span>
                                <span>등록여부</span>
                                <span>등록일시</span>
                            </div>
                            <div className="result">
                                <span>{listTag}</span>
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


export default EgovGrpauUserDeleteList;