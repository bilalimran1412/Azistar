import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import {
  FormCustomOptionSelector,
  FormSettings,
  FormTextField,
  QuillEditorField,
} from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';

const selectionOptions = [
  { label: 'Long', value: 'long' },
  { label: 'Short', value: 'short' },
];
function AskQuestionNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);
  //TODO MOVE TO CONFIG
  // VARIABLE
  // OTHERFIELDS
  const initialValues = {
    fields: config.fields,
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.message,
    variable: currentNode?.data?.variable,
    settings: currentNode?.data?.settings || '',
    sizeOfTextArea: currentNode?.data?.sizeOfTextArea || '',
    min: currentNode?.data?.min || '',
    max: currentNode?.data?.max || '',
    regex: currentNode?.data?.regex || '',
    errorMessage: currentNode?.data?.errorMessage || '',
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;
    updateNodeById(id, { ...currentNode?.data, ...formValues, variableName });
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
        placeholder={config.fields[0].placeholder}
        label={config.fields[0].label}
      />
      <FormSettings name='settings' label='Settings'>
        <FormCustomOptionSelector
          name='sizeOfTextArea'
          label='Size of text area'
          options={selectionOptions}
        />
        <Box display='flex' justifyContent='space-between' gap='1rem'>
          <FormTextField name='min' label='Min. Characters' className='input' />
          <FormTextField name='max' label='Max. Characters' className='input' />
        </Box>
        <FormTextField name='regex' label='Regex Pattern' className='input' />
        <FormTextField
          name='errorMessage'
          type='textarea'
          label='Validation Error Message'
          className='input'
        />
      </FormSettings>
      <Divider />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default AskQuestionNodeContent;
