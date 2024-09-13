import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
// import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
// import EgovAttachFile from 'components/EgovAttachFile';

function EgovGrpauAuthorityManDetail(props) {
    //console.group("EgovAdminNoticeDetail");
    //console.log("------------------------------");
    console.log("EgovGrpauAuthorityManDetail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauAuthorityManDetail [location] : ", location);

    // const bbsId = location.state.bbsId || NOTICE_BLDN_ID;
    const authorCode = location.state.authorCode;
    const authorNm = location.state.authorNm;
    const authorDc = location.state.authorDc;
    const authorCreatDe = location.state.authorCreatDe;

    const searchCondition = location.state.searchCondition;

    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [boardDetail, setBoardDetail] = useState({});

    
    //본문
    const retrieveDetail = () => {
        const retrieveDetailURL = '/sec/ram/EgovAuthor.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                 authorCode: authorCode,
                // authorNm: authorNm,
                // authorDc: authorDc,
                // authorCreatDe: authorCreatDe
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

    const onClickDeleteBoardArticle = () => {
		const formData = new FormData();
        const deleteBoardURL = '/sec/ram/EgovAuthorDelete.do';
        
		if(formConfirm(formData)) {
		const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                authorCode: authorCode,
               // authorNm: authorNm
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("선택된 권한정보가 삭제되었습니다. ")
                    navigate(URL.GRPAU_AUTHORITY_MAN ,{ replace: true });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
	  }
    }

	const formConfirm = (formData) => {
	if (window.confirm("삭제하시겠습니까?")) {
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

    //console.groupEnd("EgovAdminNoticeDetail");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>권한 관리</li>
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

                        <h2 className="tit_2">권한관리</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                            </div>
                    {/* 본문 시작*/}
                        <div className="board_view2">
                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">권한코드<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="authorCode" name="authorCode" type="text"
                                        defaultValue={location.state.authorCode} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, authorCode: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="bbsTyACode">권한명 <span className="req">필수</span></label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="authorNm" name="authorNm" type="text"
                                       defaultValue={location.state.authorNm} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, authorNm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="bbsTyBCode">설명</label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="authorDc" name="authorDc" type="text"
                                        defaultValue={location.state.authorDc} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, authorDc: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="bbsTyCCode">등록일자</label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="authorCreatDe" name="authorCreatDe" type="text"
                                        defaultValue={location.state.authorCreatDe} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, authorCreatDe: e.target.value })}
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
                                        pathname: URL.GRPAU_AUTHORITY_MAN_MODIFY }}
                                        state={{
                                            authorCode: authorCode
                                        }} 
                                    className="btn btn_skyblue_h46 w_100">수정</Link>
                                    <a href="" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteBoardArticle(authorCode);
                                    }}>삭제</a>
                                </div>
                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.GRPAU_AUTHORITY_MAN,
                                        state: {
                                            authorCode: authorCode,
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


export default EgovGrpauAuthorityManDetail;