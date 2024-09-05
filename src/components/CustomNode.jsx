// CustomNode.jsx
import React from 'react';
import BaseNode from './BaseNode';

const CustomNode = (props) => {
  return <BaseNode {...props} type="customNode" label="Custom Node" />;
};

const askName = (props) => {
  return <BaseNode {...props} type="askName" label="Ask for a Name" />;
};

const askEmail = (props) => {
  return <BaseNode {...props} type="askEmail" label="Ask for an Email" />;
};

const askPhone = (props) => {
  return <BaseNode {...props} type="askPhone" label="Ask for a Phone" />;
};

const askNumber = (props) => {
  return <BaseNode {...props} type="askNumber" label="Ask for a Number" />;
};

// Named exports
export { CustomNode, askName, askEmail, askPhone, askNumber };
