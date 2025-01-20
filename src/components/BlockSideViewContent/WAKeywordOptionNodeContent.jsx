import React from 'react';
import { Divider } from '@chakra-ui/react';
import {
  DraftEditorField,
  FormToggleSwitch,
  SortableKeywordOptionButtons,
} from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import { useFormikContext } from 'formik';

function WAKeywordOptionNodeContent({ id }) {
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
    errorMessage: currentNode?.data?.params?.errorMessage,
    buttons: currentNode?.data?.params?.buttons,
    enableErrorMessage: currentNode?.data?.params?.enableErrorMessage,
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
      <DraftEditorField
        name='text'
        placeholder={config.fields.placeholder}
        label={config.fields.label}
        labelVariant='h3'
      />

      <SortableKeywordOptionButtons name='buttons' />
      <ValidationMessage />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default WAKeywordOptionNodeContent;

function ValidationMessage() {
  const { values } = useFormikContext();
  return (
    <>
      <Divider />
      <FormToggleSwitch
        name='enableErrorMessage'
        label='Validation error message'
        labelVariant='h3'
      />
      {values?.enableErrorMessage && (
        <DraftEditorField
          name='errorMessage'
          placeholder={`I'm afraid I didn't understand, could you try again, please?`}
          label=''
          labelVariant='h3'
        />
      )}
      <Divider />
    </>
  );
}
