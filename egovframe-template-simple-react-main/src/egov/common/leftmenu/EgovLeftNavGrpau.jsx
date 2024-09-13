import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavGrpau() {
    
    return (
        <div className="nav">
            <div className="inner">
                <h2>그룹및권한관리</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.GRPAU_USER_INSERT} activeClassName="cur">사용자등록관리</NavLink></li>
                    <li><NavLink to={URL.GRPAU_USER_DELETE} activeClassName="cur">사용자부재관리</NavLink></li>
                    <li><NavLink to={URL.GRPAU_AUTHORITY_MAN} activeClassName="cur">권한관리</NavLink></li>
                    <li><NavLink to={URL.GRPAU_USER_GROUP} activeClassName="cur">사용자그룹관리</NavLink></li>
                    <li><NavLink to={URL.GRPAU_USER_AUTHORITY} activeClassName="cur">사용자별권한관리</NavLink></li>
                    <li><NavLink to={URL.GRPAU_ROLE_MAN} activeClassName="cur">롤관리</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavGrpau;