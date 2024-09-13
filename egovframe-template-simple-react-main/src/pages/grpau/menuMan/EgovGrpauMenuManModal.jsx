//https://phrygia.github.io/react/2021-09-21-react-modal/
// modal

//https://github.com/jakezatecky/react-checkbox-tree/tree/master/examples/src/js

// npm install react-checkbox-tree --save
// npm install --save react-fontawesome


import React, { useState } from 'react';
import Modal from './Modal44.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CheckboxTree from 'react-checkbox-tree';
import CODE from 'constants/code';
import * as EgovNet from 'api/egovFetch';

import { empires as nodes } from './common52';

function EgovGrpauMenuCreatModal() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
//  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const location = useLocation();

  const progrmFileNm = location.state.progrmFileNm;

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

    // const [checked, setChecked] = useState([
    //     'persian',
    //     'spqr',
    //     'byzantine',
    //     'holy-roman',
    //     'inca',
    // ]);
    // const [expanded, setExpanded] = useState([
    //     'favorite-empires',
    //     'classical-era',
    //     'medieval-era',
    // ]);

    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [bbsTyACodeOptions, setBbsTyACodeOptions] =  useState([]);

    const onCheck = (value) => {
        setChecked(value);
    };

    const onExpand = (value) => {
        setExpanded(value);
    };
    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { pageIndex: 1 });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시

    const [user, setUser] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});
    const [listTag, setListTag] = useState([]);

    //modal data
    const retrieveDetailCom22Id = () => {

		searchCondition.progrmFileNm = progrmFileNm;
		//    window.open("<c:url value='/sym/prm/EgovProgramListSearch.do'/>",'','width=800,height=600');
        const retrieveDetailURL = '/sym/prm/EgovProgramListSearch.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchCondition)
//            body: JSON.stringify({
//                authorCode : authorCode,
//            })
        }
         EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            (resp) => {

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
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                        console.log("--------listIdx---------"+listIdx);
                        console.log("--------resultCnt---------"+resultCnt);
                    mutListTag.push(
                        <div to={{pathname: URL.GRPAU_MEMU_MAN_DETAIL}} 
                        state={{
                            menuNo: item.menuNo
                        }} 
                        key={listIdx} className="list_item" >
                            <div>{item.progrmFileNm}</div>
                            <div>{item.progrmKoreanNm}</div>
                        </div>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }

        );
    }

	retrieveDetailCom22Id();

  return (
    <React.Fragment>
      {/* <button onClick={openModal}>모달팝업</button> */}
      {/* header 부분에 텍스트를 입력한다. */}
      {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
      <Modal open={modalOpen} close={closeModal} header={progrmFileNm}>
        팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요!

      </Modal>
    </React.Fragment>
  );
}


//menuCreat/EgovMenuCreat.js start
/*
 * 노드 , 트리 구성 정보 선언
 */
var treeNodes			= new Array();
var openTreeNodes	    = new Array();
var treeIcons			= new Array(6);
var imgpath         = "/images/";

/*
 * 노드 , 트리 구성 이미지 정보
 */
function preloadIcons() {
	treeIcons[0] = new Image();
	treeIcons[0].src = imgpath+"menu_plus.gif";
	treeIcons[1] = new Image();
	treeIcons[1].src = imgpath+"menu_plusbottom.gif";
	treeIcons[2] = new Image();
	treeIcons[2].src = imgpath+"menu_minus.gif";
	treeIcons[3] = new Image();
	treeIcons[3].src = imgpath+"menu_minusbottom.gif";
	treeIcons[4] = new Image();
	treeIcons[4].src = imgpath+"menu_folder.gif";
	treeIcons[5] = new Image();
	treeIcons[5].src = imgpath+"menu_folderopen.gif";
}
/*
* 트리생성함수
*/
function createTree(arrName ) {
   var startNode, openNode;
	treeNodes = arrName;
	if (treeNodes.length > 0) {
		preloadIcons();
		if (startNode == null) startNode = 0;
		if (openNode != 0 || openNode != null) setOpenTreeNodes(openNode);
		if (startNode !=0) {
			var nodeValues = treeNodes[getTreeArrayId(startNode)].split("|");
		} else document.write("<input type='checkbox' name='checkAll' class='check2' onclick='javascript:fCheckAll();'>메뉴목록<br>");
		var recursedNodes = new Array();
		addTreeNode(startNode, recursedNodes);
	}
}
/*
* 노드위치 확인
*/
function getTreeArrayId(node) {
	for (var i=0; i<treeNodes.length; i++) {
		var nodeValues = treeNodes[i].split("|");
		if (nodeValues[0]==node) return i;
	}
	return 0;
}
/*
* 트리 노드 열기
*/
function setOpenTreeNodes(openNode) {
	for (var i=0; i<treeNodes.length; i++) {
		var nodeValues = treeNodes[i].split("|");
		if (nodeValues[0]==openNode) {
			openTreeNodes.push(nodeValues[0]);
			setOpenTreeNodes(nodeValues[1]);
		}
	} 
}
/*
* 트리노드 오픈 여부 확인
*/
function isTreeNodeOpen(node) {
	return true;
}
/*
* 하위 트리노드 존재여부 확인
*/
function hasChildTreeNode(parentNode) {
	for (var i=0; i< treeNodes.length; i++) {
		var nodeValues = treeNodes[i].split("|");
		if (nodeValues[1] == parentNode) return true;
	}
	return false;
}
/*
* 트리노드 최하위 여부 확인
*/
function lastTreeSibling (node, parentNode) {
	var lastChild = 0;
	for (var i=0; i< treeNodes.length; i++) {
		var nodeValues = treeNodes[i].split("|");
		if (nodeValues[1] == parentNode) lastChild = nodeValues[0];
	}
	if (lastChild==node) return true;
	return false;
}

/*
* 신규 트리노드 추가
*/
function addTreeNode(parentNode, recursedNodes) {
	for (var i = 0; i < treeNodes.length; i++) {
		var nodeValues = treeNodes[i].split("|");
		if (nodeValues[1] == parentNode) {
			
			var lastSibling	= lastTreeSibling(nodeValues[0], nodeValues[1]);
			var hasChildNode	= hasChildTreeNode(nodeValues[0]);
			var isNodeOpen = isTreeNodeOpen(nodeValues[0]);
			for (var g=0; g<recursedNodes.length; g++) {
				document.write("&nbsp;&nbsp;&nbsp;");
			}
			if (lastSibling) recursedNodes.push(0);
			else recursedNodes.push(1);
			document.write("&nbsp;&nbsp;&nbsp;");
			document.write("<input type='checkbox' id='"+i+"' name='checkField' class='check2' ");
			if(nodeValues[4] == 1){ document.write(" checked "); }
			document.write("onclick='javascript:fCheckDir(this.name, this.value,"+i+");' value=" + nodeValues[0] + ">");
			if (hasChildNode) {
				document.write("<img id='icon" + nodeValues[0] + "' src='"+imgpath+"menu_folder")
					if (isNodeOpen) document.write("open");
				document.write(".gif' border='0' alt='Folder' >");
			} else document.write("<img id='icon" + nodeValues[0] + "' src='"+imgpath+"menu_page.gif' border='0' align='absbottom' alt='Page'>");
			document.write("<a href=javascript:parent.temp_aa('" + treeNodes[i] + "');>");
			document.write(nodeValues[2]);
			document.write("</a><br>");
			if (hasChildNode) {
				document.write("<div id='div" + nodeValues[0] + "'");
					if (!isNodeOpen) document.write(" style='display: none;'");
				document.write(">");
				addTreeNode(nodeValues[0], recursedNodes);
				document.write("</div>");
			}
			recursedNodes.pop();
		}
	}
}
/*
* 트리노드 액션(열기,닫기)
*/
function openCloseEx(node, bottom) {
	var treeDiv = document.getElementById("div" + node);
	var treeJoin	= document.getElementById("join" + node);
	var treeIcon = document.getElementById("icon" + node);
	
	if (treeDiv.style.display == 'none') {
		if (bottom==1) treeJoin.src = treeIcons[3].src;
		else treeJoin.src = treeIcons[2].src;
		treeIcon.src = treeIcons[5].src;
		treeDiv.style.display = '';
	} else {
		if (bottom==1) treeJoin.src = treeIcons[1].src;
		else treeJoin.src = treeIcons[0].src;
		treeIcon.src = treeIcons[4].src;
		treeDiv.style.display = 'none';
	}
}
if(!Array.prototype.push) {
	function fnArrayPush() {
		for(var i=0;i<arguments.length;i++)
			this[this.length]=arguments[i];
		return this.length;
	}
	Array.prototype.push = fnArrayPush;
}
if(!Array.prototype.pop) {
	function fnArrayPop(){
		var lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
		return lastElement;
	}
	Array.prototype.pop = fnArrayPop;
}
 
/* ********************************************************
 * 모두선택 처리 함수
 ******************************************************** */
function fCheckAll() {
    var checkField = document.menuCreatManageForm.checkField;
    if(document.menuCreatManageForm.checkAll.checked) {
        if(checkField) {
            if(checkField.length > 1) {
                for(var i=0; i < checkField.length; i++) {
                    checkField[i].checked = true;
                }
            } else {
                checkField.checked = true;
            }
        }
    } else {
        if(checkField) {
            if(checkField.length > 1) {
                for(var j=0; j < checkField.length; j++) {
                    checkField[j].checked = false;
                }
            } else {
                checkField.checked = false;
            }
        }
    }
}

/* ********************************************************
 * 모두선택 처리 함수
 ******************************************************** */
function fCheckDir(fCheckYB, fValue, fPath){
	var checkField = document.getElementsByName(fCheckYB);
}

//menuCreat/EgovMenuCreat.js end

//menuCreat/ui.js start

//menuCreat/ui.js end


export default EgovGrpauMenuCreatModal;
