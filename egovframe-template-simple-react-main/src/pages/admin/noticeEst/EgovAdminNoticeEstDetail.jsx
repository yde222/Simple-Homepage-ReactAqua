import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { NOTICE_EST_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import { IntlProvider } from 'react-intl';
import { injectIntl } from 'react-intl';
//다국어지원 임포트
import enUsMsg from "../../../AquaLang/EgovNoticeEst_en-us.json";
import koMsg from "../../../AquaLang/EgovNoticeEst_ko.json";

import { FormattedMessage } from 'react-intl';


function EgovAdminNoticeEstDetail(props) {
    console.group("EgovAdminNoticeEstDetail");
    console.log("------------------------------");
    console.log("EgovAdminNoticeEstDetail [props] : ", props);
//    console.log("EgovAdminNoticeDetail location.state.bbsId : ", location.state.bbsId);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovAdminNoticeEstDetail [location] : ", location);

    const bbsId = location.state.bbsId || NOTICE_EST_ID;
    const nttId = location.state.nttId;
    const searchCondition = location.state.searchCondition;

    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });

    //다국어지원 설정
    const locale = localStorage.getItem("locale") ?? "ko";
    const messages = { "en-US": enUsMsg, ko: koMsg }[locale]

    //본문
    const retrieveDetail = () => {
        const retrieveDetailURL = '/cop/est/selectBoardArticleAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId,
                nttId: nttId,
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                //setMasterBoard(resp.result.brdMstrVO);
                setBoardDetail(resp.result.boardVO);
                setUser(resp.result.user);
                setBoardAttachFiles(resp.result.resultFiles);
            }
        );
    }

    const onClickDeleteBoardArticle = (bbsId, nttId) => {
		const formData = new FormData();
        const deleteBoardURL = "/cop/est/deleteBoardArticleAPI.do";

		if(formConfirm(formData)) {
		const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId,
                nttId: nttId

            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                       alert(locale.startsWith('en') 
                            ? "The selected Fish Management Station has been deleted" 
                            : "선택된 물고기 대장은 삭제되었습니다.");
                    //alert("The selected Fish Management Station has been deleted");
                    //이 부분도<FormattedMessage id="alalertMsg" defaultMessage="선택된 물고기 대장이 삭제되었습니다"/> 이런식으로 출력하였을때 obj 로 출력되어서 영어로 표기 변경하였습니다
                    navigate(URL.ADMIN_NOTICE_EST ,{ replace: true });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
        }
    }

        const formConfirm = (formData) => {
        if (window.confirm("Is it okay to delete this?")) {
            return true;
        }else {
            return false;
            }
        }



    useEffect(function () {
        retrieveDetail();
//        return function () {
//        }
    }, []);



    console.groupEnd("EgovAdminNoticeDetail");
  // dateToString 함수를 정의하여 날짜를 원하는 형식(yyyy-mm-dd)의 문자열로 변환
    const dateToString = (date) => {
        if (!date) return ''; // null 또는 undefined인 경우 빈 문자열 반환
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <IntlProvider locale={locale} messages={messages}>  {/* <!-- 다국어지원 --> */}
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}><FormattedMessage id="tit_1" defaultMessage="사이트 관리"/></Link></li>
                        <li><FormattedMessage id="tit_2" defaultMessage="물고기 대장"/></li>
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
                                <h1 className="tit_1"><FormattedMessage id="tit_1" defaultMessage="사이트 관리"/></h1>
                            </div>

                            <h2 className="tit_2"><FormattedMessage id="tit_2" defaultMessage="물고기 대장"/></h2>

                            {/* <!-- 게시판 상세보기 --> */}
                            <div className="board_view">
                            <div className="board_view_top">
                                <div className="tit">{boardDetail && boardDetail.nttSj}</div>
                                <div className="info">
                                    <dl>
                                        <dt><FormattedMessage id="author" defaultMessage="작성자"/></dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterId}</dd>
                                    </dl>
                                    <dl>
                                        <dt><FormattedMessage id="dateCreation" defaultMessage="작성일"/></dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterPnttm}</dd>
                                    </dl>
                                    <dl>
                                        <dt><FormattedMessage id="viewCount" defaultMessage="조회수"/></dt>
                                        <dd>{boardDetail && boardDetail.inqireCo}</dd>
                                    </dl>
                                </div>
                            </div>

                                <div className="board_view2">
                                    <dl>
                                        <dt>
                                            <label htmlFor="nttSj">
                                            <FormattedMessage id="nttSj" defaultMessage="물고기 ID"/>
                                                <span className="req">필수</span></label>
                                        </dt>
                                        <dd>
                                            <input className="f_input2 w_full" id="nttSj" name="nttSj" type="text" readOnly="readonly"
                                                defaultValue={boardDetail.nttSj}
                                                onChange={e => setBoardDetail({ ...boardDetail, nttSj: e.target.value })}
                                                maxLength="60" />
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt><label htmlFor="bbsTyACode">
                                        <FormattedMessage id="bbsTyACode" defaultMessage="사이즈(cm)"/>
                                            </label><span className="req">필수</span></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="bbsTyACode" title="" id="bbsTyACode" placeholder="" readOnly="readonly"
                                                defaultValue={boardDetail.bbsTyACode}
                                                onChange={e => setBoardDetail({ ...boardDetail, bbsTyACode: e.target.value })}
                                            />
                                        </dd>
                                    </dl>

                                    <dl>
                                        <dt><label htmlFor="bbsTyBCode">
                                        <FormattedMessage id="bbsTyBCode" defaultMessage="평균(cm)"/>
                                            </label><span className="req">필수</span></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="bbsTyBCode" title="" id="bbsTyBCode" placeholder="" readOnly="readonly"
                                                defaultValue={boardDetail.bbsTyBCode}
                                                onChange={e => setBoardDetail({ ...boardDetail, bbsTyBCode: e.target.value })}
                                            />
                                        </dd>
                                    </dl>

                                    <dl>
                                        <dt><label htmlFor="bbsTyCCode">
                                        <FormattedMessage id="bbsTyCCode" defaultMessage="입식(YYYY.MM.DD)"/>
                                            </label><span className="req">필수</span></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="bbsTyCCode" title="" id="bbsTyCCode" placeholder="" readOnly="readonly"
                                                    value={dateToString(new Date(boardDetail.bbsTyCCode))}
                                                    onChange={e => setBoardDetail({ ...boardDetail, bbsTyCCode: e.target.value })}
                                                />
                                        </dd>
                                    </dl>

                                    <dl>
                                        <dt><label htmlFor="bbsTyDCode">
                                        <FormattedMessage id="bbsTyDCode" defaultMessage="출하(YYYY.MM.DD)"/>
                                            </label><span className="req">필수</span></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="bbsTyDCode" title="" id="bbsTyDCode" placeholder="" readOnly="readonly"
                                                value={dateToString(new Date(boardDetail.bbsTyDCode))}
                                                onChange={e => setBoardDetail({ ...boardDetail, bbsTyDCode: e.target.value })}
                                            />
                                        </dd>
                                    </dl>

                                    <dl>
                                        <dt><label htmlFor="bbsTyECode">
                                        <FormattedMessage id="bbsTyECode" defaultMessage="투여사료(kg)"/>
                                            </label><span className="req">필수</span></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="bbsTyECode" title="" id="bbsTyECode" placeholder="" readOnly="readonly"
                                                defaultValue={boardDetail.bbsTyECode}
                                                onChange={e => setBoardDetail({ ...boardDetail, bbsTyECode: e.target.value })}
                                            />
                                        </dd>

                                    </dl>

                                    <dl>
                                        <dt><label htmlFor="preparedFeed">
                                        <FormattedMessage id="preparedFeed" defaultMessage="준비사료(kg)"/>
                                            </label><span className="req">필수</span></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="bbsTyFCode" title="" id="bbsTyFCode" placeholder="" readOnly="readonly"
                                                defaultValue={boardDetail.bbsTyFCode}
                                                onChange={e => setBoardDetail({ ...boardDetail, bbsTyFCode: e.target.value })}
                                            />
                                        </dd>

                                    </dl>

                                </div>

                            <div className="board_article">
                            </div>
                            <div className="board_attach">
                            </div>

                            <div className="board_btn_area">
                                <div className="left_col btn3">
                                    <Link to={{
                                        pathname: URL.ADMIN_NOTICE_EST_MODIFY }}
                                        state={{
                                            nttId: nttId,
                                            bbsId: bbsId
                                        }}
                                    className="btn btn_skyblue_h46 w_100"><FormattedMessage id="editBtn" defaultMessage="수정"/></Link>
                                    <a href="" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteBoardArticle(boardDetail.bbsId, boardDetail.nttId);
                                    }}><FormattedMessage id="deleteBtn" defaultMessage="삭제"/></a>
                                </div>

                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.ADMIN_NOTICE_EST,
                                        state: {
                                            nttId: nttId,
                                            bbsId: bbsId,
                                            searchCondition: searchCondition
                                        }
                                    }} className="btn btn_blue_h46 w_100"><FormattedMessage id="listBtn" defaultMessage="목록"/></Link>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 게시판 상세보기 --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
        </IntlProvider>
    );
}


export default EgovAdminNoticeEstDetail;