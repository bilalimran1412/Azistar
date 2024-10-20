import React from 'react';
import {
  SendRequest,
  SidebarFormCard,
  SidebarFormContainer,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import {
  FormDropdown,
  FormTextField,
  TriggerAutomationFieldArray,
} from 'components/Shared/FormUi';
import VariableInputField from 'components/Shared/SidebarUi/VariableInputField';
const httpMethods = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'HEAD', label: 'HEAD' },
  { value: 'OPTIONS', label: 'OPTIONS' },
  { value: 'CONNECT', label: 'CONNECT' },
  { value: 'TRACE', label: 'TRACE' },
];

function WebhookNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);
  //TODO MOVE TO CONFIG
  const initialValues = {
    url: currentNode?.data?.url || '',
    parameters: currentNode?.data?.parameters || [{ testValue: '' }],
    method: currentNode?.data?.method || 'POST',
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
        title='URL & Method'
        contentContainerProps={{
          style: { display: 'flex' },
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Flex>
          <FormDropdown
            name='method'
            label='Method'
            options={httpMethods}
            variant='custom'
            labelVariant='h3'
            containerStyle={{ width: '40%' }}
          />
          <FormTextField
            name='url'
            label='URL'
            variant='custom'
            labelVariant='h3'
            placeholder='https://'
          />
        </Flex>

        {/* <PostInputField /> */}
        <InputPreview />
      </SidebarFormCard>
      <SidebarFormCard
        title='Set data (variables) to be sent'
        contentContainerProps={{
          style: { display: 'flex' },
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Text fontSize='14px' fontWeight='700'>
          Manually set test values for variables
        </Text>
        <Text fontSize='12px'>
          Use the inputs below to set up the variables data that you want to
          send. The "Test value" will be used only in the test to help you set
          up your webhook trigger
        </Text>
        <TriggerAutomationFieldArray name='parameters' />
        <SendRequest />
      </SidebarFormCard>
    </SidebarFormContainer>
  );
}

export default WebhookNodeContent;

// const PostInputField = () => {
//   const { setFieldValue, values } = useFormikContext();
//   return (
//     <InputGroup>
//       <InputLeftElement
//         children={
//           <Box
//             bg='rgb(99, 108, 225)'
//             color='white'
//             padding='0 10px'
//             display='flex'
//             alignItems='center'
//             height='25px'
//           >
//             <Text>POST</Text>
//           </Box>
//         }
//         style={{
//           left: '16px',
//           top: '1px',
//         }}
//       />
//       <Input
//         placeholder='https://'
//         variant='custom'
//         value={values?.url || ''}
//         paddingLeft='80px'
//         width='full'
//         onChange={(event) => {
//           const value = event.target.value;
//           setFieldValue('url', value);
//         }}
//       />
//     </InputGroup>
//   );
// };

const InputPreview = () => {
  const { values, setFieldValue } = useFormikContext();
  const onVariableSelect = (option) => {
    setFieldValue('url', `${values?.url}${option.value}`);
  };
  return (
    <Flex direction='column' gap={2}>
      {values?.url && (
        <Box bg='#646de117' p={4} borderRadius='3px' width='100%'>
          <Text fontSize='9px' opacity={0.7}>
            PREVIEW URL
          </Text>

          <Text fontSize='12px' opacity={0.7} mt={2}>
            {values?.url}
          </Text>
        </Box>
      )}
      <VariableInputField popupType='button' onSelect={onVariableSelect} />
    </Flex>
  );
};
