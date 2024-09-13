import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'context/url';

function EgovLeftNavAdmin() {
    return (
        <div className="nav">
            <div className="inner">
                <h2>사이트관리</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.ADMIN_SCHEDULE} activeClassName="cur">일정관리</NavLink></li>
                    {/* <li><NavLink to={URL.ADMIN_TEMPLATE} activeClassName="cur">게시판템플릿관리</NavLink></li>  */}
                    {/* <li><NavLink to={URL.ADMIN_BOARD} activeClassName="cur">게시판생성관리</NavLink></li>
                    <li><NavLink to={URL.ADMIN_USAGE} activeClassName="cur">게시판사용관리</NavLink></li>
                    <li><NavLink to={URL.ADMIN_NOTICE} activeClassName="cur">공지사항관리</NavLink></li> */}
                    {/* <li><NavLink to={URL.ADMIN_OPER} activeClassName="cur">(삭제예정)구동관리</NavLink></li>
                    <li><NavLink to={URL.ADMIN_LOGIN_MODIFY} activeClassName="cur">(작업중)회원정보변경관리</NavLink></li> */} 
                    <li><NavLink to={URL.ADMIN_NOTICE_EST} activeClassName="cur">물고기 대장</NavLink></li>
                    <li><NavLink to={URL.ADMIN_NOTICE_CORP} activeClassName="cur">꺽기선 챠트(일,주,월,분기 샘플, 'apexcharts')</NavLink></li>
                    <li><NavLink to={URL.ADMIN_NOTICE_BLDN} activeClassName="cur">꺽기선 챠트(패턴 3종류, 'apexcharts')</NavLink></li>
                    <li><NavLink to={URL.ADMIN_NOTICE_LAND} activeClassName="cur">꺽기선 챠트(DB read, 'apexcharts')</NavLink></li> 
                    <li><NavLink to={URL.ADMIN_GALLERY} activeClassName="cur">막대 챠트(DB read, 'apexcharts')</NavLink></li> 
                    <li><NavLink to={URL.ADMIN_OPER} activeClassName="cur">파이 챠트(DB read, 'apexcharts')</NavLink></li>
                    <li><NavLink to={URL.ADMIN_OPER2} activeClassName="cur">꺽기선+파이 챠트(DB read, 'apexcharts')</NavLink></li>
                    <li><NavLink to={URL.ADMIN_FISHTEMP1} activeClassName="cur">양식장 일별 온도(막대, 경훈) 챠트(DB read, 'apexcharts')</NavLink></li>
                    <li><NavLink to={URL.ADMIN_FISHTEMP2} activeClassName="cur">양식장 일별 온도(꺽기선, 지은) 챠트(DB read, 'apexcharts')</NavLink></li>
                    <li><NavLink to={URL.ADMIN_FISHTEMP3} activeClassName="cur">양식장 일별 온도(꺽기선, 평권) 챠트(DB read, 'apexcharts')</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavAdmin;