import { Divider, Text } from '@chakra-ui/react';
import { BusinessHoursFieldWrapper } from 'components/Shared/SidebarUi';
import React from 'react';
import { useField } from 'formik';

function BusinessHoursSpecialDaysField({ name }) {
  const [field] = useField(name);

  return (
    <BusinessHoursFieldWrapper title='4. Special days'>
      <Text mb={3}>Define the business hours for special days.</Text>
      <Divider />
    </BusinessHoursFieldWrapper>
  );
}

export { BusinessHoursSpecialDaysField };
