import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavInform() { 
    console.groupCollapsed("EgovLeftNavInform");
    console.log("[Start] EgovLeftNavInform ------------------------------");
    console.log("------------------------------EgovLeftNavInform [End]");
    console.groupEnd("EgovLeftNavInform");
    return (
        <div className="nav">
            <div className="inner">
                <h2>알림마당</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.INFORM_DAILY} className={({ isActive }) => (isActive ? "cur" : "")}>오늘의행사</NavLink></li>
                    <li><NavLink to={URL.INFORM_WEEKLY} className={({ isActive }) => (isActive ? "cur" : "")}>금주의행사</NavLink></li>
                    <li><NavLink to={URL.INFORM_NOTICE} className={({ isActive }) => (isActive ? "cur" : "")}>공지사항</NavLink></li>
                    <li><NavLink to={URL.INFORM_GALLERY} className={({ isActive }) => (isActive ? "cur" : "")}>양식장 일람</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default React.memo(EgovLeftNavInform);