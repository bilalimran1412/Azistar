import React from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { FormTextField } from 'components/Shared/FormUi';
import { useFormikContext } from 'formik';
import { PlusIcon } from 'components/Shared/SVG';
import { SearchIcon } from '@chakra-ui/icons';
import { MdClear } from 'react-icons/md';

const apps = [
  {
    title:
      'Add rows to Google Sheets spreadsheets from new visitors reaching the Zapier Integration block in Azistar',
    app: 'Google Sheets',
  },
  {
    title: 'Send emails through Gmail for new entries on Azistar',
    app: 'Gmail',
  },
  {
    title: 'Generate ChatGPT responses from new Azistar conversations',
    app: 'ChatGPT',
  },
  {
    title: 'POST to webhooks when Zapier blocks are activated in Azistar',
    app: 'Webhooks by Zapier',
  },
  {
    title:
      'Create ActiveCampaign contacts for Azistar blocks activated for Zapier',
    app: 'ActiveCampaign',
  },
  {
    title: 'Send emails when Zapier blocks are activated in Azistar',
    app: 'Email by Zapier',
  },
  {
    title:
      'Add or update HubSpot contacts from new Zapier block activations on Azistar',
    app: 'HubSpot',
  },
  {
    title: 'Create Airtable records from new Azistar responses',
    app: 'Airtable',
  },
  {
    title:
      'Create detailed events in Google Calendar when new Azistar blocks are activated',
    app: 'Google Calendar',
  },
  {
    title: 'Add new Azistar block activations as Klaviyo subscribers',
    app: 'Klaviyo',
  },
];
function ZapierNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;

  const initialValues = {
    token: '5HOjrgUyegoicdI6VlbFEb1wglw2A6MFalHHBy',
    bot: 'Test Bot name',
    block: id || '',
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
      <Flex alignItems='center' gap={2}>
        <FormTextField
          name='token'
          labelVariant='h3'
          variant='custom'
          readonly={true}
          label='Your Azistar Token'
        />
        <CopyContent />
      </Flex>
      <Flex gap={3}>
        <FormTextField
          name='bot'
          labelVariant='h3'
          variant='custom'
          readonly={true}
          label='Bot Name / ID'
        />
        <Flex>
          <FormTextField
            name='block'
            labelVariant='h3'
            variant='custom'
            readonly={true}
            label='Block ID'
          />
        </Flex>
      </Flex>
      <Divider />
      <ZapAzistarApps />
    </SidebarFormContainer>
  );
}

export default ZapierNodeContent;

function CopyContent() {
  const { values } = useFormikContext();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(values?.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Button
      marginTop={5}
      minH={0}
      minW={0}
      h='28px'
      paddingX={4}
      borderRadius={0}
      backgroundColor='rgb(215, 55, 107)'
      _hover={{
        backgroundColor: 'rgb(215, 55, 107)',
      }}
      onClick={handleCopy}
    >
      <Text fontSize='12px' textTransform='uppercase' color='white'>
        {copied ? 'Copied!' : 'Copy'}
      </Text>
    </Button>
  );
}

function ZapAzistarApps() {
  const [selectedApp, setSelectedApp] = React.useState('');

  const handleAppSelect = (app) => {
    setSelectedApp(app);
  };
  return (
    <>
      <Box>
        <FormLabel variant='h1'>Connect this app...</FormLabel>
        <Box
          bgColor='#fff'
          border='1px solid #000'
          borderRadius='3px'
          padding='5px'
          display='flex'
          gap={8}
          alignItems='center'
        >
          <AzistarLogo logo='A' />
          <Box>Azistar</Box>
        </Box>
        <Box textAlign='center'>
          <PlusIcon />
        </Box>
        <ZapierAppSearch
          handleAppSelect={handleAppSelect}
          selectedApp={selectedApp}
        />
        <Box mt={3}>
          <Text fontSize='24px' fontWeight='700'>
            Popular workflows
          </Text>
          <Box mt={3} display='flex' flexDirection='column' gap={5}>
            {apps.map((app) => (
              <Box
                bgColor='#fff'
                padding='12px 10px'
                borderRadius='3px'
                border='1px solid #BF3F75'
                as='a'
                href='https://www.example.com'
                display='flex'
                flexDirection='column'
                gap={3}
                boxShadow='md'
              >
                <Box display='flex' gap={1}>
                  <AzistarLogo logo='A' />
                  <AzistarLogo logo={app.app[0]} />
                </Box>
                <Text fontSize='16px' fontWeight='600'>
                  {app.title}
                </Text>
                <Box>
                  <Text>Azistar + {app.app}</Text>
                  <Button
                    mt={2}
                    width='100%'
                    textColor='#fff'
                    bgColor='#D7376B'
                    outline='1px solid black'
                    borderRadius='3px'
                    _hover={{
                      bgColor: '#D7376B',
                    }}
                  >
                    Use this workflow
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
          <Box textAlign='center' mt={8}>
            <Text fontSize='16px'>Not seeing what you're looking for?</Text>
            <Text fontSize='16px'>
              <Link href='#' textColor='#BF3F75'>
                Create from scratch
              </Link>{' '}
              or{' '}
              <Link href='#' textColor='#BF3F75'>
                learn more
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function ZapierAppSearch({ handleAppSelect, selectedApp }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredApps = apps
    .filter((app) => app.app.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((app) => app.app);

  return (
    <Box position='relative'>
      <FormLabel variant='h1'>with this one!</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none' height='100%'>
          {selectedApp ? <AzistarLogo logo={selectedApp[0]} /> : <SearchIcon />}
        </InputLeftElement>
        <Input
          placeholder='Search for thousands of apps'
          variant='custom'
          paddingLeft={selectedApp ? '45px' : '35px'}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleAppSelect('');
          }}
        />
        {selectedApp && (
          <InputRightElement
            onClick={() => {
              handleAppSelect('');
              setSearchQuery('');
            }}
            cursor='pointer'
          >
            <MdClear />
          </InputRightElement>
        )}
      </InputGroup>

      {searchQuery && !selectedApp && (
        <Box
          backgroundColor='white'
          position='absolute'
          top='100%'
          left={0}
          right={0}
          maxHeight='300px'
          overflowY='auto'
          borderRadius='8px'
          boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
          zIndex={100}
          padding='8px 0'
          mt='2px'
          border='1px solid #ccc'
        >
          <List spacing={2} style={{ margin: 0 }}>
            {filteredApps.length > 0 ? (
              filteredApps.map((app, index) => (
                <ListItem
                  key={index}
                  padding='8px 16px'
                  _hover={{
                    backgroundColor: 'gray.100',
                    cursor: 'pointer',
                  }}
                  display='flex'
                  gap={3}
                  alignItems='center'
                  borderRadius='4px'
                  onClick={() => {
                    setSearchQuery(app);
                    handleAppSelect(app);
                  }}
                >
                  <AzistarLogo logo={app[0]} />
                  {app}
                </ListItem>
              ))
            ) : (
              <ListItem padding='8px 16px'>No results found</ListItem>
            )}
          </List>
        </Box>
      )}
    </Box>
  );
}

function AzistarLogo({ logo }) {
  return (
    <Box
      padding='8px'
      bgColor='lightgray'
      marginLeft='5px'
      borderRadius='3px'
      width='32px'
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='32px'
    >
      <Text>{logo}</Text>
    </Box>
  );
}
