import React from 'react';
import { Field, useFormikContext } from 'formik';
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
  const { errors, touched } = useFormikContext();

  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl mt={4} isInvalid={touched[name] && errors[name]}>
          <FormLabel>{label}</FormLabel>
          <ReactQuill
            theme='snow'
            value={field.value}
            placeholder={placeholder}
            modules={modules}
            onChange={(value) => form.setFieldValue(name, value)}
          />
          <FormErrorMessage>{errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default QuillEditorField;
