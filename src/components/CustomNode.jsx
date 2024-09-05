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

const autoComplete = (props) => {
  return <BaseNode {...props} type="autoComplete" label="Autocomplete" />;
};

const askUrl = (props) => {
  return <BaseNode {...props} type="askUrl" label="Ask for a url" />;
};

const askAddress = (props) => {
  return <BaseNode {...props} type="askAddress" label="Ask for an address" />;
};

const picChoice = (props) => {
  return <BaseNode {...props} type="picChoice" label="Picture choice" />;
};

const rating = (props) => {
  return <BaseNode {...props} type="rating" label="Rating" />;
};
// Named exports
export { CustomNode, askName, askEmail, askPhone, askNumber, askUrl, askAddress, autoComplete, picChoice, rating };
