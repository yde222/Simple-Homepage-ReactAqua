import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';
import { LOGIN_BBS_ID } from 'context/config';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
//import EgovAttachFile from 'egov/common/EgovAttachFile';
import EgovRadioButtonGroup from 'egov/common/EgovRadioButtonGroup';


function EgovAdminLoginEdit(props) {
    console.group("EgovAdminLoginEdit");
    console.log("------------------------------");
    console.log("EgovAdminLoginEdit [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovAdminLoginEdit [location] : ", location);

    const bbsId = location.state?.bbsId || LOGIN_BBS_ID;
    // const nttId = history.location.state?.nttId || "";
    const email = location.state?.email || "";
    const name = location.state?.name || "";
    const ihidNum = location.state?.ihidNum || "";
    const replyPosblAt = location.state?.replyPosblAt || "";

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({ email: '', name: '', ihidNum: '', replyPosblAt: ''  });
    // const [boardAttachFiles, setBoardAttachFiles] = useState();
    const replyPosblAtRadioGroup = [{ value: "Y", label: "가능" }, { value: "N", label: "불가능" }];

 
    const intMode = () => {
        switch (props.mode) {
            // case CODE.MODE_CREATE:
            //     setModeInfo({
            //         ...modeInfo,
            //         modeTitle: "등록",
            //         editURL: '/cop/bbs/insertBoardArticleAPI.do'
            //     });
            //     break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/uat/uia/updateBoardLoginArticleAPI.do'
                });
                console.log("EgovAdminLoginEdit [MODE_MODIFY] : ");
                break;
            // case CODE.MODE_REPLY:
            //     setModeInfo({
            //         ...modeInfo,
            //         modeTitle: "답글쓰기",
            //         editURL: '/cop/bbs/replyBoardArticleAPI.do'
            //     });
            //     break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {

        // if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
        //     setBoardDetail({ bbsId: bbsId, nttSj: "", nttCn: "" });
        //     return;
        // }

        const retrieveDetailURL = '/uat/uia/selectBoardLoginArticleAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId,
                email: email, 
                name:  name,
                ihidNum: ihidNum,
                replyPosblAt: replyPosblAt
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setMasterBoard(resp.result.brdMstrVO);
                
                // 초기 boardDetail 설정 => ( 답글 / 수정 ) 모드일때...
                // if (modeInfo.mode === CODE.MODE_REPLY) {// 답글모드이면 RE: 붙여줌 
                //     setBoardDetail({ ...resp.result.boardVO, nttSj: "RE: " + resp.result.boardVO.nttSj, nttCn: "" , inqireCo: 0, atchFileId: ""});
                // }
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardDetail(resp.result.loginVO);
                }
                
                // 초기 setBoardAttachFiles 설정 => (수정) 모드 일때...
                // if (modeInfo.mode === CODE.MODE_MODIFY) {
                //     setBoardAttachFiles(resp.result.resultFiles);
                // }
            }
        );
    }

    const updateBoard = () => {
        const formData = new FormData();
        for (let key in boardDetail) {
            formData.append(key, boardDetail[key]);
            //console.log("boardDetail [%s] ", key, boardDetail[key]);
        }
        
        const requestOptions = {
            method: "POST",
            headers: {

            },
            body: formData
        }

        EgovNet.requestFetch(modeInfo.editURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          					navigate( URL.ADMIN_LOGIN );
                            //  history.push({ pathname: URL.ADMIN_LOGIN });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
    }

    useEffect(function () {
        intMode();
        return function () {
        }
    }, []);

    useEffect(function () {
        console.log("boardDetail: useEffect");
        return function () {
        }
    }, [boardDetail]);

    console.groupEnd("EgovAdminLoginEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li><Link to={URL.ADMIN_LOGIN}>로그인사용자</Link></li>
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

                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm} {modeInfo.modeTitle}</h2>

                        <div className="board_view2">
                            <dl>
                                <dt><label htmlFor="email">이메일 <span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="email" name="email" readOnly="readonly" type="text"
                                        defaultValue={boardDetail.email}
                                        onChange={e => setBoardDetail({ ...boardDetail, email: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="name">사용자 <span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="name" name="name" readOnly="readonly" type="text"
                                        defaultValue={boardDetail.name}
                                        onChange={e => setBoardDetail({ ...boardDetail, name: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            
                            <dl>
                                <dt><label htmlFor="ihidNum">전화번호 <span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="ihidNum" name="ihidNum" readOnly="readonly" type="text"
                                        defaultValue={boardDetail.ihidNum}
                                        onChange={e => setBoardDetail({ ...boardDetail, ihidNum: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            
                            <div className="info">
                                     <dt>승인 여부</dt>
                                    <dd>
                                    {/* 수정 일때 변경 가능 */}
                                        <EgovRadioButtonGroup
                                            name="replyPosblAt"
                                            radioGroup={replyPosblAtRadioGroup}
                                            setValue={boardDetail.replyPosblAt}
                                            setter={(v) => setBoardDetail({ ...boardDetail, replyPosblAt: v })} />
                                    </dd>
                            </div>
                            

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <a href="" className="btn btn_skyblue_h46 w_100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            updateBoard();
                                        }}>저장</a>
                                </div>

                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.ADMIN_LOGIN,
                                        state: {
                                            // nttId: nttId,
                                            bbsId: bbsId,
                                            email: email
                                        }
                                    }} className="btn btn_blue_h46 w_100">목록</Link>
                                </div>

                                {/* <div className="right_col btn1">
                                    <a href={URL.ADMIN_LOGIN} className="btn btn_blue_h46 w_100">목록</a>
                                </div> */}
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EgovAdminLoginEdit;