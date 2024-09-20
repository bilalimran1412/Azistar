import * as yup from 'yup';
import React from 'react';
import { AzistarForm, QuillEditorField } from '../Shared/FormUi';
import RichTextEditor from '../Shared/FormUi/QuillEditorField';

const buttonFormSchema = yup.object({
  tester: yup.string(),
});
const buttonFormInitialValues = {
  te: 'lorem ipsum',
};
function ButtonNodeContent() {
  return (
    <AzistarForm validationSchema={buttonFormSchema}>
      {/* <RichTextEditor  /> */}
    </AzistarForm>
  );
}

export default ButtonNodeContent;
