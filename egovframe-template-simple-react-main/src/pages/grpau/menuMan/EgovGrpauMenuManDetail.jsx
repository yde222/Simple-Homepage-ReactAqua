import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';

function EgovGrpauMenuManDetail(props) {
    console.group("EgovGrpauMenuManDetail");
    console.log("------------------------------");
    console.log("EgovGrpauMenuManDetail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauMenuManDetail [location] : ", location);

    //const groupId = location.state?.groupId || "";
    const menuNo = location.state.menuNo;
    console.log("EgovGrpauMenuManDetail [menuNo] : ", menuNo);

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
//	    document.menuManageForm.action = "<c:url value='/sym/mnu/mpm/EgovMenuManageListDetailSelect.do'/>";
    	searchCondition.searchKeyword = menuNo; //

        const retrieveDetailURL = '/sym/mnu/mpm/EgovMenuManageListDetailSelect.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
        	body: JSON.stringify(searchCondition)
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
//                setMasterBoard(resp.result.brdMstrVO);
                setBoardDetail(resp.result.boardVO);
//                setUser(resp.result.user);
//                setBoardAttachFiles(resp.result.resultFiles);
            }
        );
    }

    const onClickDeleteBoardArticle = (menuNo) => {
        console.log("====>>> onClickDeleteBoardArticle= ", menuNo);
		const formData = new FormData();
        const deleteBoardURL = "/sym/mnu/mpm/EgovMenuManageDelete.do";
        
		if(formConfirm(formData)) {
		const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                menuNo: menuNo,
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("선택된 항목이 삭제되었습니다. ")
                    navigate(URL.GRPAU_MEMU_MAN,{ replace: true });
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

    console.groupEnd("EgovGrpauMenuManDetail");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>메뉴목록 관리</li>
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

                        <h2 className="tit_2">메뉴목록 관리</h2>

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
                                    <label htmlFor="menuNo">메뉴번호<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="menuNo" name="menuNo" type="text"
                                        defaultValue={boardDetail.menuNo} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, menuNo: e.target.value })}
                                        maxLength="60" />
                                </dd>
                                <dt>
                                    <label htmlFor="menuOrdr">메뉴순서<span className="req">필수</span></label>
                                    
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="menuOrdr" name="menuOrdr" type="text"
                                        defaultValue={boardDetail.menuOrdr} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, menuOrdr: e.target.value })}
                                        maxLength="10" />
                                        
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="groupNm">메뉴명 <span className="req">필수</span></label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="menuNm" name="menuNm" type="text"
                                        defaultValue={boardDetail.menuNm} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, menuNm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                                <dt>
                                    <label htmlFor="upperMenuId">상위메뉴번호<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="upperMenuId" name="upperMenuId" type="text"
                                        defaultValue={boardDetail.upperMenuId} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, upperMenuId: e.target.value })}
                                        maxLength="10" />
                                        
                                </dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="groupDc">프로그램파일명<span className="req">필수</span></label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="progrmFileNm" name="progrmFileNm" type="text"
                                        defaultValue={boardDetail.progrmFileNm} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, progrmFileNm: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="relateImageNm">관련이미지명</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="relateImageNm" name="relateImageNm" type="text"
                                        defaultValue={boardDetail.relateImageNm} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, relateImageNm: e.target.value })}
                                        maxLength="30" />
                                </dd>
                                <dt>
                                    <label htmlFor="relateImagePath">관련이미지경로</label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="relateImagePath" name="relateImagePath" type="text"
                                        defaultValue={boardDetail.relateImagePath} readOnly="readonly" 
                                        onChange={e => setBoardDetail({ ...boardDetail, relateImagePath: e.target.value })}
                                        maxLength="30" />
                                </dd>
                            </dl>


                            <dl>
                                <dt><label htmlFor="groupCreatDe">메뉴설명 </label></dt>
                                <dd>
                                <input className="f_input2 w_full" id="menuDc" name="menuDc" type="text"
                                        defaultValue={boardDetail.menuDc} readOnly="readonly"
                                        onChange={e => setBoardDetail({ ...boardDetail, menuDc: e.target.value })}
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
                                        pathname: URL.GRPAU_MEMU_MAN_MODIFY }}
                                        state={{
                                            menuNo: menuNo,
                                        }} 
                                    className="btn btn_skyblue_h46 w_100">수정</Link>
                                    <a href="" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteBoardArticle(boardDetail.menuNo);
                                    }}>삭제</a>
                                </div>
                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.GRPAU_MEMU_MAN,
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


export default EgovGrpauMenuManDetail;