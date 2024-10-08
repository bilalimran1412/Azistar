import React from 'react';
import { Divider } from '@chakra-ui/react';
import { FormDropdown, QuillEditorField } from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';

const dropdownOptions = [
  { value: 'star-3', label: '⭐️⭐️⭐️' },
  { value: 'star-5', label: '⭐️⭐️⭐️⭐️⭐' },
  { value: 'star-10', label: '⭐️⭐️⭐⭐️⭐️⭐️⭐⭐️⭐️⭐️' },
  { value: 'mood', label: '😡 🙁 😐 🙂 😍' },
];
function RatingNodeContent({ id }) {
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
  // MESSAGE TOO
  const initialValues = {
    fields: config.fields,
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.message,
    variable: currentNode?.data?.variable,

    rating: currentNode?.data?.rating,
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
      <FormDropdown name='rating' options={dropdownOptions} />
      <Divider />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default RatingNodeContent;
