import React, { useEffect, useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import URL from 'constants/url';
import CODE from 'constants/code';

//COMMON
import EgovHeader from 'components/EgovHeader';
import EgovFooter from 'components/EgovFooter';
import EgovInfoPopup from 'components/EgovInfoPopup';
import EgovError from 'components/EgovError';

import EgovMain from 'pages/main/EgovMain';
import EgovLogin from 'pages/login/EgovLogin';
import EgovLoginCreate from 'pages/login/EgovLoginCreate';
import EgovLoginUpdate from 'pages/login/EgovLoginUpdate';

//ABOUT
import EgovAboutSite from 'pages/about/EgovAboutSite';
import EgovAboutHistory from 'pages/about/EgovAboutHistory';
import EgovAboutOrganization from 'pages/about/EgovAboutOrganization';
import EgovAboutLocation from 'pages/about/EgovAboutLocation';

//INTRO
import EgovIntroWork from 'pages/intro/EgovIntroWork';
import EgovIntroService from 'pages/intro/EgovIntroService';

//SUPPORT
import EgovSupportDownloadList from 'pages/support/download/EgovDownloadList';
import EgovSupportDownloadDetail from 'pages/support/download/EgovDownloadDetail';
import EgovSupportDownloadCreate from 'pages/support/download/EgovDownloadCreate';
import EgovSupportQnaList from 'pages/support/qna/EgovQnaList';
import EgovSupportQnaDetail from 'pages/support/qna/EgovQnaDetail';
import EgovSupportApply from 'pages/support/apply/EgovSupportApply';
import EgovSupportStudy1 from 'pages/support/apply/EgovSupportStudy1';
import EgovSupportStudy2 from 'pages/support/apply/EgovSupportStudy2';
import EgovSupportStudy3 from 'pages/support/apply/EgovSupportStudy3';
import EgovSupportStudy4 from 'pages/support/apply/EgovSupportStudy4';
import EgovSupportStudy5 from 'pages/support/apply/EgovSupportStudy5';
import EgovSupportStudy6 from 'pages/support/apply/EgovSupportStudy6';
import EgovSupportStudy7 from 'pages/support/apply/EgovSupportStudy7';
import EgovSupportStudy8 from 'pages/support/apply/EgovSupportStudy8';
import EgovSupportStudy9 from 'pages/support/apply/EgovSupportStudy9';
import EgovSupportStudy10 from 'pages/support/apply/EgovSupportStudy10';
import EgovSupportStudy11 from 'pages/support/apply/EgovSupportStudy11';
import EgovSupportStudy12 from 'pages/support/apply/EgovSupportStudy12';
import EgovSupportStudy13 from 'pages/support/apply/EgovSupportStudy13';
import EgovSupportStudy14 from 'pages/support/apply/EgovSupportStudy14';
import EgovSupportStudy15 from 'pages/support/apply/EgovSupportStudy15';
//백인홍(배열수정.)
import EgovSupportStudy21 from 'pages/support/apply/EgovSupportStudy21';
//백인홍(Header, 메인, Footer로 간단하게 레이아웃을 나눠보자.)
import EgovSupportStudy22 from 'pages/support/apply/EgovSupportStudy22';
//백인홍(배열, select 샘플.)
import EgovSupportStudy23 from 'pages/support/apply/EgovSupportStudy23';

//react에서-select-box-컴포넌트-만들기
import EgovSupportStudy31 from 'pages/support/apply/EgovSupportStudy31';
//시간 option 만들기 - 시(hour)
import EgovSupportStudy32 from 'pages/support/apply/EgovSupportStudy32';
//Select의 defaultValue 를 state를 이용하여 동적 변경 시키기.
import EgovSupportStudy33 from 'pages/support/apply/EgovSupportStudy33';
//react 복수 선택.
import EgovSupportStudy34 from 'pages/support/apply/EgovSupportStudy34';
//react checkbox.
import EgovSupportStudy35 from 'pages/support/apply/EgovSupportStudy35';
//react multi checkbox.
import EgovSupportStudy36 from 'pages/support/apply/EgovSupportStudy36';
//react radio button.
import EgovSupportStudy37 from 'pages/support/apply/EgovSupportStudy37';
//react checkbox group.
import EgovSupportStudy38 from 'pages/support/apply/EgovSupportStudy38';
//react react-select.
import EgovSupportStudy39 from 'pages/support/apply/EgovSupportStudy39';
//react checkbox control.
import EgovSupportStudy40 from 'pages/support/apply/EgovSupportStudy40';
//react context.
import EgovSupportStudy41 from 'pages/support/apply/EgovSupportStudy41';
//react selected sample.
import EgovSupportStudy42 from 'pages/support/apply/EgovSupportStudy42';
//react useEffect sample.
import EgovSupportStudy43 from 'pages/support/apply/EgovSupportStudy43';
//react modal sample.
import EgovSupportStudy44 from 'pages/support/apply/EgovSupportStudy44';
//react scroll sample.
import EgovSupportStudy45 from 'pages/support/apply/EgovSupportStudy45';
//react Reducer sample.
import EgovSupportStudy46 from 'pages/support/apply/EgovSupportStudy46';
//react parent child component.
import EgovSupportStudy47 from 'pages/support/apply/EgovSupportStudy47';
//react hierarchy tree - any React children accepted for nodes.
import EgovSupportStudy48 from 'pages/support/apply/EgovSupportStudy48';
//react hierarchy tree - StyledTreeExample.
import EgovSupportStudy49 from 'pages/support/apply/EgovSupportStudy49';
//react 드롭다운 메뉴 만들기/마우스 오버시 드롭다운.
import EgovSupportStudy50 from 'pages/support/apply/EgovSupportStudy50';
//checkbox-tree
import EgovSupportStudy51 from 'pages/support/apply/EgovSupportStudy51';
//HiddenCheckboxesExample
import EgovSupportStudy52 from 'pages/support/apply/EgovSupportStudy52';
//makeLargeDataSet
import EgovSupportStudy53 from 'pages/support/apply/EgovSupportStudy53';
//모달창(Modal) 초간단 구현 방법
import EgovSupportStudy54 from 'pages/support/apply/EgovSupportStudy54';
//Portal을 사용한 모달창 만들기
import EgovSupportStudy55 from 'pages/support/apply/EgovSupportStudy55';
//setState가 잘못된 값을 주는 이유
import EgovSupportStudy56 from 'pages/support/apply/EgovSupportStudy56';
//setState가 잘못된 값을 주는 이유,,개선,,3. setState의 updater 인자에 함수 사용
import EgovSupportStudy57 from 'pages/support/apply/EgovSupportStudy57';
//"send"를 누르면 setIsSent(true)가 React에게 UI를 다시 렌더링하도록 지시
import EgovSupportStudy58 from 'pages/support/apply/EgovSupportStudy58';
//"+3" 버튼을 클릭하면 setNumber(숫자 + 1)을 세 번 호출하기 때문에 카운터가 세 번 증가할 것이라고 예상
import EgovSupportStudy59 from 'pages/support/apply/EgovSupportStudy59';
//시간 경과에 따른 상태 alert.
import EgovSupportStudy60 from 'pages/support/apply/EgovSupportStudy60';
//시간 경과에 따른 상태 message.
import EgovSupportStudy61 from 'pages/support/apply/EgovSupportStudy61';
//신호등 구현 message.
import EgovSupportStudy62 from 'pages/support/apply/EgovSupportStudy62';
//setNumber(숫자 + 1)
import EgovSupportStudy63 from 'pages/support/apply/EgovSupportStudy63';
//setNumber(숫자 + 5)
import EgovSupportStudy64 from 'pages/support/apply/EgovSupportStudy64';
//setNumber(42).
import EgovSupportStudy65 from 'pages/support/apply/EgovSupportStudy65';
//setPending(p => p - 1).
import EgovSupportStudy66 from 'pages/support/apply/EgovSupportStudy66';
//getFinalState 함수.
import EgovSupportStudy67 from 'pages/support/apply/EgovSupportStudy67';
//current pointer position.
import EgovSupportStudy68 from 'pages/support/apply/EgovSupportStudy68';
//objects with the spread syntax.
import EgovSupportStudy69 from 'pages/support/apply/EgovSupportStudy69';
//with a single event handler(값은 69와 동일).
import EgovSupportStudy70 from 'pages/support/apply/EgovSupportStudy70';
//Updating a nested object
import EgovSupportStudy71 from 'pages/support/apply/EgovSupportStudy71';
//from 'use-immer'
import EgovSupportStudy72 from 'pages/support/apply/EgovSupportStudy72';
//다국어,,,https://www.daleseo.com/react-intl/
import EgovSupportStudy73 from 'pages/support/apply/EgovSupportStudy73';
//test
//import EgovSupportStudy74 from 'pages/support/apply/EgovSupportStudy74';

import EgovSupportStudy75 from 'pages/support/apply/EgovSupportStudy75';
import EgovSupportStudy76 from 'pages/support/apply/EgovSupportStudy76';
import EgovSupportStudy77 from 'pages/support/apply/EgovSupportStudy77';
import EgovSupportStudy78 from 'pages/support/apply/EgovSupportStudy78';
import EgovSupportStudy79 from 'pages/support/apply/EgovSupportStudy79';

//INFORM
import EgovDailyList from 'pages/inform/daily/EgovDailyList';
import EgovDailyDetail from 'pages/inform/daily/EgovDailyDetail';
import EgovWeeklyList from 'pages/inform/weekly/EgovWeeklyList';

import EgovNoticeList from 'pages/inform/notice/EgovNoticeList';
import EgovNoticeDetail from 'pages/inform/notice/EgovNoticeDetail';
import EgovNoticeEdit from 'pages/inform/notice/EgovNoticeEdit';

import EgovGalleryList from 'pages/inform/gallery/EgovGalleryList';
import EgovGalleryDetail from 'pages/inform/gallery/EgovGalleryDetail';
import EgovGalleryEdit from 'pages/inform/gallery/EgovGalleryEdit';

//ADMIN
import EgovAdminScheduleList from 'pages/admin/schedule/EgovAdminScheduleList';
import EgovAdminScheduleDetail from 'pages/admin/schedule/EgovAdminScheduleDetail';
import EgovAdminScheduleEdit from 'pages/admin/schedule/EgovAdminScheduleEdit';

import EgovAdminBoardList from 'pages/admin/board/EgovAdminBoardList';
import EgovAdminBoardEdit from 'pages/admin/board/EgovAdminBoardEdit';

import EgovAdminUsageList from 'pages/admin/usage/EgovAdminUsageList';
import EgovAdminUsageEdit from 'pages/admin/usage/EgovAdminUsageEdit';

import EgovAdminNoticeList from 'pages/admin/notice/EgovAdminNoticeList';
import EgovAdminNoticeDetail from 'pages/admin/notice/EgovAdminNoticeDetail';
import EgovAdminNoticeEdit from 'pages/admin/notice/EgovAdminNoticeEdit';

import EgovAdminGalleryList from 'pages/admin/gallery/EgovAdminGalleryList';
import EgovAdminGalleryDetail from 'pages/admin/gallery/EgovAdminGalleryDetail';
import EgovAdminGalleryEdit from 'pages/admin/gallery/EgovAdminGalleryEdit';

// oper, login
import EgovAdminOperList from 'pages/admin/oper/EgovAdminOperList';
import EgovAdminOper2List from 'pages/admin/oper2/EgovAdminOper2List';
import EgovAdminLoginList from 'pages/login/EgovAdminLoginList';
import EgovAdminLoginDetail from 'pages/login/EgovAdminLoginDetail';
import EgovAdminLoginEdit from 'pages/login/EgovAdminLoginEdit';

//est
import EgovAdminNoticeEstList from 'pages/admin/noticeEst/EgovAdminNoticeEstList';
import EgovAdminNoticeEstDetail from 'pages/admin/noticeEst/EgovAdminNoticeEstDetail';
import EgovAdminNoticeEstEdit from 'pages/admin/noticeEst/EgovAdminNoticeEstEdit';
import EgovAdminNoticeEstJusoDetail from 'pages/admin/noticeEst/EgovAdminNoticeEstJusoDetail';

//corp
import EgovAdminNoticeCorpList from 'pages/admin/noticeCorp/EgovAdminNoticeCorpList';
import EgovAdminNoticeCorpDetail from 'pages/admin/noticeCorp/EgovAdminNoticeCorpDetail';
import EgovAdminNoticeCorpEdit from 'pages/admin/noticeCorp/EgovAdminNoticeCorpEdit';
import EgovAdminNoticeCorpJusoDetail from 'pages/admin/noticeCorp/EgovAdminNoticeCorpJusoDetail';

//fishTemp
import EgovAdminNoticeFishTemp1 from 'pages/admin/noticeCorp/EgovAdminNoticeFishTemp1';
import EgovAdminNoticeFishTemp2 from 'pages/admin/noticeCorp/EgovAdminNoticeFishTemp2';
import EgovAdminNoticeFishTemp3 from 'pages/admin/noticeCorp/EgovAdminNoticeFishTemp3';

//land
import EgovAdminNoticeLandList from 'pages/admin/noticeLand/EgovAdminNoticeLandList';
import EgovAdminNoticeLandDetail from 'pages/admin/noticeLand/EgovAdminNoticeLandDetail';
import EgovAdminNoticeLandEdit from 'pages/admin/noticeLand/EgovAdminNoticeLandEdit';
import EgovAdminNoticeLandJusoDetail from 'pages/admin/noticeLand/EgovAdminNoticeLandJusoDetail';

//bldn
import EgovAdminNoticeBldnList from 'pages/admin/noticeBldn/EgovAdminNoticeBldnList';
import EgovAdminNoticeBldnDetail from 'pages/admin/noticeBldn/EgovAdminNoticeBldnDetail';
import EgovAdminNoticeBldnEdit from 'pages/admin/noticeBldn/EgovAdminNoticeBldnEdit';
import EgovAdminNoticeBldnJusoDetail from 'pages/admin/noticeBldn/EgovAdminNoticeBldnJusoDetail';

// 사용자등록관리
import EgovGrpauUserInsertList from 'pages/grpau/userInsert/EgovGrpauUserInsertList';
import EgovGrpauUserInsertDetail from 'pages/grpau/userInsert/EgovGrpauUserInsertDetail';
import EgovGrpauUserInsertEdit from 'pages/grpau/userInsert/EgovGrpauUserInsertEdit';

// 사용자부재관리
import EgovGrpauUserDeleteList from 'pages/grpau/userDelete/EgovGrpauUserDeleteList';
import EgovGrpauUserDeleteDetail from 'pages/grpau/userDelete/EgovGrpauUserDeleteDetail';
import EgovGrpauUserDeleteEdit from 'pages/grpau/userDelete/EgovGrpauUserDeleteEdit';

// 권한관리
import EgovGrpauAuthorityManList from 'pages/grpau/authorityMan/EgovGrpauAuthorityManList';
import EgovGrpauAuthorityManDetail from 'pages/grpau/authorityMan/EgovGrpauAuthorityManDetail';
import EgovGrpauAuthorityManEdit from 'pages/grpau/authorityMan/EgovGrpauAuthorityManEdit';
import EgovGrpauAuthorityManRoleDetail from 'pages/grpau/authorityMan/EgovGrpauAuthorityManRoleDetail';

// 사용자그룹관리
import EgovGrpauUserGroupList from 'pages/grpau/userGroup/EgovGrpauUserGroupList';
import EgovGrpauUserGroupDetail from 'pages/grpau/userGroup/EgovGrpauUserGroupDetail';
import EgovGrpauUserGroupEdit from 'pages/grpau/userGroup/EgovGrpauUserGroupEdit';

// 사용자별권한관리
import EgovGrpauUserAuthorityList from 'pages/grpau/userAuthority/EgovGrpauUserAuthorityList';
//import EgovGrpauUserAuthorityDetail from 'pages/grpau/userAuthority/EgovGrpauUserAuthorityDetail';
import EgovGrpauUserAuthorityEdit from 'pages/grpau/userAuthority/EgovGrpauUserAuthorityEdit';

// 롤관리
import EgovGrpauRoleManList from 'pages/grpau/roleMan/EgovGrpauRoleManList';
import EgovGrpauRoleManDetail from 'pages/grpau/roleMan/EgovGrpauRoleManDetail';
import EgovGrpauRoleManEdit from 'pages/grpau/roleMan/EgovGrpauRoleManEdit';

// 프로그램목록
import EgovGrpauPrgManList from 'pages/grpau/prgMan/EgovGrpauPrgManList';
import EgovGrpauPrgManDetail from 'pages/grpau/prgMan/EgovGrpauPrgManDetail';
import EgovGrpauPrgManEdit from 'pages/grpau/prgMan/EgovGrpauPrgManEdit';

// 메뉴생성
import EgovGrpauMenuCreatList from 'pages/grpau/menuCreat/EgovGrpauMenuCreatList';
import EgovGrpauMenuCreatDetail from 'pages/grpau/menuCreat/EgovGrpauMenuCreatDetail';
import EgovGrpauMenuCreatEdit from 'pages/grpau/menuCreat/EgovGrpauMenuCreatEdit';
//모달관련 
import EgovGrpauMenuCreatModal from 'pages/grpau/menuCreat/EgovGrpauMenuCreatModal';

// 메뉴목록
import EgovGrpauMenuManList from 'pages/grpau/menuMan/EgovGrpauMenuManList';
import EgovGrpauMenuManDetail from 'pages/grpau/menuMan/EgovGrpauMenuManDetail';
import EgovGrpauMenuManEdit from 'pages/grpau/menuMan/EgovGrpauMenuManEdit';
//모달관련 
import EgovGrpauMenuManModal from 'pages/grpau/menuMan/EgovGrpauMenuManModal';
//일괄생성 
import EgovGrpauMenuManMulti from 'pages/grpau/menuMan/EgovGrpauMenuManMulti';

// 분류코드
import EgovGrpauDiviCodeList from 'pages/grpau/diviCode/EgovGrpauDiviCodeList';
import EgovGrpauDiviCodeDetail from 'pages/grpau/diviCode/EgovGrpauDiviCodeDetail';
import EgovGrpauDiviCodeEdit from 'pages/grpau/diviCode/EgovGrpauDiviCodeEdit';

// 공통코드
import EgovGrpauCommCodeList from 'pages/grpau/commCode/EgovGrpauCommCodeList';
import EgovGrpauCommCodeDetail from 'pages/grpau/commCode/EgovGrpauCommCodeDetail';
import EgovGrpauCommCodeEdit from 'pages/grpau/commCode/EgovGrpauCommCodeEdit';

// 상세코드
import EgovGrpauDetaCodeList from 'pages/grpau/detaCode/EgovGrpauDetaCodeList';
import EgovGrpauDetaCodeDetail from 'pages/grpau/detaCode/EgovGrpauDetaCodeDetail';
import EgovGrpauDetaCodeEdit from 'pages/grpau/detaCode/EgovGrpauDetaCodeEdit';


import initPage from 'js/ui';

const RootRoutes = () => {

  return (
      <Routes>
        <Route path={URL.ERROR} element={<EgovError />} />
        <Route path="*" element={<SecondRoutes/>} />
      </Routes>
  )
}

const SecondRoutes = () => {

  const [loginVO, setLoginVO] = useState({});

  useEffect(() => {
    initPage();
  });
  
  return (
    <>
      <EgovHeader loginUser={loginVO} onChangeLogin={(user) => setLoginVO(user)} />
      <Routes>
        {/* MAIN */}
        <Route path={URL.MAIN} element={<EgovMain />} />

        {/* LOGIN */}
        <Route path={URL.LOGIN} element={<EgovLogin
                onChangeLogin={(user) => setLoginVO(user)}
              />}/>

        {/* ERROR */}
        <Route path={URL.ERROR} element={<EgovError />} />
        <Route path={URL.LOGIN_CREATE} element={<EgovLoginCreate mode={CODE.MODE_CREATE} />} />
        <Route path={URL.LOGIN_MODIFY} element={<EgovLoginUpdate mode={CODE.MODE_MODIFY} />} />

        {/* ABOUT */}
        <Route path={URL.ABOUT} element={<Navigate to={URL.ABOUT_SITE} />} />
        <Route path={URL.ABOUT_SITE} element={<EgovAboutSite />} />
        <Route path={URL.ABOUT_HISTORY} element={<EgovAboutHistory />} />
        <Route path={URL.ABOUT_ORGANIZATION} element={<EgovAboutOrganization />} />
        <Route path={URL.ABOUT_LOCATION} element={<EgovAboutLocation />} />

        {/* INTRO */}
        <Route path={URL.INTRO} element={<Navigate to={URL.INTRO_WORKS} />} />
        <Route path={URL.INTRO_WORKS} element={<EgovIntroWork />} />
        <Route path={URL.INTRO_SERVICE} element={<EgovIntroService />} />

        {/* SUPPORT */}
        <Route path={URL.SUPPORT} element={<Navigate to={URL.SUPPORT_DOWNLOAD} />} />

        <Route path={URL.SUPPORT_DOWNLOAD} element={<EgovSupportDownloadList />} />
        <Route path={URL.SUPPORT_DOWNLOAD_DETAIL} element={<EgovSupportDownloadDetail />} />
        <Route path={URL.SUPPORT_DOWNLOAD_CREATE} element={<EgovSupportDownloadCreate />} />

        <Route exact path={URL.SUPPORT_QNA} element={<EgovSupportQnaList />} />
        <Route exact path={URL.SUPPORT_QNA_DETAIL} element={<EgovSupportQnaDetail />} />

        <Route exact path={URL.SUPPORT_APPLY} element={<EgovSupportApply />} />
        <Route exact path={URL.SUPPORT_STUDY1} element={<EgovSupportStudy1 />} />
        <Route exact path={URL.SUPPORT_STUDY2} element={<EgovSupportStudy2 />} />
        <Route exact path={URL.SUPPORT_STUDY3} element={<EgovSupportStudy3 />} />
        <Route exact path={URL.SUPPORT_STUDY4} element={<EgovSupportStudy4 />} />
        <Route exact path={URL.SUPPORT_STUDY5} element={<EgovSupportStudy5 />} />
        <Route exact path={URL.SUPPORT_STUDY6} element={<EgovSupportStudy6 />} />
        <Route exact path={URL.SUPPORT_STUDY7} element={<EgovSupportStudy7 />} />
        <Route exact path={URL.SUPPORT_STUDY8} element={<EgovSupportStudy8 />} />
        <Route exact path={URL.SUPPORT_STUDY9} element={<EgovSupportStudy9 />} />
        <Route exact path={URL.SUPPORT_STUDY10} element={<EgovSupportStudy10 />} />
        <Route exact path={URL.SUPPORT_STUDY11} element={<EgovSupportStudy11 />} />
        <Route exact path={URL.SUPPORT_STUDY12} element={<EgovSupportStudy12 />} />
        <Route exact path={URL.SUPPORT_STUDY13} element={<EgovSupportStudy13 />} />
        <Route exact path={URL.SUPPORT_STUDY14} element={<EgovSupportStudy14 />} />
        <Route exact path={URL.SUPPORT_STUDY15} element={<EgovSupportStudy15 />} />
        <Route exact path={URL.SUPPORT_STUDY21} element={<EgovSupportStudy21 />} />
        <Route exact path={URL.SUPPORT_STUDY22} element={<EgovSupportStudy22 />} />
        <Route exact path={URL.SUPPORT_STUDY23} element={<EgovSupportStudy23 />} />
        <Route exact path={URL.SUPPORT_STUDY31} element={<EgovSupportStudy31 />} />
        <Route exact path={URL.SUPPORT_STUDY32} element={<EgovSupportStudy32 />} />
        <Route exact path={URL.SUPPORT_STUDY33} element={<EgovSupportStudy33 />} />
        <Route exact path={URL.SUPPORT_STUDY34} element={<EgovSupportStudy34 />} />
        <Route exact path={URL.SUPPORT_STUDY35} element={<EgovSupportStudy35 />} />
        <Route exact path={URL.SUPPORT_STUDY36} element={<EgovSupportStudy36 />} />
        <Route exact path={URL.SUPPORT_STUDY37} element={<EgovSupportStudy37 />} />
        <Route exact path={URL.SUPPORT_STUDY38} element={<EgovSupportStudy38 />} />
        <Route exact path={URL.SUPPORT_STUDY39} element={<EgovSupportStudy39 />} />
        <Route exact path={URL.SUPPORT_STUDY40} element={<EgovSupportStudy40 />} />
        <Route exact path={URL.SUPPORT_STUDY41} element={<EgovSupportStudy41 />} />
        <Route exact path={URL.SUPPORT_STUDY42} element={<EgovSupportStudy42 />} />
        <Route exact path={URL.SUPPORT_STUDY43} element={<EgovSupportStudy43 />} />
        <Route exact path={URL.SUPPORT_STUDY44} element={<EgovSupportStudy44 />} />
        <Route exact path={URL.SUPPORT_STUDY45} element={<EgovSupportStudy45 />} />
        <Route exact path={URL.SUPPORT_STUDY46} element={<EgovSupportStudy46 />} />
        <Route exact path={URL.SUPPORT_STUDY47} element={<EgovSupportStudy47 />} />
        <Route exact path={URL.SUPPORT_STUDY48} element={<EgovSupportStudy48 />} />
        <Route exact path={URL.SUPPORT_STUDY49} element={<EgovSupportStudy49 />} />
        <Route exact path={URL.SUPPORT_STUDY50} element={<EgovSupportStudy50 />} />
        <Route exact path={URL.SUPPORT_STUDY51} element={<EgovSupportStudy51 />} />
        <Route exact path={URL.SUPPORT_STUDY52} element={<EgovSupportStudy52 />} />
        <Route exact path={URL.SUPPORT_STUDY53} element={<EgovSupportStudy53 />} />
        <Route exact path={URL.SUPPORT_STUDY54} element={<EgovSupportStudy54 />} />
        <Route exact path={URL.SUPPORT_STUDY55} element={<EgovSupportStudy55 />} />
        <Route exact path={URL.SUPPORT_STUDY56} element={<EgovSupportStudy56 />} />
        <Route exact path={URL.SUPPORT_STUDY57} element={<EgovSupportStudy57 />} />
        <Route exact path={URL.SUPPORT_STUDY58} element={<EgovSupportStudy58 />} />
        <Route exact path={URL.SUPPORT_STUDY59} element={<EgovSupportStudy59 />} />
        <Route exact path={URL.SUPPORT_STUDY60} element={<EgovSupportStudy60 />} />
        <Route exact path={URL.SUPPORT_STUDY61} element={<EgovSupportStudy61 />} />
        <Route exact path={URL.SUPPORT_STUDY62} element={<EgovSupportStudy62 />} />
        <Route exact path={URL.SUPPORT_STUDY63} element={<EgovSupportStudy63 />} />
        <Route exact path={URL.SUPPORT_STUDY64} element={<EgovSupportStudy64 />} />
        <Route exact path={URL.SUPPORT_STUDY65} element={<EgovSupportStudy65 />} />
        <Route exact path={URL.SUPPORT_STUDY66} element={<EgovSupportStudy66 />} />
        <Route exact path={URL.SUPPORT_STUDY67} element={<EgovSupportStudy67 />} />
        <Route exact path={URL.SUPPORT_STUDY68} element={<EgovSupportStudy68 />} />
        <Route exact path={URL.SUPPORT_STUDY69} element={<EgovSupportStudy69 />} />
        <Route exact path={URL.SUPPORT_STUDY70} element={<EgovSupportStudy70 />} />
        <Route exact path={URL.SUPPORT_STUDY71} element={<EgovSupportStudy71 />} />
        <Route exact path={URL.SUPPORT_STUDY72} element={<EgovSupportStudy72 />} />
        <Route exact path={URL.SUPPORT_STUDY73} element={<EgovSupportStudy73 />} />
        <Route exact path={URL.SUPPORT_STUDY75} element={<EgovSupportStudy75 />} />
        <Route exact path={URL.SUPPORT_STUDY76} element={<EgovSupportStudy76 />} />
        <Route exact path={URL.SUPPORT_STUDY77} element={<EgovSupportStudy77 />} />
        <Route exact path={URL.SUPPORT_STUDY78} element={<EgovSupportStudy78 />} />
        <Route exact path={URL.SUPPORT_STUDY79} element={<EgovSupportStudy79 />} />

        {/* INFORM */}
        <Route path={URL.INFORM} element={<Navigate to={URL.INFORM_DAILY} />} />

        <Route path={URL.INFORM_DAILY} element={<EgovDailyList />} />
        <Route path={URL.INFORM_DAILY_DETAIL} element={<EgovDailyDetail />} />
        <Route path={URL.INFORM_WEEKLY} element={<EgovWeeklyList />} />
        <Route path={URL.INFORM_WEEKLY_DETAIL} element={<EgovDailyDetail />} />

        <Route path={URL.INFORM_NOTICE} element={<EgovNoticeList />} />
        <Route path={URL.INFORM_NOTICE_DETAIL} element={<EgovNoticeDetail />} />
        <Route path={URL.INFORM_NOTICE_CREATE} element={<EgovNoticeEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.INFORM_NOTICE_MODIFY} element={<EgovNoticeEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.INFORM_NOTICE_REPLY} element={<EgovNoticeEdit mode={CODE.MODE_REPLY} />} />

        <Route path={URL.INFORM_GALLERY} element={<EgovGalleryList />} />
        <Route path={URL.INFORM_GALLERY_DETAIL} element={<EgovGalleryDetail />} />
        <Route path={URL.INFORM_GALLERY_CREATE} element={<EgovGalleryEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.INFORM_GALLERY_MODIFY} element={<EgovGalleryEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.INFORM_GALLERY_REPLY} element={<EgovGalleryEdit mode={CODE.MODE_REPLY} />} />

        {/* ADMIN */}
        <Route path={URL.ADMIN} element={<Navigate to={URL.ADMIN_SCHEDULE} />} />
        <Route path={URL.ADMIN_SCHEDULE} element={<EgovAdminScheduleList />} />
        <Route path={URL.ADMIN_SCHEDULE_DETAIL} element={<EgovAdminScheduleDetail />} />
        <Route path={URL.ADMIN_SCHEDULE_CREATE} element={<EgovAdminScheduleEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.ADMIN_SCHEDULE_MODIFY} element={<EgovAdminScheduleEdit mode={CODE.MODE_MODIFY} />} />

        <Route path={URL.ADMIN_BOARD} element={<EgovAdminBoardList />} />
        <Route path={URL.ADMIN_BOARD_CREATE} element={<EgovAdminBoardEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.ADMIN_BOARD_MODIFY} element={<EgovAdminBoardEdit mode={CODE.MODE_MODIFY} />} />

        <Route path={URL.ADMIN_USAGE} element={<EgovAdminUsageList />} />
        <Route path={URL.ADMIN_USAGE_CREATE} element={<EgovAdminUsageEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.ADMIN_USAGE_MODIFY} element={<EgovAdminUsageEdit mode={CODE.MODE_MODIFY} />} />

        <Route path={URL.ADMIN_NOTICE} element={<EgovAdminNoticeList />} />
        <Route path={URL.ADMIN_NOTICE_DETAIL} element={<EgovAdminNoticeDetail />} />
        <Route path={URL.ADMIN_NOTICE_CREATE} element={<EgovAdminNoticeEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.ADMIN_NOTICE_MODIFY} element={<EgovAdminNoticeEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.ADMIN_NOTICE_REPLY} element={<EgovAdminNoticeEdit mode={CODE.MODE_REPLY} />} />

        <Route path={URL.ADMIN_GALLERY} element={<EgovAdminGalleryList />} />
        <Route path={URL.ADMIN_GALLERY_DETAIL} element={<EgovAdminGalleryDetail />} />
        <Route path={URL.ADMIN_GALLERY_CREATE} element={<EgovAdminGalleryEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.ADMIN_GALLERY_MODIFY} element={<EgovAdminGalleryEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.ADMIN_GALLERY_REPLY} element={<EgovAdminGalleryEdit mode={CODE.MODE_REPLY} />} />

        <Route path={URL.ADMIN_OPER} element={<EgovAdminOperList />} />
        <Route path={URL.ADMIN_OPER2} element={<EgovAdminOper2List />} />
        <Route path={URL.ADMIN_LOGIN} element={<EgovAdminLoginList />} />
        <Route path={URL.ADMIN_LOGIN_DETAIL} element={<EgovAdminLoginDetail />} />
        <Route path={URL.ADMIN_LOGIN_MODIFY} element={<EgovAdminLoginEdit mode={CODE.MODE_MODIFY} />} />

        <Route path={URL.ADMIN_NOTICE_EST} element={<EgovAdminNoticeEstList />} />
        <Route path={URL.ADMIN_NOTICE_EST_DETAIL} element={<EgovAdminNoticeEstDetail />} />
        <Route path={URL.ADMIN_NOTICE_EST_CREATE} element={<EgovAdminNoticeEstEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.ADMIN_NOTICE_EST_MODIFY} element={<EgovAdminNoticeEstEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.ADMIN_NOTICE_EST_REPLY} element={<EgovAdminNoticeEstEdit mode={CODE.MODE_REPLY} />} />
        <Route path={URL.ADMIN_NOTICE_EST_JUSO_DETAIL} element={<EgovAdminNoticeEstJusoDetail />} />

        <Route path={URL.ADMIN_NOTICE_CORP} element={<EgovAdminNoticeCorpList />} />
        <Route path={URL.ADMIN_NOTICE_CORP_DETAIL} element={<EgovAdminNoticeCorpDetail />} />
        <Route path={URL.ADMIN_NOTICE_CORP_CREATE} element={<EgovAdminNoticeCorpEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.ADMIN_NOTICE_CORP_MODIFY} element={<EgovAdminNoticeCorpEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.ADMIN_NOTICE_CORP_REPLY} element={<EgovAdminNoticeCorpEdit mode={CODE.MODE_REPLY} />} />
        <Route path={URL.ADMIN_NOTICE_CORP_JUSO_DETAIL} element={<EgovAdminNoticeCorpJusoDetail />} />

        {/* FISHTEMP */}
        <Route path={URL.ADMIN_FISHTEMP1} element={<EgovAdminNoticeFishTemp1 />} />
        <Route path={URL.ADMIN_FISHTEMP2} element={<EgovAdminNoticeFishTemp2 />} />
        <Route path={URL.ADMIN_FISHTEMP3} element={<EgovAdminNoticeFishTemp3 />} />

		<Route path={URL.ADMIN_NOTICE_LAND} element={<EgovAdminNoticeLandList />} />
        <Route path={URL.ADMIN_NOTICE_LAND_DETAIL} element={<EgovAdminNoticeLandDetail />} />
        <Route path={URL.ADMIN_NOTICE_LAND_CREATE} element={<EgovAdminNoticeLandEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.ADMIN_NOTICE_LAND_MODIFY} element={<EgovAdminNoticeLandEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.ADMIN_NOTICE_LAND_REPLY} element={<EgovAdminNoticeLandEdit mode={CODE.MODE_REPLY} />} />
        <Route path={URL.ADMIN_NOTICE_LAND_JUSO_DETAIL} element={<EgovAdminNoticeLandJusoDetail />} />

        <Route path={URL.ADMIN_NOTICE_BLDN} element={<EgovAdminNoticeBldnList />} />
        <Route path={URL.ADMIN_NOTICE_BLDN_DETAIL} element={<EgovAdminNoticeBldnDetail />} />
        <Route path={URL.ADMIN_NOTICE_BLDN_CREATE} element={<EgovAdminNoticeBldnEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.ADMIN_NOTICE_BLDN_MODIFY} element={<EgovAdminNoticeBldnEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.ADMIN_NOTICE_BLDN_REPLY} element={<EgovAdminNoticeBldnEdit mode={CODE.MODE_REPLY} />} />
        <Route path={URL.ADMIN_NOTICE_BLDN_JUSO_DETAIL} element={<EgovAdminNoticeBldnJusoDetail />} />

        {/* GRPAU */}
        <Route path={URL.GRPAU} element={<Navigate to={URL.GRPAU_USER_INSERT} />} />
        <Route path={URL.GRPAU_USER_INSERT} element={<EgovGrpauUserInsertList />} />
        <Route path={URL.GRPAU_USER_INSERT_DETAIL} element={<EgovGrpauUserInsertDetail />} />
        <Route path={URL.GRPAU_USER_INSERT_CREATE} element={<EgovGrpauUserInsertEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_USER_INSERT_MODIFY} element={<EgovGrpauUserInsertEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.GRPAU_USER_INSERT_REPLY} element={<EgovGrpauUserInsertEdit mode={CODE.MODE_REPLY} />} />

        <Route path={URL.GRPAU_USER_DELETE} element={<EgovGrpauUserDeleteList />} />
        <Route path={URL.GRPAU_USER_DELETE_DETAIL} element={<EgovGrpauUserDeleteDetail />} />
        <Route path={URL.GRPAU_USER_DELETE_CREATE} element={<EgovGrpauUserDeleteEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_USER_DELETE_MODIFY} element={<EgovGrpauUserDeleteEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.GRPAU_USER_DELETE_REPLY} element={<EgovGrpauUserDeleteEdit mode={CODE.MODE_REPLY} />} />

        <Route path={URL.GRPAU_AUTHORITY_MAN} element={<EgovGrpauAuthorityManList />} />
        <Route path={URL.GRPAU_AUTHORITY_MAN_DETAIL} element={<EgovGrpauAuthorityManDetail />} />
        <Route path={URL.GRPAU_AUTHORITY_MAN_CREATE} element={<EgovGrpauAuthorityManEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_AUTHORITY_MAN_MODIFY} element={<EgovGrpauAuthorityManEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.GRPAU_AUTHORITY_MAN_ROLE_DETAIL} element={<EgovGrpauAuthorityManRoleDetail />} />

        <Route path={URL.GRPAU_USER_GROUP} element={<EgovGrpauUserGroupList />} />
        <Route path={URL.GRPAU_USER_GROUP_DETAIL} element={<EgovGrpauUserGroupDetail />} />
        <Route path={URL.GRPAU_USER_GROUP_CREATE} element={<EgovGrpauUserGroupEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_USER_GROUP_MODIFY} element={<EgovGrpauUserGroupEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.GRPAU_USER_GROUP_REPLY} element={<EgovGrpauUserGroupEdit mode={CODE.MODE_REPLY} />} />

        <Route path={URL.GRPAU_USER_AUTHORITY} element={<EgovGrpauUserAuthorityList />} />
        <Route path={URL.GRPAU_USER_AUTHORITY_CREATE} element={<EgovGrpauUserAuthorityEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_USER_AUTHORITY_MODIFY} element={<EgovGrpauUserAuthorityEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.GRPAU_USER_AUTHORITY_REPLY} element={<EgovGrpauUserAuthorityEdit mode={CODE.MODE_REPLY} />} />

        <Route path={URL.GRPAU_ROLE_MAN} element={<EgovGrpauRoleManList />} />
        <Route path={URL.GRPAU_ROLE_MAN_DETAIL} element={<EgovGrpauRoleManDetail />} />
        <Route path={URL.GRPAU_ROLE_MAN_CREATE} element={<EgovGrpauRoleManEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_ROLE_MAN_MODIFY} element={<EgovGrpauRoleManEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.GRPAU_ROLE_MAN_REPLY} element={<EgovGrpauRoleManEdit mode={CODE.MODE_REPLY} />} />

        <Route path={URL.GRPAU_MEMU_CREAT} element={<EgovGrpauMenuCreatList />} />
        <Route path={URL.GRPAU_MEMU_CREAT_DETAIL} element={<EgovGrpauMenuCreatDetail />} />
        <Route path={URL.GRPAU_MEMU_CREAT_CREATE} element={<EgovGrpauMenuCreatEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_MEMU_CREAT_MODIFY} element={<EgovGrpauMenuCreatEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.GRPAU_MEMU_CREAT_MODAL} element={<EgovGrpauMenuCreatModal />} />

        <Route path={URL.GRPAU_MEMU_MAN} element={<EgovGrpauMenuManList />} />
        <Route path={URL.GRPAU_MEMU_MAN_DETAIL} element={<EgovGrpauMenuManDetail />} />
        <Route path={URL.GRPAU_MEMU_MAN_CREATE} element={<EgovGrpauMenuManEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_MEMU_MAN_MODIFY} element={<EgovGrpauMenuManEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.GRPAU_MEMU_MAN_MULTI} element={<EgovGrpauMenuManMulti mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_MEMU_MAN_MODAL} element={<EgovGrpauMenuManModal />} />

        <Route path={URL.GRPAU_PRG_MAN} element={<EgovGrpauPrgManList />} />
        <Route path={URL.GRPAU_PRG_MAN_DETAIL} element={<EgovGrpauPrgManDetail />} />
        <Route path={URL.GRPAU_PRG_MAN_CREATE} element={<EgovGrpauPrgManEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_PRG_MAN_MODIFY} element={<EgovGrpauPrgManEdit mode={CODE.MODE_MODIFY} />} />
        <Route path={URL.GRPAU_PRG_MAN_REPLY} element={<EgovGrpauPrgManEdit mode={CODE.MODE_REPLY} />} />

        <Route path={URL.GRPAU_DIVI_CODE} element={<EgovGrpauDiviCodeList />} />
        <Route path={URL.GRPAU_DIVI_CODE_DETAIL} element={<EgovGrpauDiviCodeDetail />} />
        <Route path={URL.GRPAU_DIVI_CODE_CREATE} element={<EgovGrpauDiviCodeEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_DIVI_CODE_MODIFY} element={<EgovGrpauDiviCodeEdit mode={CODE.MODE_MODIFY} />} />

        <Route path={URL.GRPAU_COMM_CODE} element={<EgovGrpauCommCodeList />} />
        <Route path={URL.GRPAU_COMM_CODE_DETAIL} element={<EgovGrpauCommCodeDetail />} />
        <Route path={URL.GRPAU_COMM_CODE_CREATE} element={<EgovGrpauCommCodeEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_COMM_CODE_MODIFY} element={<EgovGrpauCommCodeEdit mode={CODE.MODE_MODIFY} />} />

        <Route path={URL.GRPAU_DETA_CODE} element={<EgovGrpauDetaCodeList />} />
        <Route path={URL.GRPAU_DETA_CODE_DETAIL} element={<EgovGrpauDetaCodeDetail />} />
        <Route path={URL.GRPAU_DETA_CODE_CREATE} element={<EgovGrpauDetaCodeEdit mode={CODE.MODE_CREATE} />} />
        <Route path={URL.GRPAU_DETA_CODE_MODIFY} element={<EgovGrpauDetaCodeEdit mode={CODE.MODE_MODIFY} />} />

      </Routes>
      <EgovFooter />
      <EgovInfoPopup />
      
    </>
  )
  
}


export default RootRoutes;