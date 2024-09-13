import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
//import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovAttachFile from 'components/EgovAttachFile';

function EgovGrpauUserInsertDetail(props) {
    console.group("EgovGrpauUserInsertDetail");
    console.log("------------------------------");
    console.log("EgovGrpauUserInsertDetail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauUserInsertDetail [location] : ", location);

    //const bbsId = location.state.bbsId || NOTICE_BLDN_ID;
    const nttId = location.state.nttId;
    const userId = location.state.userId;
    const uniqId = location.state.uniqId;
    const searchCondition = location.state.searchCondition;

    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();
    const [modeInfo, setModeInfo] = useState({ mode: props.mode });

    
    //본문
    const retrieveDetail = () => {
        const retrieveDetailURL = '/uss/umt/EgovUserSelectDetailView.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uniqId : userId,
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
//                setMasterBoard(resp.result.brdMstrVO);
console.log("====>>> resp.result.userManageVO= ", resp.result.userManageVO);
                  setBoardDetail(resp.result.userManageVO);
//                setUser(resp.result.user);
            }
        );
    }

    const onClickDeleteBoardArticle = (emplyrId) => {
		const formData = new FormData();
        const deleteBoardURL = "/uss/umt/user/EgovUserDelete.do";
        
		if(formConfirm(formData)) {
		const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                checkedList: emplyrId+",",
//                nttId: nttId
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("선택된 사용자가 삭제되었습니다.")
                    navigate(URL.GRPAU_USER_INSERT,  { replace: true });  
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
	  }
    }

	const formConfirm = (formData) => {
	if (window.confirm("관련되는 사용자등록 정보가 삭제됩니다.")) {
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

    console.groupEnd("EgovGrpauUserInsertDetail");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU_USER_INSERT}>그룹및권한 관리</Link></li>
                        <li>사용자 등록관리</li>
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

                        <h2 className="tit_2">사용자등록관리(상세)</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                            </div>
                    {/* 본문 시작*/}
                        <div className="board_view2">
                            <dl>
                                <dt>
                                    <label htmlFor="emplyrId">사용자아이디<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="emplyrId" name="emplyrId" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.emplyrId}
                                        onChange={e => setBoardDetail({ ...boardDetail, emplyrId: e.target.value })}
                                        maxLength="60" />
                                        
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="emplyrNm">이름<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="emplyrNm" name="emplyrNm" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.emplyrNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, emplyrNm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="password">비밀번호<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="password" name="password" type="password" readOnly="readOnly"
                                        defaultValue={boardDetail.password}
                                        onChange={e => setBoardDetail({ ...boardDetail, password: e.target.value })}
                                        maxLength="60" />
                                        
                                </dd>
                                <dt>
                                    <label htmlFor="password2">비밀번호 확인<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="password2" name="password2" type="password" readOnly="readOnly"
                                        defaultValue={boardDetail.password}
                                        onChange={e => setBoardDetail({ ...boardDetail, password: e.target.value })}
                                        maxLength="60" />
                                        
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="passwordHint">비밀번호 힌트<span className="req">필수</span></label></dt>
                                <dd>
                                    {/* 수정/조회 일때 변경 불가 */}
                                    <input className="f_input2 w_full" id="passwordHint" name="passwordHint" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.passwordHint}
                                        onChange={e => setBoardDetail({ ...boardDetail, passwordHint: e.target.value })}
                                        maxLength="60" />
                                </dd>
                                <dt>
                                    <label htmlFor="passwordCnsr">비밀번호 정답<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="passwordCnsr" name="passwordCnsr" type="text"  readOnly="readOnly"
                                        defaultValue={boardDetail.passwordCnsr}
                                        onChange={e => setBoardDetail({ ...boardDetail, passwordCnsr: e.target.value })}
                                        maxLength="60" />
                                        
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="insttCode">소속기관<span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="insttCode" name="insttCode" type="text"  readOnly="readOnly"
                                        defaultValue={boardDetail.insttCode}
                                        onChange={e => setBoardDetail({ ...boardDetail, insttCode: e.target.value })}
                                        maxLength="60" />
                                        
                                </dd>
                                <dt><label htmlFor="orgnztId">조직코드<span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="orgnztId" name="orgnztId" type="text"  readOnly="readOnly"
                                        defaultValue={boardDetail.orgnztId}
                                        onChange={e => setBoardDetail({ ...boardDetail, orgnztId: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="emailAdres">이메일주소</label>
                                    
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="emailAdres" name="emailAdres" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.emailAdres}
                                        onChange={e => setBoardDetail({ ...boardDetail, emailAdres: e.target.value })}
                                        maxLength="60" />
                                        
                                </dd>
                                <dt>
                                    <label htmlFor="moblphonNo">전화번호</label>
                                    
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="moblphonNo" name="moblphonNo" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.moblphonNo}
                                        onChange={e => setBoardDetail({ ...boardDetail, moblphonNo: e.target.value })}
                                        maxLength="60" />
                                        
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="userNm">우편번호</label>
                                </dt>
                                <dd>
                                        <input className="f_input2 w_full" id="zip" name="zip" type="text"  readOnly="readOnly"
                                            defaultValue={boardDetail.zip}
                                            onChange={e => setBoardDetail({ ...boardDetail, zip: e.target.value })}
                                            maxLength="6" />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="homeadres">주소</label>
                                    
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="homeadres" name="homeadres" type="text"  readOnly="readOnly"
                                        defaultValue={boardDetail.homeadres}
                                        onChange={e => setBoardDetail({ ...boardDetail, homeadres: e.target.value })}
                                        maxLength="60" />
                                        
                                </dd>
                                <dt>
                                    <label htmlFor="detailAdres">상세주소</label>
                                    
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="detailAdres" name="detailAdres" type="text"   readOnly="readOnly"
                                        defaultValue={boardDetail.detailAdres}
                                        onChange={e => setBoardDetail({ ...boardDetail, detailAdres: e.target.value })}
                                        maxLength="60" />
                                        
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="emplyrSttusCode">사용자상태코드 <span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="emplyrSttusCode" name="emplyrSttusCode" type="text"   readOnly="readOnly"
                                        defaultValue={boardDetail.emplyrSttusCode}
                                        onChange={e => setBoardDetail({ ...boardDetail, emplyrSttusCode: e.target.value })}
                                        maxLength="60" />
                                        
                                </dd>
                                <dt><label htmlFor="groupId">그룹아이디 <span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="groupId" name="groupId" type="text"   readOnly="readOnly"
                                        defaultValue={boardDetail.groupId}
                                        onChange={e => setBoardDetail({ ...boardDetail, groupId: e.target.value })}
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
                                        pathname: URL.GRPAU_USER_INSERT_MODIFY }}
                                        state={{
                                            emplyrId: boardDetail.emplyrId,
//                                            bbsId: bbsId
                                        }} 
                                    className="btn btn_skyblue_h46 w_100">수정</Link>
                                    <a href="" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteBoardArticle(boardDetail.emplyrId);
                                    }}>삭제</a>
                                </div>
                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.GRPAU_USER_INSERT,
                                        state: {
                                            nttId: nttId,
//                                            bbsId: bbsId,
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