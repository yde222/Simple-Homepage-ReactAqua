import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'context/url';
import { LOGIN_BBS_ID } from 'context/config';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'egov/common/EgovPaging';

function EgovAdminLoginList(props) {
    console.group("EgovAdminLoginList");
    console.log("[Start] EgovAdminLoginList ------------------------------");
    console.log("EgovAdminLoginList [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovAdminLoginList [location] : ", location);

    //NOTICE_BBS_ID  LOGIN_BBS_ID 
    const bbsId = LOGIN_BBS_ID;
    const email = '';
    let searchCnd = '0';
    let searchWrd = '';

    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { bbsId: bbsId, pageIndex: 1, searchCnd: '0', searchWrd: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});

    const [listTag, setListTag] = useState([]);

    const retrieveList = useCallback((searchCondition) => {
        console.groupCollapsed("EgovAdminLoginList.retrieveList()");

        const retrieveListURL = '/uat/uia/selectBoardLoginListAPI.do';
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
                console.log("EgovAdminLoginList [requestFetch] : ", resp.result);

                let mutListTag = [];
                mutListTag.push(<p className="no_data">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

                let resultCnt = resp.result.resultCnt * 1;
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                let pageSize = resp.result.paginationInfo.pageSize;

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                    console.log("EgovAdminLoginList [resultList] : ", listIdx, resultCnt, currentPageNo, pageSize, index);
                    console.log("EgovAdminLoginList [item] : ", item);

                    mutListTag.push(
                        <Link to={{	pathname: URL.ADMIN_LOGIN_DETAIL}} 
                            state={{
                                bbsId: item.bbsId,
                                name:  item.name,
                                email: item.email,
                                ihidNum: item.ihidNum,
                                searchCondition: searchCondition
                        	}} 
							key={listIdx} className="list_item" >
                            <div>{listIdx}</div>
                            <div>{item.name}</div>
                            <div>{item.email}</div>
                            <div>{item.ihidNum}</div>
                        </Link>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovAdminLoginList.retrieveList()");
    },[]);

    useEffect(() => {
        retrieveList(searchCondition);
        return () => {
        }
    }, [searchCondition]);

    console.log("------------------------------EgovAdminLoginList [End]");
    console.groupEnd("EgovAdminLoginList");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.INFORM}>사이트 관리</Link></li>
                        <li>{masterBoard && masterBoard.bbsNm}</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents LOGIN_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리(슈퍼관리자 전용)</h1>
                        </div>

                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="sel1">
                                        <select id="sel1" title="조건" defaultValue={searchCondition.searchCnd}
                                            onChange={e => {
                                                searchCnd = e.target.value;
                                                // setSearchCondition({ ...searchCondition, searchCnd: e.target.value });
                                            }}
                                        >
                                            <option value="0">이름</option>
                                            <option value="1">이메일</option>
                                            <option value="2">전화번호</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="f_search w_500">
                                        <input type="text" name="" defaultValue={searchCondition.searchWrd} placeholder=""
                                            onChange={e => {
                                                searchWrd = e.target.value;
                                                //setSearchCondition({ ...searchCondition, searchWrd: e.target.value });
                                            }}
                                        />
                                        <button type="button"
                                            onClick={e => {
                                                // onClickSearch
                                                setSearchCondition({ ...searchCondition, pageIndex: 1, searchCnd: searchCnd, searchWrd: searchWrd });
                                            }}>조회</button>
                                    </span>
                                </li>
                                {/* <li>
                                    <Link to={URL.ADMIN_NOTICE_CREATE} className="btn btn_blue_h46 pd35">등록</Link>
                                </li> */}
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD002">
                            <div className="head">
                                <span>번호</span>
                                <span>이름</span>
                                <span>이메일</span>
                                <span>전화번호</span>
                            </div>
                            <div className="result">
                                {listTag}
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}

                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <EgovPaging pagination={paginationInfo} moveToPage={passedPage => {
                                setSearchCondition({ ...searchCondition, pageIndex: passedPage });
                            }}></EgovPaging>
                            {/* <!--/ Paging --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovAdminLoginList;