import React from 'react';
import {
  HubspotSendRequest,
  SidebarFormCard,
  SidebarFormContainer,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from 'utils/yup';
import {
  DynamicActionFields,
  FormDropdown,
  FormSettings,
  HubspotSaveResponseFieldArray,
  TriggerAutomationFieldArray,
} from 'components/Shared/FormUi';
import { Button, Text } from '@chakra-ui/react';
import { truncateString } from 'utils/string';
import { filterUniqueByKey } from 'utils/objectHelpers';
import { useFormikContext } from 'formik';
import { hubspotEvents } from 'components/Shared/SidebarUi/Hubspot/data';

const account = [{ label: 'account 1', value: '1' }];

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
    auth: currentNode?.data?.auth || '',
    event: currentNode?.data?.event || '',

    associations: currentNode?.data?.associations,
    companyName: currentNode?.data?.companyName || '',
    firstName: currentNode?.data?.firstName || '',
    lastName: currentNode?.data?.lastName || '',
    email: currentNode?.data?.email || '',
    deal: currentNode?.data?.deal || '',
    ticket: currentNode?.data?.ticket || '',
    pipeline: currentNode?.data?.pipeline || '',
    stage: currentNode?.data?.stage || '',
    extra: currentNode?.data?.extra || '',
    enableTest: currentNode?.data?.enableTest || '',
    enableSave: currentNode?.data?.enableSave || '',
    parameters: currentNode?.data?.parameters || [{ testValue: '' }],
    saveResponse: currentNode?.data?.saveResponse || [
      { response: '', id: 'f0245680-a1b7-5495-bcb8-2d0fca03959a' },
    ],
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
      onReset={() => {}}
    >
      <AccountSelectionCard />
      <DynamicForm
        dropdownOptions={dropdownOptions}
        setDropdownOptions={setDropdownOptions}
      />
    </SidebarFormContainer>
  );
}

export default HubspotNodeContent;

function AccountSelectionCard() {
  return (
    <SidebarFormCard
      textStyles={{ display: 'flex', justifyContent: 'space-between' }}
      title='Connect your HubSpot account'
    >
      <FormDropdown
        name='auth'
        label='Account'
        options={account}
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
  );
}

function DynamicForm({ dropdownOptions, setDropdownOptions }) {
  const { values } = useFormikContext();
  if (!values?.auth) {
    return <></>;
  }
  return (
    <>
      <SidebarFormCard
        textStyles={{ display: 'flex', justifyContent: 'space-between' }}
        title='Choose an event'
      >
        <FormDropdown
          name='event'
          label=''
          options={hubspotEvents}
          variant='custom'
          labelVariant='h3'
        />
      </SidebarFormCard>
      {values?.event && (
        <>
          <SidebarFormCard
            textStyles={{ display: 'flex', justifyContent: 'space-between' }}
            title='Define the operation'
            contentContainerProps={{
              sx: {
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              },
            }}
          >
            <DynamicActionFields />
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
              If your request contains variables, you can manually set their
              values for testing purpose.
            </Text>
            <TriggerAutomationFieldArray name='parameters' />
            <HubspotSendRequest
              type='webhook'
              setDropdownOptions={setDropdownOptions}
            />
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
        </>
      )}
    </>
  );
}
