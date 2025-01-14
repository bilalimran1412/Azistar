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
import {
  FormDropdown,
  FormVariableSelectorDropdown,
  RowFieldArray,
} from 'components/Shared/FormUi';
import { useFormikContext } from 'formik';
import { MdClose } from 'react-icons/md';

const options = [
  { label: 'gmailuser@gmail.com', value: '23' },
  { label: 'User1@gmail.com', value: '32' },
];
const sheetsOpt = [
  { label: 'sheet 1', value: 'sheet1' },
  { label: 'sheet 2', value: 'sheet2' },
];
const actionOpt = [
  {
    label: 'Insert a new row',
    value: 'insert',
  },
  {
    label: 'Update a row',
    value: 'update',
  },
  {
    label: 'Get data from file',
    value: 'get',
  },
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
    account: currentNode?.data?.params?.account || '',
    spreadSheet: currentNode?.data?.params?.spreadSheet || '',
    sheet: currentNode?.data?.params?.sheet || '',
    fieldValues: [
      {
        field: '',
        variable: '',
        id: '8dbfd657-7928-5c85-972e-e04aa2ab6e50',
      },
    ],
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
      <AccordionContent />
      <ActionFormFields />
    </SidebarFormContainer>
  );
}

export default GoogleSheetsNodeContent;

function AccordionContent() {
  const [accordionIndex, setAccordionIndex] = React.useState(0);

  const handleCloseAccordion = () => {
    setAccordionIndex(-1);
  };
  const handleToggle = () => {
    if (accordionIndex === -1) {
      setAccordionIndex(0);
    } else {
      setAccordionIndex(-1);
    }
  };
  return (
    <Accordion
      allowToggle
      index={accordionIndex}
      style={{
        marginTop: '-10px',
      }}
      marginX='-19px'
    >
      <AccordionItem border='none'>
        <h2>
          <AccordionButton
            backgroundColor='rgba(0, 0, 0, 0.04)'
            onClick={handleToggle}
          >
            <Box flex='1' textAlign='left'>
              <Text>Account and File</Text>
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
              <SelectFileContent onSelect={handleCloseAccordion} />
            </SidebarFormCard>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

function SelectFileContent({ onSelect }) {
  const { values, setFieldValue } = useFormikContext();

  const setFile = () => {
    setFieldValue('spreadSheet', 'sample-spreadsheet.xlsx');
  };
  const clearValue = () => {
    setFieldValue('spreadSheet', '');
  };
  const handleSheetChange = (value) => {
    if (value) {
      onSelect();
    }
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
          options={sheetsOpt}
          label=''
          labelVariant='h3'
          onChange={handleSheetChange}
          variant='custom'
        />
      )}
    </Box>
  );
}
function ActionFormFields() {
  const { values } = useFormikContext();
  if (!values.sheet) {
    return <></>;
  }
  return (
    <>
      <SidebarFormCard
        title='Action to perform'
        containerProps={{ padding: 4 }}
        contentContainerProps={{ marginTop: 1 }}
      >
        <FormDropdown
          name='action'
          options={actionOpt}
          label=''
          labelVariant='h3'
          variant='custom'
        />
      </SidebarFormCard>
      <ConditionalActionForm />
    </>
  );
}
function ConditionalActionForm() {
  const { values } = useFormikContext();
  if (!values?.action) {
    return <></>;
  }
  return (
    <>
      {values?.action !== 'insert' && (
        <SidebarFormCard
          title='Set a reference column'
          containerProps={{ padding: 4 }}
          contentContainerProps={{ marginTop: 1 }}
        >
          <Text mb={2}>
            Select a reference column and its related field to identify which
            row to update.
          </Text>
          <Box bg='#8a9ba826' borderRadius='3px' p='10px 12px 9px'>
            <Flex direction='column' width='100%' alignItems='flex-end'>
              <Box width='100%'>
                <FormDropdown
                  label=''
                  placeholder='Select the field'
                  name={`field`}
                  options={[]}
                  variant='custom'
                />
                <FormVariableSelectorDropdown
                  name={`variable`}
                  placeholder='Select a variable'
                  label=''
                />
              </Box>
            </Flex>
          </Box>
        </SidebarFormCard>
      )}
      <SidebarFormCard
        title='New row'
        containerProps={{ padding: 4 }}
        contentContainerProps={{ marginTop: 1 }}
      >
        <Text mb={2}>
          Specify which fields should be sent to the file and assign them to
          specific columns.
        </Text>
        <RowFieldArray />
      </SidebarFormCard>
    </>
  );
}
