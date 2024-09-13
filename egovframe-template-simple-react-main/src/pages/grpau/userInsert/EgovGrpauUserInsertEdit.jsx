import React, { useRef, useState, useEffect } from 'react'; 

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import { useDaumPostcodePopup } from 'react-daum-postcode';


const CURRENT_URL =
		'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

function EgovGrpauUserInsertEdit(props) {
    console.log("------------------------------");
    console.log("EgovGrpauUserInsertEdit [props] : ", props);
    // console.log("**************props********************"+props.defaultValue);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovAdminNoticeEdit [location] : ", location);

    // const bbsId = location.state?.bbsId || NOTICE_BLDN_ID;
    const userId = location.state?.userId;
    const userNm = location.state?.userNm;
    const emplyrId = location.state?.emplyrId;
 
    
    //패스워드힌트
    //const bbsTyACodeOptions = [{ value: "", label: "선택하세요" }, { value: "P01", label: "가장 기억에 남는 장소는?" }, { value: "P02", label: "나의 좌우명은?" },{ value: "P03", label: "나의 보물 제 1호는?" },{ value: "P04", label: "가장 기억에 남는 선생님 성함은?" },{ value: "P05", label: "다른 사람은 모르는 나만의 신체비밀은?" }];
    const [bbsTyACodeOptions, setBbsTyACodeOptions] =  useState([]);
    //소속기관
    //const bbsTyBCodeOptions = [{ value: "", label: "선택하세요" }, { value: "00000001", label: "공공기관" }, { value: "00000002", label: "금융기관" },{ value: "00000003", label: "교육기관" },{ value: "00000004", label: "의료기관" }];
    const [bbsTyBCodeOptions, setBbsTyBCodeOptions] = useState([]);
    //조직코드
    //const bbsTyCCodeOptions = [{ value: "", label: "선택하세요" }, { value: "P05", label: "기본조직" }];
    const [bbsTyCCodeOptions, setBbsTyCCodeOptions] = useState([]);
    //사용자상태코드
    const bbsTyDCodeOptions = [{ value: "", label: "선택하세요" }, { value: "A", label: "회원 가입 신청 상태" }, { value: "D", label: "회원 가입 삭제 상태" },{ value: "P", label: "회원 가입 승인 상태" }];
    //그룹아이디
    //const bbsTyECodeOptions = [{ value: "", label: "선택하세요" }, { value: "P09", label: "기본그룹" }];
    const [bbsTyECodeOptions, setBbsTyECodeOptions] = useState([]);

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [boardDetail, setBoardDetail] = useState({});

    const intMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/uss/umt/EgovUserInsert.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/uss/umt/user/EgovUserSelectUpdt.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {

        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setBoardDetail({ userId : userId, userNm : userNm});
            //console.log("retrieveDetail 화면표시 습득");
            //패스워드힌트 습득
            retrieveDetailCom22Id();
    return;
        }

            console.log("retrieveDetail emplyrId 습득"+emplyrId);
        const retrieveDetailURL = '/uss/umt/EgovUserSelectUpdtView.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uniqId : emplyrId,
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                //setMasterBoard(resp.result.brdMstrVO);
                // 초기 boardDetail 설정 => ( 답글 / 수정 ) 모드일때...
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    console.log("retrieveDetail CODE.MODE_MODIFY");
                    setBoardDetail(resp.result.userManageVO);
                }
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    console.log("retrieveDetail 화면표시 습득");
                	//패스워드힌트 습득
                    retrieveDetailCom22Id();
                       //여기서도 값6
                         console.log("bbsTyACodeOptions222 index1: ", bbsTyACodeOptions);

                }
                
            }
        );
    }

    //패스워트힌트코드
    const retrieveDetailCom22Id = () => {

        const retrieveDetailURL = '/uss/umt/EgovUserInsertCom22View.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userId : userId,
            })
        }
         EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
           function (resp) {


    setBbsTyACodeOptions(resp.result.resultList);
    //여기서도 값 6
     console.log("bbsTyACodeOptions111 index1: ", bbsTyACodeOptions);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    console.log("retrieveDetailCom22Id 패스워트힌트코드 습득");
                	//소속기관코드 습득
                    retrieveDetailCom25Id();

                }

            }
        );
    }


    //소속기관코드
    const retrieveDetailCom25Id = () => {

        const retrieveDetailURL = '/uss/umt/EgovUserInsertCom25View.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userId : userId,
            })
        }
         EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
           function (resp) {


    setBbsTyBCodeOptions(resp.result.resultList);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    console.log("retrieveDetailCom25Id 소속기관코드 습득");
                	//조직코드 습득
                    retrieveDetailOrgnztId();

                }

            }
        );
    }

    //조직코드
    const retrieveDetailOrgnztId = () => {

        const retrieveDetailURL = '/uss/umt/EgovUserInsertOrgView.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userId : userId,
            })
        }
         EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
           function (resp) {


    setBbsTyCCodeOptions(resp.result.resultList);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    console.log("retrieveDetailOrgnztId 조직코드 습득");
                	//그룹아이디 습득
                    retrieveDetailGrpId();

                }

            }
        );
    }

    //그룹아이디
    const retrieveDetailGrpId = () => {

//https://goddaehee.tistory.com/296
//[React] 2. JSX란? (정의, 장점, 문법) 

//https://jineecode.tistory.com/239
//concat 활용하기

//https://velog.io/@bwj0509/REACT-useRef
// [REACT] useRef

//https://sungrinhan.github.io/posts/useRef/
//[React] useRef 는 언제, 어떻게 쓸까


        const retrieveDetailURL = '/uss/umt/EgovUserInsertView.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userId : userId,
            })
        }
         EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
           function (resp) {

    console.log("bbsTyECodeOptions111 index1: ", resp.result.resultList);
    setBbsTyECodeOptions(resp.result.resultList);
    //여기서는 값이 공백
    console.log("bbsTyECodeOptions222 index1: ", bbsTyECodeOptions);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //그룹아이디 습득
                    console.log("retrieveDetailGrpId 그룹아이디 습득");
                }

            }

        );
    }
    console.log("bbsTyECodeOptions333 index1: ", bbsTyECodeOptions);
 

    const insertBoard = () => {
        const formData = new FormData();
        for (let key in boardDetail) {
            formData.append(key, boardDetail[key]);
            //console.log("boardDetail [%s] ", key, boardDetail[key]);
        }
                console.log("insertBoard  modeInfo.editURL : ", modeInfo.editURL);
        
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
                    navigate({ pathname: URL.GRPAU_USER_INSERT });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
    }

    const open = useDaumPostcodePopup(CURRENT_URL);
  

    // popup 우편번호
    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = '';
 
      console.log("--- handleComplete fullAddress ---- " + fullAddress);

      if (data.addressType === 'R') {
        console.log("--- handleComplete data.addressType ---- " + data.addressType);
        if (data.bname !== '') {
          extraAddress += data.bname;
          console.log("--- handleComplete extraAddress ---- " + extraAddress);
          console.log("--- handleComplete data.bname ---- " + data.bname);
        }
        if (data.buildingName !== '') {
          extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          console.log("--- handleComplete data.buildingName ---- " + data.buildingName);
          console.log("--- handleComplete extraAddress ---- " + extraAddress);
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        console.log("--- handleComplete fullAddress ---- " + fullAddress);
        console.log("--- handleComplete fullAddress data.zonecode ---- " + fullAddress + data.zonecode);
//우편번호, 주소항목에 값을 설정
            document.getElementById('zip').value = data.zonecode;
            document.getElementById('homeadres').value = data.address;
            boardDetail.zip = data.zonecode;
            boardDetail.homeadres = data.address;

      }
  
      console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

  	const handleClick = () => {
    	open({ onComplete: handleComplete });
};

    // jsp에서 설정방법 참조
    // function zipSearch(){
    //     new daum.Postcode({
    //         oncomplete: function(data) {
    //             // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
    //             // 예제를 참고하여 다양한 활용법을 확인해 보세요.
    //             document.getElementById('zip').value = data.zonecode;
    //             document.getElementById('adres').value = data.address;
    //         }
    //     }).open();
    // }
    

    useEffect(function () {
        intMode();
        return function () {
        }
    }, []);

    useEffect(function () {
        console.log("boardDetail, boardAttachFiles: useEffect");
        return function () {
        }
    }, [boardDetail]);

    console.groupEnd("EgovGrpauUserInsertEdit");
                    //6항목표시
	                console.log("bbsTyACodeOptions222 333: ", bbsTyACodeOptions);
    console.log("bbsTyECodeOptions444 index1: ", bbsTyECodeOptions);

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

                    <div className="contents NOTICE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">업무사용자 등록</h1>
                        </div>
                        <br></br>
                        {/* <h2 className="tit_2"> {modeInfo.modeTitle}</h2> */}

                        <div className="board_view2">
                            <dl>
                                <dt>
                                    <label htmlFor="emplyrId">사용자아이디<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="emplyrId" name="emplyrId" type="text"
                                        defaultValue={boardDetail.emplyrId}
                                        onChange={e => setBoardDetail({ ...boardDetail, emplyrId: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="emplyrId" name="emplyrId" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.emplyrId}
                                        onChange={e => setBoardDetail({ ...boardDetail, emplyrId: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="emplyrNm">이름<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="emplyrNm" name="emplyrNm" type="text"
                                        defaultValue={boardDetail.emplyrNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, emplyrNm: e.target.value })}
                                        maxLength="60" />
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="emplyrNm" name="emplyrNm" type="text" readOnly="readOnly"
                                        defaultValue={boardDetail.emplyrNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, emplyrNm: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="password">비밀번호<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="password" name="password" type="password"
                                        defaultValue={boardDetail.password}
                                        onChange={e => setBoardDetail({ ...boardDetail, password: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="password" name="password" type="password" readOnly="readOnly"
                                        defaultValue={boardDetail.password}
                                        onChange={e => setBoardDetail({ ...boardDetail, password: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                                <dt>
                                    <label htmlFor="password2">비밀번호 확인<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="password2" name="password2" type="password"
                                        defaultValue={boardDetail.password2}
                                        onChange={e => setBoardDetail({ ...boardDetail, password2: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="password2" name="password2" type="password" readOnly="readOnly"
                                        defaultValue={boardDetail.password}
                                        onChange={e => setBoardDetail({ ...boardDetail, password: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="passwordHint">비밀번호 힌트<span className="req">필수</span></label></dt>
                                <dd>
                                    {/* 수정/조회 일때 변경 불가 */}
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_350" htmlFor="passwordHint">
                                            <select
                                                id="bbsTyACodeOptions"
                                                name="bbsTyACodeOptions"
                                                title="비밀번호힌트선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, passwordHint: e.target.value })}
                                                value={boardDetail.passwordHint}
                                                >
                                                {bbsTyACodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
                                                            {option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </label>
                                    }
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <label className="f_select w_350" htmlFor="passwordHint">
                                        <select
                                            id="bbsTyACodeOptions"
                                            name="bbsTyACodeOptions"
                                            title="비밀번호힌트선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, passwordHint: e.target.value })}
                                            value={boardDetail.passwordHint}
                                        >
                                            {bbsTyACodeOptions.map((option, i) => {
                                                return (
                                                    <option value={option.code} key={option.code}>
                                                    {option.codeNm}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                    }
                                </dd>
                                <dt>
                                    <label htmlFor="passwordCnsr">비밀번호 정답<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="passwordCnsr" name="passwordCnsr" type="text"
                                        defaultValue={boardDetail.passwordCnsr}
                                        onChange={e => setBoardDetail({ ...boardDetail, passwordCnsr: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="passwordCnsr" name="passwordCnsr" type="text"
                                        defaultValue={boardDetail.passwordCnsr}
                                        onChange={e => setBoardDetail({ ...boardDetail, passwordCnsr: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="insttCode">소속기관<span className="req">필수</span></label></dt>
                                <dd>
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_200" htmlFor="insttCode">
                                         
                                            <select
                                                id="bbsTyBCodeOptions"
                                                name="bbsTyBCodeOptions"
                                                title="소속기관선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, insttCode: e.target.value })}
                                                value={boardDetail.insttCode}
                                                >
                                                {bbsTyBCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
                                                            {option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </label>
                                    }
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <label className="f_select w_200" htmlFor="insttCode">
                                         
                                        <select
                                            id="bbsTyBCodeOptions"
                                            name="bbsTyBCodeOptions"
                                            title="소속기관선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, insttCode: e.target.value })}
                                            value={boardDetail.insttCode}
                                        >
                                            {bbsTyBCodeOptions.map((option, i) => {
                                                return (
                                                    <option value={option.code} key={option.code}>
                                                    {option.codeNm}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                    }
                                </dd>
                                <dt><label htmlFor="orgnztId">조직코드<span className="req">필수</span></label></dt>
                                <dd>
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_200" htmlFor="">
                                         
                                            <select
                                                id="bbsTyCCodeOptions"
                                                name="bbsTyCCodeOptions"
                                                title="조직코드선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, orgnztId: e.target.value })}
                                                value={boardDetail.orgnztId}
                                            >
                                                {bbsTyCCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
                                                            {option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </label>
                                    }
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <label className="f_select w_200" htmlFor="orgnztId">
                                         
                                        <select
                                            id="bbsTyCCodeOptions"
                                            name="bbsTyCCodeOptions"
                                            title="조직코드선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, orgnztId: e.target.value })}
                                            value={boardDetail.orgnztId}
                                        >
                                            {bbsTyCCodeOptions.map((option, i) => {
                                                return (
                                                    <option value={option.code} key={option.code}>
                                                    {option.codeNm}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                    }
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="emailAdres">이메일주소</label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="emailAdres" name="emailAdres" type="text"
                                        defaultValue={boardDetail.emailAdres}
                                        onChange={e => setBoardDetail({ ...boardDetail, emailAdres: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="emailAdres" name="emailAdres" type="text"
                                        defaultValue={boardDetail.emailAdres}
                                        onChange={e => setBoardDetail({ ...boardDetail, emailAdres: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                                <dt>
                                    <label htmlFor="moblphonNo">전화번호</label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="moblphonNo" name="moblphonNo" type="text"
                                        defaultValue={boardDetail.moblphonNo}
                                        onChange={e => setBoardDetail({ ...boardDetail, moblphonNo: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="moblphonNo" name="moblphonNo" type="text"
                                        defaultValue={boardDetail.moblphonNo}
                                        onChange={e => setBoardDetail({ ...boardDetail, moblphonNo: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="userNm">우편번호</label>
                                </dt>
                                <dd>
                                <span className="f_search w_500">
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <input className="f_input2 w_full" id="zip" name="zip" type="text"
                                            defaultValue={boardDetail.zip}
                                            onChange={e => setBoardDetail({ ...boardDetail, zip: e.target.value })}
                                            maxLength="6" />
                                }   
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <input className="f_input2 w_full" id="zip" name="zip" type="text"
                                            defaultValue={boardDetail.zip}
                                            onChange={e => setBoardDetail({ ...boardDetail, zip: e.target.value })}
                                            maxLength="6" />
                                }   
                                    <button className="btn btn_skyblue_h46 w_100" type="button"
                                        onClick={ handleClick}>조회</button>
                                </span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="homeadres">주소</label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="homeadres" name="homeadres" type="text"
                                        defaultValue={boardDetail.homeadres}
                                        onChange={e => setBoardDetail({ ...boardDetail, homeadres: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="homeadres" name="homeadres" type="text"
                                        defaultValue={boardDetail.homeadres}
                                        onChange={e => setBoardDetail({ ...boardDetail, homeadres: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                                <dt>
                                    <label htmlFor="detailAdres">상세주소</label>
                                    
                                </dt>
                                <dd>
                                {modeInfo.mode === CODE.MODE_CREATE &&
                                    <input className="f_input2 w_full" id="detailAdres" name="detailAdres" type="text"
                                        defaultValue={boardDetail.detailAdres}
                                        onChange={e => setBoardDetail({ ...boardDetail, detailAdres: e.target.value })}
                                        maxLength="60" />
                                        
                                }   
                                {modeInfo.mode === CODE.MODE_MODIFY &&
                                    <input className="f_input2 w_full" id="detailAdres" name="detailAdres" type="text"
                                        defaultValue={boardDetail.detailAdres}
                                        onChange={e => setBoardDetail({ ...boardDetail, detailAdres: e.target.value })}
                                        maxLength="60" />
                                }                                       
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="emplyrSttusCode">사용자상태코드 <span className="req">필수</span></label></dt>
                                <dd>
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_200" htmlFor="emplyrSttusCode">
                                         
                                            <select
                                                id="bbsTyDCodeOptions"
                                                name="bbsTyDCodeOptions"
                                                title="사용자상태코드선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, emplyrSttusCode: e.target.value })}
                                                value={boardDetail.emplyrSttusCode}
                                            >
                                                {bbsTyDCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </label>
                                    }
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <label className="f_select w_200" htmlFor="emplyrSttusCode">
                                         
                                         <select
                                            id="bbsTyDCodeOptions"
                                            name="bbsTyDCodeOptions"
                                            title="사용자상태코드선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, emplyrSttusCode: e.target.value })}
                                            value={boardDetail.emplyrSttusCode}
                                        >
                                            {bbsTyDCodeOptions.map((option, i) => {
                                                return (
                                                    <option value={option.value} key={option.value}>
                                                    {option.label}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                    }
                                </dd>
                                <dt><label htmlFor="groupId">그룹아이디 <span className="req">필수</span></label></dt>
                                <dd>
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_200" htmlFor="groupId">
                                         
                                            <select
                                                id="bbsTyECodeOptions"
                                                name="bbsTyECodeOptions"
                                                title="그룹아이디선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, groupId: e.target.value })}
                                                value={boardDetail.groupId}
                                            >
                                                {bbsTyECodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.code} key={option.code}>
                                                            {option.codeNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </label>
                                    }
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <label className="f_select w_200" htmlFor="groupId">
                                         
                                         <select
                                            id="bbsTyECodeOptions"
                                            name="bbsTyECodeOptions"
                                            title="그룹아이디선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, groupId: e.target.value })}
                                            value={boardDetail.groupId}
                                        >
                                            {bbsTyECodeOptions.map((option, i) => {
                                                return (
                                                    <option value={option.code} key={option.code}>
                                                    {option.codeNm}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                    }
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
                                        pathname: URL.GRPAU_USER_INSERT,
                                        state: {
                                            userId : userId
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

export default EgovGrpauUserInsertEdit;