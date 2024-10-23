import React from 'react';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import {
  FieldValuesFieldArray,
  FormCheckboxGroup,
  FormDropdown,
  FormVariableSelectorDropdown,
} from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from 'utils/yup';

const options = [
  { label: 'Test option1', value: 'option1' },
  {
    label: 'Option2',
    value: 'options2',
  },
];
const interests = [
  {
    label: 'option 1',
    value: '1008502409',
  },
  {
    label: 'option 2',
    value: '2e1305b4d6',
  },
  {
    label: 'option 3',
    value: 'cac16bcfaa',
  },
];
const dropdownOptions = [
  {
    label: 'Address',
    value: 'ADDRESS',
  },
  {
    label: 'Birthday',
    value: 'BIRTHDAY',
  },
  {
    label: 'Company',
    value: 'COMPANY',
  },
  {
    label: 'First Name',
    value: 'FNAME',
  },
  {
    label: 'Last Name',
    value: 'LNAME',
  },
  {
    label: 'Phone Number',
    value: 'PHONE',
  },
];
function MailchimpNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    auths: currentNode?.data?.auths || '',
    lists: currentNode?.data?.lists || '',
    category: currentNode?.data?.category || '',
    interests: currentNode?.data?.interests || '',
    email: currentNode?.data?.email || '',
    fieldValues: currentNode?.data?.fieldValues || [
      { field: '', id: 'ac2e1be9-fdb7-5e62-abe3-b20b4d2b2bb2' },
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
      onReset={handleClose}
    >
      <Flex gap={2} alignItems='center'>
        <Text>MAILCHIMP ACCOUNT</Text>
        <Button
          minH={0}
          minW={0}
          h='26px'
          paddingX={5}
          borderRadius={0}
          backgroundColor='rgb(215, 55, 107)'
          _hover={{
            backgroundColor: 'rgb(215, 55, 107)',
          }}
        >
          <Text fontSize='12px' textTransform='uppercase' color='white'>
            Add account
          </Text>
        </Button>
      </Flex>
      <FormDropdown
        name='auths'
        variant='custom'
        options={options}
        placeholder='Select/Connect account'
      />
      <FormDropdown
        name='lists'
        variant='custom'
        options={options}
        placeholder='Select the audience'
      />
      <FormDropdown
        name='category'
        variant='custom'
        options={options}
        placeholder='Select the category'
      />
      <FormCheckboxGroup
        label=''
        name='interests'
        options={interests}
        labelVariant='h3'
      />
      <Divider />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='email'
        label='Subscriber email'
      />
      <FieldValuesFieldArray
        name='fieldValues'
        dropdownOptions={dropdownOptions}
      />
    </SidebarFormContainer>
  );
}

export default MailchimpNodeContent;
