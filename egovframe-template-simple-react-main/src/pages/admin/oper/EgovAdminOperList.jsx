
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import { NOTICE_EST_ID } from 'config';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'components/EgovPaging';
import EgovAdminOperEdit from './EgovAdminOperEdit'; // EgovAdminNoticeLandEdit 컴포넌트 경로로 수정

function EgovAdminNoticeLandList(props) {
    console.group("EgovAdminNoticeLandList22");
    console.log("[Start] EgovAdminNoticeList ------------------------------");
    console.log("EgovAdminNoticeList [props] : ", props);
	console.log("EgovAdminNoticeList NOTICE_LAND_ID : ", NOTICE_EST_ID);

    const location = useLocation();
    const bbsId = NOTICE_EST_ID;
    let searchCnd = '0';
    let searchWrd = '';

    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { bbsId: bbsId, pageIndex: 1, searchCnd: '0', searchWrd: '' });
    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});
    const [listTag, setListTag] = useState([]);
    const [dataList, setDataList] = useState([]); // 데이터 리스트 상태 추가

    const retrieveList = useCallback((searchCondition) => {
        console.groupCollapsed("EgovAdminNoticeList.retrieveList()");

        const retrieveListURL = '/cop/est/selectBoardListAPI.do';
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
                mutListTag.push(<p className="no_data">검색된 결과가 없습니다.</p>);

                let resultCnt = resp.result.resultCnt * 1;
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                let pageSize = resp.result.paginationInfo.pageSize;

                let dataList = resp.result.resultList; // 데이터 리스트 설정
                setDataList(dataList); // 데이터 리스트 상태 업데이트

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = [];
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                    mutListTag.push(
                        <Link to={{
                            pathname: URL.ADMIN_OPER}}
                            state={{
                                nttId: item.nttId,
                                bbsId: item.bbsId,
                            }}
                         	key={listIdx} className="list_item" >
                            <div>{listIdx}</div>
                            <div>{item.nttSj}</div>
                        	<Link to={{pathname: URL.ADMIN_OPER}} 
                            state={{
                                nttId: item.nttId,
                                bbsId: item.bbsId,
                                searchCondition: searchCondition
                            }}
                        	key={listIdx} className="list_item" >
                            <div></div>
                            <div style = {{paddingLeft : '295px'}}>{item.frstRegisterId}</div>
                            <div>{item.frstRegisterPnttm}</div>
                            <div>{item.inqireCo}</div>
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
        console.groupEnd("EgovAdminNoticeList.retrieveList()");
    },[]);

    useEffect(() => {
        retrieveList(searchCondition);
    }, []);


    console.log("------------------------------EgovAdminNoticeList [End]");
    console.groupEnd("EgovAdminNoticeList");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트 관리</Link></li>
                        <li>파이</li>
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
                            <h1 className="tit_1">사이트관리</h1>
                        </div>
                        
                        {/* <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2> */}
                        <h2 className="tit_2">물고기 대장(파이)</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="sel1">
                                        <select id="sel1" name="sel1" title="조건"
										onChange={(e) => setSearchCondition({ ...searchCondition, searchCnd: e.target.value })}
                                        >
                                            <option value="0">제목</option>
                                            <option value="1">작성자</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="f_search w_500">
                                        <input type="text" name="" defaultValue={searchCondition && searchCondition.searchWrd} placeholder=""
                                            onChange={(e) => setSearchCondition({ ...searchCondition, searchWrd: e.target.value })}
                                        />
                                        <button type="button"
                                            onClick={() => retrieveList(searchCondition)}>조회</button>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD007">
                            <div className="head">
                                <span>번호</span>
                                <span style = {{paddingLeft : '162px'}}>제목</span>
                                <span style = {{paddingRight : '136px'}}></span>
                                <span>작성자</span>
                                <span>작성일</span>
                                <span>조회수</span>
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
 
       {/* 편집 컴포넌트 추가 */}
        <EgovAdminOperEdit dataList={dataList} />

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovAdminNoticeLandList;