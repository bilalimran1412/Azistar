import React from 'react';
import { Button, Text } from '@chakra-ui/react';
import { FormDropdown } from '../Shared/FormUi';
import {
  SidebarFormCard,
  SidebarFormContainer,
  UpgradeWhatsappBusiness,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';

const numberOptions = [{ label: '+923123456789', value: '+923123456789' }];

function WASendMessageNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;

  const initialValues = {
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,
    number: currentNode?.data?.params?.number,
    audience: currentNode?.data?.params?.audience,
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
      <NumberCard />
      <AudienceCard />
    </SidebarFormContainer>
  );
}

export default WASendMessageNodeContent;

function NumberCard() {
  return (
    <SidebarFormCard
      title='1. WhatsApp Business Number'
      contentContainerProps={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Text>Select a phone number to access your Message Templates</Text>
      <FormDropdown
        options={numberOptions}
        label=''
        name='number'
        variant='custom'
        placeholder='Select phone number'
      />
    </SidebarFormCard>
  );
}

function AudienceCard() {
  return (
    <SidebarFormCard
      title='2. Message Template'
      contentContainerProps={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Text>Select the Message Template you want to send</Text>
      <Button height='32px' isDisabled={true}>
        Select message template
      </Button>
    </SidebarFormCard>
  );
}
