import React from 'react';
import { Text } from '@chakra-ui/react';
import { FormDropdown, FormToggleSwitch } from '../Shared/FormUi';
import {
  SidebarFormCard,
  SidebarFormContainer,
  UpgradeWhatsappBusiness,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { useFormikContext } from 'formik';

const numberOptions = [{ label: '+923123456789', value: '+923123456789' }];

function WAAudienceNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;

  const initialValues = {
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,
    channelId: currentNode?.data?.params?.channelId,
    audience: currentNode?.data?.params?.audience,
    enableTest: currentNode?.data?.params?.enableTest,
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

export default WAAudienceNodeContent;

function NumberCard() {
  const { values } = useFormikContext();

  return (
    <SidebarFormCard
      title='1. WhatsApp Business Number'
      contentContainerProps={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Text>
        Select the WhatsApp Business number that you are subscribing your users
        to
      </Text>
      <FormDropdown
        options={numberOptions}
        label=''
        name='channelId'
        variant='custom'
        disabled={!values?.enableTest}
      />
      <FormToggleSwitch
        name='enableTest'
        label='Use a Testing number'
        labelVariant='h3'
      />
    </SidebarFormCard>
  );
}

function AudienceCard() {
  const { values } = useFormikContext();

  return (
    <SidebarFormCard
      title='2. Audience'
      contentContainerProps={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Text>Select the audience that you want to add your users to</Text>
      <FormDropdown
        options={[]}
        label=''
        name='audience'
        variant='custom'
        disabled={!values?.enableTest}
      />
    </SidebarFormCard>
  );
}
