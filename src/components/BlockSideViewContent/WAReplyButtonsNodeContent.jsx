import React from 'react';
import { Divider } from '@chakra-ui/react';
import {
  DraftEditorField,
  FormTextField,
  SortableReplyButtons,
} from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';

function WAReplyButtonsNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;

  const initialValues = {
    text: currentNode?.data?.params?.message || {
      text: config.fields.placeholder,
    },

    nodeTextContent: currentNode?.data?.params?.nodeTextContent,
    header: currentNode?.data?.params?.header,
    footer: currentNode?.data?.params?.footer,
    buttons: currentNode?.data?.params?.buttons,
    variable:
      currentNode?.data?.params?.variable || config.data?.params.variable,
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;
    updateNodeById(id, { params: { ...formValues, variableName } });
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
      <FormTextField
        name='header'
        label='Header (optional)'
        labelVariant='h3'
        variant='custom'
        type='textarea'
      />
      <DraftEditorField
        name='text'
        placeholder={config.fields.placeholder}
        label={config.fields.label}
        labelVariant='h1'
      />
      <FormTextField
        name='footer'
        label='Footer (optional)'
        labelVariant='h3'
        variant='custom'
        type='textarea'
      />

      <SortableReplyButtons name='buttons' />
      <Divider />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default WAReplyButtonsNodeContent;
