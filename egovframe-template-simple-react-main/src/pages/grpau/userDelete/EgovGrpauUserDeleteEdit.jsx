import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
//import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovAttachFile from 'components/EgovAttachFile';

function EgovGrpauUserDeleteEdit(props) {
    console.log("------------------------------");
    console.log("EgovGrpauUserDeleteEdit [props] : ", props);
    // console.log("**************props********************"+props.defaultValue);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauUserDeleteEdit [location] : ", location);

//    const bbsId = location.state?.bbsId || NOTICE_BLDN_ID;
    const nttId = location.state?.nttId || "";
    const userId = location.state.userId;
    const userNm = location.state.userNm;
 

    
    //부재여부종류
    const selAbsnceAtOptions = [{ value: "", label: "선택하세요" }, { value: "N", label: "N" }, { value: "Y", label: "Y" }];

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();

    const intMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/uss/ion/uas/addUserAbsnce.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/uss/ion/uas/updtUserAbsnce.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {
        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setBoardDetail({ userId: userId, userNm: userNm });
            return;
        }

        const retrieveDetailURL = '/uss/ion/uas/getUserAbsnce.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
//                nttId: nttId
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
//                if (modeInfo.mode === CODE.MODE_MODIFY) {
//                    setBoardAttachFiles(resp.result.resultFiles);
//                }
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
                    navigate({ pathname: URL.GRPAU_USER_DELETE });
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
        console.log("boardDetail, boardAttachFiles: useEffect");
        return function () {
        }
    }, [boardDetail,boardAttachFiles]);

    console.groupEnd("EgovGrpauUserDeleteEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU_USER_DELETE}>사용자 부재관리</Link></li>
                        <li>부재관리등록</li>
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

                        <h2 className="tit_2">사용자 부재관리 {modeInfo.modeTitle}</h2>

                        <div className="board_view2">

                            <dl>
                                <dt>
                                    <label htmlFor="userId">사용자ID<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="userId" name="userId" type="text"
                                        defaultValue={boardDetail.userId} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, userId: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="userNm">사용자명<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="userNm" name="userNm" type="text"
                                        defaultValue={boardDetail.userNm} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, userNm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="userAbsnceAt">부재여부 <span className="req">필수</span></label></dt>
                                <dd>
                                    {/* 수정/조회 일때 변경 불가 */}
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_200" htmlFor="userAbsnceAt">
                                            <select
                                                id="userAbsnceAt"
                                                name="userAbsnceAt"
                                                title="부재여부"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, userAbsnceAt: e.target.value })}
                                                value={boardDetail.userAbsnceAt} 
                                            >
                                                {selAbsnceAtOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </label>
                                    }
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <label className="f_select w_200" htmlFor="userAbsnceAt">
                                        <select
                                            id="userAbsnceAt"
                                            name="userAbsnceAt"
                                            title="부재여부"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, userAbsnceAt: e.target.value })}
                                            value={boardDetail.userAbsnceAt}
                                        >
                                            {selAbsnceAtOptions.map((option, i) => {
                                                return (
                                                    <option value={option.value} key={option.value}>
                                                    {option.label}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                    }
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="lastUpdusrPnttm">등록일시</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="lastUpdusrPnttm" name="lastUpdusrPnttm" type="text"
                                        defaultValue={boardDetail.lastUpdusrPnttm} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, lastUpdusrPnttm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>

                            {/* {modeInfo.mode === CODE.MODE_MODIFY &&
                                <EgovAttachFile
                                    boardFiles={boardAttachFiles} />
                            } 
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <li>csv로 주소 입력시 최대 10건, 엑셀파일 첨부시, 최대 1000건 입니다. 엑셀파일은 C:\hantong\upload 경로에 저장 후 처리 하셔야 합니다.<br/>*주소, 첨부파일(Sheet1에 데이터) 중 하나만 선택 하셔야 합니다.</li>
                                    } */}
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
                                        pathname: URL.GRPAU_USER_DELETE,
                                        state: {
                                            userId: userId,
//                                            bbsId: bbsId
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

export default EgovGrpauUserDeleteEdit;