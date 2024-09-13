//https://github.com/jakezatecky/react-checkbox-tree/tree/master/examples/src/js

// npm install react-checkbox-tree --save
// npm install --save react-fontawesome

import React, { useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';

import { empires as nodes } from './common52';

function HiddenCheckboxesExample() {
    const [checked, setChecked] = useState([
        'persian',
        'spqr',
        'byzantine',
        'holy-roman',
        'inca',
    ]);
    const [expanded, setExpanded] = useState([
        'favorite-empires',
        'classical-era',
        'medieval-era',
    ]);

    const onCheck = (value) => {
        setChecked(value);
    };

    const onExpand = (value) => {
        setExpanded(value);
    };

    return (
        <CheckboxTree
            checked={checked}
            expanded={expanded}
            nodes={nodes}
            onlyLeafCheckboxes
            onCheck={onCheck}
            onExpand={onExpand}
        />
    );
}

export default HiddenCheckboxesExample;
