import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "../components2/EgovSupportStudy23.module.css";
import * as EgovNet from "api/egovFetch";
import URL from "constants/url";
//import { NOTICE_BLDN_ID } from 'config';
import CODE from "constants/code";


import EgovPaging from "components/EgovPaging";

function EgovGrpauUserAuthorityList(props) {
  console.group("EgovGrpauUserAuthorityList");
  console.log(
    "[Start] EgovGrpauUserAuthorityList ------------------------------"
  );
  console.log("EgovGrpauUserAuthorityList [props] : ", props);
  const navigate = useNavigate();

  const location = useLocation();
  //    console.log("EgovAdminNoticeList [history] : ", history);

  //    const bbsId = NOTICE_BLDN_ID;

  //    let searchKeyword = '';

  const [searchCondition, setSearchCondition] = useState(
    location.state?.searchCondition || {
      pageIndex: 1,
      searchCnd: "0",
      searchKeyword: "",
    }
  ); // 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
  const [masterBoard, setMasterBoard] = useState({});
  const [boardDetail, setBoardDetail] = useState({});
  const [user, setUser] = useState({});
  const [groupSort, setGroupSort] = useState({});
  const [groupCode, setGroupCode] = useState({});
  const [paginationInfo, setPaginationInfo] = useState({});
  const authorNmOptions = [
    { value: "사과", label: "사과" },
    { value: "바나나", label: "바나나" },
    { value: "오렌지", label: "오렌지" },
    { value: "키위", label: "키위" },
    { value: "포도", label: "포도" },
    { value: "딸기", label: "딸기" },
    { value: "망고", label: "망고" },
    { value: "감", label: "감" },
    { value: "포도", label: "포도" },
    { value: "자두", label: "자두" },
  ];
  //const authorNmOptions = ["관리자", "오픈기능", "사용자"];

  //chkbox
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  const checkedItemHandler = (value, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }

    if (!isChecked && checkedList.includes(value)) {
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

  const retrieveList = useCallback((searchCondition) => {
    console.groupCollapsed(
      "EgovGrpauUserAuthorityList.retrieveList() searchCnd" +
        searchCondition.searchCnd
    );
    console.groupCollapsed(
      "EgovGrpauUserAuthorityList.retrieveList() searchKeyword" +
        searchCondition.searchKeyword
    );

    const retrieveListURL = "/sec/rgm/EgovAuthorGroupList.do";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(searchCondition),
    };

    EgovNet.requestFetch(
      retrieveListURL,
      requestOptions,
      (resp) => {
        setMasterBoard(resp.result.brdMstrVO);
        setBoardDetail(resp.result.authorGroupVO);
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
          var listIdx =
            resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
          console.log("--------listIdx---------" + listIdx);
          console.log("--------resultCnt---------" + resultCnt);
          mutListTag.push(
            <Link
              to={{ pathname: URL.GRPAU_USER_AUTHORITY }}
              state={{
                userId: item.userId,
                userNm: item.userNm,
                groupId: item.groupId,
              }}
              key={listIdx}
              className="list_item"
            >
              <div>{item.userId}</div>
              <div>{item.userNm}</div>
              <div>{item.mberTyNm}</div>
              <div>
                <label className="f_select" htmlFor="searchCnd">
                  {/*<select id="searchCnd" name="searchCnd" title="종류선택"
                                                onChange={(e) => setSearchCondition({ ...searchCondition, searchCnd: e.target.value })}
                                            >
                                                <option value={option.value} key={option.value}>{item.authorNm}</option>
                                                <option value="1">{item.authorNm}</option>
                                                <option value="2">{item.authorNm}</option>
                                            </select>*/}
                  <select
                    id="authorNmOptions"
                    name="authorNmOptions"
                    title="권한유형선택"
                    onChange={(e) =>
                      setBoardDetail({
                        ...boardDetail,
                        authorCode: e.target.value,
                      })
                    }
                    value={boardDetail.authorCode}
                  >
                    {authorNmOptions.map((option, i) => {
                      return (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div>{item.regYn}</div>
            </Link>
          );
        });
        setListTag(mutListTag);
      },
      function (resp) {
        console.log("err response : ", resp);
      }
    );
    console.groupEnd("EgovGrpauUserAuthorityList.retrieveList()");
  }, []);

  //삭제
  const mutiDel = (checkedList) => {
    const formData = new FormData();
    const deleteBoardURL = "/sec/rgm/EgovAuthorGroupDelete.do";

    var tmpList = "";
    checkedList &&
      checkedList.map(
        (checked) => (tmpList = tmpList + checked.props.state.userId + ",")
      );

    if (formConfirm(formData)) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          //            groupCode: groupCode,
          checkedList: tmpList,
        }),
      };
      //    alert(groupCode);

      EgovNet.requestFetch(deleteBoardURL, requestOptions, (resp) => {
        console.log("====>>> 권한 등록취소 확인 = ", resp);
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          alert("선택된 권한이 등록취소 되었습니다.");
          navigate(URL.GRPAU_USER_AUTHORITY, {
            state: {
              groupCode: groupCode,
            },
          });
          setCheckedList([]);
          retrieveList(searchCondition);
        } else {
          alert("ERR : " + resp.resultMessage);
        }
      });
    }
  };
  const formConfirm = () => {
    if (window.confirm("등록취소 하시겠습니까?")) {
      return true;
    } else {
      return false;
    }
  };
  //등록
  const mutiIns = (checkedList) => {
    const formData = new FormData();
    const deleteBoardURL = "/sec/rgm/EgovAuthorGroupInsert.do";

    var tmpList = "";
    checkedList &&
      checkedList.map(
        (checked) => (tmpList = tmpList + checked.props.state.userId + ",")
      );
    alert(
      "담긴 userId -->" + JSON.stringify(checkedList[0].props.state.userId)
    );
    alert("담긴 state -->" + JSON.stringify(checkedList[0].props.state));
    alert("담긴 props -->" + JSON.stringify(checkedList[0].props));

      var tmpAuthorCodeList = "";
      checkedList &&
        checkedList.map(
          (checked) =>
            (tmpAuthorCodeList =
              tmpAuthorCodeList + checked.props.state.authorCode + ",")
        );
      var tmpMberTyCodeList = "";
      checkedList &&
        checkedList.map(
          (checked) =>
            (tmpMberTyCodeList =
              tmpMberTyCodeList + checked.props.state.mberTyCode + ",")
        );
      var tmpRegYnList = "";
      checkedList &&
        checkedList.map(
          (checked) =>
            (tmpRegYnList = tmpRegYnList + checked.props.state.regYn + ",")
        );

    if (formInsConfirm(formData)) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          checkedList: tmpList,
          checkedAuthorCodeList: tmpAuthorCodeList,
          checkedMberTyCodeList: tmpMberTyCodeList,
          checkedRegYnList: tmpRegYnList,
        }),
      };
      //    alert(groupCode);

      EgovNet.requestFetch(deleteBoardURL, requestOptions, (resp) => {
        console.log("====>>> 권한 등록 확인 = ", resp);
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          alert("선택된 권한이 등록 되었습니다.");
          navigate(URL.GRPAU_USER_AUTHORITY, {
            state: {
              groupCode: groupCode,
            },
          });
          setCheckedList([]);
          retrieveList(searchCondition);
        } else {
          alert("ERR : " + resp.resultMessage);
        }
      });
    }
  };
  const formInsConfirm = () => {
    if (window.confirm("등록 하시겠습니까?")) {
      return true;
    } else {
      return false;
    }
  };



  console.log("------------------------------EgovGrpauUserAuthorityList [End]");
  console.groupEnd("EgovGrpauUserAuthorityList");

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      console.log("checkedList:", checkedList);
    },
    [checkedList]
  );

  return (
    <div className="container">
      <div className="c_wrap">
        {/* <!-- Location --> */}
        <div className="location">
          <ul>
            <li>
              <Link to={URL.MAIN} className="home">
                Home
              </Link>
            </li>
            <li>
              <Link to={URL.GRPAU}>그룹및권한 관리</Link>
            </li>
            <li>사용자별 권한관리</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        {/* <!-- 검색조건 --> */}
        <div className="condition">
          <ul>
            <li className="third_1 L">
              <label className="f_select" htmlFor="searchCnd">
                <select
                  id="searchCnd"
                  name="searchCnd"
                  title="조건"
                  onChange={(e) =>
                    setSearchCondition({
                      ...searchCondition,
                      searchCnd: e.target.value,
                    })
                  }
                >
                  <option value="0">사용자 ID</option>
                  <option value="1">사용자 명</option>
                  <option value="2">그룹</option>
                </select>
              </label>
            </li>
            <li className="third_2 R">
              <span className="f_search w_500">
                <input
                  type="text"
                  name=""
                  defaultValue={
                    searchCondition && searchCondition.searchKeyword
                  }
                  placeholder=""
                  onChange={(e) =>
                    setSearchCondition({
                      ...searchCondition,
                      searchKeyword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => retrieveList(searchCondition)}
                >
                  조회
                </button>
              </span>
            </li>
            <li>
              <div>
                <button
                  className="btn btn_blue_h46 w_100"
                  onClick={(e) => {
                    e.preventDefault();
                    mutiIns(checkedList);
                  }}
                >
                  권한등록
                </button>
              </div>
            </li>
            <li>
              <div>
                <button
                  className="btn btn_blue_h46 w_100"
                  onClick={(e) => {
                    e.preventDefault();
                    mutiDel(checkedList);
                  }}
                >
                  등록취소
                </button>
              </div>
            </li>
          </ul>
        </div>
        {/* <!--// 검색조건 test--> */}

        {/* <!-- 게시판목록 --> */}
        <div className="board_list">
          <div className="head">
            <span>사용자 ID</span>
            <span>사용자 명</span>
            <span>사용자 유형1</span>
            <span>권한</span>
            <span>등록 여부</span>
          </div>
          <div className="result">
            {/* 체크박스 부분 */}
            <form onSubmit={onSubmit}>
              {listTag.map((item, idx) => (
                <div className="list_item" key={idx}>
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
        <div class="result">
    <form>
        <div className={style.list_item}><input type="checkbox" id="[object Object]"></input><label for="[object Object]">
                    <div className={style.go}>admin</div>
                    <div className={style.go}>관리자</div>
                    <div className={style.go}></div>
                    <div className={style.go}><label class="f_select" for="searchCnd"><select id="authorNmOptions" name="authorNmOptions" title="권한유형선택">
                                <option>사과</option>
                                <option>바나나</option>
                                <option>오렌지</option>
                                <option>키위</option>
                                <option>포도</option>
                                <option>딸기</option>
                                <option>망고</option>
                                <option>감</option>
                                <option>수박</option>
                                <option>자두</option>
                            </select></label></div>
                    <div className={style.go}>Y</div>
               </label></div>
        <div className={style.list_item}><input type="checkbox" id="[object Object]"></input><label for="[object Object]">
                    <div className={style.go}>test01</div>
                    <div className={style.go}>test1</div>
                    <div className={style.go}></div>
                    <div className={style.go}><label class="f_select" for="searchCnd"><select id="authorNmOptions" name="authorNmOptions" title="권한유형선택">
                    <option>사과</option>
                                <option>바나나</option>
                                <option>오렌지</option>
                                <option>키위</option>
                                <option>포도</option>
                                <option>딸기</option>
                                <option>망고</option>
                                <option>감</option>
                                <option>수박</option>
                                <option>자두</option>
                            </select></label></div>
                    <div className={style.go}>Y</div>
                </label></div>
        <div className={style.list_item}><input type="checkbox" id="[object Object]"></input><label for="[object Object]">
                    <div className={style.go}>test02</div>
                    <div className={style.go}>test2</div>
                    <div className={style.go}></div>
                    <div className={style.go}><label class="f_select" for="searchCnd"><select id="authorNmOptions" name="authorNmOptions" title="권한유형선택">
                    <option>사과</option>
                                <option>바나나</option>
                                <option>오렌지</option>
                                <option>키위</option>
                                <option>포도</option>
                                <option>딸기</option>
                                <option>망고</option>
                                <option>감</option>
                                <option>수박</option>
                                <option>자두</option>
                            </select></label></div>
                    <div className={style.go}>Y</div>
                </label></div>
        <div className={style.list_item}><input type="checkbox" id="[object Object]"></input><label for="[object Object]">
                    <div className={style.go}>test03</div>
                    <div className={style.go}>test3</div>
                    <div className={style.go}></div>
                    <div className={style.go}><label class="f_select" for="searchCnd"><select id="authorNmOptions" name="authorNmOptions" title="권한유형선택">
                    <option>사과</option>
                                <option>바나나</option>
                                <option>오렌지</option>
                                <option>키위</option>
                                <option>포도</option>
                                <option>딸기</option>
                                <option>망고</option>
                                <option>감</option>
                                <option>수박</option>
                                <option>자두</option>
                            </select></label></div>
                    <div className={style.go}>Y</div>
               </label></div>
        <div className={style.list_item}><input type="checkbox" id="[object Object]"></input><label for="[object Object]">
                    <div className={style.go}>test04</div>
                    <div className={style.go}>test4</div>
                    <div className={style.go}v></div>
                    <div className={style.go}><label class="f_select" for="searchCnd"><select id="authorNmOptions" name="authorNmOptions" title="권한유형선택">
                    <option>사과</option>
                                <option>바나나</option>
                                <option>오렌지</option>
                                <option>키위</option>
                                <option>포도</option>
                                <option>딸기</option>
                                <option>망고</option>
                                <option>감</option>
                                <option>수박</option>
                                <option>자두</option>
                            </select></label></div>
                    <div className={style.go}>Y</div>
               </label></div>
        <div className={style.list_item}><input type="checkbox" id="[object Object]"></input><label for="[object Object]">
                    <div className={style.go}>test05</div>
                    <div className={style.go}>test5</div>
                    <div className={style.go}></div>
                    <div className={style.go}><label class="f_select" for="searchCnd"><select id="authorNmOptions" name="authorNmOptions" title="권한유형선택">
                    <option>사과</option>
                                <option>바나나</option>
                                <option>오렌지</option>
                                <option>키위</option>
                                <option>포도</option>
                                <option>딸기</option>
                                <option>망고</option>
                                <option>감</option>
                                <option>수박</option>
                                <option>자두</option>
                            </select></label></div>
                    <div className={style.go}>Y</div>
               </label></div>
        <div className={style.list_item}><input type="checkbox" id="[object Object]"></input><label for="[object Object]">
                    <div className={style.go}>test06</div>
                    <div className={style.go}>test6</div>
                    <div className={style.go}></div>
                    <div className={style.go}><label class="f_select" for="searchCnd"><select id="authorNmOptions" name="authorNmOptions" title="권한유형선택">
                    <option>사과</option>
                                <option>바나나</option>
                                <option>오렌지</option>
                                <option>키위</option>
                                <option>포도</option>
                                <option>딸기</option>
                                <option>망고</option>
                                <option>감</option>
                                <option>수박</option>
                                <option>자두</option>
                            </select></label></div>
                    <div className={style.go}>Y</div>
                </label></div>
        <div className={style.list_item}><input type="checkbox" id="[object Object]"></input><label for="[object Object]">
                    <div className={style.go}>user1</div>
                    <div className={style.go}>유저1</div>
                    <div className={style.go}></div>
                    <div className={style.go}><label class="f_select" for="searchCnd"><select id="authorNmOptions" name="authorNmOptions" title="권한유형선택">
                    <option>사과</option>
                                <option>바나나</option>
                                <option>오렌지</option>
                                <option>키위</option>
                                <option>포도</option>
                                <option>딸기</option>
                                <option>망고</option>
                                <option>감</option>
                                <option>수박</option>
                                <option>자두</option>
                            </select></label></div>
                    <div className={style.go}>Y</div>
                </label></div>
        <div className={style.list_item}><input type="checkbox" id="[object Object]"></input><label for="[object Object]">
                    <div className={style.go}>wind2123</div>
                    <div className={style.go}>백인홍</div>
                    <div className={style.go}></div>
                    <div className={style.go}><label class="f_select" for="searchCnd"><select id="authorNmOptions" name="authorNmOptions" title="권한유형선택">
                    <option>사과</option>
                                <option>바나나</option>
                                <option>오렌지</option>
                                <option>키위</option>
                                <option>포도</option>
                                <option>딸기</option>
                                <option>망고</option>
                                <option>감</option>
                                <option>수박</option>
                                <option>자두</option>
                            </select></label></div>
                    <div className={style.go}>Y</div>
                </label></div>
        <div className={style.list_item}><input type="checkbox" id="[object Object]"></input><label for="[object Object]">
                    <div className={style.go}>wtgtyh12345</div>
                    <div className={style.go}>백인홍2</div>
                    <div className={style.go}></div>
                    <div className={style.go}><label class="f_select" for="searchCnd"><select id="authorNmOptions" name="authorNmOptions" title="권한유형선택">
                    <option>사과</option>
                                <option>바나나</option>
                                <option>오렌지</option>
                                <option>키위</option>
                                <option>포도</option>
                                <option>딸기</option>
                                <option>망고</option>
                                <option>감</option>
                                <option>수박</option>
                                <option>자두</option>
                            </select></label></div>
                    <div className={style.go}>Y</div>
                </label></div>
    </form>
</div>
        {/* <!--// 게시판목록 --> */}

        <div className="board_bot">
          {/* <!-- Paging --> */}
          <EgovPaging
                pagination={paginationInfo}
                moveToPage={(passedPage) => {
                  retrieveList({ ...searchCondition, pageIndex: passedPage });
                }}
          />
          {/* <!--/ Paging --> */}
        </div>

        {/* <!--// 본문 --> */}
      </div>
    </div>
  );
}

export default EgovGrpauUserAuthorityList;
