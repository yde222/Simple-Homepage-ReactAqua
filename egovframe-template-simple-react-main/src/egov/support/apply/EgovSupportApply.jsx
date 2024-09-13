import * as EgovNet from 'context/egovFetch';

import React from 'react';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavSupport';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import DaumPostcodeEmbed from 'react-daum-postcode';


const CURRENT_URL =
		'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

    const fetchDataOn = (setOperIp, setOperId, setOperPw) => { //from csv 파일 처리 명령어 호출
      console.log("--- ajax--fetchDataOn--시작");
      const fetchURL = '/cop/csv/processOn.do'; 
      const requestOptions = {
          
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          }
          ,
          body: JSON.stringify({
              //  operIp: operIp,
              //  operId: operId,
              //  operPw: operPw
              
          })
      }  
      
      EgovNet.requestFetch(fetchURL,
          requestOptions,
          (resp) => {
              if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                console.log("--- CODE.RCV_SUCCESS---- ");
                //history.push({ pathname: URL.ADMIN_OPER });
              } else {
                console.log("--- CODE.RCV_ERR---- " + Number(resp.resultCode) + " " + Number(CODE.RCV_SUCCESS));
                  alert("ERR : " + resp.resultMessage);
              }
          }
      );
      console.log("--- ajax--fetchDataOn-- 끝");
  }

  const fetchDataFromDb = (setOperIp, setOperId, setOperPw) => { //from DB 처리 명령어 호출
    console.log("--- ajax--fetchDataFromDb--시작");
    const fetchURL = '/cop/csv/processFromDb.do'; 
    const requestOptions = {
        
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        }
        ,
        body: JSON.stringify({
            //  operIp: operIp,
            //  operId: operId,
            //  operPw: operPw
            
        })
    }  
    
    EgovNet.requestFetch(fetchURL,
        requestOptions,
        (resp) => {
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
              console.log("--- CODE.RCV_SUCCESS---- ");
              //history.push({ pathname: URL.ADMIN_OPER });
            } else {
              console.log("--- CODE.RCV_ERR---- " + Number(resp.resultCode) + " " + Number(CODE.RCV_SUCCESS));
                alert("ERR : " + resp.resultMessage);
            }
        }
    );
    console.log("--- ajax--fetchDataFromDb-- 끝");
}

const fetchDataFromJuso = (setOperIp, setOperId, setOperPw) => { //from DB juso처리 명령어 호출
  console.log("--- ajax--fetchDataFromJuso--시작");
  const fetchURL = '/cop/csv/processFromJuso.do'; 
  const requestOptions = {
      
      method: "POST",
      headers: {
          'Content-type': 'application/json'
      }
      ,
      body: JSON.stringify({
          //  operIp: operIp,
          //  operId: operId,
          //  operPw: operPw
          
      })
  }  
  
  EgovNet.requestFetch(fetchURL,
      requestOptions,
      (resp) => {
          // if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          if ((resp.resultCode) === "200") {
              console.log("--- CODE.RCV_SUCCESS---- ");
            //history.push({ pathname: URL.ADMIN_OPER });
          } else {
            // console.log("--- CODE.RCV_ERR---- " + resp.resultCode + " " + Number(CODE.RCV_SUCCESS));
            //   alert("ERR : " + resp.resultMessage);
          }
      }
  );
  console.log("--- ajax--fetchDataFromJuso-- 끝");
}

const fetchDataFromExcelJuso = (setOperIp, setOperId, setOperPw) => { //from DB Excel처리 명령어 호출
  console.log("--- ajax--fetchDataFromExcelJuso--시작");
  const fetchURL = '/cop/csv/processFromExcelJuso.do'; 
  const requestOptions = {
      
      method: "POST",
      headers: {
          'Content-type': 'application/json'
      }
      ,
      body: JSON.stringify({
          //  operIp: operIp,
          //  operId: operId,
          //  operPw: operPw
          
      })
  }  
  
  EgovNet.requestFetch(fetchURL,
      requestOptions,
      (resp) => {
          // if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          if ((resp.resultCode) === "200") {
              console.log("--- CODE.RCV_SUCCESS---- ");
            //history.push({ pathname: URL.ADMIN_OPER });
          } else {
            // console.log("--- CODE.RCV_ERR---- " + resp.resultCode + " " + Number(CODE.RCV_SUCCESS));
            //   alert("ERR : " + resp.resultMessage);
          }
      }
  );
  console.log("--- ajax--fetchDataFromExcelJuso-- 끝");
}

//  //렌더링 될때마다 매번 실행됨
  //   useEffect(() => { 
  //     return () => { 
  //     }
  // }, []); 

// const Postcode = () => {
    const EgovSupportApply = () => {
        //const open = useDaumPostcodePopup(scriptUrl);
        const open = useDaumPostcodePopup(CURRENT_URL);
  
    // popup
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


      }
  
      console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

//     //embed
//     const handleComplete = (data) => {
//       let fullAddress = data.address;
//       let extraAddress = '';
  
//       if (data.addressType === 'R') {
//         if (data.bname !== '') {
//           extraAddress += data.bname;
//         }
//         if (data.buildingName !== '') {
//           extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
//         }
//         fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
//       }
  
//       console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
//     };
    
// //    return <DaumPostcodeEmbed onComplete={handleComplete} {...props} />;
//     return <DaumPostcodeEmbed onComplete={handleComplete} {...CURRENT_URL} />;

//     // embed end

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
// }

// function EgovSupportApply() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><a className="home" href="">Home</a></li>
                        <li><a href="">고객지원</a></li>
                        <li>서비스신청</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}
                    
                    <div className="contents SITE_INTRO" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">고객지원</h1>

                        <p className="txt_1">프레임워크 경량환경의 원하시는 서비스를 신청하실 수 있습니다.</p>
                        
                        <h2 className="tit_4">서비스 신청</h2>

                        <h3 className="tit_5">우편번호 서비스 안내</h3>

                        <p className="msg_1">
                            다음과 같은 절차로 서비스를 받으시면 됩니다.<br/><br/>
                            1. open 보턴을 누른다<br/><br/>
                            2. 주소를 입력하여 검색한다. 예) 서울시 강동구 명일동<br/><br/>
                            3. 여기는 참조용 카카오 주소검색 화면이고 주소검색 API는 주소정제 보턴에서 실시한다<br/><br/>
                            4. https://velog.io/@bunny/React-react-daum-postcode <br/><br/>
                            5. https://www.npmjs.com/package/react-daum-postcode?activeTab=readme<br/><br/>
                            4번, 5번은 juso.go.kr react사용법 참조 url 입니다.</p>
                    
                        {/* <!--// 본문 --> */}
                        <button className="btn btn_skyblue_h46 w_100" type='button' onClick={handleClick}>
                             Open
                        </button>
                        <br/><br/>
                        {/* <button className="btn btn_blue_h46 w_200" onClick={fetchDataOn} >csv파일읽기</button>   
                        <br/><br/>
                        <button className="btn btn_blue_h46 w_200" onClick={fetchDataFromDb} >db에서csv읽기</button>   

                        <br/><br/>
                        <button className="btn btn_blue_h46 w_200" onClick={fetchDataFromJuso} >juso정제</button>   
                        <br/><br/>
                        <button className="btn btn_blue_h46 w_200" onClick={fetchDataFromExcelJuso} >poi처리</button>    */}



                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovSupportApply;