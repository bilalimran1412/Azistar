import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import {
  FormDropdown,
  FormTextField,
  QuillEditorField,
} from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import FormSettings from '../Shared/SidebarUi/FormSettings';
const formatOptions = [
  { label: 'Auto', value: 'auto' },
  { label: 'Decimals', value: 'decimals' },
  { label: 'Whole Numbers', value: 'wholeNumbers' },
];
function AskNumberNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    fields: config.fields,
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.message,
    variable: currentNode?.data?.variable,
    settings: currentNode?.data?.settings || '',
    format: currentNode?.data?.format || '',
    min: currentNode?.data?.min || '',
    max: currentNode?.data?.max || '',
    prefix: currentNode?.data?.prefix || '',
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
      <Divider />
      <FormSettings name='settings' label='Settings'>
        <Box display='flex' justifyContent='space-between' gap='1rem'>
          <FormDropdown
            name='format'
            label='Format'
            options={formatOptions}
            className='input'
          />
          <FormTextField
            name='prefix'
            label='Prefix'
            className='input'
            placeholder='Examples: $, %/'
          />
        </Box>
        <Box display='flex' justifyContent='space-between' gap='1rem'>
          <FormTextField name='min' label='Min. Value' className='input' />
          <FormTextField name='max' label='Max. Value' className='input' />
        </Box>
      </FormSettings>
      <Divider />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default AskNumberNodeContent;
