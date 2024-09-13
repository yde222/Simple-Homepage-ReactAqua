//https://www.npmjs.com/package/react-organizational-chart
// Simple react hierarchy tree - any React children accepted for nodes
// npm install --save react-organizational-chart

import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

const ExampleTree = () => (
  <Tree label={<div>Root</div>}>
    <TreeNode label={<div>Child 1</div>}>
      <TreeNode label={<div>Grand Child</div>} />
    </TreeNode>
    <TreeNode label={<div>Child 2</div>}>
      <TreeNode label={<div>Grand Child</div>}>
        <TreeNode label={<div>Great Grand Child 1</div>} />
        <TreeNode label={<div>Great Grand Child 2</div>} />
      </TreeNode>
    </TreeNode>
  </Tree>
);
export default ExampleTree;