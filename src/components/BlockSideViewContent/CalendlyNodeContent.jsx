import React, { useState, useEffect } from 'react';
import { SidebarFormCard, SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import axios from 'axios';
import {
  DraftEditorField,
  FormCheckbox,
  FormDropdown,
  FormSettings,
  FormTextField,
  SortableInviteQuestionsFieldArray,
} from '../Shared/FormUi';
import { Button, Divider, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
const baseURL = process.env.REACT_APP_API_BASE_URL;

// const accountOptions = [
//   { label: 'Azistar User', value: 1 },
//   { label: 'Azistar User2', value: '3' },
// ];
const durationOptions = [{ label: '30 Minute meeting', value: 2 }];

function CalendlyNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];

  const [options, setOptions] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);


  useEffect(() => {
    fetchUserInfo();
  }, []);
  
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${baseURL}/integrate/calendly/getdetails`, { withCredentials: true });
      if (response.data) {
        setOptions([{ label: response.data.name, value: response.data.email }]);
        fetchEventTypes(response.data.email);
      }
    } catch (error) {
      console.error('Error fetching user info', error);
    }
  };


  const handleClose = () => {
    setSideView(false);
  };

  if (!config) return <></>;
  
  const initialValues = {
    duration: currentNode?.data?.params?.duration || '',
    text: currentNode?.data?.params?.text || '',
    enableAllEvent: currentNode?.data?.params?.enableAllEvent || '',
    account: currentNode?.data?.params?.account || '',
    buttonText: currentNode?.data?.params?.buttonText || '',
    skipText: currentNode?.data?.params?.skipText || '',
    eventType: currentNode?.data?.params?.eventType || '',
    startTime: currentNode?.data?.params?.startTime || '',
    endTime: currentNode?.data?.params?.endTime || '',
    email: currentNode?.data?.params?.email || '',
    name: currentNode?.data?.params?.name || '',
    openVariables: currentNode?.data?.params?.openVariables || '',
    extraQuestion: currentNode?.data?.params?.extraQuestion || '',
    buttons: config?.data.params?.buttons,
    calendlyEmail: currentNode?.data?.params?.calendlyEmail || '',
    calendlyApiKey: currentNode?.data?.params?.calendlyApiKey || '',
    schedulingURL: currentNode?.data?.params?.schedulingURL || '',
  };

  const validationSchema = yup.object({});


  const onSave = (formValues) => {
    const updatedValues = {
      ...formValues,
      eventType: formValues.eventType || currentNode.data.params.eventType, // Selected event type
      startTime: formValues.startTime || currentNode.data.params.startTime,   // Start time from selected event
      endTime: formValues.endTime || currentNode.data.params.endTime,         // End time from selected event
      calendlyEmail: formValues.calendlyEmail || currentNode.data.params.calendlyEmail, // Email from selected account
      calendlyApiKey: formValues.calendlyApiKey || currentNode.data.params.calendlyApiKey // API Key if available
    };

    if (formValues.schedulingURL) {
      localStorage.setItem("calendly_scheduling_url", formValues.schedulingURL);
      console.log("Saved scheduling URL to localStorage:", formValues.schedulingURL);
    } else {
      console.warn("No scheduling URL found in form values.");
    }

    console.log('Form values=>>>', updatedValues);

    updateNodeById(id, { params: updatedValues });
    handleClose();
  };
  if (!config) {
    console.error("Config is undefined for blockId:", currentNode.data.blockId);
    return <></>;
  }


  const handleCalendlyLogin = async () => {
    window.location.href = `${baseURL}/integrate/calendly/login`;
  };


  

  const fetchEventTypes = async (accountEmail) => {
    try {
      const response = await axios.get(`${baseURL}/integrate/calendly/event-types/${encodeURIComponent(accountEmail)}`, {
        withCredentials: true,
      });
      if (response.data) {
        const eventOptions = response.data.map((event) => ({
          label: event.name,
          value: event.uri,
        }));
        setEventTypes(eventOptions);
      }

    } catch (error) {
      console.error('Error fetching Calendly event types:', error);
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
      {/* <SidebarFormCard
        title='Calendly Configuration'
        contentContainerProps={{
          style: { display: 'flex', flexDirection: 'column', gap: '12px' },
        }}
      >
        <FormTextField
          name="calendlyEmail"
          label="Calendly Email"
          placeholder="Enter your Calendly email"
        />
        <FormTextField
          name="calendlyApiKey"
          label="Calendly API Key"
          placeholder="Enter your Calendly API key"
          type="password"
        />
        <Button
          mt={4}
          colorScheme="blue"
          onClick={handleCalendlyLogin}
          width="100%"
        >
          Connect with Calendly
        </Button>
      </SidebarFormCard> */}
      <SidebarFormCard
        title='Connect your Calendly account'
        contentContainerProps={{
          style: { display: 'flex', flexDirection: 'column', gap: '12px' },
        }}
      >
        <FormDropdown
          name='account'
          options={options}
          label=''
          labelVariant='h3'
          variant='custom'
        />
        <Button
          variant='outline'
          backgroundColor={'#fff'}
          alignItems='center'
          borderRadius='3px'
          cursor='pointer'
          display='inline-flex'
          flexDirection='row'
          fontSize='14px'
          justifyContent='center'
          maxH='30px'
          maxW='50%'
          px='10px'
          py='5px'
          onClick={handleCalendlyLogin}
          textAlign='left'
          verticalAlign='middle'
        >
          Add a new account
        </Button>
        <DurationSelection options={eventTypes} />
        <FormCheckbox
          name='enableAllEvent'
          label='Show all events'
          labelVariant='h3'
        />
      </SidebarFormCard>

      <SidebarFormCard
        title='Customize the invite'
        contentContainerProps={{
          style: { display: 'flex', flexDirection: 'column', gap: '12px' },
        }}
      >
        <Text fontSize='11px'>
          Personalize the message and the button you want to show to your end
          users inside the botflow.
        </Text>
        <DraftEditorField
          name='text'
          label='Invite message'
          labelVariant='h3'
          placeholder='Hi, I am open to speaking with you, Please find a slot in my calender to chat'
        />
        <FormTextField
          name='buttonText'
          label='Button Text'
          labelVariant='h3'
          variant='custom'
        />
        <FormTextField
          name='skipText'
          label='Skip Text'
          labelVariant='h3'
          variant='custom'
        />
      </SidebarFormCard>
      <FormSettings
        label={'User’s data variables'}
        name='openVariables'
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
        infoText='Use here the variables where you saved the user data that will populate the Calendly form (to avoid user from retyping it if you previously asked for it).'
      >
        <FormVariableSelectorDropdown
          allowedType={config?.variableType}
          name='email'
          label='Email'
        />
        <FormVariableSelectorDropdown
          allowedType={config?.variableType}
          name='name'
          label='Name'
        />
        <SortableInviteQuestionsFieldArray />
      </FormSettings>
      <Divider />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='eventType'
        label='Save event type in the field'
      />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='startTime'
        label='Save start time in the field'
      />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='endTime'
        label='Save end time in the field'
      />
    </SidebarFormContainer>
  );
}

export default CalendlyNodeContent;

const DurationSelection = ({ options }) => {
  const { setFieldValue, values } = useFormikContext();

  const handleEventTypeChange = async (selectedOption) => {
    if (!selectedOption) {
      console.error("Selected event type is undefined");
      return;
    }

    let eventTypeId = selectedOption;

    // Extract only the event type ID if a full URL is passed
    if (selectedOption.startsWith("https://api.calendly.com/event_types/")) {
      eventTypeId = selectedOption.split("/").pop();
    }

    setFieldValue('eventType', eventTypeId); // Store eventType in form

    try {
      const response = await axios.get(
        `${baseURL}/integrate/calendly/event-details/${eventTypeId}`,
        { withCredentials: true }
      );

      console.log("Raw API Response:", response.data); // Debugging

      // Check if response contains `resource`
      if (!response.data || !response.data.resource) {
        console.error("Invalid response format:", response.data);
        return;
      }

      const eventDetails = response.data.resource; // Extract resource object

      console.log("Extracted Event Details:", eventDetails); // Debugging

      // Assuming these values exist in `eventDetails`
      setFieldValue('startTime.value', eventDetails.start_time || '');
      setFieldValue('endTime.value', eventDetails.end_time || '');
      setFieldValue('calendlyEmail', eventDetails.profile?.owner || '');
      setFieldValue('calendlyApiKey', eventDetails.profile?.uri || ''); // If API key is not available, leave blank
      setFieldValue('schedulingURL', eventDetails.scheduling_url || ''); // If API key is not available, leave blank

    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };



  return (
    <FormDropdown
      name='duration'
      options={options}
      label=''
      labelVariant='h3'
      variant='custom'
      disabled={values?.enableAllEvent}
      onChange={handleEventTypeChange} // Handle change correctly
    />
  );
};

