// CustomNode.jsx
import React from 'react';
import BaseNode from './BaseNode';

const CustomNode = (props) => {
  return <BaseNode {...props} type="customNode" label="Custom Node" />;
};

export default CustomNode;