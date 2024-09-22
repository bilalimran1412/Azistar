import React from 'react';
import { Box, Divider, Flex, IconButton } from '@chakra-ui/react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import MessageFieldArray from '../Shared/FormUi/FormHelper/MessageFieldArray';
import { groupBy } from '../../utils/arrayHelper';

const defaultValue = {
  message: [{ type: 'message', message: '' }],
  media: [{ type: 'media', media: null }],
};
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
      currentNode?.data?.mediaAndMessage || defaultValue?.message,
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
      <Divider />
    </SidebarFormContainer>
  );
}

export default ButtonNodeContent;
