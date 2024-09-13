import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
//import EgovAttachFile from 'components/EgovAttachFile';

function EgovGrpauUserGroupDetail(props) {
    console.group("EgovGrpauUserGroupDetail");
    console.log("------------------------------");
    console.log("EgovGrpauUserGroupDetail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauUserGroupDetail [location] : ", location);

    //const groupId = location.state?.groupId || "";
    const groupId = location.state.groupId;
    console.log("EgovGrpauUserGroupDetail [groupId] : ", groupId);

//    const bbsId = location.state.bbsId || NOTICE_BLDN_ID;
//    const nttId = location.state.nttId;
    const searchCondition = location.state.searchCondition;

    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
//    const [boardAttachFiles, setBoardAttachFiles] = useState();
    const [modeInfo, setModeInfo] = useState({ mode: props.mode });

    
    //본문
    const retrieveDetail = () => {
        const retrieveDetailURL = '/sec/gmt/EgovGroup.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                groupId: groupId,
//                nttId: nttId
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setMasterBoard(resp.result.brdMstrVO);
                setBoardDetail(resp.result.boardVO);
                setUser(resp.result.user);
//                setBoardAttachFiles(resp.result.resultFiles);
            }
        );
    }

    const onClickDeleteBoardArticle = (groupId) => {
        console.log("====>>> onClickDeleteBoardArticle= ", groupId);
		const formData = new FormData();
        const deleteBoardURL = "/sec/gmt/EgovGroupDelete.do";
        
		if(formConfirm(formData)) {
		const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                groupId: groupId,
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("선택된 그룹이 삭제되었습니다. ")
                    navigate(URL.GRPAU_USER_GROUP,{ replace: true });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
	  }
    }

	const formConfirm = (formData) => {
	if (window.confirm("관련되는 테이블 정보가 삭제됩니다.")) {
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

    console.groupEnd("EgovAdminNoticeDetail");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>사용자 그룹관리</li>
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

                        <h2 className="tit_2">사용자 그룹관리</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                                {/* <div className="tit">{boardDetail && boardDetail.groupId}</div>
                                <div className="info">
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
                                    <label htmlFor="groupId">그룹ID<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="groupId" name="groupId" type="text"
                                        defaultValue={boardDetail.groupId} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, groupId: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="groupNm">그룹명 <span className="req">필수</span></label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="groupNm" name="groupNm" type="text"
                                        defaultValue={boardDetail.groupNm} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, groupNm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="groupDc">그룹설명 </label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="groupNm" name="groupDc" type="text"
                                        defaultValue={boardDetail.groupDc} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, groupDc: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="groupCreatDe">등록일자 </label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="groupCreatDe" name="groupCreatDe" type="text"
                                        defaultValue={boardDetail.groupCreatDe} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, groupCreatDe: e.target.value })}
                                        maxLength="60" />
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
                                        pathname: URL.GRPAU_USER_GROUP_MODIFY }}
                                        state={{
                                            groupId: groupId,
                                        }} 
                                    className="btn btn_skyblue_h46 w_100">수정</Link>
                                    <a href="" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteBoardArticle(boardDetail.groupId);
                                    }}>삭제</a>
                                </div>
                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.GRPAU_USER_GROUP,
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


export default EgovGrpauUserGroupDetail;