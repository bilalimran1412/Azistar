import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import {
  ButtonCreatorInputFieldArray,
  QuillEditorField,
} from '../Shared/FormUi';
import { Divider } from '@chakra-ui/react';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';

function YesNoNodeContent({ id }) {
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
    message: currentNode?.data?.message,

    variable: currentNode?.data?.variable || '',

    buttons: currentNode?.data?.buttons || config.data?.buttons,
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;

    updateNodeById(id, {
      ...currentNode?.data,
      ...formValues,
      variableName,
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
      <ButtonCreatorInputFieldArray
        name='buttons'
        showExternalLinkField={false}
      />

      <Divider />
      <FormVariableSelectorDropdown
        name='variable'
        readOnly
        allowedType={config?.variableType}
      />
    </SidebarFormContainer>
  );
}

export default YesNoNodeContent;
