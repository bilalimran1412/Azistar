import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { groupBy } from '../../utils/arrayHelper';
import {
  ButtonCreatorInputFieldArray,
  MessageFieldArray,
} from '../Shared/FormUi';
import { messageFieldArrayInitialValue } from '../Shared/FormUi/FormHelper/MessageFieldArray';

//TODO MOVE TO CONFIG
const defaultButtonsValue = [
  {
    text: 'Button',
    buttonStyle: 'text',
    icon: null,
    externalLink: '',
    isSettingExpand: false,
    sortOrder: 0,
  },
];

function ButtonNodeContent({ id }) {
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
    mediaAndMessage:
      currentNode?.data?.mediaAndMessage ||
      messageFieldArrayInitialValue?.message,
    buttons: currentNode?.data?.buttons || defaultButtonsValue,
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const groupedValues = groupBy(formValues.mediaAndMessage, 'type');

    updateNodeById(id, {
      ...currentNode?.data,
      ...formValues,
      ...(groupedValues || {}),
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
      <MessageFieldArray name='mediaAndMessage' label='Write a message' />
      <ButtonCreatorInputFieldArray name='buttons' />
    </SidebarFormContainer>
  );
}

export default ButtonNodeContent;
