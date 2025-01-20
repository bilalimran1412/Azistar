import React from 'react';
import { Divider, Text } from '@chakra-ui/react';
import {
  DraftEditorField,
  FormTextField,
  SortableReplyButtons,
} from '../Shared/FormUi';
import {
  SidebarFormCard,
  SidebarFormContainer,
  UpgradeWhatsappBusiness,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from 'utils/yup';

function WAOptInOutNodeContent({ id }) {
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
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    updateNodeById(id, { params: { ...formValues } });
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
      <UpgradeWhatsappBusiness />
      <SidebarFormCard
        title='Get new subscribers'
        contentContainerProps={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Text>
          Ask your users if they want to subscribe to your WhatsApp Business. If
          they choose Yes - or the button associated with the green output -
          they will be automatically added to your Subscribers list.
        </Text>
        <FormTextField
          name='header'
          label='Header (optional)'
          labelVariant='h3'
          variant='custom'
          type='textarea'
          placeholder='Subscribe!'
        />
        <DraftEditorField
          name='text'
          placeholder={config.fields.placeholder}
          label={config.fields.label}
          labelVariant='h3'
        />
        <FormTextField
          name='footer'
          label='Footer (optional)'
          labelVariant='h3'
          variant='custom'
          type='textarea'
          placeholder='Choose Yes to confirm'
        />

        <SortableReplyButtons
          name='buttons'
          label='Buttons'
          limit={2}
          disableDelete={true}
        />
        <Divider />
      </SidebarFormCard>
    </SidebarFormContainer>
  );
}

export default WAOptInOutNodeContent;
