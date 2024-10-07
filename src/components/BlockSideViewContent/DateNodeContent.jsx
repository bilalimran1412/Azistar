import React from 'react';
import {
  DateSelectorFieldArray,
  FormDropdown,
  FormWeekdaysSelect,
  QuillEditorField,
} from '../Shared/FormUi';
import * as yup from 'yup';
import { Divider } from '@chakra-ui/react';
import FormCheckbox from '../Shared/FormUi/FormCheckbox';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import { useFormikContext } from 'formik';

const formatOptions = [
  { value: 'yyyy/MM/dd', label: 'YYYY/MM/DD - 2023/09/19' },
  { value: 'yy/MM/dd', label: 'YY/MM/DD - 23/09/19' },
  { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY - 19/09/2023' },
  { value: 'dd/MM/yy', label: 'DD/MM/YY - 19/09/23' },
  { value: 'MM/dd/yy', label: 'MM/DD/YY - 09/19/23' },
  { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY - 09/19/2023' },
];
const enabledDatesOptions = [
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
const defaultRange = [
  {
    fromDate: '',
    toDate: '',
  },
];
function DateNodeContent({ id }) {
  // const [dateOption, setDateOption] = React.useState('');
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // const handelAvailableOptionChange = (value) => {
  //   setDateOption(value);
  // };
  //TODO MOVE TO CONFIG
  const initialValues = {
    fields: config.fields,
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.message || '',
    variable: currentNode?.data?.variable || '',
    format: currentNode?.data?.format || '',
    showDatePicker: currentNode?.data?.showDatePicker || false,
    enabledDateType: currentNode?.data?.enabledDateType || '',
    enabledDaysOfWeek: currentNode?.data?.enabledDaysOfWeek || [
      1, 0, 2, 3, 4, 5, 6,
    ],
    enabledCustomRanges: currentNode?.data?.enabledCustomRanges || defaultRange,
    error: "I'm afraid I didn't understand, could you try again, please?",
  };

  const validationSchema = yup.object({
    enabledCustomRanges: yup.array().of(
      yup.object({
        fromDate: yup.date().notRequired(),
        toDate: yup
          .date()
          .notRequired()
          .min(yup.ref('fromDate'), 'To Date must be after From Date'),
      })
    ),
  });

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;
    const enabledDateType = formValues.enabledDateType;

    updateNodeById(id, {
      ...currentNode?.data,
      ...formValues,
      variableName,
      ...(enabledDateType !== 'custom' && { enabledCustomRanges: '' }),
    });

    handleClose();
  };

  return (
    <SidebarFormContainer
      block={config}
      onClose={handleClose}
      onFormSave={onSave}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onReset={handleClose}
    >
      <QuillEditorField
        name='message'
        placeholder='Example: <<Select a date, please>>'
        label='Question text'
      />
      <FormDropdown
        name='format'
        variant='custom'
        options={formatOptions}
        label='Format to save the date'
      />
      <FormCheckbox name='showDatePicker' label='Show date picker' />
      <Divider />
      <DateTypeDropdown />
      <DateSelectorField />
      <Divider />
      <FormWeekdaysSelect
        name='enabledDaysOfWeek'
        label='Disable specific days'
      />
      <FormVariableSelectorDropdown
        name='variable'
        allowedType={config?.variableType}
      />
    </SidebarFormContainer>
  );
}

export default DateNodeContent;

function DateTypeDropdown() {
  const { setFieldValue } = useFormikContext();
  return (
    <FormDropdown
      name='enabledDateType'
      variant='custom'
      options={enabledDatesOptions}
      label='Set available dates'
      onChange={() => setFieldValue('enabledCustomRanges', defaultRange)}
    />
  );
}
function DateSelectorField() {
  const { values } = useFormikContext();

  return (
    <DateSelectorFieldArray
      name={`enabledCustomRanges`}
      enabledDateType={values.enabledDateType}
    />
  );
}
