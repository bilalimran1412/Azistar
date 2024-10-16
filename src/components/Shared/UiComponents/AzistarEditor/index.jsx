import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import './DraftEditor.css';
import DraftEditor from './MainEditor';
import { decorators } from './MainEditor/Helpers/Decorator';
import { Box } from '@chakra-ui/react';

const AzistarEditor = () => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(decorators)
  );

  const onEditorChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText();
    console.log(convertToRaw(contentState), plainText);
    setEditorState(editorState);
  };

  return (
    <Box width='100%'>
      <DraftEditor
        setEditorState={setEditorState}
        onEditorChange={onEditorChange}
        editorState={editorState}
      />
    </Box>
  );
};

export default AzistarEditor;
