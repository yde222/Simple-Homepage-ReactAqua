import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
//import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
//import EgovAttachFile from 'components/EgovAttachFile';

function EgovGrpauPrgManDetail(props) {
    console.group("EgovGrpauPrgManDetail");
    console.log("------------------------------");
    console.log("EgovGrpauPrgManDetail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauPrgManDetail [location] : ", location);

    //const groupId = location.state?.groupId || "";
    const progrmFileNm = location.state.progrmFileNm;
    console.log("EgovGrpauPrgManDetail [progrmFileNm] : ", progrmFileNm);

//    const bbsId = location.state.bbsId || NOTICE_BLDN_ID;
//    const nttId = location.state.nttId;
//    const searchCondition = location.state.searchCondition;
    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { pageIndex: 1 });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시

    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
//    const [boardAttachFiles, setBoardAttachFiles] = useState();
    const [modeInfo, setModeInfo] = useState({ mode: props.mode });

    
    //본문
    const retrieveDetail = () => {
    	searchCondition.searchKeyword = progrmFileNm; //파라메터 세팅
        const retrieveDetailURL ='/sym/prm/EgovProgramListDetailSelect.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
        	body: JSON.stringify(searchCondition) /* SearchCondition => 검색조건 */
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
            setMasterBoard(resp.result.brdMstrVO);
             setBoardDetail(resp.result.boardVO);
//                setUser(resp.result.user);
//                setBoardAttachFiles(resp.result.resultFiles);
                
            }
        );
    }

    const onClickDeleteBoardArticle = (progrmFileNm) => {
        console.log("====>>> onClickDeleteBoardArticle=", progrmFileNm);
		const formData = new FormData();
        const deleteBoardURL = "/sym/prm/EgovProgramListManageDelete.do";
        
		if(formConfirm(formData)) {
		const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
                  body: JSON.stringify({
                    progrmFileNm: progrmFileNm,
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("선택된 데이터 삭제되었습니다. ")
                    navigate(URL.GRPAU_PRG_MAN,{ replace: true });
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

    console.groupEnd("EgovGrpauPrgManDetail");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>프로그램목록관리</li>
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

                        <h2 className="tit_2">프로그램 목록관리</h2>

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
                                    <label htmlFor="progrmFileNm">프로그램파일명<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                     <input className="f_input2 w_full" id="progrmFileNm" name="progrmFileNm" type="text"
                                        defaultValue={boardDetail.progrmFileNm} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, progrmFileNm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="progrmStrePath">저장경로 <span className="req">필수</span></label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="progrmStrePath" name="progrmStrePath" type="text"
                                        defaultValue={boardDetail.progrmStrePath} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, progrmStrePath: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="progrmKoreanNm">프로그램 한글명 <span className="req">필수</span></label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="progrmKoreanNm" name="progrmKoreanNm" type="text"
                                        defaultValue={boardDetail.progrmKoreanNm} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, progrmKoreanNm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="url">URL<span className="req">필수</span></label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="url" name="url" type="text"
                                        defaultValue={boardDetail.url} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, url: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl id='progrmDc' style={{
                                    height:"200px"
                                }}>
                                <dt><label htmlFor="progrmDc">프로그램 설명 </label></dt>
                                <dd>
                                <input className="f_input2 w_full " id="progrmDc" name="progrmDc" type="text" style={{
                                    height:"200px"
                                }} 
                                        defaultValue={boardDetail.progrmDc} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, progrmDc: e.target.value })}
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
                                        pathname: URL.GRPAU_PRG_MAN_MODIFY }}
                                        state={{
                                            progrmFileNm: progrmFileNm,
                                        }} 
                                    className="btn btn_skyblue_h46 w_100">수정</Link>
                                    <a href="" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteBoardArticle(boardDetail.progrmFileNm);
                                    }}>삭제</a>
                                </div>
                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.GRPAU_PRG_MAN,
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


export default EgovGrpauPrgManDetail;