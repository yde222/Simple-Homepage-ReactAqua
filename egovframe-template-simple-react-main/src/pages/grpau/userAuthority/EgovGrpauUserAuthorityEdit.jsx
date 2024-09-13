import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovAttachFile from 'components/EgovAttachFile';

function EgovGrpauUserInsertEdit(props) {
    console.log("------------------------------");
    console.log("EgovAdminNoticeEdit [props] : ", props);
    // console.log("**************props********************"+props.defaultValue);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovAdminNoticeEdit [location] : ", location);

    const bbsId = location.state?.bbsId || NOTICE_BLDN_ID;
    const nttId = location.state?.nttId || "";
 

    
    //종류
    const bbsTyACodeOptions = [{ value: "", label: "선택하세요" }, { value: "BUS0071", label: "건축물 대장" }];
    //건축물유형
    const bbsTyBCodeOptions = [{ value: "", label: "선택하세요" }, { value: "BUS0074", label: "건물" }, { value: "BUS0075", label: "집합건물" }];
    //건축물대장종류
    const bbsTyCCodeOptions = [{ value: "", label: "선택하세요" }, { value: "BUS0076", label: "일반 건축물대장" }, { value: "BUS0077", label: "집합 건축물대장" }, { value: "BUS0078", label: "총괄 표제부" }, { value: "BUS0079", label: "표제부" }, { value: "BUS00710", label: "전유부" }];
    //발급구분
    const bbsTyDCodeOptions = [{ value: "", label: "선택하세요" }, { value: "BUS00711", label: "열람용" }, { value: "BUS00712", label: "발급용" }];

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
                    editURL: '/cop/bldn/insertBoardArticleAPI.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/cop/bldn/updateBoardArticleAPI.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {
        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setBoardDetail({ bbsId: bbsId, nttSj: "", nttCn: "" });
            return;
        }

        const retrieveDetailURL = '/cop/bldn/insertSelectBoardArticleAPI.do';
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
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setMasterBoard(resp.result.brdMstrVO);
                // 초기 boardDetail 설정 => ( 답글 / 수정 ) 모드일때...
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardDetail(resp.result.boardVO);
                }
                
                // 초기 setBoardAttachFiles 설정 => (수정) 모드 일때...
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardAttachFiles(resp.result.resultFiles);
                }
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
                    navigate({ pathname: URL.ADMIN_NOTICE_BLDN });
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

    console.groupEnd("EgovAdminNoticeEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN_NOTICE_BLDN}>건축물대장</Link></li>
                        <li>{masterBoard && masterBoard.bbsNm}</li>
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
                            <h1 className="tit_1">등본 및 대장 등록</h1>
                        </div>

                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm} {modeInfo.modeTitle}</h2>

                        <div className="board_view2">

                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">고객사<span className="req">필수</span></label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="nttSj" name="nttSj" type="text"
                                        defaultValue={boardDetail.nttSj}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttSj: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="nttSj" name="nttSj" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.nttSj}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttSj: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="nttCn">종류 <span className="req">필수</span></label></dt>
                                <dd>
                                    {/* 수정/조회 일때 변경 불가 */}
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_200" htmlFor="schdulIpcrCode">
                                            <select
                                                id="bbsTyACode"
                                                name="bbsTyACode"
                                                title="종류유형선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, bbsTyACode: e.target.value })}
                                                value={boardDetail.bbsTyACode} 
                                            >
                                                {bbsTyACodeOptions.map((option, i) => {
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
                                        <label className="f_select w_200" htmlFor="schdulIpcrCode">
                                        <select
                                            id="bbsTyACode"
                                            name="bbsTyACode"
                                            title="유형선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, bbsTyACode: e.target.value })}
                                            value={boardDetail.bbsTyACode}
                                        >
                                            {bbsTyACodeOptions.map((option, i) => {
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
                                <dt><label htmlFor="nttCn">건축물 유형 <span className="req">필수</span></label></dt>
                                <dd>
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_200" htmlFor="schdulIpcrCode">
                                         
                                            <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="건축물유형선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, bbsTyBCode: e.target.value })}
                                                value={boardDetail.bbsTyBCode}
                                            >
                                                {bbsTyBCodeOptions.map((option, i) => {
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
                                        <label className="f_select w_200" htmlFor="schdulIpcrCode">
                                         
                                        <select
                                            id="bbsTyBCodeOptions"
                                            name="bbsTyBCodeOptions"
                                            title="건축물유형선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, bbsTyBCode: e.target.value })}
                                            value={boardDetail.bbsTyBCode}
                                        >
                                            {bbsTyBCodeOptions.map((option, i) => {
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
                                <dt><label htmlFor="nttCn">건축물 대장 종류 <span className="req">필수</span></label></dt>
                                <dd>
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_200" htmlFor="schdulIpcrCode">
                                         
                                            <select
                                                id="bbsTyCCode"
                                                name="bbsTyCCode"
                                                title="건축물대장종류선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, bbsTyCCode: e.target.value })}
                                                value={boardDetail.bbsTyCCode}
                                            >
                                                {bbsTyCCodeOptions.map((option, i) => {
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
                                        <label className="f_select w_200" htmlFor="schdulIpcrCode">
                                         
                                         <select
                                            id="bbsTyCCodeOptions"
                                            name="bbsTyCCodeOptions"
                                            title="건축물유형선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, bbsTyCCode: e.target.value })}
                                            value={boardDetail.bbsTyCCode}
                                        >
                                            {bbsTyCCodeOptions.map((option, i) => {
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
                                <dt><label htmlFor="nttCn">발급구분 <span className="req">필수</span></label></dt>
                                <dd>
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_200" htmlFor="schdulIpcrCode">
                                         
                                            <select
                                                id="bbsTyDCode"
                                                name="bbsTyDCode"
                                                title="발급구분선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, bbsTyDCode: e.target.value })}
                                                value={boardDetail.bbsTyDCode}
                                            >   
                                                {bbsTyDCodeOptions.map((option, i) => {
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
                                        <label className="f_select w_200" htmlFor="schdulIpcrCode">
                                        <select
                                            id="bbsTyDCodeOptions"
                                            name="bbsTyDCodeOptions"
                                            title="발급구분선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, bbsTyDCode: e.target.value })}
                                            value={boardDetail.bbsTyDCode}
                                        >
                                            {bbsTyDCodeOptions.map((option, i) => {
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
                                <dt><label htmlFor="nttCn">주소 </label></dt>
								<dd>
	                                {modeInfo.mode === CODE.MODE_CREATE &&
	                                    <textarea className="f_txtar w_full h_100" id="nttCn" name="nttCn" cols="30" rows="10" placeholder=""
                                        defaultValue={boardDetail.nttCn}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttCn: e.target.value })}></textarea>
	                                        
	                                }   
	                                {modeInfo.mode === CODE.MODE_MODIFY &&
	                                    <textarea className="f_txtar w_full h_100" id="nttCn" name="nttCn" cols="30" rows="10" placeholder="" readonly = "readOnly"
                                        defaultValue={boardDetail.nttCn}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttCn: e.target.value })}></textarea>
	                                }                                       
                                </dd>
                            </dl> 
                            {modeInfo.mode === CODE.MODE_CREATE &&
                                <EgovAttachFile
                                    fnChangeFile={(attachfile) => {
										console.log("====>>> Changed attachfile file = ", attachfile);
                                        setBoardDetail({ ...boardDetail, file_1: attachfile });
                                        
									}}
                                    fnDeleteFile={(deletedFile) => {
                                        console.log("====>>> Delete deletedFile = ", deletedFile);
										setBoardAttachFiles(deletedFile);
                                    }}
                                    boardFiles={boardAttachFiles}
                                    mode={props.mode} />           
                            }   
                            {modeInfo.mode === CODE.MODE_MODIFY &&
                                <EgovAttachFile
                                    boardFiles={boardAttachFiles} />
                            } 
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <li>csv로 주소 입력시 최대 10건, 엑셀파일 첨부시, 최대 1000건 입니다. 엑셀파일은 C:\hantong\upload 경로에 저장 후 처리 하셔야 합니다.<br/>*주소, 첨부파일(Sheet1에 데이터) 중 하나만 선택 하셔야 합니다.</li>
                                    }
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
                                        pathname: URL.ADMIN_NOTICE_BLDN,
                                        state: {
                                            nttId: nttId,
                                            bbsId: bbsId
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