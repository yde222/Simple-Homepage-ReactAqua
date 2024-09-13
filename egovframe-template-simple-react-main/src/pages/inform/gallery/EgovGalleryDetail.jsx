import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { GALLERY_BBS_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavInform';
import EgovAttachFile from 'components/EgovAttachFile';
import EgovImageGallery from 'components/EgovImageGallery';
//다국어지원 임포트 
import enUsMsg from "../../../AquaLang/EgovGallery_en-us.json";
import koMsg from "../../../AquaLang/EgovGallery_ko.json";
import { IntlProvider } from 'react-intl'; 
import { FormattedMessage } from 'react-intl';

function EgovGalleryDetail(props) {
    console.groupEnd("EgovGalleryDetail");
    console.log("------------------------------");
    console.log("EgovGalleryDetail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGalleryDetail [location] : ", location);

    const bbsId = location.state.bbsId || GALLERY_BBS_ID;
    const nttId = location.state.nttId;
    const searchCondition = location.state.searchCondition;

    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();

//다국어지원 설정
	const locale = localStorage.getItem("locale") ?? "ko";
	const messages = { "en-US": enUsMsg, ko: koMsg }[locale]

    const retrieveDetail = () => {
        const retrieveDetailURL = '/cop/bbs/selectBoardArticleAPI.do';
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
                setBoardDetail(resp.result.boardVO);
                setUser(resp.result.user);
                setBoardAttachFiles(resp.result.resultFiles);
            }
        );
    }

    const onClickDeleteBoardArticle = (bbsId, nttId) => {
        const deleteBoardURL = `/cop/bbs/deleteBoardArticleAPI/${nttId}.do`;
        const jToken = localStorage.getItem('jToken');
        const requestOptions = {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': jToken
            },
            body: JSON.stringify({
                bbsId: bbsId
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("게시글이 삭제되었습니다.")
                    navigate(URL.INFORM_GALLERY ,{ replace: true });
                } else {
                    navigate({pathname: URL.ERROR}, {state: {msg : resp.message}});
                }

            }
        );
    }

    useEffect(function () {
        retrieveDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.groupEnd("EgovGalleryDetail");

    return (
	<IntlProvider locale={locale} messages={messages}>  {/* <!-- 다국어지원 --> */}
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.INFORM}><FormattedMessage id="tit_1" defaultMessage="알림마당"/></Link></li>
                        <li><FormattedMessage id="tit_2" defaultMessage="양식장"/></li>
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
                           <h1 className="tit_1"><FormattedMessage id="tit_1" defaultMessage="알림마당"/></h1>                            
                        </div>

                        <h2 className="tit_2"><FormattedMessage id="tit_2" defaultMessage="양식장"/></h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                                <div className="tit">{boardDetail && boardDetail.nttSj}</div>
                                <div className="info">
                                    <dl>
                                        <dt><FormattedMessage id="author" defaultMessage="작성자"/></dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterNm}</dd>
                                    </dl>
                                    <dl>
                                        <dt><FormattedMessage id="dateCreation" defaultMessage="작성일"/></dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterPnttm}</dd>
                                    </dl>
                                    <dl>
                                        <dt><FormattedMessage id="viewCount" defaultMessage="조회수"/></dt>
                                        <dd>{boardDetail && boardDetail.inqireCo}</dd>
                                    </dl>
                                </div>
                            </div>

                        <div className="board_view2">
                            <dl>
                                <dt><label htmlFor="sensorSamplingTime">
											<FormattedMessage id="sensorSamplingTime" defaultMessage="센서 샘플링타임(초)"/><span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="nttCn" name="nttCn" type="text"  readOnly="readonly"
                                        defaultValue={boardDetail.nttCn}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttCn: e.target.value })}
                                        maxLength="10" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="gridPanelColor">
											<FormattedMessage id="gridPanelColor" defaultMessage="그리패널 칼라"/></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="parnts" name="parnts" type="text" readOnly="readonly"
                                        defaultValue={boardDetail.parnts}
                                        onChange={e => setBoardDetail({ ...boardDetail, parnts: e.target.value })}
                                        maxLength="10" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="cameraCaptureType">
											<FormattedMessage id="cameraCaptureType" defaultMessage="카메라 캡쳐타입(시간)"/></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="ntceBgnde" name="ntceBgnde" type="text" readOnly="readonly"
                                        defaultValue={boardDetail.ntceBgnde}
                                        onChange={e => setBoardDetail({ ...boardDetail, ntceBgnde: e.target.value })}
                                        maxLength="10" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="cameraCaptureFrequency">
											<FormattedMessage id="cameraCaptureFrequency" defaultMessage="카메라 캡쳐횟수"/></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="ntceEndde" name="ntceEndde" type="text" readOnly="readonly"
                                        defaultValue={boardDetail.ntceEndde}
                                        onChange={e => setBoardDetail({ ...boardDetail, ntceEndde: e.target.value })}
                                        maxLength="10" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="videoRecordingInterval">
											<FormattedMessage id="videoRecordingInterval" defaultMessage="비디오 녹화간격(시간)"/></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="ntcrId" name="ntcrId" type="text" readOnly="readonly"
                                        defaultValue={boardDetail.ntcrId}
                                        onChange={e => setBoardDetail({ ...boardDetail, ntcrId: e.target.value })}
                                        maxLength="10" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="videoRecordingDuration">
											<FormattedMessage id="videoRecordingDuration" defaultMessage="비디오 녹화타임(분)"/></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="ntcrNm" name="ntcrNm" type="text" readOnly="readonly"
                                        defaultValue={boardDetail.ntcrNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, ntcrNm: e.target.value })}
                                        maxLength="10" />
                                </dd>
                            </dl>

                        </div>

                            <EgovImageGallery boardFiles={boardAttachFiles} />

                            <div className="board_attach">
                                {/* 답글이 아니고 게시판 파일 첨부 가능 상태에서만 첨부파일 컴포넌트 노출 */}
                                {(boardDetail.parnts === '0') && masterBoard.fileAtchPosblAt === 'Y' && <EgovAttachFile boardFiles={boardAttachFiles} />}
                            </div>


                            <div className="board_btn_area">
                                {user.id && masterBoard.bbsUseFlag === 'Y' &&
                                    <div className="left_col btn3">
                                        <Link to={{pathname: URL.INFORM_GALLERY_MODIFY}}
                                            state={{
                                                nttId: nttId,
                                                bbsId: bbsId
                                            }}
                                            className="btn btn_skyblue_h46 w_100"><FormattedMessage id="editBtn" defaultMessage="수정"/></Link>
                                        <a href="#!" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                            e.preventDefault();
                                            onClickDeleteBoardArticle(boardDetail.bbsId, boardDetail.nttId);
                                        }}><FormattedMessage id="deleteBtn" defaultMessage="삭제"/></a>
                                    </div>
                                }
                                <div className="right_col btn1">
                                    <Link to={{pathname: URL.INFORM_GALLERY}}
                                        state={{
                                            nttId: nttId,
                                            bbsId: bbsId,
                                            searchCondition: searchCondition
                                        }}
                                        className="btn btn_blue_h46 w_100"><FormattedMessage id="listBtn" defaultMessage="목록"/></Link>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 게시판 상세보기 --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
</IntlProvider>
    );
}


export default EgovGalleryDetail;