import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
//import { NOTICE_ROLE_ID } from 'config';
import CODE from 'constants/code';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavGrpau';
import EgovPaging from 'components/EgovPaging';

function EgovGrpauRoleManList(props) {
    //console.group("EgovAdminNoticeBldnList7777");
    //console.log("[Start] EgovAdminNoticeList ------------------------------");
    //console.log("EgovAdminNoticeList [props] : ", props);
    const navigate = useNavigate();
    const location = useLocation();
//    console.log("EgovAdminNoticeList [history] : ", history);

  //  const bbsId = NOTICE_ROLE_ID;
    let searchKeyword = '';
const roleCode = location.state?.roleCode;
    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { pageIndex: 1, searchCondition: '0', searchKeyword: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    
    const [masterBoard, setMasterBoard] = useState({});
    const [BoardDetail, setBoardDetail] = useState({});
    const [user, setUser] = useState({});
    const [roleSort, setRoleSort] = useState({});
    // const [roleCode, setRoleCode] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});

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
        console.groupCollapsed("롤관리 시작.retrieveList()");

        const retrieveListURL = '/sec/rmt/EgovRoleList.do';
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
                setBoardDetail(resp.result.roleManageVO)
                setPaginationInfo(resp.result.paginationInfo);
                setUser(resp.result.user);

                let mutListTag = [];
                mutListTag.push(<p className="no_data">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값
                
                let resultCnt = resp.result.resultCnt * 1;
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                let pageSize = resp.result.paginationInfo.pageSize;
            //alert(currentPageNo);

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                        console.log("--------listIdx---------"+listIdx);
                        console.log("--------resultCnt---------"+resultCnt);
                    mutListTag.push(
                        <Link to={{pathname: URL.GRPAU_ROLE_MAN_DETAIL}} 
                        state={{
                            roleCode: item.roleCode
                        }} 
                        key={listIdx} className="list_item" >
                            <div style={{width: "200px"}}>{item.roleCode}</div>
                            <div>{item.roleNm}</div>
                            <div>{item.roleTyp}</div>
                            <div>{item.roleSort}</div>
                            <div>{item.roleDc}</div>
                            <div style={{width: "230px"}}>{item.roleCreatDe}</div>
                        </Link>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
       // console.groupEnd("롤 관리");
    },[]);

//복수건 삭제
const multiDel = (checkedList) => {
    const formData = new FormData();
    const deleteBoardURL = "/sec/rmt/EgovRoleDelete.do";

    var tmpList="";
        checkedList.map((checked) => tmpList = tmpList + checked.props.state.roleCode + ",");
        //checkedList.map((checked) => {
        //        const roleCode = checked?.props?.to?.state?.roleCode;
        // tmpList = tmpList + checked.props.to.state.roleCode + ",");
 //       alert("담긴 authorCode -->"+JSON.stringify(checkedList[0].props.state.roleCode));

    if(formConfirm(formData)) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
//            roleCode: roleCode,
            checkedList: tmpList
        })
    }
//    alert(roleCode);

    EgovNet.requestFetch(deleteBoardURL,
        requestOptions,
        (resp) => {
            console.log("====>>> 롤 롤 롤 삭제 확인 = ", resp);
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("선택된 롤이 삭제되었습니다.")
                    navigate(URL.GRPAU_ROLE_MAN,   
                        {state: {
//                            roleCode: roleCode
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


    useEffect(function() {
        retrieveList(searchCondition);
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [props]);

    console.log("------------------------------EgovGrpauRoleManList [End]");
    console.groupEnd("EgovGrpauRoleManList");

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
                        <li>롤 관리</li>
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
                        <h2 className="tit_2">롤 관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                            <li className="third_1 L">
                                    <label className="f_select" htmlFor="searchCnd">
                                        <select id="searchCnd" name="searchCnd" title="조건"
										onChange={(e) => setSearchCondition({ ...searchCondition, searchCondition: e.target.value })}
                                        >
                                            <option value="1">롤 명</option>
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
                                    <Link to={URL.GRPAU_ROLE_MAN_CREATE} className="btn btn_blue_h46 pd35">등록</Link>
                                    {/* <Link to={{
                                        pathname: URL.GRPAU_ROLE_MAN_CREATE,
                                        state: {
                                            roleCode: BoardDetail.roleCode,
                                            roleNm: BoardDetail.roleNm,
                                            rolePtn: BoardDetail.rolePtn,
                                            searchCondition: searchCondition
                                        }
                                    }} className="btn btn_blue_h46 w_100">등록</Link> */}
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
                            <span style={{width: "216px"}}>롤 ID</span>
                                <span>롤 명</span>
                                <span>롤 타입</span>
                                <span>롤 Sort</span>
                                <span>롤 설명</span>
                                <span>등록일자</span>
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


export default EgovGrpauRoleManList;