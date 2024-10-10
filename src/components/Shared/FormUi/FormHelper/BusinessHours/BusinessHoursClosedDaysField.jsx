import { Divider, Text } from '@chakra-ui/react';
import { BusinessHoursFieldWrapper } from 'components/Shared/SidebarUi';
import React from 'react';
import { useField } from 'formik';

function BusinessHoursClosedDaysField({ name }) {
  const [field] = useField(name);

  return (
    <BusinessHoursFieldWrapper title='3. Closed days'>
      <Text mb={3}>Define days in which your business will be closed.</Text>
      <Divider />
    </BusinessHoursFieldWrapper>
  );
}

export { BusinessHoursClosedDaysField };
