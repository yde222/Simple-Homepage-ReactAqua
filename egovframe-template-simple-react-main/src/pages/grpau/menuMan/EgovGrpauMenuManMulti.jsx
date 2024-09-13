import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovAttachFile from 'components/EgovAttachFile';

function EgovGrpauMenuManMulti(props) {
    console.group("EgovGrpauMenuManMulti !");
    console.log("------------------------------");
    console.log("EgovGrpauMenuManMulti [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();

    const bbsId = location.state?.bbsId || "";
    const nttId = location.state?.nttId || "";

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail,     setBoardDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();

    const intMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/sym/mnu/mpm/EgovMenuBndeRegist.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {

        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setBoardDetail({ bbsId: bbsId, nttSj: "", nttCn: "" });
            return;
        }

    }

    const updateBoard = () => {
        const formData = new FormData();
		
        for (let key in boardDetail) {
            formData.append(key, boardDetail[key]);
            //console.log("boardDetail [%s] ", key, boardDetail[key]);
        }

    	if(formConfirm(formData)) {
          const requestOptions = {
            method: "POST",
            headers: {
            },
            body: formData
          }

          EgovNet.requestFetch(modeInfo.editURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
//                    navigate({pathname: URL.MEMU_MAN});
                    alert("일괄등록 완료 하였습니다. ");
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
          );
    	}
	}

const formConfirm = () => {
	if (window.confirm("메뉴일괄등록을 하시겠습니까?. \n 메뉴정보와  프로그램목록, 프로그램 변경내역 존재시 삭제 하실 수 없습니다.")) {
    	return true;
	}else {
    	return false;
    }
}

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

    console.groupEnd("EgovGrpauMenuManMulti");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.GRPAU_MEMU_MAN}>메뉴목록 관리</Link></li>
                        <li>메뉴목록일괄등록</li>
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

                        <h2 className="tit_2">메뉴목록관리 일괄등록</h2>

                        <div className="board_view2">
							{modeInfo.mode === CODE.MODE_CREATE &&
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
                            {modeInfo.mode === CODE.MODE_MODIFY &&
                                <EgovAttachFile
                                    boardFiles={boardAttachFiles} />
                            }      

							{modeInfo.mode === CODE.MODE_CREATE &&
                                <li>엑셀파일 첨부시,  C:\hantong\menu 경로에 저장 후 처리 하셔야 합니다.<br/></li>
                            }


                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <a href="" className="btn btn_skyblue_h46 w_100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            updateBoard();
                                        }}>일괄등록</a>
                                </div>

								<div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.GRPAU_MEMU_MAN,
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

export default EgovGrpauMenuManMulti;