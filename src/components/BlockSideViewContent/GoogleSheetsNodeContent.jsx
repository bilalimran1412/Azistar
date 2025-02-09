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
  Grid,
  GridItem,
  
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
  Box,
  Flex,
} from '@chakra-ui/react';
import { SidebarFormCard, SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { FiFile, FiSearch } from 'react-icons/fi'; 
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

const baseURL = process.env.REACT_APP_API_BASE_URL;

function GoogleSheetsNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const [selectedSheetId, setSelectedSheetId] = useState(null);
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  

  useEffect(() => {
    const savedState = localStorage.getItem("googleSheetsFormState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      updateNodeById(id, { params: { ...parsedState } });
    }
  }, [id, updateNodeById]);

  const handleClose = () => {
    setSideView(false);
  };

  if (!config) return <></>;
  
  const savedState = JSON.parse(localStorage.getItem("googleSheetsFormState") || "{}");
  const initialValues = {
    account: savedState.account || currentNode?.data?.params?.account || "",
    spreadSheet: savedState.spreadSheet || currentNode?.data?.params?.spreadSheet || "",
    sheet: savedState.sheet || currentNode?.data?.params?.sheet || "",
    action: savedState.action || "", // Persist selected action
    fieldValues: savedState.fieldValues || [
      {
        field: "",
        variable: "",
        id: "8dbfd657-7928-5c85-972e-e04aa2ab6e50",
      },
    ],
  };

  const validationSchema = yup.object({});

  const onSave = async (formValues) => {
  console.log("Form values=>>>", formValues);

  try {
    
    localStorage.setItem("googleSheetsFormState", JSON.stringify(formValues));

    updateNodeById(id, { params: { ...formValues } });
    handleClose();

    if (!formValues.spreadSheet || formValues.spreadSheet.trim() === "") {
      console.error("Error: Spreadsheet ID is missing.");
      return;
    }

    // Ensure fieldValues exists and is an array
    if (!Array.isArray(formValues.fieldValues) || formValues.fieldValues.length === 0) {
      console.error("Error: fieldValues is missing or empty.");
      return;
    }

    const requestPayload = {
      action: formValues.action,
      sheetId: formValues.spreadSheet,
      sheetName: formValues.sheet,
      selectedSheetId: selectedSheetId, // Ensure it's included
      data: formValues.fieldValues.map((fieldValue) => ({
        column: fieldValue.field,
        value: fieldValue.variable?.value || "", // Fix potential undefined error
        type: fieldValue.variable?.type || "",  // Fix potential undefined error
      })),
      reference: {
        column: formValues.field || "", // Ensure column is defined
        value: formValues.variable?.value || "", // Fix potential undefined error
      },
    };

    console.log("howa h ane");
    console.log(requestPayload, "requestPayload");

    const response = await axios.post(`${baseURL}/integrate/google/action`, requestPayload, {
      withCredentials: true,
    });

    console.log(`${formValues.action} success:`, response.data);
    setSideView(false); // Close form on success
  } catch (error) {
    console.error(`Error during ${formValues.action}:`, error);
  }
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
      <AccordionContent selectedSheetId={selectedSheetId} setSelectedSheetId={setSelectedSheetId} />
      <ActionFormFields selectedSheetId={selectedSheetId} />
    </SidebarFormContainer>
  );
}

export default GoogleSheetsNodeContent;

function AccordionContent({ selectedSheetId, setSelectedSheetId }) {
  const [accordionIndex, setAccordionIndex] = React.useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [email, setEmail] = useState('');
  const [spreadSheets, setSpreadSheets] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [columns, setColumns] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [values, setValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Handle Google login redirect
  const handleGoogleLogin = () => {
    window.location.href = `${baseURL}/integrate/google/login`
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (code) {
      handleLoginCode(code);
    }
  }, []);

  
  useEffect(() => {
    if (selectedSheetId) {
      fetchSheetPages(selectedSheetId);
    }
  }, [selectedSheetId]);

  const fetchSheetPages = async (sheetId) => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${baseURL}/integrate/google/sheets_page/${sheetId}`, {
        withCredentials: true,
      });
      if (Array.isArray(response.data.sheetNames)) {
        setSheetNames(response.data.sheetNames); // Set sheetNames state to the array inside sheetNames
      } else {
        console.error('Sheet names data is not an array:', response.data.sheetNames);
      }
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching sheet columns:', error);
      setIsFetching(false);
    }
  };

 


  
  useEffect(() => {
    // Get the token from cookies
      handleLoginCode();
  }, []);

  const handleLoginCode = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${baseURL}/integrate/google/fetchdata`, {
        withCredentials: true,  
      });
      console.log('User Data:', response.data);

      setIsFetching(false);

      if (response.data.email && response.data.sheets) {
        setEmail(response.data.email);
        setSpreadSheets(response.data.sheets);
      } else {
        console.error('Error: Email or Sheets data not available.');
      }
    } catch (error) {
      setIsFetching(false);
      console.error('Error during data fetch:', error);
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
                  onClick={handleGoogleLogin}
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
                  options={[{ label: email, value: email }, ...options]} label=''
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
              <SelectFileContent 
                onSelect={handleCloseAccordion}
                accessToken={accessToken}
                setSpreadSheets={setSpreadSheets}
                spreadSheets={spreadSheets}
                // values={values}
                sheetNames={sheetNames}
                // setFieldValue={(name, value) => setValues(prev => ({ ...prev, [name]: value }))}
                isFetching={isFetching}
                selectedSheetId={selectedSheetId}
                setSelectedSheetId={setSelectedSheetId}
              />
            </SidebarFormCard>
            
          </Flex>
        </AccordionPanel>
        
      </AccordionItem>
    </Accordion>
  );
}

function SelectFileContent({ 
  onSelect, 
  sheetNames, 
  spreadSheets, 
  selectedSheetId,
  setSelectedSheetId 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSheet, setSelectedSheet] = useState(null);
  const { values, setFieldValue } = useFormikContext();

  // Filter spreadsheets based on search query
  const filteredSheets = spreadSheets.filter((sheet) =>
    sheet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const setFile = () => {
  //   setFieldValue('spreadSheet', 'sample-spreadsheet.xlsx');
  // };
  const clearValue = () => {
    setFieldValue('spreadSheet', '');
    setFieldValue('sheet', '');
  };
  const handleSheetChange = (value) => {
    if (value) {
      setFieldValue('spreadSheet', value);
      onSelect();
    }
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSheet(null); // Clear selection when closing modal
  };

  const confirmSelection = () => {
    if (selectedSheet) {
      setSelectedSheetId(selectedSheet.id);
      setFieldValue('spreadSheet', selectedSheet.id);
      closeModal();
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
          // onClick={setFile}
          onClick={openModal}

        >
          <Text fontSize='14px' fontFamily='Roboto, arial, sans-serif' flex={1}>
            {spreadSheets.find((sheet) => sheet.id === values.spreadSheet)?.name || 'Select file'}
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
          options={Array.isArray(sheetNames) ? sheetNames.map(sheetName => ({ label: sheetName, value: sheetName })) : []}
          label=''
          labelVariant='h3'
          onChange={handleSheetChange}
          variant='custom'
        />
      )}

        <ActionFormFields selectedSheetId={selectedSheetId} sheetNames={Array.isArray(sheetNames) ? sheetNames.map(sheetName => ({ label: sheetName, value: sheetName })) : []}/>

    

<Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent maxWidth="90%" width="90%">
          <ModalHeader>Select a Spreadsheet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Spreadsheets</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {/* Search Bar */}
                  <Flex mb={4}>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FiSearch color="gray.500" />
                      </InputLeftElement>
                      <Input
                        placeholder="Search spreadsheets"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </InputGroup>
                  </Flex>

                  {/* Grid Display */}
                  {filteredSheets.length > 0 ? (
                    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                      {filteredSheets.map((sheet) => (
                        <GridItem
                          key={sheet.id}
                          cursor="pointer"
                          _hover={{ bg: 'gray.100', boxShadow: 'md' }}
                          onClick={() => setSelectedSheet(sheet)}
                          p={4}
                          border="2px solid"
                          borderColor={selectedSheet?.id === sheet.id ? 'blue.500' : 'gray.300'}
                          borderRadius="8px"
                          textAlign="center"
                          bg={selectedSheet?.id === sheet.id ? 'blue.50' : 'white'}
                        >
                          {/* Display Sheet Preview or Placeholder */}
                          {sheet.imageUrl ? (
                            <Image src={sheet.imageUrl} alt={sheet.name} boxSize="100px" mx="auto" />
                          ) : (
                            <Icon as={FiFile} boxSize={12} color="gray.500" />
                          )}
                          <Text fontSize="14px" mt={2} isTruncated>
                            {sheet.name}
                          </Text>
                        </GridItem>
                      ))}
                    </Grid>
                  ) : (
                    <Text>No spreadsheets available.</Text>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex width="100%" justifyContent="space-between">
              <Button variant="outline" onClick={clearValue}>
                Clear Selection
              </Button>
              <Flex gap={2}>
                <Button variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={confirmSelection}
                  isDisabled={!selectedSheet} // Disable if no sheet is selected
                >
                  Select
                </Button>
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}




function ActionFormFields({ selectedSheetId }) {
  const { values, setFieldValue } = useFormikContext();
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    const fetchColumns = async () => {
      if (!selectedSheetId || !values.sheet) {
        return;
      }

      try {
        const response = await axios.get(
          `${baseURL}/integrate/google/sheets_columns/${selectedSheetId}/${values.sheet}`,
          { withCredentials: true }
        );
        
        if (response.data.columnNames && Array.isArray(response.data.columnNames)) {
          setColumns(response.data.columnNames);
        }
      } catch (error) {
        console.error('Error fetching sheet columns:', error);
      }
    };

    fetchColumns();
  }, [selectedSheetId, values.sheet]);

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
      <ConditionalActionForm columns={columns} />
    </>
  );
}
function ConditionalActionForm({ columns }) {
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
                  options={columns.map(col => ({ value: col, label: col }))} // Map to options
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
        <RowFieldArray  dropdownOptions={columns} />
      </SidebarFormCard>
    </>
  );
}