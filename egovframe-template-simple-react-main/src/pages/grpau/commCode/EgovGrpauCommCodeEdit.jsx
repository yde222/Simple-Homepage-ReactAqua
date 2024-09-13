import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
//import { NOTICE_BLDN_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
//import EgovAttachFile from 'components/EgovAttachFile';

function EgovGrpauPrgManEdit(props) {
    console.log("------------------------------");
    console.log("EgovGrpauPrgManEdit [props] : ", props);
    // console.log("**************props********************"+props.defaultValue);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovGrpauPrgManEdit [location] : ", location);
 
    /* location.state => https://velog.io/@duswn38/React-react-router%EB%A1%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%8F%99%EC%8B%9C-props-%EB%84%98%EA%B8%B0%EA%B8%B0 */
    const progrmFileNm = location.state?.progrmFileNm || "";
    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { pageIndex: 1 });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시


    
    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({});

    const intMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/sym/prm/EgovProgramListRegist.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/sym/prm/EgovProgramListDetailSelectUpdt.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {
        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setBoardDetail({ groupId: "" });
            return;
        }
        searchCondition.searchKeyword = progrmFileNm; 
        const retrieveDetailURL = '/sym/prm/EgovProgramListDetailSelect.do';

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
                setMasterBoard(resp.result.brdMstrVO);
                // 초기 boardDetail 설정 => ( 답글 / 수정 ) 모드일때...
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardDetail(resp.result.boardVO);
                }
                
                 //초기 setBoardAttachFiles 설정 => (수정) 모드 일때...
                //if (modeInfo.mode === CODE.MODE_MODIFY) {
                  //  setBoardAttachFiles(resp.result.resultFiles);
                //}
            }
        );
    }

    const insertBoard = () => {
        const formData = new FormData();
        for (let key in boardDetail) {
			if(key==='url'){
            formData.append('URL', boardDetail[key]);
			}else{
            formData.append(key, boardDetail[key]);
			}
            console.log("boardDetail [%s] ", key, boardDetail[key]);
        
        }
        
        const requestOptions = {
            method: "POST",
            headers: {
               
            },
            body: formData
        }
        /* 참고사이트
        content-tpye => http://www.ktword.co.kr/test/view/view.php?m_temp1=6431
        JSon =>   https://developer-talk.tistory.com/268
             =>   https://lakelouise.tistory.com/52   
        415에러 => https://steady-learner.tistory.com/entry/Springboot-Http-Status-415-error-%EC%98%A4%EB%A5%98-415-Unsupported-Media-Type 
        415에러 => https://haenny.tistory.com/280 ..
        readonly =>https://velog.io/@kimju0913/HTMLCSS-readonly%EC%99%80-disabled%EC%9D%98-%EC%B0%A8%EC%9D%B4
        */

        EgovNet.requestFetch(modeInfo.editURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    navigate({ pathname: URL.GRPAU_PRG_MAN});
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
    //     console.log("boardDetail, boardAttachFiles: useEffect");
    //     return function () {
    //     }
    // }, [boardDetail,boardAttachFiles]);

    console.groupEnd("EgovGrpauUserInsertEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU_USER_GROUP}>사용자그룹 관리</Link></li>
                        <li>프로그램목록관리</li>
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
                            <h1 className="tit_1">그룹및 권한 등록</h1>
                        </div>

                        <h2 className="tit_2">프로그램 목록관리 {modeInfo.modeTitle}</h2>

                        <div className="board_view2">
            
                            <dl>
                                <dt>
                                    <label htmlFor="progrmFileNm">프로그램파일명<span className="req">필수</span></label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE && 
                                    <input className="f_input2 w_full" id="progrmFileNm" name="progrmFileNm" type="text"
                                        defaultValue={boardDetail.progrmFileNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, progrmFileNm: e.target.value })}
                                        maxLength="50" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="progrmFileNm" name="progrmFileNm" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.progrmFileNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, progrmFileNm: e.target.value })}
                                        maxLength="50" />
                                }                                       
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="progrmStrePath">저장경로<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="progrmStrePath" name="progrmStrePath" type="text"
                                        value={boardDetail.progrmStrePath} 
                                        onChange={e => setBoardDetail({ ...boardDetail, progrmStrePath: e.target.value })}
                                        maxLength="50" />
                                </dd>
                            </dl>

                            <dl>
                                <dt>
                                    <label htmlFor="progrmKoreanNm">프로그램 한글명<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="progrmKoreanNm" name="progrmKoreanNm" type="text"
                                        value={boardDetail.progrmKoreanNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, progrmKoreanNm: e.target.value })}
                                        maxLength="50" />
                                </dd>
                            </dl>

                            <dl>
                                <dt>
                                    <label htmlFor="url">URL<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="url" name="url" type="text"
                                        defaultValue={boardDetail.url} 
                                        onChange={e => setBoardDetail({ ...boardDetail, url: e.target.value })}
                                        maxLength="50" />
                                </dd>
                            </dl>
                            <dl style={{
                                    height:"200px"
                                }} >
                                <dt>
                                    <label htmlFor="progrmDc">프로그램설명</label>
                                </dt>
                                
                                <dd>
                                <textarea className="f_input2 w_full" name="progrmDc" id="progrmDc" cols="30" rows="10" placeholder=""
                                style={{height:"200px",}}
                                 
                                
                                        defaultValue={boardDetail.progrmDc} 
                                        onChange={e => setBoardDetail({ ...boardDetail, progrmDc: e.target.value })}
                                        ></textarea>
                                        
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
                                        pathname: URL.GRPAU_PRG_MAN,
                                        state: {
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

export default EgovGrpauPrgManEdit;