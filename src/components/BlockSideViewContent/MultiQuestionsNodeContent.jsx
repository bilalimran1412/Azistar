import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { Divider } from '@chakra-ui/react';
import {
  FormSettings,
  FormTextField,
  QuillEditorField,
} from '../Shared/FormUi';
import SortableMultiQuestionFieldArray from '../Shared/FormUi/FormHelper/SortableMultiQuestionFieldArray';

function MultiQuestionsNodeContent({ id }) {
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

    variable: currentNode?.data?.variable,
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.message || config?.fields[0]?.value || '',
    sendLabel: currentNode?.data?.message || config?.data?.sendLabel || '',
    isAdvancedEnabled:
      currentNode?.data?.isAdvancedEnabled ||
      config?.data?.isAdvancedEnabled ||
      '',
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);

    updateNodeById(id, {
      ...currentNode?.data,
      ...formValues,
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
        placeholder={config.fields[0].placeholder}
        label={config.fields[0].label}
      />
      <Divider />
      <SortableMultiQuestionFieldArray name='elements' />
      <Divider />
      <FormSettings
        name='isAdvancedEnabled'
        label='Advanced Options'
        bgColor='inherit'
        containerStyles={{ padding: 0 }}
      >
        <FormTextField
          name='sendLabel'
          variant='custom'
          label='Customize submit button label'
          labelVariant='h2'
        />
      </FormSettings>
    </SidebarFormContainer>
  );
}

export default MultiQuestionsNodeContent;
