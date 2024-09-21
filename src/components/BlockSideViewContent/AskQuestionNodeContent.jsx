import React from 'react';
import {
  AzistarForm,
  FormCustomOptionSelector,
  FormDropdown,
  QuillEditorField,
} from '../Shared/FormUi';
import * as yup from 'yup';
import FormSettings from '../Shared/SidebarUi/FormSettings';
import FormTextField from '../Shared/FormUi/FormTextField';
import { Box, Divider, StepSeparator } from '@chakra-ui/react';
const buttonFormSchema = yup.object({
  question: yup.string(),
});
const buttonFormInitialValues = {
  question: '',
  error: "I'm afraid I didn't understand, could you try again, please?",
  size: 'short',
};

const options = [
  {
    value: 'short',
    label: 'SHORT',
  },
  {
    value: 'long',
    label: 'LONG',
  },
];
function AskQuestionNodeContent() {
  return (
    <AzistarForm
      onSave={(v) => {
        console.log(v);
      }}
      validationSchema={buttonFormSchema}
      initialValues={buttonFormInitialValues}
    >
      <QuillEditorField
        name='question'
        placeholder='Example: <<What do you think?>>'
        label='Question text'
      />
      <FormSettings label='Settings'>
        <FormCustomOptionSelector
          label='Size of text area'
          name='size'
          options={options}
        />
        <Box display='flex' justifyContent='space-between' gap='1rem'>
          <FormTextField name='min' label='Min. characters' />
          <FormTextField name='max' label='Min. characters' />
        </Box>
        <FormTextField name='regex' label='Regex Pattern' />
        <FormTextField
          name='error'
          label='Validation error message'
          type='textarea'
        />
      </FormSettings>
      <Divider />
    </AzistarForm>
  );
}

export default AskQuestionNodeContent;
