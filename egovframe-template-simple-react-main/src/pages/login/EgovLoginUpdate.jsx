import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';

// import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavSupport';
import URL from 'context/url';
import CODE from 'context/code';
import { NOTICE_BBS_ID } from 'context/config';

//다국어지원 임포트 
import enUsMsg from "../../AquaLang/EgovLoginUpdate_en-us.json";
import koMsg from "../../AquaLang/EgovLoginUpdate_ko.json";
import { IntlProvider } from 'react-intl'; 
import { FormattedMessage } from 'react-intl';


function EgovLoginUpdate(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const bbsId = location.state?.bbsId || NOTICE_BBS_ID;
    //const bbsId = history.location.state?.bbsId;
    //const nttId = history.location.state?.nttId || "";

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [masterLogin, setMasterLogin] = useState({});
    const [loginDetail, setLoginDetail] = useState({ email: "", name: "", passwordHint: "", password: "", passwordCnsr: ""  });
     //const [loginVO, setLoginVO] = useState({ ip1: '', name: '', ip3: '', ip4: '', ip5: ''  });
    //const [loginVO, setLoginVO] = useState({});

//    const [boardAttachFiles, setBoardAttachFiles] = useState();

	//다국어지원 설정
	const locale = localStorage.getItem("locale") ?? "ko";
	const messages = { "en-US": enUsMsg, ko: koMsg }[locale]

    const initMode = () => {
    console.log("EgovLoginUpdate [props.mode] :11 ", props.mode);
    switch (props.mode) {
            // case CODE.MODE_CREATE:
            //     setModeInfo({
            //         ...modeInfo,
            //         modeTitle: "등록",
            //         editURL: '/uat/uia/insertLoginAPI.do'
            //     });
            //     console.log("EgovLoginCreate [props.mode] :222 ", props.mode);
            //     break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/uat/uia/updateLoginAPI.do'
                });
                console.log("EgovLoginUpdate [props.mode] :222 ", props.mode);
                break;
            default:   break;  
                // case CODE.MODE_REPLY:
            //     setModeInfo({
            //         ...modeInfo,
            //         modeTitle: "답글쓰기",
            //         editURL: '/cop/bbs/replyBoardArticleAPI.do'
            //     });
            //     break;
        }
         retrieveDetail();
    }

    const retrieveDetail = () => {

        console.log("retrieveDetail 11 " + modeInfo.mode);
        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setLoginDetail({ bbsId: bbsId, email: "", name: "", passwordHint: "", password: "", passwordCnsr: "" });
         //   setLoginVO({ bbsId: bbsId, ip1: "", name: "", ip3: "", ip4: "", ip5: "" });
         //console.log("retrieveDetail 22 " + loginVO.name);
         return;
        }
    }

    const updateLogin = () => {
        const formData = new FormData();
        for (let key in loginDetail) {
            formData.append(key, loginDetail[key]);
            //console.log("LoginVO [%s] ", key, LoginVO[key]);
        }
        
        const requestOptions = {
            method: "POST",
            headers: {

            },
            body: formData
        }
        console.log("login updateLogin modeInfo.editURL ", modeInfo.editURL);

        EgovNet.requestFetch(modeInfo.editURL,
            requestOptions,
            (resp) => {
                console.log("login updateBoard modeInfo.editURL2 ", resp.resultCode);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    console.log("login updateBoard modeInfo.editURL suc ", modeInfo.editURL);
                    // history.push({ pathname: URL.LOGIN_CREATE });
                    navigate( URL.LOGIN );
                   } else {
                    console.log("login updateBoard modeInfo.editURL err ", modeInfo.editURL);
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
    }

useEffect(function () {
    initMode();
    return function () {
    }
}, []);

useEffect(function () {
    console.log("login boardDetail, boardAttachFiles: useEffect");
    return function () {
    }
}, []);

    return(
  <IntlProvider locale={locale} messages={messages}>
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">로그인</Link></li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    {/* <EgovLeftNav></EgovLeftNav> */}
                    {/* <!--// Navigation --> */}

                    <div className="contents PDS_REG" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1"><FormattedMessage id="tit_1" defaultMessage="로그인"/></h1>                            
                        </div>
                        
						<h2 className="tit_2"><FormattedMessage id="tit_2" defaultMessage="비번변경(자신의 계정만 인증후 변경)"/></h2>

                        {/* <!-- 상세 --> */}
                        <div className="board_view3">
                            <div className="board_view2">
                                <dl>
                                        <dt><label htmlFor="name">
										<FormattedMessage id="name" defaultMessage="회원명"/>
										<span className="req">필수</span></label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="name" id="name"
                                            defaultValue={loginDetail.name}
                                            onChange={e => setLoginDetail({ ...loginDetail, name: e.target.value })}  />
                                        </dd>
                                </dl>
                            </div>

                            <div className="info2">
                                {/* <div className="left_col">
                                    <img src="/assets/images/sample_pds_list.png" alt=""/>
                                    <p className="guide">
                                        썸네일 이미지는<br/>
                                        width : 160px, height : 109px<br/> 
                                        크기의 이미지를 올려주세요 
                                    </p>
                                </div> */}
                                <div className="board_view2">
                                    <dl>
                                        <dt><label htmlFor="email">
											<FormattedMessage id="email" defaultMessage="아이디(이메일)"/><span className="req">필수</span></label></dt>
    	                                <dd>
        	                                <input className="f_input2 w_full" type="text" name="email" id="email"
            	                            defaultValue={loginDetail.email}
                	                            onChange={e => setLoginDetail({ ...loginDetail, email: e.target.value })} />
                    	                </dd>
                                		<li>
                                    		<Link to={URL.LOGIN_MODIFY} className="btn btn_blue_h46 pd35">
											<FormattedMessage id="sendCodeButton" defaultMessage="인증번호 전송"/></Link>
                                		</li>
                                    </dl>

                                    <dl>
                                        <dt><label htmlFor="password">
										<FormattedMessage id="password" defaultMessage="새비밀번호"/>
										<span className="req">필수</span></label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="password" name="password" id="password"
                                            defaultValue={loginDetail.password}
                                            onChange={e => setLoginDetail({ ...loginDetail, password: e.target.value })} />
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt><label htmlFor="passwordCnsr">
										<FormattedMessage id="passwordCnsr" defaultMessage="새비밀번호 확인423432"/>
										<span className="req">필수</span></label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="password" name="passwordCnsr" id="passwordCnsr"
                                            defaultValue={loginDetail.passwordCnsr}
                                            onChange={e => setLoginDetail({ ...loginDetail, passwordCnsr: e.target.value })} />
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt><label htmlFor="certificationNum">
										<FormattedMessage id="certificationNum" defaultMessage="인증번호(6자리)"/>
										<span className="req">필수</span></label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="certificationNum" id="certificationNum"
                                            defaultValue={loginDetail.certificationNum}
                                            onChange={e => setLoginDetail({ ...loginDetail, certificationNum: e.target.value })} />
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt><label htmlFor="ihidNum">
										<FormattedMessage id="ihidNum" defaultMessage="연락처"/>
										<span className="req">필수</span></label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="ihidNum" id="ihidNum"
                                            defaultValue={loginDetail.ihidNum}
                                            onChange={e => setLoginDetail({ ...loginDetail, ihidNum: e.target.value })} />
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        {/* <!--// 상세 --> */}

                        {/* <!-- 버튼영역 --> */}
                        <div className="board_btn_area">
                            <div className="left_col btn1">{/* w_100에서 w-100으로 변경함(글자수가 빠져나옴) */}
                                <button className="btn btn_skyblue_h46 w-100" 
                                onClick={() => updateLogin()}>
								<FormattedMessage id="SignUpbtn" defaultMessage="비번변경"/>
								</button>
                             </div>

                            {/* <div className="right_col btn1">
                                <Link to={URL.LOGIN} className="btn btn_blue_h46 w_100">등록</Link>
                            </div> */}
                        </div>
                        {/* <!--// 버튼영역  --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
</IntlProvider>
    );
}

export default EgovLoginUpdate;