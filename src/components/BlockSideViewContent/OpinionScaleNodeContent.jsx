import React from 'react';
import { Divider } from '@chakra-ui/react';
import { FormTextField, QuillEditorField } from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';

function OpinionScaleNodeContent({ id }) {
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

    from: currentNode?.data?.from || '0',
    leftLabel: currentNode?.data?.leftLabel || 'Worst',
    to: currentNode?.data?.to || '5',
    rightLabel: currentNode?.data?.rightLabel || 'Best',
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
      <FormTextField
        name='from'
        label='From'
        placeholder={0}
        className='input'
      />
      <FormTextField
        name='leftLabel'
        label='Left Label'
        placeholder={'Worst'}
        className='input'
      />
      <FormTextField name='to' label='To' placeholder={0} className='input' />
      <FormTextField
        name='rightLabel'
        label='Right Label'
        placeholder={'Best'}
        className='input'
      />

      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default OpinionScaleNodeContent;
