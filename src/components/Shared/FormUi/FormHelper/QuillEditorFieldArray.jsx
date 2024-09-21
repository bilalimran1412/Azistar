import { FieldArray } from 'formik';
import React from 'react';

function QuillEditorFieldArray({ name }) {
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <>
          {[]?.map((option) => (
            <></>
          ))}
          <button>Add Option</button>
        </>
      )}
    />
  );
}

export default QuillEditorFieldArray;
