import { Box } from '@chakra-ui/react';
import React from 'react';

function ButtonFieldArrayAddButton({
  handleAddButton,
  label = 'Add another Button...',
  buttonStyles = {},
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
      fontSize='12px'
    >
      <Box
        width={'32px'}
        height={'32px'}
        bg={'#9CA3AF'}
        borderRadius={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        textColor={'#fff'}
        fontSize='28px'
        style={{ ...buttonStyles }}
      >
        +
      </Box>
      {label}
    </Box>
  );
}

export default ButtonFieldArrayAddButton;
