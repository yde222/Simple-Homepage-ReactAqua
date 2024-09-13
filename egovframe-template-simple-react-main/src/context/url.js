
const URL = {
    //COMMON
    MAIN                        : "/", //메인페이지   
    
    LOGIN                       : "/login", //로그인
    ERROR                       : "/error", //로그인
    LOGIN_CREATE                : "/login/create", // 로그인/등록
    LOGIN_MODIFY                : "/login/modify", // 로그인/등록
    
    //ABOUT
    ABOUT                       : "/about", //사이트소개   
    ABOUT_SITE                  : "/about/site", // 사이트소개/소개
    ABOUT_HISTORY               : "/about/history", // 사이트소개/연혁
    ABOUT_ORGANIZATION          : "/about/organization", // 사이트소개/조직소개
    ABOUT_LOCATION              : "/about/location", // 사이트소개/찾아오시는길
    
    //INTRO
    INTRO                       : "/intro", //정보마당
    INTRO_WORKS                 : "/intro/works", // 정보마당/주요사업소개
    INTRO_SERVICE               : "/intro/service", // 정보마당/주요서비스소개
    
    //SUPPORT
    SUPPORT                     : "/support", // 고객지원
    SUPPORT_DOWNLOAD            : "/support/download", // 고객지원/자료실
    SUPPORT_DOWNLOAD_DETAIL     : "/support/download/detail", // 고객지원/자료실/상세
    SUPPORT_DOWNLOAD_CREATE     : "/support/download/create", // 고객지원/자료실/등록
    SUPPORT_QNA                 : "/support/qna", // 고객지원/묻고답하기
    SUPPORT_QNA_DETAIL          : "/support/qna/detail", // 고객지원/묻고답하기/상세
    SUPPORT_APPLY               : "/support/apply", // 고객지원/서비스신청
    SUPPORT_STUDY1               : "/support/study1", // 고객지원/리액트공부1
    SUPPORT_STUDY2               : "/support/study2", // 고객지원/리액트공부2
    SUPPORT_STUDY3               : "/support/study3", // 고객지원/리액트공부3
    SUPPORT_STUDY4               : "/support/study4", // 고객지원/리액트공부4
    SUPPORT_STUDY5               : "/support/study5", // 고객지원/리액트공부5
    SUPPORT_STUDY6               : "/support/study6", // 고객지원/리액트공부6
    SUPPORT_STUDY7               : "/support/study7", // 고객지원/리액트공부7
    SUPPORT_STUDY8               : "/support/study8", // 고객지원/리액트공부8
    SUPPORT_STUDY9               : "/support/study9", // 고객지원/리액트공부9
    SUPPORT_STUDY10               : "/support/study10", // 고객지원/리액트공부10
    SUPPORT_STUDY11               : "/support/study11", // 고객지원/리액트공부11
    SUPPORT_STUDY12               : "/support/study12", // 고객지원/리액트공부12
    SUPPORT_STUDY13               : "/support/study13", // 고객지원/리액트공부13
    SUPPORT_STUDY14               : "/support/study14", // 고객지원/리액트공부14
    SUPPORT_STUDY15               : "/support/study15", // 고객지원/리액트공부15
    SUPPORT_STUDY21               : "/support/study21", // 고객지원/백인홍입니다만?
    SUPPORT_STUDY22               : "/support/study22", // 고객지원/백인홍입니다만?
    SUPPORT_STUDY23               : "/support/study23", // 고객지원/백인홍입니다만?
    SUPPORT_STUDY31               : "/support/study31", // react에서-select-box-컴포넌트-만들기
    SUPPORT_STUDY32               : "/support/study32", // 시간 option 만들기 - 시(hour)
    SUPPORT_STUDY33               : "/support/study33", // Select의 defaultValue 를 state를 이용하여 동적 변경 시키기.
    SUPPORT_STUDY34               : "/support/study34", // react 복수 선택.
    SUPPORT_STUDY35               : "/support/study35", // react checkbox.
    SUPPORT_STUDY36               : "/support/study36", // react multi checkbox.
    SUPPORT_STUDY37               : "/support/study37", // react radio button.
    SUPPORT_STUDY38               : "/support/study38", // react checkbox group.
    SUPPORT_STUDY39               : "/support/study39", // react react-select.
    SUPPORT_STUDY40               : "/support/study40", // react checkbox control.
    SUPPORT_STUDY41               : "/support/study41", // react context.
    SUPPORT_STUDY42               : "/support/study42", // react selected.
    SUPPORT_STUDY43               : "/support/study43", // react useEffect
    SUPPORT_STUDY44               : "/support/study44", // react modal
    SUPPORT_STUDY45               : "/support/study45", // react scroll
    SUPPORT_STUDY46               : "/support/study46", // react Reducer
    SUPPORT_STUDY47               : "/support/study47", // react parent child component
    SUPPORT_STUDY48               : "/support/study48", // react hierarchy tree - any React children accepted for nodes
    SUPPORT_STUDY49               : "/support/study49", // react hierarchy tree - StyledTreeExample
    SUPPORT_STUDY50               : "/support/study50", // react 드롭다운 메뉴
    SUPPORT_STUDY51               : "/support/study51", // react checkbox-tree
    SUPPORT_STUDY52               : "/support/study52", // react HiddenCheckboxesExample
    SUPPORT_STUDY53               : "/support/study53", // react makeLargeDataSet
    SUPPORT_STUDY54               : "/support/study54", // react 모달창(Modal) 초간단 구현 방법
    SUPPORT_STUDY55               : "/support/study55", //Portal을 사용한 모달창 만들기
    SUPPORT_STUDY56               : "/support/study56", //setState가 잘못된 값을 주는 이유
    SUPPORT_STUDY57               : "/support/study57", //setState가 잘못된 값을 주는 이유,,개선,,3. setState의 updater 인자에 함수 사용
    SUPPORT_STUDY58               : "/support/study58", //"send"를 누르면 setIsSent(true)가 React에게 UI를 다시 렌더링하도록 지시
    SUPPORT_STUDY59               : "/support/study59", //버튼을 클릭하면 setNumber(숫자 + 1)을 세 번 호출.
    SUPPORT_STUDY60               : "/support/study60", //시간 경과에 따른 상태 alert.
    SUPPORT_STUDY61               : "/support/study61", //시간 경과에 따른 상태 message.
    SUPPORT_STUDY62               : "/support/study62", //신호등 구현 message.
    SUPPORT_STUDY63               : "/support/study63", //setNumber(숫자 + 1).
    SUPPORT_STUDY64               : "/support/study64", //setNumber(숫자 + 5).
    SUPPORT_STUDY65               : "/support/study65", //setNumber(42).
    SUPPORT_STUDY66               : "/support/study66", //setPending(p => p - 1).
    SUPPORT_STUDY67               : "/support/study67", //getFinalState 함수
	SUPPORT_STUDY68               : "/support/study68", //current pointer position.
	SUPPORT_STUDY69               : "/support/study69", //objects with the spread syntax.
	SUPPORT_STUDY70               : "/support/study70", //with a single event handler(값은 69와 동일).
	SUPPORT_STUDY71               : "/support/study71", //Updating a nested object
	SUPPORT_STUDY72               : "/support/study72", //from 'use-immer'
	SUPPORT_STUDY73               : "/support/study73", //언어구성,,,https://www.daleseo.com/react-intl/
	SUPPORT_STUDY74               : "/support/study74", //네명챗룸
	
    //INFORM
    INFORM                      : "/inform", // 알림마당 
    INFORM_DAILY                : "/inform/daily", // 알림마당/오늘의행사
    INFORM_DAILY_DETAIL         : "/inform/daily/detail", // 알림마당/오늘의행사상세
    INFORM_WEEKLY               : "/inform/weekly", // 알림마당/금주의행사
    INFORM_WEEKLY_DETAIL        : "/inform/weekly/detail", // 알림마당/금주의행사상세
    INFORM_NOTICE               : "/inform/notice", // 알림마당/공지사항
    INFORM_NOTICE_DETAIL        : "/inform/notice/detail", // 알림마당/공지사항상세
    INFORM_NOTICE_CREATE        : "/inform/notice/create", // 알림마당/공지사항등록
    INFORM_NOTICE_MODIFY        : "/inform/notice/modify", // 알림마당/공지사항수정
    INFORM_NOTICE_REPLY         : "/inform/notice/reply", // 알림마당/공지사항답글
    INFORM_GALLERY              : "/inform/gallery", // 알림마당/사이트갤러리
    INFORM_GALLERY_DETAIL       : "/inform/gallery/detail", // 알림마당/사이트갤러리상세
    INFORM_GALLERY_CREATE       : "/inform/gallery/create", // 알림마당/사이트갤러리등록
    INFORM_GALLERY_MODIFY       : "/inform/gallery/modify", // 알림마당/사이트갤러리수정
    INFORM_GALLERY_REPLY        : "/inform/gallery/reply", // 알림마당/사이트갤러리답글
    
    //ADMIN
    ADMIN                       : "/admin", // 사이트관리
    ADMIN_SCHEDULE              : "/admin/schedule", // 사이트관리/일정관리
    ADMIN_SCHEDULE_DETAIL       : "/admin/schedule/detail", // 사이트관리/일정관리상세
    ADMIN_SCHEDULE_CREATE       : "/admin/schedule/create", // 사이트관리/일정관리생성
    ADMIN_SCHEDULE_MODIFY       : "/admin/schedule/modify", // 사이트관리/일정관리수정

    ADMIN_TEMPLATE              : "/admin/template", // 사이트관리/게시판템플릿관리 목록
    ADMIN_TEMPLATE_CREATE       : "/admin/template/create", // 사이트관리/게시판템플릿관리 등록
    ADMIN_TEMPLATE_MODIFY       : "/admin/template/modify", // 사이트관리/게시판템플릿관리 상세/수정

    ADMIN_BOARD                 : "/admin/board", // 사이트관리/게시판생성관리 목록
    ADMIN_BOARD_DETAIL          : "/admin/board/detail", // 사이트관리/게시판생성관리 상세
    ADMIN_BOARD_CREATE          : "/admin/board/create", // 사이트관리/게시판생성관리 등록
    ADMIN_BOARD_MODIFY          : "/admin/board/modify", // 사이트관리/게시판생성관리 상세/수정

    ADMIN_USAGE                 : "/admin/usage", // 사이트관리/게시판사용관리 목록
    ADMIN_USAGE_DETAIL          : "/admin/usage/detail", // 사이트관리/게시판사용관리 상세
    ADMIN_USAGE_CREATE          : "/admin/usage/create", // 사이트관리/게시판사용관리 등록
    ADMIN_USAGE_MODIFY          : "/admin/usage/modify", // 사이트관리/게시판사용관리 상세/수정

    ADMIN_NOTICE                : "/admin/notice/", // 사이트관리/공지사항관리 목록
    ADMIN_NOTICE_DETAIL         : "/admin/notice/detail", // 사이트관리/공지사항관리 상세
    ADMIN_NOTICE_CREATE         : "/admin/notice/create", // 사이트관리/공지사항관리 등록
    ADMIN_NOTICE_MODIFY         : "/admin/notice/modify", // 사이트관리/공지사항관리 수정
    ADMIN_NOTICE_REPLY          : "/admin/notice/reply", // 사이트관리/공지사항관리 답글 등록

    ADMIN_GALLERY               : "/admin/gallery", // 사이트관리/사이트갤러리관리
    ADMIN_GALLERY_DETAIL        : "/admin/gallery/detail", // 사이트관리/사이트갤러리관리 상세
    ADMIN_GALLERY_CREATE        : "/admin/gallery/create", // 사이트관리/사이트갤러리관리 등록
    ADMIN_GALLERY_MODIFY        : "/admin/gallery/modify", // 사이트관리/사이트갤러리관리 수정
    ADMIN_GALLERY_REPLY         : "/admin/gallery/reply", // 사이트관리/사이트갤러리관리 답글 등록

    ADMIN_OPER               : "/admin/oper", // 사이트관리/구동관리
    ADMIN_OPER2               : "/admin/oper2", // 사이트관리/구동관리
    ADMIN_FISHTEMP1           : "/admin/fishtemp1", // 사이트관리/물고기온도1,,,"/admin/fishtemp1" 변경 필요
    ADMIN_FISHTEMP2           : "/admin/fishtemp2", // 사이트관리/물고기온도2,,,"/admin/fishtemp2" 변경 필요
    ADMIN_FISHTEMP3           : "/admin/fishtemp3", // 사이트관리/물고기온도3,,,"/admin/fishtemp3" 변경 필요

    ADMIN_LOGIN                : "/admin/login/", // 사이트관리/로그인사용자관리 목록
    ADMIN_LOGIN_DETAIL         : "/admin/login/detail", // 사이트관리/로그인사용자관리 상세
    ADMIN_LOGIN_CREATE         : "/admin/login/create", // 사이트관리/로그인사용자관리 등록
    ADMIN_LOGIN_MODIFY         : "/admin/login/modify", // 사이트관리/로그인사용자관리 수정

    ADMIN_NOTICE_EST            :"/admin/noticeEst", //사이트관리/부동산등기부등본 목록
    ADMIN_NOTICE_EST_DETAIL     :"/admin/noticeEst/detail", //사이트관리/부동산등기부등본 상세
    ADMIN_NOTICE_EST_CREATE     :"/admin/noticeEst/create", //사이트관리/부동산등기부등본 등록
    ADMIN_NOTICE_EST_MODIFY     :"/admin/noticeEst/modify", //사이트관리/부동산등기부등본 수정
    ADMIN_NOTICE_EST_REPLY      :"/admin/noticeEst/reply", //사이트관리/부동산등기부등본 답글 등록
    ADMIN_NOTICE_EST_JUSO_DETAIL :"/admin/noticeEst/jusoDetail", //사이트관리/부동산등기부등본 주소 상세 추가

    ADMIN_NOTICE_CORP           :"/admin/noticeCorp", //사이트관리/법인등기부등본 목록
    ADMIN_NOTICE_CORP_DETAIL    :"/admin/noticeCorp/detail", //사이트관리/법인등기부등본 상세
    ADMIN_NOTICE_CORP_CREATE    :"/admin/noticeCorp/create", //사이트관리/법인등기부등본 등록
    ADMIN_NOTICE_CORP_MODIFY    :"/admin/noticeCorp/modify", //사이트관리/법인등기부등본 수정
    ADMIN_NOTICE_CORP_REPLY     :"/admin/noticeCorp/reply", //사이트관리/법인등기부등본 답글 등록
    ADMIN_NOTICE_CORP_JUSO_DETAIL :"/admin/noticeCorp/jusoDetail", //사이트관리/법인등기부등본 주소 상세 추가

    ADMIN_NOTICE_BLDN           :"/admin/noticeBldn", //사이트관리/건축물대장 목록
    ADMIN_NOTICE_BLDN_DETAIL    :"/admin/noticeBldn/detail", //사이트관리/건축물대장 상세
    ADMIN_NOTICE_BLDN_CREATE    :"/admin/noticeBldn/create", //사이트관리/건축물대장 등록
    ADMIN_NOTICE_BLDN_MODIFY    :"/admin/noticeBldn/modify", //사이트관리/건축물대장 수정
    ADMIN_NOTICE_BLDN_REPLY     :"/admin/noticeBldn/reply", //사이트관리/건축물대장 답글 등록
    ADMIN_NOTICE_BLDN_JUSO_DETAIL :"/admin/noticeBldn/jusoDetail", //사이트관리/건축물대장 주소 상세 추가


    ADMIN_NOTICE_LAND           :"/admin/noticeLand", //사이트관리/토지임야대장 목록
    ADMIN_NOTICE_LAND_DETAIL    :"/admin/noticeLand/detail", //사이트관리/토지임야대장 상세
    ADMIN_NOTICE_LAND_CREATE    :"/admin/noticeLand/create", //사이트관리/토지임야대장 등록
    ADMIN_NOTICE_LAND_MODIFY    :"/admin/noticeLand/modify", //사이트관리/토지임야대장 수정
    ADMIN_NOTICE_LAND_REPLY     :"/admin/noticeLand/reply", //사이트관리/토지임야대장 답글 등록
    ADMIN_NOTICE_LAND_JUSO_DETAIL :"/admin/noticeLand/jusoDetail", //사이트관리/토지임야대장 주소 상세 추가 test

    //GRPAU
    GRPAU                       : "/grpau", // 그룹및권한관리

// 사용자등록관리
    GRPAU_USER_INSERT            :"/grpau/userInsert", //그룹및권한관리/사용자등록관리 목록
    GRPAU_USER_INSERT_DETAIL     :"/grpau/userInsert/detail", //그룹및권한관리/사용자등록관리 상세
    GRPAU_USER_INSERT_CREATE     :"/grpau/userInsert/create", //그룹및권한관리/사용자등록관리 등록
    GRPAU_USER_INSERT_MODIFY     :"/grpau/userInsert/modify", //그룹및권한관리/사용자등록관리 수정
    GRPAU_USER_INSERT_REPLY      :"/grpau/userInsert/reply", //그룹및권한관리/사용자등록관리 답글 등록

// 사용자부재관리
    GRPAU_USER_DELETE            :"/grpau/userDelete", //그룹및권한관리/사용자부재관리 목록
    GRPAU_USER_DELETE_DETAIL     :"/grpau/userDelete/detail", //그룹및권한관리/사용자부재관리 상세
    GRPAU_USER_DELETE_CREATE     :"/grpau/userDelete/create", //그룹및권한관리/사용자부재관리 등록
    GRPAU_USER_DELETE_MODIFY     :"/grpau/userDelete/modify", //그룹및권한관리/사용자부재관리 수정
    GRPAU_USER_DELETE_REPLY      :"/grpau/userDelete/reply", //그룹및권한관리/사용자부재관리 답글 등록

// 권한관리
    GRPAU_AUTHORITY_MAN          :"/grpau/authorityMan", //그룹및권한관리/권한관리 목록
    GRPAU_AUTHORITY_MAN_DETAIL   :"/grpau/authorityMan/detail", //그룹및권한관리/권한관리 상세
    GRPAU_AUTHORITY_MAN_CREATE   :"/grpau/authorityMan/create", //그룹및권한관리/권한관리 등록
    GRPAU_AUTHORITY_MAN_MODIFY   :"/grpau/authorityMan/modify", //그룹및권한관리/권한관리 수정
    GRPAU_AUTHORITY_MAN_ROLE_DETAIL    :"/grpau/authorityMan/roleDetail", //그룹및권한관리/권한관리 롤정보 답글 등록

// 사용자그룹관리
    GRPAU_USER_GROUP            :"/grpau/userGroup", //그룹및권한관리/사용자그룹관리 목록
    GRPAU_USER_GROUP_DETAIL     :"/grpau/userGroup/detail", //그룹및권한관리/사용자그룹관리 상세
    GRPAU_USER_GROUP_CREATE     :"/grpau/userGroup/create", //그룹및권한관리/사용자그룹관리 등록
    GRPAU_USER_GROUP_MODIFY     :"/grpau/userGroup/modify", //그룹및권한관리/사용자그룹관리 수정
    GRPAU_USER_GROUP_REPLY      :"/grpau/userGroup/reply", //그룹및권한관리/사용자그룹관리 답글 등록

// 사용자별권한관리
    GRPAU_USER_AUTHORITY            :"/grpau/userAuthority", //그룹및권한관리/사용자별권한관리 목록
    GRPAU_USER_AUTHORITY_DETAIL     :"/grpau/userAuthority/detail", //그룹및권한관리/사용자별권한관리 상세
    GRPAU_USER_AUTHORITY_CREATE     :"/grpau/userAuthority/create", //그룹및권한관리/사용자별권한관리 등록
    GRPAU_USER_AUTHORITY_MODIFY     :"/grpau/userAuthority/modify", //그룹및권한관리/사용자별권한관리 수정
    GRPAU_USER_AUTHORITY_REPLY      :"/grpau/userAuthority/reply", //그룹및권한관리/사용자별권한관리 답글 등록

// 롤관리
    GRPAU_ROLE_MAN          :"/grpau/roleMan", //그룹및권한관리/롤관리 목록
    GRPAU_ROLE_MAN_DETAIL   :"/grpau/roleMan/detail", //그룹및권한관리/롤관리 상세
    GRPAU_ROLE_MAN_CREATE   :"/grpau/roleMan/create", //그룹및권한관리/롤관리 등록
    GRPAU_ROLE_MAN_MODIFY   :"/grpau/roleMan/modify", //그룹및권한관리/롤관리 수정
    GRPAU_ROLE_MAN_REPLY    :"/grpau/roleMan/reply", //그룹및권한관리/롤관리 답글 등록

// 프로그램목록
    GRPAU_PRG_MAN          :"/grpau/prgMan", //그룹및권한관리/프로그램 목록
    GRPAU_PRG_MAN_DETAIL   :"/grpau/prgMan/detail", //그룹및권한관리/프로그램 상세
    GRPAU_PRG_MAN_CREATE   :"/grpau/prgMan/create", //그룹및권한관리/프로그램 등록
    GRPAU_PRG_MAN_MODIFY   :"/grpau/prgMan/modify", //그룹및권한관리/프로그램 수정
    GRPAU_PRG_MAN_REPLY    :"/grpau/prgMan/reply", //그룹및권한관리/프로그램 답글 등록

// 메뉴생성
    GRPAU_MEMU_CREAT	       :"/grpau/menuCreat", //그룹및권한관리/메뉴생성 목록
    GRPAU_MEMU_CREAT_DETAIL	   :"/grpau/menuCreat/detail", //그룹및권한관리/메뉴생성 상세
    GRPAU_MEMU_CREAT_CREATE	   :"/grpau/menuCreat/create", //그룹및권한관리/메뉴생성 등록
    GRPAU_MEMU_CREAT_MODIFY	   :"/grpau/menuCreat/modify", //그룹및권한관리/메뉴생성 수정
    GRPAU_MEMU_CREAT_MODAL     :"/grpau/menuCreat/modal", //그룹및권한관리/메뉴생성 모달

// 메뉴목록
    GRPAU_MEMU_MAN	       :"/grpau/menuMan", //그룹및권한관리/메뉴 목록
    GRPAU_MEMU_MAN_DETAIL	   :"/grpau/menuMan/detail", //그룹및권한관리/메뉴목록 상세
    GRPAU_MEMU_MAN_CREATE	   :"/grpau/menuMan/create", //그룹및권한관리/메뉴목록 등록
    GRPAU_MEMU_MAN_MODIFY	   :"/grpau/menuMan/modify", //그룹및권한관리/메뉴목록 수정
    GRPAU_MEMU_MAN_REPLY 	   :"/grpau/menuMan/reply", //그룹및권한관리/메뉴목록 답글 등록
    GRPAU_MEMU_MAN_MODAL     :"/grpau/menuMan/modal", //그룹및권한관리/메뉴목록 모달
    GRPAU_MEMU_MAN_MULTI     :"/grpau/menuMan/multi", //그룹및권한관리/메뉴목록 일괄등록

// 분류코드
    GRPAU_DIVI_CODE	       :"/grpau/diviCode", //그룹및권한관리/분류코드 목록
    GRPAU_DIVI_CODE_DETAIL	   :"/grpau/diviCode/detail", //그룹및권한관리/분류코드 상세
    GRPAU_DIVI_CODE_CREATE	   :"/grpau/diviCode/create", //그룹및권한관리/분류코드 등록
    GRPAU_DIVI_CODE_MODIFY	   :"/grpau/diviCode/modify", //그룹및권한관리/분류코드 수정

// 공통코드
    GRPAU_COMM_CODE	       :"/grpau/commCode", //그룹및권한관리/공통코드 목록
    GRPAU_COMM_CODE_DETAIL	   :"/grpau/commCode/detail", //그룹및권한관리/공통코드 상세
    GRPAU_COMM_CODE_CREATE	   :"/grpau/commCode/create", //그룹및권한관리/공통코드 등록
    GRPAU_COMM_CODE_MODIFY	   :"/grpau/commCode/modify", //그룹및권한관리/공통코드 수정

// 상세코드
    GRPAU_DETA_CODE	       :"/grpau/detaCode", //그룹및권한관리/상세코드 목록
    GRPAU_DETA_CODE_DETAIL	   :"/grpau/detaCode/detail", //그룹및권한관리/상세코드 상세
    GRPAU_DETA_CODE_CREATE	   :"/grpau/detaCode/create", //그룹및권한관리/상세코드 등록
    GRPAU_DETA_CODE_MODIFY	   :"/grpau/detaCode/modify", //그룹및권한관리/상세코드 수정


}

export default URL;