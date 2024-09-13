import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import { GALLERY_BBS_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavInform';
import EgovPaging from 'components/EgovPaging';

import { itemIdxByPage } from 'utils/calc';
//다국어지원 임포트 
import enUsMsg from "../../../AquaLang/EgovGallery_en-us.json";
import koMsg from "../../../AquaLang/EgovGallery_ko.json";
import { IntlProvider } from 'react-intl'; 
import { FormattedMessage } from 'react-intl';

function EgovGalleryList(props) {
    console.group("EgovGalleryList");
    console.log("[Start] EgovGalleryList ------------------------------");
    console.log("EgovGalleryList [props] : ", props);

    const location = useLocation();
    console.log("EgovGalleryList [location] : ", location);

    const cndRef = useRef();
    const wrdRef = useRef();

    const bbsId = GALLERY_BBS_ID;

    // eslint-disable-next-line no-unused-vars
    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { bbsId: bbsId, pageIndex: 1, searchCnd: '0', searchWrd: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});

    const [listTag, setListTag] = useState([]);
//다국어지원 설정
	const locale = localStorage.getItem("locale") ?? "ko";
	const messages = { "en-US": enUsMsg, ko: koMsg }[locale]

    const retrieveList = useCallback((searchCondition) => {
        console.groupCollapsed("EgovGalleryList.retrieveList()");

        const retrieveListURL = '/cop/bbs/selectBoardListAPI.do';
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
                mutListTag.push(<p className="no_data" key="0"><FormattedMessage id="noResultsFound" defaultMessage="검색된 결과가 없습니다."/></p>); // 게시판 목록 초기값

                const resultCnt = parseInt(resp.result.resultCnt);
                const currentPageNo = resp.result.paginationInfo.currentPageNo;
                const pageSize = resp.result.paginationInfo.pageSize;

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    const listIdx = itemIdxByPage(resultCnt , currentPageNo, pageSize, index);

                    mutListTag.push(
                        <Link to={{pathname: URL.INFORM_GALLERY_DETAIL}}
                            state={{
                                nttId: item.nttId,
                                bbsId: item.bbsId,
                                searchCondition: searchCondition
                            }}
                            key={listIdx} className="list_item" >
                            <div>{listIdx}</div>
                            {(item.replyLc * 1 ? true : false) &&
                                <><div className="al reply">
                                    {item.nttSj}
                                </div></>}
                            {(item.replyLc * 1 ? false : true) &&
                                <><div className="al">
                                    {item.nttSj}
                                </div></>}
                            <div>{item.frstRegisterNm}</div>
                            <div>{item.frstRegisterPnttm}</div>
                            <div>{item.inqireCo}</div>
                        </Link>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovGalleryList.retrieveList()");
    },[]);

    //======================================================
    useEffect(() => {
        retrieveList(searchCondition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log("------------------------------EgovGalleryList [End]");
    console.groupEnd("EgovGalleryList");
    return (
	<IntlProvider locale={locale} messages={messages}>  {/* <!-- 다국어지원 --> */}
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.INFORM}><FormattedMessage id="tit_1" defaultMessage="알림마당"/></Link></li>
                        <li><FormattedMessage id="tit_2(list)" defaultMessage="양식장 일람"/></li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_GALLARY_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1"><FormattedMessage id="tit_1" defaultMessage="알림마당"/></h1>
                        </div>

                        <h2 className="tit_2"><FormattedMessage id="tit_2(list)" defaultMessage="양식장 일람"/></h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="sel1">
                                        <select id="sel1" title="조건" defaultValue={searchCondition.searchCnd} ref={cndRef}
                                            onChange={e => {
                                                cndRef.current.value = e.target.value; 
                                            }}
                                        >
                                            <option value="0"><FormattedMessage id="title" defaultMessage="제목"/></option>
                                            <option value="1"><FormattedMessage id="sensorSamplingTime" defaultMessage="센서 샘플링타임(초)"/></option>
                                            <option value="2"><FormattedMessage id="author" defaultMessage="작성자"/></option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="f_search w_500">
                                        <input type="text" name="" defaultValue={searchCondition.searchWrd} placeholder="" ref={wrdRef}
                                            onChange={e => {
                                                wrdRef.current.value = e.target.value;
                                            }}
                                        />
                                        <button type="button"
                                            onClick={() => {
                                                retrieveList({ ...searchCondition, pageIndex: 1, searchCnd: cndRef.current.value, searchWrd: wrdRef.current.value });
                                            }}>조회</button>
                                    </span>
                                </li>
                                {user.id && masterBoard.bbsUseFlag === 'Y' &&
                                    <li>
                                        <Link to={URL.INFORM_GALLERY_CREATE} state={{bbsId: bbsId}} className="btn btn_blue_h46 pd35"><FormattedMessage id="registBtn" defaultMessage="등록"/></Link>
                                    </li>
                                }
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD002">
                            <div className="head">
                                <span><FormattedMessage id="no" defaultMessage="번호"/></span>
                                <span><FormattedMessage id="title" defaultMessage="제목"/></span>
                                <span><FormattedMessage id="author" defaultMessage="작성자"/></span>
                                <span><FormattedMessage id="dateCreation" defaultMessage="작성일"/></span>
                                <span><FormattedMessage id="viewCount" defaultMessage="조회수"/></span>
                            </div>
                            <div className="result">
                                {listTag}
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
</IntlProvider>
    );
}


export default EgovGalleryList;