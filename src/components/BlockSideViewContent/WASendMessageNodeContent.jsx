import React from 'react';
import {
  Button,
  Text,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react';
import { FormDropdown } from '../Shared/FormUi';
import {
  SidebarFormCard,
  SidebarFormContainer,
  UpgradeWhatsappBusiness,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { CustomModal, UiIconButton } from 'components/Shared/UiComponents';
import { useFormikContext } from 'formik';
import { CloseIcon } from '@chakra-ui/icons';

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
    channelId: currentNode?.data?.params?.channelId,
    templateId: currentNode?.data?.params?.templateId,
    templateName: currentNode?.data?.params?.templateName,
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
      <MessageTemplateCard />
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
        name='channelId'
        variant='custom'
        placeholder='Select phone number'
      />
    </SidebarFormCard>
  );
}

function MessageTemplateCard() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [selectedRow, setSelectedRow] = React.useState();
  const { values, setFieldValue } = useFormikContext();

  const handleSelect = (templateName, templateId) => {
    setSelectedRow({ templateId, templateName });
  };
  const onCloseClick = () => {
    setSelectedRow(null);
    onClose();
  };
  const onSave = () => {
    if (!selectedRow) return;
    setFieldValue('templateName', selectedRow?.templateName);
    setFieldValue('templateId', selectedRow?.templateId);
    onCloseClick();
  };
  const handleClear = () => {
    setFieldValue('templateName', '');
    setFieldValue('templateId', '');
  };

  return (
    <>
      <SidebarFormCard
        title='2. Message Template'
        contentContainerProps={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Text>Select the Message Template you want to send</Text>
        {values?.templateName ? (
          <Box display='flex' alignItems='center' gap={5}>
            <Box
              border='2px solid #D7106B'
              padding='8px'
              borderRadius='3px'
              textAlign='center'
              width='80%'
            >
              {values?.templateName}
            </Box>
            <UiIconButton
              icon={<CloseIcon />}
              onClick={handleClear}
              style={{ background: 'gray', borderRadius: '4px' }}
            ></UiIconButton>
          </Box>
        ) : (
          <Button height='32px' onClick={onOpen}>
            Select message template
          </Button>
        )}
      </SidebarFormCard>
      {isOpen && (
        <CustomModal
          isOpen={isOpen}
          onClose={onCloseClick}
          onSave={onSave}
          title='Select template'
          isCentered={true}
          size='xl'
        >
          <TemplateTable
            onRowClick={handleSelect}
            selectedRowId={selectedRow?.templateId}
          />
        </CustomModal>
      )}
    </>
  );
}

const data = [
  {
    name: 'hello_world',
    content: 'Hello World',
    language: 'English',
    category: 'Marketing',
    status: 'Active',
    templateId: 19889,
  },
  {
    name: 'meeting_reminder',
    content:
      'Hi {{1}} 👋, we have a meeting on {{2}}, could you confirm your attendance with us? 🙏? 1. Yes, I will be there! 2. No, I’d like to re-schedule.',
    language: 'English',
    category: 'Utility',
    status: 'Active',
    templateId: 35039,
  },
  {
    name: 'template_whatsapi',
    content: 'Hello, this is an example of a Template Message',
    language: 'English',
    category: 'Marketing',
    status: 'Active',
    templateId: 91232,
  },
];

const TemplateTable = ({ onRowClick, selectedRowId }) => {
  return (
    <Box>
      <TableContainer>
        <Table size='md'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Language</Th>
              <Th>Category</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr
                key={index}
                cursor='pointer'
                onClick={() => {
                  onRowClick(item.name, item.templateId);
                }}
                bgColor={
                  selectedRowId === item.templateId ? 'lightblue' : '#fff'
                }
                _hover={{ bgColor: 'lightblue' }}
              >
                <Td>{item.name}</Td>
                <Td>{item.language}</Td>
                <Td>{item.category}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
