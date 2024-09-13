//https://www.npmjs.com/package/react-organizational-chart
// Simple react hierarchy tree - any React children accepted for nodes
// npm install --save react-organizational-chart

import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

//const StyledNode = styled.div`
const StyledNode  = {
  padding: '5px',
  borderRadius: '8px',
  display: 'inline-block',
  border: '1px solid red'
  }


const StyledTreeExample = () => (
  <Tree
    lineWidth={'2px'}
    lineColor={'green'}
    lineBorderRadius={'10px'}
    label={<StyledNode>Root</StyledNode>}
  >
    <TreeNode label={<StyledNode>Child 1</StyledNode>}>
      <TreeNode label={<StyledNode>Grand Child</StyledNode>} />
    </TreeNode>
    <TreeNode label={<StyledNode>Child 2</StyledNode>}>
      <TreeNode label={<StyledNode>Grand Child</StyledNode>}>
        <TreeNode label={<StyledNode>Great Grand Child 1</StyledNode>} />
        <TreeNode label={<StyledNode>Great Grand Child 2</StyledNode>} />
      </TreeNode>
    </TreeNode>
    <TreeNode label={<StyledNode>Child 3</StyledNode>}>
      <TreeNode label={<StyledNode>Grand Child 1</StyledNode>} />
      <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} />
    </TreeNode>
  </Tree>
);

export default StyledTreeExample;