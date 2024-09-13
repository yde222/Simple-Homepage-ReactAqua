import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { NOTICE_EST_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//다국어지원 임포트
import enUsMsg from "../../../AquaLang/EgovNoticeEst_en-us.json";
import koMsg from "../../../AquaLang/EgovNoticeEst_ko.json";

import { FormattedMessage, IntlProvider } from 'react-intl';
import fishFormVaildator from 'utils/fishFormVaildator';




function EgovAdminNoticeEstEdit(props) {
    console.group("EgovAdminNoticeEdit EST!");
    console.log("[Start] EgovAdminNoticeEstEdit ------------------------------");
    console.log("EgovAdminNoticeEdit [props] ///////// : ", props);

    const navigate = useNavigate();
    const location = useLocation();

    //다국어지원 설정
    const locale = localStorage.getItem("locale") ?? "ko";
    const messages = { "en-US": enUsMsg, ko: koMsg }[locale]

    const bbsId = location.state?.bbsId || NOTICE_EST_ID;
    const nttId = location.state?.nttId || "";
//    const bbsTyACodeOptions = [{ value: "", label: "선택하세요" }, { value: "BUS0051", label: "부동산 등기부등본" }];
//    const bbsTyBCodeOptions = [{ value: "", label: "선택하세요" }, { value: "BUS0052", label: "토지" }, { value: "BUS0053", label: "건물" }, { value: "BUS0054", label: "집합건물" }];

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);

// const [selectedDate, setSelectedDate] = useState(boardDetail.bbsTyCCode ? new Date(boardDetail.bbsTyCCode) : null);
// const [selectedDate2, setSelectedDate2] = useState(boardDetail.bbsTyDCode ? new Date(boardDetail.bbsTyDCode) : null);

    useEffect(() => {
    // 신규 등록이 아닌 경우, boardDetail.bbsTyCCode의 값을 선택된 날짜로 설정합니다.
    if (boardDetail.bbsTyCCode) {
        setSelectedDate(new Date(boardDetail.bbsTyCCode));
    }
    }, [boardDetail.bbsTyCCode]);

    useEffect(() => {
    // 신규 등록이 아닌 경우, boardDetail.bbsTyDCode의 값을 선택된 날짜로 설정합니다.
    if (boardDetail.bbsTyDCode) {
        setSelectedDate2(new Date(boardDetail.bbsTyDCode));
    }
    }, [boardDetail.bbsTyDCode]);

    const handleChange = date => {
    setSelectedDate(date);
    // 선택된 날짜를 yyyy/mm/dd 형태의 문자열로 변환하여 boardDetail 상태를 업데이트합니다.
    //const formattedDate = date ? date.toISOString().slice(0, 10) : ''; // yyyy-mm-dd 형식의 문자열을 얻습니다.
    const formattedDate = date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) : '';

    setBoardDetail({ ...boardDetail, bbsTyCCode: formattedDate });
    };


    const handleChange2 = date => {
    setSelectedDate2(date);
    // 선택된 날짜를 yyyy/mm/dd 형태의 문자열로 변환하여 boardDetail 상태를 업데이트합니다.
    //const formattedDate = date ? date.toISOString().slice(0, 10) : ''; // yyyy-mm-dd 형식의 문자열을 얻습니다.
    const formattedDate = date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) : '';

    setBoardDetail({ ...boardDetail, bbsTyDCode: formattedDate });
    };

    const intMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: <FormattedMessage id="registBtn" defaultMessage="등록"/>,
                    editURL: '/cop/est/insertBoardArticleAPI.do',
                });

                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: <FormattedMessage id="editBtn" defaultMessage="수정"/>,
                    editURL: '/cop/est/updateBoardArticleAPI.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {

        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setBoardDetail({
                bbsId: bbsId,
                nttSj: "",
            });
            return;
        }

        const retrieveDetailURL = '/cop/est/selectBoardArticle2API.do';
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

    const updateBoard = () => {
        const formData = new FormData();
        for (let key in boardDetail) {
            formData.append(key, boardDetail[key]);
            //console.log("boardDetail [%s] ", key, boardDetail[key]);
        }

        // const requestOptions = {
        //     method: "POST",
        //     headers: {

        //     },
        //     body: formData
        // }

        const jToken = localStorage.getItem('jToken');

        if (fishFormVaildator(formData)) {
            const requestOptions = {
                method: "POST",
                headers: {
                    'Authorization': jToken
                },
                body: formData
            }

        EgovNet.requestFetch(modeInfo.editURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    navigate(URL.ADMIN_NOTICE_EST ,{ state:{bbsId : bbsId} });
//                    history.push({ pathname: URL.ADMIN_NOTICE_EST });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
    }
};

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

    console.log("------------------------------EgovAdminNoticeEdit EST! [End]");
    console.groupEnd("EgovAdminNoticeEdit EST!");

    return (
        <IntlProvider locale={locale} messages={messages}>  {/* <!-- 다국어지원 --> */}
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN_NOTICE_EST}><FormattedMessage id="tit_2" defaultMessage="물고기 대장"/></Link></li>
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
                            <h1 className="tit_1">
                                <FormattedMessage id="tit_2" defaultMessage="물고기 대장"/>
                            </h1>
                        </div>

                        <h2 className="tit_2">
                        {masterBoard && masterBoard.bbsNm} {modeInfo.modeTitle}
                            </h2>

                        <div className="board_view2">
                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">
                                    <FormattedMessage id="nttSj" defaultMessage="물고기 ID"/>
                                    <span className="req">필수</span></label>
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="nttSj" name="nttSj" type="text" 
                                        value={boardDetail.nttSj}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttSj: e.target.value })}
                                        maxLength="60" />
                                }
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="nttSj" name="nttSj" type="text" readonly = "readOnly"
                                        value= {boardDetail.nttSj}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttSj: e.target.value })}
                                        maxLength="60" />
                                }
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="bbsTyACode">
                                    <FormattedMessage id="bbsTyACode" defaultMessage="사이즈(cm)"/>
                                    <span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="bbsTyACode" name="bbsTyACode" type="text"
                                        value={boardDetail.bbsTyACode}
                                        onChange={e => setBoardDetail({ ...boardDetail, bbsTyACode: e.target.value })}
                                        maxLength="10" />
                                </dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="bbsTyBCode">
                                    <FormattedMessage id="bbsTyBCode" defaultMessage="평균(cm)"/>
                                    <span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="bbsTyBCode" name="bbsTyBCode" type="text"
                                        value={boardDetail.bbsTyBCode}
                                        onChange={e => setBoardDetail({ ...boardDetail, bbsTyBCode: e.target.value })}
                                        maxLength="10" />
                                </dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="bbsTyCCode">
                                <FormattedMessage id="bbsTyCCode" defaultMessage="입식(YYYY.MM.DD)"/>
                                    <span className="req">필수</span></label></dt>
                                <dd>
                            <DatePicker
                            className="f_input2 w_full"
                            id="bbsTyCCode"
                            selected={selectedDate}
                            onChange={handleChange}
                            dateFormat="yyyy/MM/dd"
                            isClearable // 선택된 날짜를 지우는 기능을 추가
                            placeholderText="날짜를 선택하세요"
                            />
								</dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="bbsTyDCode">
                                <FormattedMessage id="bbsTyDCode" defaultMessage="출하(YYYY.MM.DD)"/>
                                    <span className="req">필수</span></label></dt>
                                <dd>
                            <DatePicker
                            className="f_input2 w_full"
                            id="bbsTyDCode"
                            selected={selectedDate2}
                            onChange={handleChange2}
                            dateFormat="yyyy/MM/dd"
                            isClearable // 선택된 날짜를 지우는 기능을 추가
                            placeholderText="날짜를 선택하세요"
                            />
                                </dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="bbsTyECode">
                                <FormattedMessage id="bbsTyECode" defaultMessage="투여사료(kg)"/>
                                    <span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="bbsTyECode" name="bbsTyECode" type="text"
                                        value={boardDetail.bbsTyECode}
                                        onChange={e => setBoardDetail({ ...boardDetail, bbsTyECode: e.target.value })}
                                        maxLength="10" />
                                </dd>
                            </dl>

                            <dl>
                                <dt><label htmlFor="bbsTyFCode">
                                <FormattedMessage id="preparedFeed" defaultMessage="준비사료(kg)"/>
                                    <span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" id="bbsTyFCode" name="bbsTyFCode" type="text"
                                        value={boardDetail.bbsTyFCode}
                                        onChange={e => setBoardDetail({ ...boardDetail, bbsTyFCode: e.target.value })}
                                        maxLength="10" />
                                </dd>
                            </dl>

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <a href="" className="btn btn_skyblue_h46 w_100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            updateBoard();
                                        }}>
                                            <FormattedMessage id="saveBtn" defaultMessage="저장"/>
                                        </a>
                                </div>

                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.ADMIN_NOTICE_EST,
                                        state: {
                                            nttId: nttId,
                                            bbsId: bbsId,
                                        }
                                    }} className="btn btn_blue_h46 w_100">
                                        <FormattedMessage id="listBtn" defaultMessage="목록"/>
                                        </Link>
                                </div>
                            </div>

                            {/* <!--// 버튼영역 --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>

                </div>
            </div>
        </div>
        </IntlProvider>
    );
}

export default EgovAdminNoticeEstEdit;