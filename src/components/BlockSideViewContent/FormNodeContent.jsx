import React from 'react';
import { FormNodeRowsFieldArray, QuillEditorField } from '../Shared/FormUi';
import { FormNodeSettings, SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';

function FormNodeContent({ id }) {
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
  const initialValues = {
    fields: config.fields,
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.message || '',
    rows: currentNode?.data.rows || config?.data?.rows || '',

    // move to config
    extra: currentNode?.data.extra || '',
    hasSkipButton: currentNode?.data.hasSkipButton || '',
    sendLabel: currentNode?.data.sendLabel || '',
    skipLabel: currentNode?.data.skipLabel || '',
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const { rows, ...rest } = formValues;
    const filteredRows = rows?.filter((row) => row?.questions?.length);

    updateNodeById(id, { ...currentNode?.data, rows: filteredRows, ...rest });
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
      <FormNodeSettings />
      <FormNodeRowsFieldArray name='rows' />
    </SidebarFormContainer>
  );
}

export default FormNodeContent;
