import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
//import { NOTICE_BLDN_ID } from 'config';
import CODE from 'constants/code';


import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovPaging from 'components/EgovPaging';

function EgovGrpauAuthorityManList(props) {
    console.group("EgovAdminNoticeBldnList22");
    console.log("[Start] EgovAdminNoticeList ------------------------------");
    console.log("EgovAdminNoticeList [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
//    console.log("EgovAdminNoticeList [history] : ", history);

   // const bbsId = NOTICE_BLDN_ID;
    // let searchCnd = '0';
    let searchKeyword = '';

    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || {pageIndex: 1, searchCondition: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});
    const [BoardDetail, setBoardDetail] = useState({});

    //chkbox
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
    const [listTag, setListTag] = useState([]);

    //목록
    const retrieveList = useCallback( (searchCondition) => {
        console.groupCollapsed("------권한관리-----");

        const retrieveListURL = '/sec/ram/EgovAuthorList.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setMasterBoard(resp.result.brdMstrVO);
                setBoardDetail(resp.result.authorManageVO);
                setPaginationInfo(resp.result.paginationInfo);
                setUser(resp.result.user);

                let mutListTag = [];
                mutListTag.push(<p className="no_data">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

                let resultCnt = resp.result.resultCnt * 1;
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                let pageSize = resp.result.paginationInfo.pageSize;

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                        console.log("--------listIdx---------"+listIdx);
                        console.log("--------resultCnt---------"+resultCnt);
                    mutListTag.push(
                        <Link to={{pathname: URL.GRPAU_AUTHORITY_MAN_DETAIL}} 
                        state={{
                            authorCode: item.authorCode,
                            authorNm: item.authorNm,
                            authorDc: item.authorDc,
                            authorCreatDe: item.authorCreatDe,
                        }} 
                        key={listIdx} className="list_item" >
                            <div>{item.authorCode}</div>
                            <div>{item.authorNm}</div>
                            <div>{item.authorDc}</div>
                            <div>{item.authorCreatDe}</div>
                           
                        <Link to={{pathname: URL.GRPAU_AUTHORITY_MAN_ROLE_DETAIL}} 
                        state={{
                            authorCode: item.authorCode,
                            // authorNm: item.authorNm,
                            // authorDc: item.authorDc,
                            // authorCreatDe: item.authorCreatDe,
                        }} 
                        key={listIdx} className="list_item" >
                 
                            <div>조회</div>
                            
                        </Link>
                            
                     </Link>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
       // console.groupEnd("권한관리");
    },[]);

    //복수건 삭제
const multiDel = (checkedList) => {
    const formData = new FormData();
    const deleteBoardURL = "/sec/ram/EgovAuthorListDelete.do";

    var tmpList="";
    checkedList.map((checked) => tmpList = tmpList + checked.props.state.authorCode + ",");
//   alert("담긴 authorCode -->"+JSON.stringify(checkedList[0].props.state.authorCode));
    
    if(formConfirm(formData)) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
//            authorCode: authorCode,
            checkedList: tmpList
        })
    }
//    alert(authorCode);

    EgovNet.requestFetch(deleteBoardURL,
        requestOptions,
        (resp) => {
            console.log("====>>> 권한 삭제 확인 = ", resp);
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("선택된 권한이 삭제되었습니다.")
                    navigate(URL.GRPAU_AUTHORITY_MAN,   
                        {state: {
//                            authorCode: authorCode
                    }
                });
                setCheckedList([]);
                retrieveList(searchCondition);
            } else {
                alert("ERR : " + resp.resultMessage);
            }
        }
    );
    }
}
const formConfirm = () => {
if (window.confirm("삭제하시겠습니까?")) {
    return true;
}else {
    return false;
    
    }
}


    useEffect(() => {
        retrieveList(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [props]);

    console.log("------------------------------EgovAdminNoticeList [End]");
    // console.groupEnd("EgovAdminNoticeList");

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
                        <li><Link to={URL.GRPAU}>그룹및권한 관리</Link></li>
                        <li>권한관리</li>
                        {/* <li>{masterBoard && masterBoard.bbsNm}</li> */}
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
                            <h1 className="tit_1">그룹및권한 관리</h1>
                        </div>
                        
                        {/* <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2> */}
                        <h2 className="tit_2">권한관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="searchCnd">
                                        <select id="searchCnd" name="searchCnd" title="조건"
										onChange={(e) => setSearchCondition({ ...searchCondition, searchCondition: e.target.value })}
                                        >
                                            <option value="1">권한명</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="f_search w_500">
                                        <input type="text" name="" defaultValue={searchKeyword} 
                                            onChange={(e) => setSearchCondition({ ...searchCondition, searchKeyword: e.target.value })}
                                        />
                                        <button type="button"
                                            onClick={() => retrieveList(searchCondition)}>조회</button>
                                    </span>
                                </li>
                                <li>
                                    <Link to={URL.GRPAU_AUTHORITY_MAN_CREATE} className="btn btn_blue_h46 pd35">등록</Link>
                                </li>
                                <li>
                                    <div><button className="btn btn_blue_h46 pd35" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                multiDel(checkedList)} 
                                            } >삭제</button>
                                    </div>   
                                 </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 test--> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list">
                            <div className="head">
                                <span>권한코드</span>
                                <span>권한명</span>
                                <span>설명</span>
                                <span>등록일시</span>
                                <span>롤정보</span>
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
                        {/* <!--// 게시판목록 --> */}

                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <EgovPaging pagination={paginationInfo} moveToPage={passedPage => {
                                retrieveList({ ...searchCondition, pageIndex: passedPage })
                            }} />
                            {/* <!--/ Paging --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovGrpauAuthorityManList;