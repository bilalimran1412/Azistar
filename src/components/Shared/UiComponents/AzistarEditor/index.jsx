import React from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import './DraftEditor.css';
import DraftEditor from './MainEditor';
import { decorators } from './MainEditor/Helpers/Decorator';
import { Box } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { initialBlocks } from './MainEditor/Helpers/initialBlocks';

const AzistarEditor = ({ type = 'inline', placeholder, setFieldValue }) => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(convertFromRaw(initialBlocks), decorators)
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = React.useCallback(
    debounce(() => {
      const contentState = editorState.getCurrentContent();
      const plainText = contentState.getPlainText();
      setFieldValue && setFieldValue(convertToRaw(contentState), plainText);
    }, 300),
    []
  );

  const onEditorChange = (editorState) => {
    setEditorState(editorState);
    debouncedOnChange();
  };

  return (
    <Box width='100%'>
      <DraftEditor
        setEditorState={setEditorState}
        onEditorChange={onEditorChange}
        editorState={editorState}
        type={type}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default AzistarEditor;
