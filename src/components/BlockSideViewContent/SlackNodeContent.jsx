import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, FormLabel, Text } from '@chakra-ui/react';
import { DraftEditorField, FormDropdown } from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import axios from 'axios';
import { FaSlack } from 'react-icons/fa';

const baseURL = process.env.REACT_APP_API_BASE_URL;

function SlackNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];

  const handleClose = () => {
    setSideView(false);
  };

  // Initialize options as an empty array or a default value
  const [options, setOptions] = useState([]);

  const [userInfo, setUserInfo] = useState(null);

  const initialValues = {
    text: currentNode?.data?.params?.text || '',
    slack: currentNode?.data?.params?.slack || '',
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,
  };

  const validationSchema = yup.object({});

  const onSave = async (formValues) => {
    const message = formValues.text.text;
    console.log(message)
    updateNodeById(id, {
      params: {
        ...formValues,
      },
    });

    // Send the Slack message
    try {
      // Send the message to the backend (which will send it to Slack)
      const response = await axios.post(`${baseURL}/integrate/slack/sendmessage`, { message }, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      console.log('Message sent to Slack:', response.data);

    } catch (error) {
      console.error('Error sending message to Slack:', error.message);
    }

    handleClose();
  };

  // Slack login and get user info
  const handleSlackLogin = async () => {
    window.location.href = `${baseURL}/integrate/slack/login`;
  };

  // Fetch Slack user info after login
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${baseURL}/integrate/slack/getdetails`, {
          withCredentials: true,
        });

        console.log('User Data:', response.data);
        const user = response.data; // Adjust based on backend response structure

        if (user) {
          setUserInfo(user);
          setOptions((prevOptions) => {
            const newOption = { label: `${user.real_name}`, value: user.id };

            // Check if the option already exists
            const optionExists = prevOptions.some(
              (option) => option.value === newOption.value
            );

            if (!optionExists) {
              return [...prevOptions, newOption];
            }

            return prevOptions;
          });

        }
      } catch (error) {
        console.error('Error fetching Slack user info:', error);
      }
    };

    fetchUserInfo();
  }, [baseURL]);

  if (!config) return null;

  // Ensure that options is always an array before passing to FormDropdown
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <SidebarFormContainer
      block={config}
      onClose={handleClose}
      onFormSave={onSave}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onReset={handleClose}
    >
      <Box>
        <FormLabel fontSize="13px" fontWeight="500">
          Connect your Slack account
        </FormLabel>
        <Button
          leftIcon={<FaSlack />}
          backgroundColor="white"
          color="black"
          border="1px solid #d3d3d3"
          onClick={handleSlackLogin}
          _hover={{
            backgroundColor: '#fff',
          }}
        >
          <Text fontWeight="500">Add to &nbsp;</Text>
          <Text> Slack</Text>
        </Button>
      </Box>
      <Divider />
      <FormDropdown
        name="slack"
        options={safeOptions}
        label=""
        labelVariant="h3"
        variant="custom"
      />
      <DraftEditorField
        placeholder="Example New lead on board @name"
        name="text"
        label="Slack Message"
        labelVariant="h3"
        setNodeContent={true}
      />
    </SidebarFormContainer>
  );
}

export default SlackNodeContent;
