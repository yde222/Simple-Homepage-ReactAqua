//https://www.npmjs.com/package/react-checkbox-tree
// 전자정부 jsp와 비슷
// npm install react-checkbox-tree --save
// npm install --save react-fontawesome

import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import FontAwesome from 'react-fontawesome'
//import faStyles from 'font-awesome/css/font-awesome.css'
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//npm i @fortawesome/fontawesome-svg-core
//npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
//npm i @fortawesome/react-fontawesome

//export default () => <FontAwesomeIcon icon={faCamera} />; 

//원래
// const nodes = [{
//     value: 'mars',
//     label: 'Mars',
//     children: [
//         { value: 'phobos', label: 'Phobos' },
//         { value: 'deimos', label: 'Deimos' },
//     ],
// }];

// 어미1-새끼11,새끼12,,,어미2-새끼21,새끼22,,,6항목 체크박스표시
// const nodes = [{
//     value: 'mars',
//     label: 'Mars',
//     children: [
//         { value: 'phobos', label: 'Phobos' },
//         { value: 'deimos', label: 'Deimos' },
//     ]},{
//     value: 'mars2',
//     label: 'Mars2',
//     children: [
//         { value: 'phobos2', label: 'Phobos2' },
//         { value: 'deimos2', label: 'Deimos2' },
//     ],
// }];
// 어미1-새끼11,새끼12,,,어미2-새끼21,새끼22,,,어미3-새끼31(손자1,손자2),새끼32,, 11항목 체크박스표시
const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos' },
    ]},{
    value: 'mars2',
    label: 'Mars2',
    children: [
        { value: 'phobos2', label: 'Phobos2' },
        { value: 'deimos2', label: 'Deimos2' },
    ]},{
    value: 'mars3',
    label: 'Mars3',
    children: [
        { value: 'phobos3', label: 'Phobos3',
			children: [
        		{ value: 'phobos31', label: 'Phobos31' },
        		{ value: 'deimos31', label: 'Deimos31' },
    ] },
        { value: 'deimos3', label: 'Deimos3' },
    ],
}];


class Widget extends React.Component {
    state = {
        checked: [],
        expanded: [],
    };

    render() {
        return (
            <CheckboxTree
    icons={{
        check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check-square" />,
        uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['fas', 'square']} />,
        halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check-square" />,
        expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
        expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
        expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
        collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
        parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
        parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open" />,
        leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon="file" />
    }}

                nodes={nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
            />
        );
    }
}
export default Widget;