// AskAQuestion.jsx
import React from 'react';
import BaseNode from './BaseNode';

const AskAQuestion = (props) => {
  return <BaseNode {...props} type="askQuestion" label="Ask a Question"/>;
};

export default AskAQuestion;
