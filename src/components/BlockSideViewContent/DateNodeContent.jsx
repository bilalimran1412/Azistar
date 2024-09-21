import React from 'react';
import {
  AzistarForm,
  FormDropdown,
  FormWeekdaysSelect,
  QuillEditorField,
} from '../Shared/FormUi';
import * as yup from 'yup';
import FormTextField from '../Shared/FormUi/FormTextField';
import { Box, Divider } from '@chakra-ui/react';

import FormCheckbox from '../Shared/FormUi/FormCheckbox';
import { AddIcon } from '@chakra-ui/icons';
import { MdAdd } from 'react-icons/md';
import VariableDropdown from '../Shared/SidebarUi/VariableDropdown';

const buttonFormSchema = yup.object({
  question: yup.string(),
});
const buttonFormInitialValues = {
  question:
    '[{"insert":"A robot who has developed sentience, and is the only robot of his kind shown to be still functioning on Earth.\\nList item 1"},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"item 2"},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"sub item"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"item 2"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"attributes":{"italic":true},"insert":"I am an italics text"},{"insert":"\\n"}]',
  error: "I'm afraid I didn't understand, could you try again, please?",
  size: 'short',
};

const formatOptions = [
  { value: 'yyyy/MM/dd', label: 'YYYY/MM/DD - 2023/09/19' },
  { value: 'yy/MM/dd', label: 'YY/MM/DD - 23/09/19' },
  { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY - 19/09/2023' },
  { value: 'dd/MM/yy', label: 'DD/MM/YY - 19/09/23' },
  { value: 'MM/dd/yy', label: 'MM/DD/YY - 09/19/23' },
  { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY - 09/19/2023' },
];
const availableDatesOptions = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'past',
    label: 'Past dates only',
  },
  {
    value: 'future',
    label: 'Future dates only',
  },
  {
    value: 'custom',
    label: 'Custom range',
  },
];
function DateNodeContent() {
  const [dateOption, setDateOption] = React.useState('');
  const handelAvailableOptionChange = (value) => {
    setDateOption(value);
  };
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
        placeholder='Example: <<Select a date, please>>'
        label='Question text'
      />
      <FormDropdown
        name='format'
        options={formatOptions}
        label='Format to save the date'
      />
      <FormCheckbox name='showDatePicker' label='Show date picker' />
      <Divider />
      <FormDropdown
        name='availableDates'
        options={availableDatesOptions}
        label='Set available dates'
        onChange={handelAvailableOptionChange}
      />
      {dateOption === 'custom' && (
        <Box display='flex' flexDirection='column' gap='12px'>
          <Box background='lightgray' padding='12px'>
            <Box display='flex' justifyContent='space-between' gap='1rem'>
              <FormTextField name='fromDate' type='date' label='From Date' />
              <FormTextField name='toDate' type='date' label='To Date' />
            </Box>
          </Box>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              color: 'white',
              background: '#cc3c79',
              height: '32px',
              width: '32px',
              alignSelf: 'flex-end',
            }}
          >
            <MdAdd />
          </div>
        </Box>
      )}

      <Divider />
      <FormWeekdaysSelect name='disabled' label='Disable specific days' />
      <VariableDropdown />
    </AzistarForm>
  );
}

export default DateNodeContent;
