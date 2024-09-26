import { Box } from '@chakra-ui/react';
import React from 'react';

function ButtonFieldArrayAddButton({
  handleAddButton,
  label = 'Add another Button...',
}) {
  return (
    <Box
      w={'100%'}
      borderRadius={'15px'}
      bg={'#3A3C5D'}
      minH={'40px'}
      display={'flex'}
      alignItems={'center'}
      textColor={'#fff'}
      style={{ cursor: 'pointer' }}
      gap={'16px'}
      onClick={handleAddButton}
    >
      <Box
        width={'40px'}
        height={'40px'}
        bg={'#9CA3AF'}
        borderRadius={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        textColor={'#000'}
      >
        +
      </Box>
      {label}
    </Box>
  );
}

export default ButtonFieldArrayAddButton;
