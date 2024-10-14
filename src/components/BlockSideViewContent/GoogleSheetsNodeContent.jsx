import React from 'react';
import {
  Button,
  Icon,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
} from '@chakra-ui/react';
import { SidebarFormCard, SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { FaGoogle } from 'react-icons/fa';
import { FormDropdown } from 'components/Shared/FormUi';
import { useFormikContext } from 'formik';
import { MdClose } from 'react-icons/md';

const options = [
  { label: 'gmailuser@gmail.com', value: '23' },
  { label: 'User1@gmail.com', value: '32' },
];
function GoogleSheetsNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    account: currentNode?.data?.account || '',
    spreadSheet: currentNode?.data?.spreadSheet || '',
    sheet: currentNode?.data?.sheet || '',
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
      <AccordionContent />
    </SidebarFormContainer>
  );
}

export default GoogleSheetsNodeContent;

function AccordionContent() {
  return (
    <Accordion
      allowToggle
      defaultIndex={0}
      style={{
        marginTop: '-10px',
      }}
      marginX='-19px'
    >
      <AccordionItem border='none'>
        <h2>
          <AccordionButton backgroundColor='rgba(0, 0, 0, 0.04)'>
            <Box flex='1' textAlign='left'>
              <Text>Create Account or File</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Flex direction='column' gap={8}>
            <SidebarFormCard
              title='Log into your account'
              containerProps={{ padding: 4 }}
              contentContainerProps={{ marginTop: 1 }}
            >
              <Box display='flex' flexDirection='column' gap={2}>
                <Text>Login with google to access your files.</Text>
                <Button
                  leftIcon={<Icon as={FaGoogle} />}
                  variant='outline'
                  width='full'
                  maxW='md'
                  borderColor='gray.300'
                  _hover={{ bg: 'gray.100', boxShadow: 'md' }}
                  _active={{ bg: 'gray.200' }}
                  backgroundColor={'#fff'}
                  size='lg'
                  height='40px'
                  justifyContent='flex-start'
                >
                  <Text
                    fontSize='14px'
                    fontFamily='Roboto, arial, sans-serif'
                    flex={1}
                  >
                    Login with Google
                  </Text>
                </Button>
                <FormDropdown
                  name='account'
                  options={options}
                  label=''
                  labelVariant='h3'
                  variant='custom'
                />
              </Box>
            </SidebarFormCard>
            <SidebarFormCard
              title='Select Spreadsheet'
              containerProps={{ padding: 4 }}
              contentContainerProps={{ marginTop: 1 }}
            >
              <SelectFileContent />
            </SidebarFormCard>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

function SelectFileContent() {
  const { values, setFieldValue } = useFormikContext();

  const setFile = () => {
    setFieldValue('spreadSheet', 'sample-spreadsheet.xlsx');
  };
  const clearValue = () => {
    setFieldValue('spreadSheet', '');
  };

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Text>Select a file to save or obtain data.</Text>
      <Flex gap={2} alignItems='center'>
        <Button
          variant='outline'
          width='full'
          maxW='md'
          borderColor='gray.300'
          _hover={{ bg: 'gray.100', boxShadow: 'md' }}
          _active={{ bg: 'gray.200' }}
          backgroundColor={'#fff'}
          size='lg'
          height='40px'
          onClick={setFile}
        >
          <Text fontSize='14px' fontFamily='Roboto, arial, sans-serif' flex={1}>
            {values?.spreadSheet || 'Select file'}
          </Text>
        </Button>
        {values?.spreadSheet && (
          <Icon
            as={MdClose}
            width='22px'
            onClick={clearValue}
            cursor='pointer'
          />
        )}
      </Flex>
      {values?.spreadSheet && (
        <FormDropdown
          name='sheet'
          options={options}
          label=''
          labelVariant='h3'
          variant='custom'
          disabled={true}
        />
      )}
    </Box>
  );
}
