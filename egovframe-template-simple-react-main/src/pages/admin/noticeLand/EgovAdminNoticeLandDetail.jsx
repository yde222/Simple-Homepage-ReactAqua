import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { NOTICE_LAND_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import EgovAttachFile from 'components/EgovAttachFile';

function EgovAdminNoticeLandDetail(props) {
    console.group("EgovAdminNoticeLandDetail");
    console.log("------------------------------");
    console.log("EgovAdminNoticeDetail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();

    const bbsId = location.state.bbsId || NOTICE_LAND_ID;
    const nttId = location.state.nttId;
    const searchCondition = location.state.searchCondition;

    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();

	const [modeInfo, setModeInfo] = useState({ mode: props.mode });

    //본문
    const retrieveDetail = () => {
        const retrieveDetailURL = '/cop/land/selectBoardArticleAPI.do';
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
                setBoardDetail(resp.result.boardLandVO);
                setUser(resp.result.user);
                setBoardAttachFiles(resp.result.resultFiles);
            }
        );
    }

    const onClickDeleteBoardArticle = (bbsId, nttId) => {
        const formData = new FormData();
		const deleteBoardURL = "/cop/land/deleteBoardArticleAPI.do";
        
		if(formConfirm(formData)) {
		const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId,
                nttId: nttId,
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
						//window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
	                    alert("선택된 토지임야대장이 삭제되었습니다.")
	                    navigate(URL.ADMIN_NOTICE_LAND,{ replace: true });
				} else {
                    alert("ERR : " + resp.resultMessage);
                }
            }
        );
	  }
   }

	const formConfirm = (formData) => {
	if (window.confirm("관련되는 상세 테이블 정보도 삭제됩니다.")) {
		return true;
	}else {
		return false;
		
		}
	}

    useEffect(function () {
        retrieveDetail();
//        return function () {
//        }
    }, []);
    
    console.groupEnd("EgovAdminNoticeDetail");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>{masterBoard && masterBoard.bbsNm}</li>
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
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                                <div className="tit">{boardDetail && boardDetail.nttSj}</div>
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
                                </div>
                            </div>
                            {/* 본문 시작*/}
							<div className="board_view2">
								<dl>
                                <dt>
                                    <label htmlFor="nttSj">고객사<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="nttSj" name="nttSj" type="text"
                                        defaultValue={boardDetail.nttSj} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, nttSj: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            	</dl>
                                <dl>
                                    <dt><label htmlFor="bbsTyACode">종류</label><span className="req">필수</span></dt>
                                    <dd>
                                        <input className="f_input2 w_full" type="text" name="nttSj" title="" id="nttSj" placeholder="" readOnly
                                            defaultValue={boardDetail.bbsTyACode}
                                            onChange={e => setBoardDetail({ ...boardDetail, nttSj: e.target.value })}
                                        />
                                    </dd>
                                </dl>

                                <dl>
                                    <dt><label htmlFor="bbsTyBCode">발급구분</label><span className="req">필수</span></dt>
                                    <dd>
                                        <input className="f_input2 w_full" type="text" name="nttSj" title="" id="nttSj" placeholder="" readOnly
                                            defaultValue={boardDetail.bbsTyBCode}
                                            onChange={e => setBoardDetail({ ...boardDetail, nttSj: e.target.value })}
                                        />
                                    </dd>
                                </dl>
								<dl>
                                <dt><label htmlFor="nttCn">주소 </label></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_100" id="nttCn" name="nttCn" cols="30" rows="10" readOnly="readOnly"
                                        defaultValue={boardDetail.nttCn}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttCn: e.target.value })}></textarea>
                                </dd>
                            </dl>
							{modeInfo?.mode !== CODE.MODE_REPLY &&
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
                            </div>
					{/* 본문 끝 */}
							<div className="board_article">
                            </div>
                            {<div className="board_attach">
                            </div>}


                            <div className="board_btn_area">
                                <div className="left_col btn3">
                                    <Link to={{
                                        pathname: URL.ADMIN_NOTICE_LAND_MODIFY }}
                                        state={{
                                            nttId: nttId,
                                            bbsId: bbsId
                                        }} 
									className="btn btn_skyblue_h46 w_100">수정</Link>
                                    <a href="" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteBoardArticle(boardDetail.bbsId, boardDetail.nttId);
                                    }}>삭제</a>
                                </div>

                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.ADMIN_NOTICE_LAND,
                                        state: {
                                            nttId: nttId,
                                            bbsId: bbsId,
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

export default EgovAdminNoticeLandDetail;