import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
//import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';

function EgovGrpauUserInsertDetail(props) {
    console.group("EgovAdminNoticeDetail");
    console.log("------------------------------");
    console.log("EgovAdminNoticeDetail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovAdminNoticeDetail [location] : ", location);
    //건축물유형
    const bbsTyBCodeOptions = [{ value: "", label: "선택하세요" }, { value: "URL", label: "URL" }];
    const roleCode = location.state.roleCode
    //const nttId = location.state.nttId;
    const searchCondition = location.state.searchCondition;

    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();
    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    //const [roleCode, setRoleCode] = useState();
    const [roleSort, setRoleSort] = useState();

    
    //본문
    const retrieveDetail = () => {
        const retrieveDetailURL = '/sec/rmt/EgovRole.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                roleCode: roleCode
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setMasterBoard(resp.result.brdMstrVO);
                setBoardDetail(resp.result.boardVO);
                setUser(resp.result.user);
            }
        );
    }

    const onClickDeleteBoardArticle = (roleCode) => {
		const formData = new FormData();
        const deleteBoardURL = "/sec/rmt/EgovDtlDelRole.do";
        
		if(formConfirm(formData)) {
		const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                roleCode: roleCode
                
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("선택된 롤 정보가 삭제되었습니다. ")
                    navigate(URL.GRPAU_ROLE_MAN ,{ replace: true });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
	  }
    }

	const formConfirm = (formData) => {
	if (window.confirm("해당 롤 정보를 삭제하시겠습니까?")) {
		return true;
	}else {
		return false;
		
		}
	}
	
    useEffect(function () {
        retrieveDetail();
        return function () {
        }
    }, []);

    console.groupEnd("롤 상세보기");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>롤 관리</li>
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
                            <h1 className="tit_1">그룹및권한 관리</h1>
                        </div>

                        <h2 className="tit_2">롤관리</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                                {/* <div className="tit">{boardDetail && boardDetail.role}</div> */}
                                {/* <div className="info">
                                    <dl>
                                        <dt>작성자</dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterId}</dd>
                                    </dl>
                                    <dl>
                                        <dt>작성일</dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterPnttm}</dd>
                                    </dl>
                                    <dl>
                                        <dt>조회수</dt>
                                        <dd>{boardDetail && boardDetail.inqireCo}</dd>
                                    </dl>
                                </div> */}
                            </div>
                    {/* 본문 시작*/}
                        <div className="board_view2">
                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">롤코드<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="roleCode" name="roleCode" type="text"
                                        defaultValue={boardDetail.roleCode} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, roleCode: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="bbsTyACode">롤명 <span className="req">필수</span></label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="roleNm" name="roleNm" type="text"
                                        defaultValue={boardDetail.roleNm} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, roleNm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="bbsTyBCode">롤패턴 <span className="req">필수</span></label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="rolePtn" name="rolePtn" type="text"
                                        defaultValue={boardDetail.rolePtn} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, rolePtn: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="bbsTyCCode">설명</label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="roleDc" name="roleDc" type="text"
                                        defaultValue={boardDetail.roleDc} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, roleDc: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>                            
                            <dl>
                                <dt><label htmlFor="bbsTyDCode">롤타입 <span className="req">필수</span></label></dt>
                               <dd> 
                               <input className="f_input2 w_full" id="roleTyp" name="roleTyp" type="text"
                                        defaultValue={boardDetail.roleTyp} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, roleTyp: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="nttCn">롤Sort <span className="req">필수</span></label></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_100" id="roleSort" name="roleSort" cols="30" rows="10" readOnly="readOnly"
                                        defaultValue={boardDetail.roleSort}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleSort: e.target.value })}></textarea>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="nttCn">등록일자 </label></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_100" id="roleCreatDe" name="roleCreatDe" cols="30" rows="10" readOnly="readOnly"
                                        defaultValue={boardDetail.roleCreatDe}
                                        onChange={e => setBoardDetail({ ...boardDetail, roleCreatDe: e.target.value })}></textarea>
                                </dd>
                            </dl>
                 

                        </div>
                {/* 본문 끝 */}
                            <div className="board_article">
                            </div>
                            <div className="board_attach">
                            </div>


                            <div className="board_btn_area">
                                <div className="left_col btn3">
                                <Link to={{
                                        pathname: URL.GRPAU_ROLE_MAN_MODIFY }}
                                        state={{
                                            roleCode: roleCode,
                                            roleSort: roleSort
                                        }} 
                                    className="btn btn_skyblue_h46 w_100">수정</Link>
                                    <a href="" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteBoardArticle(boardDetail.roleCode);
                                    }}>삭제</a>
                                </div>
                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.GRPAU_ROLE_MAN,
                                        state: {
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


export default EgovGrpauUserInsertDetail;