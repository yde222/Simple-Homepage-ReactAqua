import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
// import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';

function EgovGrpauRoleManEdit(props) {
    console.log("------------------------------");
    console.log("EgovGrpauRoleManEdit [props] : ", props);
    // console.log("**************props********************"+props.defaultValue);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauRoleManEdit [location] : ", location);

    const roleCode = location.state?.roleCode || "";
    //const roleNm = location.state?.roleNm || "";
    //const rolePtn = location.state?.rolePtn || "";
 

    
    //종류
   // const bbsTyACodeOptions = [{ value: "", label: "선택하세요" }, { value: "BUS0071", label: "건축물 대장" }];
    //롤타입  COM029
    const bbsTyBCodeOptions = [{ value: "", label: "선택하세요" }, { value: "url", label: "url" }];
    //발급구분
   // const bbsTyDCodeOptions = [{ value: "", label: "선택하세요" }, { value: "BUS00711", label: "열람용" }, { value: "BUS00712", label: "발급용" }];

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
                    editURL: '/sec/rmt/EgovRoleInsert.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/sec/rmt/EgovRoleUpdate.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {
        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setBoardDetail({ roleCode: ""});
            return;
        }

        const retrieveDetailURL = '/sec/rmt/EgovRole.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                roleCode: roleCode,
                //roleSort: roleSort
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
        //    alert("boardDetail [%s] -->>"+ key, boardDetail[key]);
            //alert("확인 -->>"+ roleCode);
        }
       // alert(123);
        const requestOptions = {
            method: "POST",
            headers: {
            //     'Content-type': 'application/json'
                // "Content-Type": "multipart/form-data"
            },
            body: formData
            // body: JSON.stringify({
            //     formData
            // })
        }
        //alert("롤코드>>>"+roleCode);
        EgovNet.requestFetch(modeInfo.editURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    navigate({ pathname: URL.GRPAU_ROLE_MAN });
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
    //     console.log("boardDetail");
    //     return function () {
    //     }
    // }, [boardDetail,boardAttachFiles]);

    //console.groupEnd("EgovAdminNoticeEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>롤등록</li>
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
                            <h1 className="tit_1">롤 등록</h1>
                        </div>
                        <h2 className="tit_2">롤관리 {modeInfo.modeTitle}</h2>

                        {/* <h2 className="tit_2">{masterBoard && masterBoard.bbsNm} {modeInfo.modeTitle}</h2> */}

                        <div className="board_view2">

                            <dl>
                                <dt>
                                    <label htmlFor="roleCode">롤 코드<span className="req">필수</span></label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="roleCode" name="roleCode" type="text"
                                        defaultValue={boardDetail.roleCode}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleCode: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="roleCode" name="roleCode" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.roleCode}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleCode: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>
    
                            <dl>
                                <dt>
                                    <label htmlFor="roleNm">롤 명<span className="req">필수</span></label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="roleNm" name="roleNm" type="text"
                                        defaultValue={boardDetail.roleNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleNm: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="roleNm" name="roleNm" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.roleNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleNm: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>

                            <dl>
                                <dt>
                                    <label htmlFor="rolePtn">롤 패턴<span className="req">필수</span></label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="rolePtn" name="rolePtn" type="text"
                                        defaultValue={boardDetail.rolePtn}
                                        onChange={e => setBoardDetail({ ...boardDetail, rolePtn: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="rolePtn" name="rolePtn" type="text"
                                        value={boardDetail.rolePtn}
                                        onChange={e => setBoardDetail({ ...boardDetail, rolePtn: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>

                            
                            <dl>
                                <dt>
                                    <label htmlFor="roleDc">설명</label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="roleDc" name="roleDc" type="text"
                                        defaultValue={boardDetail.roleDc}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleDc: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="roleDc" name="roleDc" type="text" 
                                        value={boardDetail.roleDc}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleDc: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="roleTyp">롤 타입 <span className="req">필수</span></label></dt>
                                <dd>
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_200" htmlFor="roleTyp">
                                         
                                            <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="롤타입유형선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, roleTyp: e.target.value })}
                                                value={boardDetail.roleTyp}
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
                                        <label className="f_select w_200" htmlFor="roleTyp">
                                         
                                        <select
                                            id="bbsTyBCodeOptions"
                                            name="bbsTyBCodeOptions"
                                            title="롤타입유형선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, roleTyp: e.target.value })}
                                            value={boardDetail.roleTyp}
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
                                <dt>
                                    <label htmlFor="roleSort">롤 sort<span className="req">필수</span></label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="roleSort" name="roleSort" type="text"
                                        defaultValue={boardDetail.roleSort}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleSort: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="roleSort" name="roleSort" type="text"
                                        value={boardDetail.roleSort}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleSort: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>

                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">등록일자</label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="roleCreatDe" name="roleCreatDe" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.roleCreatDe}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleCreatDe: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="roleCreatDe" name="roleCreatDe" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.roleCreatDe}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleCreatDe: e.target.value })}
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
                                        pathname: URL.GRPAU_ROLE_MAN,
                                        state: {
//                                            roleCode: roleCode,
                                            //roleSort: roleSort
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

export default EgovGrpauRoleManEdit;