import { Box, Text } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

function SortableInviteQuestionsFieldArray({ name = 'extraQuestion' }) {
  const [field] = useField(name);
  return (
    <Box>
      <Text fontWeight='700' fontSize='14px'>
        Other invitee questions
      </Text>
      <Text fontSize='12px' opacity={0.6} mt={1}>
        If you have added more questions to your Calendly invitation, you can
        add them below so that they can be filled in with the corresponding
        variables (e.g.: User phone number). <br />{' '}
        <Text as='b'>VERY IMPORTANT:</Text> you have to respect the same order
        in which they appear in Calendly.
      </Text>
    </Box>
  );
}

export { SortableInviteQuestionsFieldArray };
