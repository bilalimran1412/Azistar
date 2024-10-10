import { Divider, Text, Box, Button, Flex, Icon } from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

import {
  BusinessHoursFieldWrapper,
  radioOptions,
} from 'components/Shared/SidebarUi';
import { useField } from 'formik';
import { FormDatePicker, FormRadio } from '../..';

function BusinessHoursClosedDaysField({ name }) {
  const [field] = useField(name);

  return (
    <BusinessHoursFieldWrapper title='3. Closed days'>
      <Text mb={3}>Define days in which your business will be closed.</Text>
      <Divider />
      <Box
        display='flex'
        flexDirection='column'
        gap={5}
        sx={{
          '.react-datepicker-wrapper': {
            width: '100%', // Ensures the date picker wrapper takes full width
          },
        }}
      >
        <FormRadio label='' name={'test'} options={radioOptions} />
        <FormDatePicker name={`d`} customInput={<CustomTimeInputField />} />
        <FormDatePicker
          name={`d`}
          customInput={<CustomTimeInputField />}
          selectsRange
        />
      </Box>
    </BusinessHoursFieldWrapper>
  );
}

export { BusinessHoursClosedDaysField };

const CustomTimeInputField = forwardRef(({ value, onClick }, ref) => (
  <Button
    onClick={onClick}
    ref={ref}
    variant='outline'
    colorScheme='blue'
    width='100%'
    padding='1rem'
    justifyContent='space-between'
    leftIcon={<Icon as={FaCalendarAlt} boxSize={5} />}
  >
    <Flex justify='center' width='100%'>
      <Text>{value || 'Select Date'}</Text>
    </Flex>
  </Button>
));

export default CustomTimeInputField;
