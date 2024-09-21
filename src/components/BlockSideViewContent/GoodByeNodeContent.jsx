import React from 'react';
import { FormTextField, QuillEditorField } from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { Divider, Flex, Image, Text } from '@chakra-ui/react';
import FormSettings from '../Shared/SidebarUi/FormSettings';

function GoodByeNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    fields: config.fields,
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.message,
    //this message will contain all the ops and html and normal text
    redirectMessage: currentNode?.data?.redirectMessage,

    socialEnable: currentNode?.data?.socialEnable,
    socialUrl: currentNode?.data?.socialUrl,
    socialUrlText: currentNode?.data?.socialUrlText,
    startButtonEnable: currentNode?.data?.startButtonEnable,
    startButtonText: currentNode?.data?.startButtonText,
    redirectUrl: currentNode?.data?.redirectUrl,
    redirectEnable: currentNode?.data?.redirectEnable,
    redirectTimeout: currentNode?.data?.redirectTimeout,
  };

  const validationSchema = yup.object({
    message: yup.string().required('Good bye message is required'),
  });

  const onSave = (formValues) => {
    console.log('Good bye node Form values=>>>', formValues);
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
      <QuillEditorField
        name='message'
        placeholder={config.fields[0].placeholder}
        label={config.fields[0].label}
      />
      <Divider />
      <FormSettings
        name='socialEnable'
        label='Social share icons'
        infoText='Add buttons to this message to let your users share this chatbot in the popular social networks'
        bgColor='inherit'
      >
        <FormTextField
          placeholder='https://'
          name='socialUrl'
          label='Url social share'
          className='input'
        />
        <FormTextField
          placeholder=''
          name='socialUrlText'
          label='Share description'
          className='input'
        />
        <Flex marginLeft={1} direction='column' gap={2}>
          <Text>Example:</Text>
          <Image src='/assets/goodbye-share.png' />
        </Flex>
      </FormSettings>
      <Divider />
      <FormSettings
        name='startButtonEnable'
        label='Start again button'
        infoText='This will provide buttons to start again the conversation (going back to the first flow message)'
        bgColor='inherit'
      >
        <FormTextField
          placeholder='Click to edit'
          name='startButtonText'
          label=''
          className='input'
        />
      </FormSettings>
      <Divider />
      <FormSettings
        name='redirectEnable'
        label='Redirect to url'
        bgColor='inherit'
      >
        <FormTextField
          placeholder='https://'
          name='redirectUrl'
          label='Url to redirect'
          className='input'
        />
        <QuillEditorField
          label='Type here your redirect message (use {timeout} as dynamic countdown)'
          placeholder='Redirecting you in {timeout}...'
          name='redirectMessage'
        />
        <FormTextField
          placeholder='Enter time'
          name='redirectTimeout'
          label='Redirection time (in seconds)'
          className='input'
        />
      </FormSettings>
      <Divider />
    </SidebarFormContainer>
  );
}

export { GoodByeNodeContent };
