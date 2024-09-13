import React, { useState, useEffect, useCallback } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';
import { NOTICE_LAND_ID } from 'context/config';
import EgovPaging from 'egov/common/EgovPaging';


import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';

function EgovAdminNoticeLandJusoDetail(props) {
    // console.group("EgovAdminNotice JUSO Detail");
    console.log("------------------------------");
     console.log("EgovAdminNotice JUSO Detail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    // console.log("EgovAdminNotice JUSO Detail [history] : ", history);

    const bbsId = location.state.bbsId || NOTICE_LAND_ID;
    const nttId = location.state.nttId;
    const dtlId = location.state.dtlId;

    //발급종류
    const bbsPublishCodeOptions = [{ value: "", label: "선택하세요" }, { value: "0", label: "발급전" }, { value: "1", label: "발급완료" }, { value: "2", label: "파싱완료" }, { value: "3", label: "오류" }];

    const [masterBoard, setMasterBoard] = useState({});
    const [board, setBoard] = useState({});
    const [user, setUser] = useState({});

    //본문
    const [listTag, setListTag] = useState([]);
    const [listTag2, setListTag2] = useState([]);
    const [modeInfo, setModeInfo] = useState({ mode: props.mode });

    //페이징
    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { bbsId: bbsId, nttId: nttId, pageIndex: 1, searchCnd: '0', searchWrd: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [paginationInfo, setPaginationInfo] = useState({});

    //체크박스  https://junheedot.tistory.com/11
    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
        
    const checkedItemHandler = (value, isChecked) => {
        if(isChecked) {
            setCheckedList(
                (prev) => [...prev, value]
            );
            return;
        }

    if(!isChecked && checkedList.includes(value)) {
        setCheckedList(checkedList.filter((item) => item !== value));
        return;
    }
    return;
};
    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);
    };

    //본문

    const retrieveDetail = (searchCondition) => {
        const retrieveDetailURL = '/cop/land/jusoDetail.do';
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
                setBoardDetail(resp.result.boardVO);
                console.log("--------paginationInfo 확인---------"+resp.result.paginationInfo);
                console.log("--------nttId 확인---------"+nttId);
                setPaginationInfo(resp.result.paginationInfo);
                setUser(resp.result.user);

                let mutListTag = [];

                let resultCnt = resp.result.resultCnt * 1;
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                let pageSize = resp.result.paginationInfo.pageSize;

                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                        console.log("--------resultCnt 확인---------"+resultCnt);
                        console.log("--------currentPageNo 확인---------"+currentPageNo);
                        console.log("--------pageSize 확인---------"+pageSize);
                        if(item.state == "오류" && item.errReason != null){
                            item.state = item.state + "("+ item.errReason + ")";
                        }
                    mutListTag.push(
                        <div to={{
                            pathname: URL.ADMIN_NOTICE_LAND_JUSO_DETAIL,
                            state: {
                                nttId: item.nttId,
                                bbsId: item.bbsId,
                                dtlId: item.dtlId,

                            }
                        }} key={listIdx} className="list_item" >
                            <div>{listIdx}</div>
                            <div>{item.zipCd}</div>
                            <div>{item.roadBaseAd}</div>
                            <div>{item.roadBaseA}</div>
                            <div>{item.roadBaseB}</div>
                            <div>{item.roadBaseC}</div>
                            <div>{item.roadBaseD}</div>
                            <div>{item.prclAdre}</div>
                            <div>{item.adresStat}</div>
                            <div>{item.state}</div>
                            <div>{item.frstRegisterPnttm}</div>
                            <div>
                                <button className="btn btn_blue_h46" 
                                        onClick={() => reset(item.bbsId, item.nttId, item.dtlId, listIdx, item.zipCd, item.roadBaseAd, item.roadBaseA, item.roadBaseB, item.roadBaseC, item.roadBaseD, item.prclAdre, item.state)} > 수정
                                </button>
                            </div>
                            <div><button className="btn btn_blue_h46" 
                                        onClick={() => jusoDelDetail(item.bbsId, item.nttId, item.dtlId)} >삭제</button></div>
                        </div>
                    );
                });
                setListTag(mutListTag);
                setCheckedList([]); //체크 값 초기화

            }
        );
    }

    //상단 진행현황
    const retrieveDetail2 = (searchCondition) => {
        const retrieveDetailURL = '/cop/land/jusoDetail.do';
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
                setBoardDetail(resp.result.boardVO);
                setPaginationInfo(resp.result.paginationInfo);
                setUser(resp.result.user);

                let mutListTag2 = [];

                let resultCnt = resp.result.resultCnt * 1;
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                let pageSize = resp.result.paginationInfo.pageSize;

                resp.result.resultList.filter((item, index) => index === 0).forEach(function (item, index) {
                    let listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                    mutListTag2.push(
                        <div to={{
                            pathname: URL.ADMIN_NOTICE_LAND_JUSO_DETAIL,
                            state: {
                                nttId: item.nttId,
                                bbsId: item.bbsId,
                                dtlId: item.dtlId,
                            }
                        }} key={listIdx} className="list_item" >
                            <dt>진행현황:</dt>
                            <dt>총개수:{item.staCnt}</dt>
                            <dt>발급완료:{item.finCnt}</dt>
                            <dt>파싱완료:{item.pasCnt}</dt>
                            <dt>오류:{item.errCnt}</dt>
							<dt>[주소정제는 한번만]</dt>
                        </div>
                    );
                });
                setListTag2(mutListTag2);
            } 
        );
    }

    //개별수정 버튼클릭시
        const [boardDetail, setBoardDetail] = useState({ 
            zipCd:'',
            roadBaseAd:'',
            roadBaseA:'',
            roadBaseB:'',
            roadBaseC:'',
            roadBaseD:'',
            prclAdre:'',
            state:'',
            num:'' 
         })
         const {zipCd, roadBaseAd, roadBaseA, roadBaseB, roadBaseC, roadBaseD, prclAdre, state, num} = boardDetail;
         
         const change = (e) => {
         const { value, name } = e.target.value; //  input에 name을 가진 요소의 value에 이벤트를 걸었음
         setBoardDetail(
             {
            ...boardDetail, // 기존의 text 객체를 복사(불변성을 위해), 스프레드문법
            [name]: value, // name 키를 가진 값을 value 로 변경     
             }
         );
         };
         const reset = (bbsId, nttId, dtlId, num, zipCd, roadBaseAd, roadBaseA, roadBaseB, roadBaseC, roadBaseD, prclAdre, state) => {
         const resetInputs = { 
            bbsId: bbsId,      
            nttId: nttId,      
            dtlId: dtlId,      
            num: num,
            zipCd: zipCd,
            roadBaseAd: roadBaseAd,      
            roadBaseA: roadBaseA,      
            roadBaseB: roadBaseB,      
            roadBaseC: roadBaseC,      
            roadBaseD: roadBaseD,      
            prclAdre: prclAdre,      
            state: state,      
         }
         //초기화 객체값을 넣은 변수로 변경하도록 셋인풋 실행
         setBoardDetail(resetInputs) 
         }

//삭제
const jusoDelDetail = (bbsId, nttId, dtlId) => {
    const formData = new FormData();
    const deleteBoardURL = "/cop/land/jusoDelDetail.do";
    
    if(formConfirm(formData)) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            bbsId: bbsId,
            nttId: nttId,
            dtlId: dtlId
        })
    }

    EgovNet.requestFetch(deleteBoardURL,
        requestOptions,
        (resp) => {
            console.log("====>>> 상세보기 삭제 확인 = ", resp);
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("선택된 내용이 삭제되었습니다.")
                    navigate(URL.ADMIN_NOTICE_LAND_JUSO_DETAIL,   
                        {state: {
                            bbsId: bbsId,
                            nttId: nttId,
                    }
                });
		        retrieveDetail(searchCondition);
		        retrieveDetail2(searchCondition);
            } else {
                alert("ERR : " + resp.resultMessage);
            }
        }
    );
    }
}
const formConfirm = () => {
if (window.confirm("이 주소명세를 삭제하시겠습니까?")) {
    return true;
}else {
    return false;
    
    }
}
//완료 > 수정
const jusoModCompDetail = (bbsId, nttId, dtlId, zipCd, roadBaseAd, roadBaseA, roadBaseB, roadBaseC, roadBaseD, prclAdre, state) => {
    //label에서 키로
    if(state == "발급전") state = 0;
    else if(state == "발급완료") state = 1;
    else if(state == "파싱완료") state = 2;
    else if(state == "오류") state = 3;
    else state = '';
const deleteBoardURL = "/cop/land/deleteBoardArticleAPI2.do";    
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            bbsId: bbsId,
            nttId: nttId,
            dtlId: dtlId,
            zipCd: zipCd,
            roadBaseAd: roadBaseAd,
            roadBaseA: roadBaseA,
            roadBaseB: roadBaseB,
            roadBaseC: roadBaseC,
            roadBaseD: roadBaseD,
            prclAdre: prclAdre,
            state: state,
        })
    }

    EgovNet.requestFetch(deleteBoardURL,
        requestOptions,
        (resp) => {
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("완료 처리되었습니다.")
                        navigate(URL.ADMIN_NOTICE_LAND_JUSO_DETAIL,   
                        {state: {
                            bbsId: bbsId,
                            nttId: nttId,
                            dtlId: dtlId,
                            zipCd: "",
                            roadBaseAd: "",
                            roadBaseA: "",
                            roadBaseB: "",
                            roadBaseC: "",
                            roadBaseD: "",
                            prclAdre: "",
                            state: "",
					}
               		});
		        retrieveDetail(searchCondition);
		        retrieveDetail2(searchCondition);
                alert("OK : " + resp.resultMessage);
            }
        }
    );
}


//선택 미발급 처리 
const jusoNoIssDetail = (bbsId, nttId, checkedList) => {
     const formData = new FormData();
     const deleteBoardURL = "/cop/land/jusoNoIssDetail.do";
     
    var tmpList="";
    // 근거, alert에서 parsing구조파악
    checkedList.map((checked) => tmpList = tmpList + checked.props.to.state.dtlId + ",");
//    alert("list 11 >>>"+JSON.stringify(tmpList));
// OK    alert("list 11"+JSON.stringify(checkedList[0].props.to.state.dtlId));
     if(formConfirmNoIss(formData)) {
     const requestOptions = {
         method: "POST",
         headers: {
             'Content-type': 'application/json',
         },
         // cors error
         credentials: "include",
         body: JSON.stringify({
              bbsId: bbsId,
              nttId: nttId,
              checkedList: tmpList
         })
     }

    EgovNet.requestFetch(deleteBoardURL,
        requestOptions,
        (resp) => {
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("선택된 주소가 미발급 처리되었습니다.")
                    navigate(URL.ADMIN_NOTICE_LAND_JUSO_DETAIL,
                        {state: {
                            bbsId: bbsId,
                            nttId: nttId
                    	}
                });
                setCheckedList([]);  //완료 후 체크값 초기화
				retrieveDetail(searchCondition);
        		retrieveDetail2(searchCondition);
            } else {
                alert("ERR : " + resp.resultMessage);
            }
        }
    );
    }
}
const formConfirmNoIss = (formData) => {
if (window.confirm("선택된 주소를 미발급처리 하시겠습니까?")) {
    return true;
}else {
    return false;
    
    }
}

//주소정제 
const jusoCvtDetail = (bbsId, nttId, dtlId) => {
    const formData = new FormData();
    const deleteBoardURL = "/cop/land/jusoCvtDetail.do";
    
    if(formConfirmCvt(formData)) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            bbsId: bbsId,
            nttId: nttId,
            dtlId: dtlId,
            formData
        })
    }

    EgovNet.requestFetch(deleteBoardURL,
        requestOptions,
        (resp) => {
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("선택된 주소가 정제되었습니다.")
                    navigate(URL.ADMIN_NOTICE_LAND_JUSO_DETAIL,   
                        {state: {
                            bbsId: bbsId,
                            nttId: nttId,
                    }
                });  
				retrieveDetail(searchCondition);
        		retrieveDetail2(searchCondition);          
            } else {
                alert("ERR : " + resp.resultMessage);
            }
        }
    );
    }
}
const formConfirmCvt = (formData) => {
if (window.confirm("주소를 정제하시겠습니까?")) {
    return true;
}else {
    return false;
    
    }
}

//전체 발급완료 처리 
const jusoCompDetail = (bbsId, nttId) => {
    const formData = new FormData();
    const deleteBoardURL = "/cop/land/jusoCompDetail.do";
    
    if(formConfirmComp(formData)) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            bbsId: bbsId,
            nttId: nttId,
            formData
        })
    }

    EgovNet.requestFetch(deleteBoardURL,
        requestOptions,
        (resp) => {
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("발급완료 처리되었습니다.")
                    navigate(URL.ADMIN_NOTICE_LAND_JUSO_DETAIL,   
                        {state: {
                            bbsId: bbsId,
                            nttId: nttId,
                    }
                }); 
				retrieveDetail(searchCondition);
        		retrieveDetail2(searchCondition);           
            } else {
                alert("ERR : " + resp.resultMessage);
            }
        }
    );
    }
}
const formConfirmComp = (formData) => {
if (window.confirm("발급완료하시겠습니까?")) {
    return true;
}else {
    return false;
    
    }
}  

//전체 미발급 처리 
const jusoAllNoIssDetail = (bbsId, nttId) => {
    const formData = new FormData();
    const deleteBoardURL = "/cop/land/jusoAllNoIssDetail.do";
    
    if(formConfirmAllNo(formData)) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            bbsId: bbsId,
            nttId: nttId,
            formData
        })
    }

    EgovNet.requestFetch(deleteBoardURL,
        requestOptions,
        (resp) => {
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.ADMIN_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("미발급 처리되었습니다.")
                    navigate(URL.ADMIN_NOTICE_LAND_JUSO_DETAIL,   
                        {state: {
                            bbsId: bbsId,
                            nttId: nttId,
                    }
                });   
				retrieveDetail(searchCondition);
        		retrieveDetail2(searchCondition);         
            } else {
                alert("ERR : " + resp.resultMessage);
            }
        }
    );
    }
}
const formConfirmAllNo = (formData) => {
if (window.confirm("미발급 처리하시겠습니까?")) {
    return true;
}else {
    return false;
    
    }
}     

    
    useEffect(function () {
        //jusoNoIssDetail();
        retrieveDetail(searchCondition);
        retrieveDetail2(searchCondition);
        return function () {
        }
    }, [props, searchCondition]);
    
    console.groupEnd("EgovAdminNoticeDetail");

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            console.log('checkedList:', checkedList);
        },
        [checkedList]
    );

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>{masterBoard && masterBoard.bbsNm}</li>
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
                            <h1 className="tit_1">사이트관리</h1>
                        </div>
                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                                <div className="info">
                                        <dd>
                                            {listTag2}
                                        </dd>
                                </div>
                            </div>
                            <a href="" className="btn btn_skyblue_h46 w_200" onClick={(e) => {
                                        e.preventDefault();
                                        jusoNoIssDetail(boardDetail.bbsId, boardDetail.nttId, checkedList);
                                    }}>선택 미발급 처리</a> &nbsp;&nbsp;
                            <a href="" className="btn btn_skyblue_h46 w_200" onClick={(e) => {
                                        e.preventDefault();
                                         jusoCvtDetail(boardDetail.bbsId, boardDetail.nttId, boardDetail.dtlId);
                                    }}>주소정제</a> &nbsp;&nbsp;
                            <a href="" className="btn btn_skyblue_h46 w_200" onClick={(e) => {
                                        e.preventDefault();
                                        jusoCompDetail(boardDetail.bbsId, boardDetail.nttId);
                                    }}>전체 발급완료 처리</a> &nbsp;&nbsp;
                            <a href="" className="btn btn_skyblue_h46 w_200" onClick={(e) => {
                                        e.preventDefault();
                                        jusoAllNoIssDetail(boardDetail.bbsId, boardDetail.nttId);
                                    }}>전체 미발급 처리</a> &nbsp;&nbsp;                                                                                                        
                    {/* 본문01 시작*/}
                    <div className="board_list BRD0007">
                            <div className="head">
                                <span>번호</span>
                                <span>우편번호</span>
                                <span>주소</span>
                                <span>본번</span>
                                <span>부번</span>
                                <span>동</span>
                                <span>호</span>
                                <span>지번주소</span>
                                <span>주소상태</span>
                                <span>상태</span>
                                <span>완료시각</span>
                                <span>수정</span>
                                <span>삭제</span>
                            </div>
                            <div className='result'>
                             {/* 체크박스 부분 */}
                                <form onSubmit={onSubmit}>
                                    {listTag.map((item, idx) => ( 
                                        <div className='list_item' key={idx}>
                                        <input 
                                            type="checkbox" 
                                            id={item}
                                            checked={checkedList.includes(item)}
                                            onChange={(e) => {
                                                checkHandler(e, item);
                                            }}
                                        />
                                        <label htmlFor={item}>{item}</label>
                                    </div>
                                    ))}
                                </form>    
                            </div>
                        </div>
                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <EgovPaging pagination={paginationInfo} moveToPage={passedPage => {
                                setSearchCondition({ ...searchCondition, pageIndex: passedPage });
                            }}></EgovPaging>
                            {/* <!--/ Paging --> */}
                        </div>
                {/* 본문01 끝 */}

                <br></br>
                <br></br>
                <br></br>
 
                <div className="board_list BRD0007_1">
                            <div className="head">
                                <span className='info w_100'>번호</span>
                                <span className='info w_100'>우편번호</span>
                                <span className='info w_350'>주소</span>
                                <span className='info w_100'>본번</span>
                                <span className='info w_100'>부번</span>
                                <span className='info w_90'>동</span>
                                <span className='info w_130'>호</span>
                                <span className='info w_200'>지번주소</span>
                                <span className='info w_200'>상태</span>
                                <span className='info w_100'></span>
                            </div>                 
                        </div>

                {/*수정용 상세보기 */}
                <div className="board_list BRD0007_1">
                            <label htmlFor="num"></label>
                            <input className="f_input2 w_100" name="num" type="text" value={num}
                                onChange={change} maxLength="10" readOnly="readOnly" /> 

                            <label htmlFor="zipCd"></label>
                            <input className="f_input2 w_100" name="zipCd" type="text" value={zipCd}
                                onChange={e => setBoardDetail({ ...boardDetail, zipCd: e.target.value })} 
                                maxLength="10" />   

                            <label htmlFor="roadBaseAd"></label>
                            <input className="f_input2 w_350" name="roadBaseAd" type="text" value={roadBaseAd}
                                onChange={e => setBoardDetail({ ...boardDetail, roadBaseAd: e.target.value })} 
                                maxLength="30" />   

                            <label htmlFor="roadBaseA"></label>
                            <input className="f_input2 w_100" id="roadBaseA" name="roadBaseA" type="text"
                                value={roadBaseA} 
                                onChange={e => setBoardDetail({ ...boardDetail, roadBaseA: e.target.value })}
                                maxLength="10" />  

                            <label htmlFor="roadBaseB"></label>
                            <input className="f_input2 w_100" id="roadBaseB" name="roadBaseB" type="text"
                                value={roadBaseB} 
                                onChange={e => setBoardDetail({ ...boardDetail, roadBaseB: e.target.value })}
                                maxLength="10" />

                            <label htmlFor="roadBaseC"></label>
                            <input className="f_input2 w_100" id="roadBaseC" name="roadBaseC" type="text"
                                value={roadBaseC}
                                onChange={e => setBoardDetail({ ...boardDetail, roadBaseC: e.target.value })}
                                maxLength="10" />

                            <label htmlFor="roadBaseD"></label>
                            <input className="f_input2 w_100" id="roadBaseD" name="roadBaseD" type="text"
                                value={roadBaseD} 
                                onChange={e => setBoardDetail({ ...boardDetail, roadBaseD: e.target.value })}
                                maxLength="10" />   

                            <label htmlFor="prclAdre"></label>
                            <input className="f_input2 w_250" id="prclAdre" name="prclAdre" type="text"
                                value={prclAdre} 
                                onChange={e => setBoardDetail({ ...boardDetail, prclAdre: e.target.value })}
                                maxLength="30" />

                           <label className="f_select w_180" htmlFor="state">
                                    <select
                                            id="bbsPublishCodeOptions"
                                            name="bbsPublishCodeOptions"
                                            title="상태유형선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, state: e.target.value })}
                                            value={state}
                                        >
                                            {bbsPublishCodeOptions.map((option, i) => {
                                                return (
                                                    <option value={option.label} key={option.value}>
                                                    {option.label}
                                                    </option>
                                                )
                                            })}
                                    </select>
                            </label>
                            
                                <a className="btn btn_skyblue_h46_1 w_100"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        jusoModCompDetail(bbsId, nttId, boardDetail.dtlId, boardDetail.zipCd, boardDetail.roadBaseAd, boardDetail.roadBaseA, boardDetail.roadBaseB, boardDetail.roadBaseC, boardDetail.roadBaseD, boardDetail.prclAdre, boardDetail.state)
                                    }}>완료</a>
                           
                                                         
                                                                                                                                                                                                                                        
                </div>
                {/* 버튼영역 */}
                <div className="board_btn_area">
                    <div className="right_col btn1">
                        <Link to={{
                                 pathname: URL.ADMIN_NOTICE_LAND,
                                state: {
                                    nttId: nttId,
                                    bbsId: bbsId
                                }
                            }} className="btn btn_blue_h46 w_100">목록</Link>                                
                        </div>
                    </div>
                       
                        {/* <!-- 게시판 상세보기 test... --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default EgovAdminNoticeLandJusoDetail;