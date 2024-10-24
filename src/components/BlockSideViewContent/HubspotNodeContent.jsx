import React from 'react';
import {
  SendRequest,
  SidebarFormCard,
  SidebarFormContainer,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from 'utils/yup';
import {
  FormDropdown,
  FormSettings,
  HubspotSaveResponseFieldArray,
  TriggerAutomationFieldArray,
} from 'components/Shared/FormUi';
import { Button, Text } from '@chakra-ui/react';
import { truncateString } from 'utils/string';
import { filterUniqueByKey } from 'utils/objectHelpers';

const options = [
  { label: 'New Contact', value: 'newContact', group: 'Create' },
  { label: 'New Company', value: 'newCompany', group: 'Create' },
  { label: 'New Deal', value: 'newDeal', group: 'Create' },
  { label: 'New Ticket', value: 'newTicket', group: 'Create' },
  { label: 'Update a Contact', value: 'updateContact', group: 'Update' },
  { label: 'Update a Company', value: 'updateCompany', group: 'Update' },
  { label: 'Update a Deal', value: 'updateDeal', group: 'Update' },
  { label: 'Update a Ticket', value: 'updateTicket', group: 'Update' },
  { label: 'Get a Record', value: 'getRecord', group: 'Get' },
];

function HubspotNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  const initialOptions = React.useMemo(() => {
    const dataOptions = currentNode?.data?.saveResponse?.map((item) => ({
      label: truncateString(item.response),
      value: item.response,
    }));

    if (dataOptions?.length) {
      return filterUniqueByKey(dataOptions, 'value');
    } else
      return [{ label: 'Entire Response Body', value: 'Entire Response Body' }];
  }, [currentNode?.data?.saveResponse]);

  const [dropdownOptions, setDropdownOptions] = React.useState(initialOptions);
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    //this message will contain all the ops and html and normal text
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    updateNodeById(id, { ...currentNode?.data, ...formValues });
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
      <SidebarFormCard
        textStyles={{ display: 'flex', justifyContent: 'space-between' }}
        title='Connect your HubSpot account'
      >
        <FormDropdown
          name='auth'
          label='Account'
          options={[]}
          variant='custom'
          labelVariant='h3'
        />
        <Button
          minH={0}
          minW={0}
          paddingX={5}
          paddingY={2}
          h='auto'
          mt={4}
          borderRadius={0}
          backgroundColor='rgb(215, 55, 107)'
          _hover={{
            backgroundColor: 'rgb(215, 55, 107)',
          }}
        >
          <Text fontSize='12px' textTransform='uppercase' color='white'>
            Add new account
          </Text>
        </Button>
      </SidebarFormCard>
      <SidebarFormCard
        textStyles={{ display: 'flex', justifyContent: 'space-between' }}
        title='Choose an event'
      >
        <FormDropdown
          name='event'
          label=''
          options={options}
          variant='custom'
          labelVariant='h3'
        />
      </SidebarFormCard>
      <SidebarFormCard
        textStyles={{ display: 'flex', justifyContent: 'space-between' }}
        title='Define the operation'
      >
        Implement dynamic form fields here
      </SidebarFormCard>
      <FormSettings
        label={'Test your request'}
        name='enableTest'
        labelProps={{
          style: {
            fontSize: '1rem',
            letterSpacing: '0',
            lineHeight: '24px',
            color: 'rgb(51, 64, 94)',
            fontWeight: '700',
            flex: 1,
            cursor: 'default',
          },
          as: 'span',
        }}
        containerStyles={{
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0 0 0 1px #10161a26, 0 0 #10161a00, 0 0 #10161a00',
          borderRadius: '3px',
        }}
      >
        <Text fontSize='14px' fontWeight='700'>
          Manually set values for test variables
        </Text>
        <Text>
          If your request contains variables, you can manually set their values
          for testing purpose.
        </Text>
        <TriggerAutomationFieldArray name='parameters' />
        <SendRequest type='webhook' setDropdownOptions={setDropdownOptions} />
      </FormSettings>
      <FormSettings
        label={'Save Responses as Variables'}
        name='enableSave'
        labelProps={{
          style: {
            fontSize: '1rem',
            letterSpacing: '0',
            lineHeight: '24px',
            color: 'rgb(51, 64, 94)',
            fontWeight: '700',
            flex: 1,
            cursor: 'default',
          },
          as: 'span',
        }}
        containerStyles={{
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0 0 0 1px #10161a26, 0 0 #10161a00, 0 0 #10161a00',

          borderRadius: '3px',
        }}
      >
        <HubspotSaveResponseFieldArray
          name='saveResponse'
          dropdownOptions={dropdownOptions}
        />
      </FormSettings>
    </SidebarFormContainer>
  );
}

export default HubspotNodeContent;
