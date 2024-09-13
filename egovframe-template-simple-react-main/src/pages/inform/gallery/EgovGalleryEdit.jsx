import React, { useState, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import * as EgovNet from "api/egovFetch";
import URL from "constants/url";
import CODE from "constants/code";
import { GALLERY_BBS_ID } from "config";

import { default as EgovLeftNav } from "components/leftmenu/EgovLeftNavInform";
import bbsFormVaildator from "utils/bbsFormVaildator";

//다국어지원 임포트
import enUsMsg from "../../../AquaLang/EgovGallery_en-us.json";
import koMsg from "../../../AquaLang/EgovGallery_ko.json";
import { IntlProvider } from "react-intl";
import { FormattedMessage } from "react-intl";

function EgovGalleryEdit(props) {
  console.group("EgovGalleryEdit");
  console.log("------------------------------");
  console.log("EgovGalleryEdit [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("EgovGalleryEdit [location] : ", location);

  const bbsId = location.state?.bbsId || GALLERY_BBS_ID;
  const nttId = location.state?.nttId || "";

  const [modeInfo, setModeInfo] = useState({ mode: props.mode });
  const [masterBoard, setMasterBoard] = useState({});
  const [boardDetail, setBoardDetail] = useState({ nttSj: "", nttCn: "" });
  const [boardAttachFiles, setBoardAttachFiles] = useState();
  const [count, setCount] = useState(boardDetail.parnts || 0); // 기본값은 boardDetail.parnts, 없으면 0

  //다국어지원 설정
  const locale = localStorage.getItem("locale") ?? "ko";
  const messages = { "en-US": enUsMsg, ko: koMsg }[locale];

  const handleIncrement = () => {
    const newValue = (parseInt(boardDetail.parnts) || 0) + 1; // boardDetail.parnts 값을 기준으로 증가
    setBoardDetail({ ...boardDetail, parnts: newValue }); // parnts 값을 증가된 값으로 업데이트
  };

  const handleDecrement = () => {
    const newValue = (parseInt(boardDetail.parnts) || 0) - 1; // boardDetail.parnts 값을 기준으로 감소
    setBoardDetail({ ...boardDetail, parnts: newValue >= 0 ? newValue : 0 }); // parnts 값을 감소된 값으로 업데이트
  };

  const intMode = () => {
    switch (props.mode) {
      case CODE.MODE_CREATE:
        setModeInfo({
          ...modeInfo,
          modeTitle: "등록",
          editURL: "/cop/bbs/insertBoardArticleAPI.do",
        });
        break;
      case CODE.MODE_MODIFY:
        setModeInfo({
          ...modeInfo,
          modeTitle: "수정",
          editURL: "/cop/bbs/updateBoardArticleAPI.do",
        });
        break;
      case CODE.MODE_REPLY:
        setModeInfo({
          ...modeInfo,
          modeTitle: "답글쓰기",
          editURL: "/cop/bbs/replyBoardArticleAPI.do",
        });
        break;
      default:
        navigate({ pathname: URL.ERROR }, { state: { msg: "" } });
    }
    retrieveDetail();
  };

  const retrieveDetail = () => {
    if (modeInfo.mode === CODE.MODE_CREATE) {
      // 등록이면 마스터 정보만 조회함
      const retrieveDetailURL = "/cop/bbs/selectUserBBSMasterInfAPI.do";
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          bbsId: bbsId,
        }),
      };

      EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
        setMasterBoard(resp.result.brdMstrVO);
      });

      setBoardDetail({ bbsId: bbsId, nttSj: "", nttCn: "" });
      return;
    }

    const retrieveDetailURL = "/cop/bbs/selectBoardArticleAPI.do";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        bbsId: bbsId,
        nttId: nttId,
      }),
    };
    EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
      setMasterBoard(resp.result.brdMstrVO);

      // 초기 boardDetail 설정 => ( 답글 / 수정 ) 모드일때...
      if (modeInfo.mode === CODE.MODE_REPLY) {
        // 답글모드이면 RE: 붙여줌
        setBoardDetail({
          ...resp.result.boardVO,
          nttSj: "RE: " + resp.result.boardVO.nttSj,
          nttCn: "",
          inqireCo: 0,
          atchFileId: "",
        });
      }
      if (modeInfo.mode === CODE.MODE_MODIFY) {
        setBoardDetail(resp.result.boardVO);
      }

      // 초기 setBoardAttachFiles 설정 => (수정) 모드 일때...
      if (modeInfo.mode === CODE.MODE_MODIFY) {
        setBoardAttachFiles(resp.result.resultFiles);
      }
    });
  };

  const updateBoard = () => {
    const formData = new FormData();
    for (let key in boardDetail) {
      formData.append(key, boardDetail[key]);
      //console.log("boardDetail [%s] ", key, boardDetail[key]);
    }

    const jToken = localStorage.getItem("jToken");

    if (bbsFormVaildator(formData)) {
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: jToken,
        },
        body: formData,
      };

      EgovNet.requestFetch(modeInfo.editURL, requestOptions, (resp) => {
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          navigate(URL.INFORM_GALLERY, { state: { bbsId: bbsId } });
        } else {
          // alert("ERR : " + resp.message);
          navigate({ pathname: URL.ERROR }, { state: { msg: resp.message } });
        }
      });
    }
  };

  const Location = React.memo(function Location(masterBoard) {
    return (
      <div className="location">
        <ul>
          <li>
            <Link to={URL.MAIN} className="home">
              Home
            </Link>
          </li>
          <li>
            <Link to={URL.INFORM}>
              <FormattedMessage id="tit_1" defaultMessage="알림마당" />
            </Link>
          </li>
          <li>
            <FormattedMessage id="tit_2" defaultMessage="양식장" />
          </li>
        </ul>
      </div>
    );
  });

  useEffect(function () {
    intMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.groupEnd("EgovGalleryEdit");

  return (
    <IntlProvider locale={locale} messages={messages}>
      {" "}
      {/* <!-- 다국어지원 --> */}
      <div className="container">
        <div className="c_wrap">
          {/* <!-- Location --> */}
          <Location />
          {/* <!--// Location --> */}

          <div className="layout">
            {/* <!-- Navigation --> */}
            <EgovLeftNav></EgovLeftNav>
            {/* <!--// Navigation --> */}

            <div className="contents SITE_GALLARY_VIEW" id="contents">
              {/* <!-- 본문 --> */}

              <div className="top_tit">
                <h1 className="tit_1">
                  <FormattedMessage id="tit_1" defaultMessage="알림마당" />
                </h1>
              </div>

              <h2 className="tit_2">
                <FormattedMessage id="tit_2" defaultMessage="양식장" />
              </h2>

              <div className="board_view2">
                <dl>
                  <dt>
                    <label htmlFor="nttSj">
                      <FormattedMessage id="nttSj" defaultMessage="제목" />
                      <span className="req">필수</span>
                    </label>
                  </dt>
                  <dd>
                    <input
                      className="f_input2 w_full"
                      id="nttSj"
                      name="nttSj"
                      type="text"
                      defaultValue={boardDetail.nttSj}
                      onChange={(e) =>
                        setBoardDetail({
                          ...boardDetail,
                          nttSj: e.target.value,
                        })
                      }
                      maxLength="60"
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="sensorSamplingTime">
                      <FormattedMessage
                        id="sensorSamplingTime"
                        defaultMessage="센서 샘플링타임(초)"
                      />
                      <span className="req">필수</span>
                    </label>
                  </dt>
                  <dd>
                    <input
                      className="f_input2 w_full"
                      id="nttCn"
                      name="nttCn"
                      type="text"
                      defaultValue={boardDetail.nttCn}
                      onChange={(e) =>
                        setBoardDetail({
                          ...boardDetail,
                          nttCn: e.target.value,
                        })
                      }
                      maxLength="10"
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="gridPanelColor">
                      <FormattedMessage
                        id="gridPanelColor"
                        defaultMessage="그리패널 칼라"
                      />
                    </label>
                  </dt>
                  <dd style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    {/* 입력 필드와 버튼을 감싸는 요소 */}
                    <input
                      className="f_input2 w_full"
                      id="parnts"
                      name="parnts"
                      type="text"
                      value={boardDetail.parnts || ""} // 수정 시에는 boardDetail의 값을 사용하여 표시
                      maxLength="10"
                      readOnly // 사용자 입력 방지
                      style={{ marginRight: "5px" }} // 입력 필드와 버튼 사이에 간격을 주기 위해 오른쪽 마진 설정
                    />
                    <button
                      onClick={handleIncrement}
                      style={{ fontSize: "20px", padding: "10px 20px" }} // 버튼의 폰트 크기와 패딩을 크게 설정
                    >
                      +{/* 버튼 내용 */}
                    </button>
                    <button
                      onClick={handleDecrement}
                      style={{ fontSize: "20px", padding: "10px 20px" }} // 버튼의 폰트 크기와 패딩을 크게 설정
                    >
                      -{/* 버튼 내용 */}
                    </button>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="cameraCaptureType">
                      <FormattedMessage
                        id="cameraCaptureType"
                        defaultMessage="카메라 캡쳐타입(시간)"
                      />
                    </label>
                  </dt>
                  <dd>
                    <input
                      className="f_input2 w_full"
                      id="ntceBgnde"
                      name="ntceBgnde"
                      type="text"
                      defaultValue={boardDetail.ntceBgnde}
                      onChange={(e) =>
                        setBoardDetail({
                          ...boardDetail,
                          ntceBgnde: e.target.value,
                        })
                      }
                      maxLength="10"
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="cameraCaptureFrequency">
                      <FormattedMessage
                        id="cameraCaptureFrequency"
                        defaultMessage="카메라 캡쳐횟수"
                      />
                    </label>
                  </dt>
                  <dd>
                    <input
                      className="f_input2 w_full"
                      id="ntceEndde"
                      name="ntceEndde"
                      type="text"
                      defaultValue={boardDetail.ntceEndde}
                      onChange={(e) =>
                        setBoardDetail({
                          ...boardDetail,
                          ntceEndde: e.target.value,
                        })
                      }
                      maxLength="10"
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="videoRecordingInterval">
                      <FormattedMessage
                        id="videoRecordingInterval"
                        defaultMessage="비디오 녹화간격(시간)"
                      />
                    </label>
                  </dt>
                  <dd>
                    <input
                      className="f_input2 w_full"
                      id="ntcrId"
                      name="ntcrId"
                      type="text"
                      defaultValue={boardDetail.ntcrId}
                      onChange={(e) =>
                        setBoardDetail({
                          ...boardDetail,
                          ntcrId: e.target.value,
                        })
                      }
                      maxLength="10"
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="videoRecordingDuration">
                      <FormattedMessage
                        id="videoRecordingDuration"
                        defaultMessage="비디오 녹화타임(분)"
                      />
                    </label>
                  </dt>
                  <dd>
                    <input
                      className="f_input2 w_full"
                      id="ntcrNm"
                      name="ntcrNm"
                      type="text"
                      defaultValue={boardDetail.ntcrNm}
                      onChange={(e) =>
                        setBoardDetail({
                          ...boardDetail,
                          ntcrNm: e.target.value,
                        })
                      }
                      maxLength="10"
                    />
                  </dd>
                </dl>
                {/* <!-- 버튼영역 --> */}
                <div className="board_btn_area">
                  <div className="left_col btn1">
                    <a
                      href="#!"
                      className="btn btn_skyblue_h46 w_100"
                      onClick={(e) => {
                        e.preventDefault();
                        updateBoard();
                      }}
                    >
                      <FormattedMessage id="saveBtn" defaultMessage="저장" />
                    </a>
                  </div>

                  <div className="right_col btn1">
                    <a
                      href={URL.INFORM_GALLERY}
                      className="btn btn_blue_h46 w_100"
                    >
                      <FormattedMessage id="listBtn" defaultMessage="목록" />
                    </a>
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

export default EgovGalleryEdit;
