import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovAttachFile from 'components/EgovAttachFile';

function EgovGrpauAuthorityManEdit(props) {
    console.log("------------------------------");
    console.log("EgovGrpauAuthorityManEdit [props] : ", props);
    // console.log("**************props********************"+props.defaultValue);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauAuthorityManEdit [location] : ", location);

    // const bbsId = location.state?.bbsId || NOTICE_BLDN_ID;
    const authorCode = location.state?.authorCode || "";
    //const authorNm = location.state.authorNm;
    //const authorDc = location.state.authorDc;
    //const authorCreatDe = location.state.authorCreatDe;
    //console.log("EgovGrpauAuthorityManEdit [authorCode] : ", authorCode);
 

    
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
                    editURL: '/sec/ram/EgovAuthorInsert.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/sec/ram/EgovAuthorUpdate.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {
        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setBoardDetail({ authorCode: "" });
            return;
        }

        const retrieveDetailURL = '/sec/ram/EgovAuthor.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                authorCode: authorCode
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
                // if (modeInfo.mode === CODE.MODE_MODIFY) {
                //     setBoardAttachFiles(resp.result.resultFiles);
                // }
            }
        );
    }

    const insertBoard = () => {
        const formData = new FormData();
        for (let key in boardDetail) {
            formData.append(key, boardDetail[key]);
            //console.log("boardDetail [%s] ", key, boardDetail[key]);
            // alert("boardDetail [%s] -->>"+ key, boardDetail[key]);
//            alert("확인 -->>"+ boardDetail.roleCode);
      
        }
       
        const requestOptions = {
            method: "POST",
            headers: {

            },
            body: formData
        }
 
        // const requestOptions = {
        //     method: "POST",
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         formData
        //     })
        // }

        EgovNet.requestFetch(modeInfo.editURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    navigate({ pathname: URL.GRPAU_AUTHORITY_MAN });
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

    console.groupEnd("EgovGrpauAuthorityManEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>권한등록</li>
                        {/* <li>{masterBoard && masterBoard.bbsNm}</li> */}
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
                            <h1 className="tit_1">권한 등록</h1>
                        </div>
                        <h2 className="tit_2">권한관리 {modeInfo.modeTitle}</h2>

                        {/* <h2 className="tit_2">{masterBoard && masterBoard.bbsNm} {modeInfo.modeTitle}</h2> */}

                        <div className="board_view2">

                            <dl>
                                <dt>
                                    <label htmlFor="authorCode">권한코드<span className="req">필수</span></label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="authorCode" name="authorCode" type="text"
                                        defaultValue={boardDetail.authorCode}
                                        onChange={e => setBoardDetail({ ...boardDetail, authorCode: e.target.value })}
                                        maxLength="60" />
                                       
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="authorCode" name="authorCode" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.authorCode}
                                        onChange={e => setBoardDetail({ ...boardDetail, authorCode: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="authorNm">권한명 <span className="req">필수</span></label></dt>
                                <dd>
                                    {/* 수정/조회 일때 변경 불가 */}
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                     <input className="f_input2 w_full" id="authorNm" name="authorNm" type="text"
                                        defaultValue={boardDetail.authorNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, authorNm: e.target.value })}
                                        maxLength="60" />
                                    }
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                     <input className="f_input2 w_full" id="authorNm" name="authorNm" type="text"
                                     value={boardDetail.authorNm}
                                     onChange={e => setBoardDetail({ ...boardDetail, authorNm: e.target.value })}
                                     maxLength="60" />
                                    }
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="nttCn">설명</label></dt>
                                <dd>
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                         
                                         <input className="f_input2 w_full" id="authorDc" name="authorDc" type="text"
                                        defaultValue={boardDetail.authorDc}
                                        onChange={e => setBoardDetail({ ...boardDetail, authorDc: e.target.value })}
                                        maxLength="60" />
                                    }
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                         
                                         <input className="f_input2 w_full" id="authorDc" name="authorDc" type="text"
                                        value={boardDetail.authorDc}
                                        onChange={e => setBoardDetail({ ...boardDetail, authorDc: e.target.value })}
                                        maxLength="60" />
                                    }
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="nttCn">등록일자 </label></dt>
                                <dd>
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        
                                         
                                         <input className="f_input2 w_full" id="authorCreatDe" name="authorCreatDe" type="text"
                                        defaultValue={boardDetail.authorCreatDe}  readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, authorCreatDe: e.target.value })}
                                        maxLength="60" />
                                     
                                    }
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        
                                         
                                         <input className="f_input2 w_full" id="authorCreatDe" name="authorCreatDe" type="text"
                                        defaultValue={boardDetail.authorCreatDe}  readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, authorCreatDe: e.target.value })}
                                        maxLength="60" />
                                   
                                    }
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
                                        pathname: URL.GRPAU_AUTHORITY_MAN,
                                        state: {
//                                            authorCode: authorCode
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

export default EgovGrpauAuthorityManEdit;