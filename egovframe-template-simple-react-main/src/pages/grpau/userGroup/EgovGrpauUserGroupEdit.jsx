import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
//import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
//import EgovAttachFile from 'components/EgovAttachFile';

function EgovGrpauUserInsertEdit(props) {
    console.log("------------------------------");
    console.log("EgovGrpauUserInsertEdit [props] : ", props);
    // console.log("**************props********************"+props.defaultValue);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauUserInsertEdit [location] : ", location);

    const groupId = location.state?.groupId || "";
 

    
    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({});

    const intMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/sec/gmt/EgovGroupInsert.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/sec/gmt/EgovGroupUpdate.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {
        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setBoardDetail({ groupId: "" });
            return;
        }

        const retrieveDetailURL = '/sec/gmt/EgovGroup.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                groupId: groupId,
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setMasterBoard(resp.result.brdMstrVO);
                // 초기 boardDetail 설정 => ( 답글 / 수정 ) 모드일때...
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardDetail(resp.result.boardVO);
                }
                
                // 초기 setBoardAttachFiles 설정 => (수정) 모드 일때...
                //if (modeInfo.mode === CODE.MODE_MODIFY) {
                //    setBoardAttachFiles(resp.result.resultFiles);
                //}
            }
        );
    }

    const insertBoard = () => {
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
                    navigate({ pathname: URL.GRPAU_USER_GROUP });
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

    // useEffect(function () {
    //     console.log("boardDetail, boardAttachFiles: useEffect");
    //     return function () {
    //     }
    // }, [boardDetail,boardAttachFiles]);

    console.groupEnd("EgovGrpauUserInsertEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU_USER_GROUP}>사용자그룹 관리</Link></li>
                        <li>그룹관리등록</li>
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
                            <h1 className="tit_1">그룹및 권한 등록</h1>
                        </div>

                        <h2 className="tit_2">사용자 그룹관리 {modeInfo.modeTitle}</h2>

                        <div className="board_view2">

                            <dl>
                                <dt>
                                    <label htmlFor="groupId">그룹ID<span className="req">필수</span></label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="groupId" name="groupId" type="text"
                                        defaultValue={boardDetail.groupId}
                                        onChange={e => setBoardDetail({ ...boardDetail, groupId: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="groupId" name="groupId" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.groupId}
                                        onChange={e => setBoardDetail({ ...boardDetail, groupId: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="groupNm">그룹명<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="groupNm" name="groupNm" type="text"
                                        value={boardDetail.groupNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, groupNm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>

                            <dl>
                                <dt>
                                    <label htmlFor="groupDc">설명</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="groupDc" name="groupDc" type="text"
                                        value={boardDetail.groupDc} 
                                        onChange={e => setBoardDetail({ ...boardDetail, groupDc: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>

                            <dl>
                                <dt>
                                    <label htmlFor="groupCreatDe">등록일시</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="groupCreatDe" name="groupCreatDe" type="text"
                                        defaultValue={boardDetail.groupCreatDe} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, groupCreatDe: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                            
                                <div className="left_col btn1">
                                    <a href="" className="btn btn_skyblue_h46 w_100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            insertBoard();
                                        }}>저장</a>
                                </div>
                                     
                                <div className="right_col btn1">
                                <Link to={{
                                        pathname: URL.GRPAU_USER_GROUP,
                                        state: {
                                        }
                                    }} className="btn btn_blue_h46 w_100">목록</Link>                                
                                </div>
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

export default EgovGrpauUserInsertEdit;