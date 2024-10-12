import {
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';
import { fetchWrapper } from 'utils/fetchWrapper';

function SendRequest() {
  const { values } = useFormikContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  const handleTestRequest = async () => {
    const formTestData = values?.parameters?.reduce((acc, obj) => {
      if (obj.testValue) {
        acc[obj.value] = obj.testValue;
      }
      return acc;
    }, {});
    try {
      setIsLoading(true);
      const response = await fetchWrapper({
        url: '/send_request',
        method: 'POST',
        body: {
          url: values?.url,
          data: formTestData,
          method: 'POST',
        },
      });

      if (response?.data) {
        setResponseMessage(response.data);
        setIsError(false);
      }
    } catch (err) {
      setResponseMessage('Unable to test the request.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(responseMessage);
  return (
    <Box mt={1}>
      <Button
        my={4}
        colorScheme='blue'
        isLoading={isLoading}
        type='button'
        onClick={handleTestRequest}
      >
        Test webhook trigger
      </Button>

      {isError && (
        <Alert
          status={'error'}
          mt={4}
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          gap={2}
        >
          <Flex>
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
          </Flex>
          <AlertDescription>{responseMessage}</AlertDescription>
        </Alert>
      )}
      {responseMessage && (
        <Box>
          <FormLabel variant='h3' colorScheme='bue'>
            Test status code
          </FormLabel>
          <Input
            value={responseMessage?.response?.status}
            variant='custom'
            readOnly
          />
        </Box>
      )}
    </Box>
  );
}

export { SendRequest };
