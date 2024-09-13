import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavGrpau() {
    
    return (
        <div className="nav">
            <div className="inner">
                <h2>영상관리</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.GRPAU_USER_INSERT} activeClassName="cur">(작업중)양식장일람</NavLink></li>
                    <li><NavLink to={URL.GRPAU_USER_DELETE} activeClassName="cur">(작업중)샘플2</NavLink></li>
                    <li><NavLink to={URL.GRPAU_AUTHORITY_MAN} activeClassName="cur">(작업중)샘플3</NavLink></li>
                    <li><NavLink to={URL.GRPAU_USER_GROUP} activeClassName="cur">(작업중)샘플4</NavLink></li>
                    <li><NavLink to={URL.GRPAU_USER_AUTHORITY} activeClassName="cur">(작업중)샘플5</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavGrpau;