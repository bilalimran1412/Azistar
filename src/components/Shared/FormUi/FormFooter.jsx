import { Box, Button } from '@chakra-ui/react';
import React from 'react';

function FormFooter() {
  return (
    <Box width='full' px={5} display='flex' justifyContent='space-between'>
      <Button mt={4} type='reset' colorScheme='red'>
        Cancel
      </Button>
      <Button type='submit' mt={4} colorScheme='blue'>
        Apply
      </Button>
    </Box>
  );
}

export default FormFooter;
