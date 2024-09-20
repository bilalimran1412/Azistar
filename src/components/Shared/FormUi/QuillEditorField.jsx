import React from 'react';
import { Field, useField, useFormikContext } from 'formik';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ header: '1' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['blockquote', 'code-block'],
  ],
};

function QuillEditorField({ name, label, placeholder }) {
  const [field, meta, helpers] = useField(name);
  const { errors, touched } = useFormikContext();
  console.log(field.value);
  return (
    <FormControl mt={4} isInvalid={touched[name] && errors[name]}>
      <FormLabel>{label}</FormLabel>
      <ReactQuill
        theme='snow'
        placeholder={placeholder}
        defaultValue={JSON.parse(field.value)}
        modules={modules}
        onChange={(content, delta, source, editor) => {
          const stringContent = JSON.stringify(editor.getContents().ops);
          helpers.setValue(stringContent);
        }}
      />
      <FormErrorMessage>{errors[name]}</FormErrorMessage>
    </FormControl>
  );
}

export default QuillEditorField;
