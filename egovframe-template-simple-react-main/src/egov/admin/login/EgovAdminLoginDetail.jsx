import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';
import { LOGIN_BBS_ID } from 'context/config';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovAttachFile from 'egov/common/EgovAttachFile';
import EgovRadioButtonGroup from 'egov/common/EgovRadioButtonGroup';

function EgovAdminLoginDetail(props) {
    console.group("EgovAdminLoginDetail");
    console.log("------------------------------");
    console.log("EgovAdminLoginDetail [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminLoginDetail [history] : ", history);

    const bbsId = history.location.state.bbsId || LOGIN_BBS_ID;
    const name = history.location.state.name;
    const email = history.location.state.email;
    const ihidNum = history.location.state.ihidNum;
    const replyPosblAt = history.location.state.replyPosblAt;
    
    // const nttId = history.location.state.nttId;
    const searchCondition = history.location.state.searchCondition;
    const replyPosblAtRadioGroup = [{ value: "Y", label: "가능" }, { value: "N", label: "불가능" }];

    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [boardDetail, setBoardDetail] = useState({});
    // const [boardAttachFiles, setBoardAttachFiles] = useState();

    const retrieveDetail = () => {
        const retrieveDetailURL = '/uat/uia/selectBoardLoginArticleAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId,
                // nttId: nttId,
                name:  name,
                email: email,
                ihidNum: ihidNum,
                replyPosblAt: replyPosblAt
})
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setMasterBoard(resp.result.brdMstrVO);
                setBoardDetail(resp.result.loginVO);
                // boardVO-->>loginVO
                setUser(resp.result.user);
                // setBoardAttachFiles(resp.result.resultFiles);
            }
        );
    }

    const onClickDeleteBoardArticle = (bbsId, email) => {
        const deleteBoardURL = "/uat/uia/deleteBoardLoginArticleAPI.do";
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId,
                email: email
                // nttId: nttId
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("사용자계정이 삭제되었습니다.")
                    history.push(URL.ADMIN_LOGIN);
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
    }

    const getSelectedLabel = (objArray, findLabel = "") => {
        let foundValueLabelObj = objArray.find(o => o['value'] === findLabel);
        return foundValueLabelObj['label'];
    }


    useEffect(function () {
        retrieveDetail();
        return function () {
        }
    }, []);
    
    console.groupEnd("EgovAdminLoginDetail");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>{masterBoard && masterBoard.bbsNm}</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents LOGIN_VIEW" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리(슈퍼관리자 전용)</h1>
                        </div>

                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                                <div className="tit">{boardDetail && boardDetail.email}</div>
                                <div className="info">
                                    <dl>
                                        <dt>이메일</dt>
                                        <dd>{boardDetail && boardDetail.email}</dd>
                                    </dl>
                                    <dl>
                                        <dt>사용자</dt>
                                        <dd>{boardDetail && boardDetail.name}</dd>
                                    </dl>
                                    <dl>
                                        <dt>전화번호</dt>
                                        <dd>{boardDetail && boardDetail.ihidNum}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="info">
                                     <dt>승인 상태</dt>
                                    <dd>
                                        <span>
                                            {boardDetail.replyPosblAt && getSelectedLabel(replyPosblAtRadioGroup, boardDetail.replyPosblAt)}
                                        </span>
                                    </dd>
                            </div>
                            {/* <div className="board_attach">
                                <EgovAttachFile boardFiles={boardAttachFiles} />
                            </div> */}


                            <div className="board_btn_area">
                                <div className="left_col btn3">
                                    <Link to={{
                                        pathname: URL.ADMIN_LOGIN_MODIFY,
                                        state: {
                                            bbsId: bbsId,
                                            email: email
                                            // nttId: nttId,
                                        }
                                    }} className="btn btn_skyblue_h46 w_100">수정</Link>
                                    <a href="" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                        e.preventDefault();
                                        // onClickDeleteBoardArticle(boardDetail.bbsId, boardDetail.nttId);
                                        onClickDeleteBoardArticle(boardDetail.bbsId, boardDetail.email);
                                    }}>삭제</a>
                                    {/* <Link to={{
                                        pathname: URL.ADMIN_NOTICE_REPLY,
                                        state: {
                                            nttId: nttId,
                                            bbsId: bbsId
                                        }
                                    }} className="btn btn_skyblue_h46 w_100">답글작성</Link> */}
                                </div>

                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.ADMIN_LOGIN,
                                        state: {
                                            // nttId: nttId,
                                            bbsId: bbsId,
                                            email: email,
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
        </div>
    );
}


export default EgovAdminLoginDetail;