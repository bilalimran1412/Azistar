import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { buttonCreatorEmojis } from '../../../config/constant';

function EmojiSelector({ setEmoji }) {
  const handleEmojiClick = (emoji) => {
    setEmoji(emoji);
  };

  return (
    <Box
      flexWrap={'wrap'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      minH='50px'
      px='8px'
      fontSize='14px'
      fontWeight='semibold'
      width={'100%'}
      gap={'8px'}
      bg={'#4D5273'}
      border={'1px'}
      borderColor={'gray'}
      borderRadius={'3px'}
      p={'8px'}
      overflow={'hidden'}
      overflowY={'auto'}
      h={'80px'}
    >
      {Object.entries(buttonCreatorEmojis).map(([key, emoji]) => (
        <Button
          key={key}
          _hover={{ bg: '#fff', cursor: 'pointer' }}
          p={'0'}
          m={'0'}
          width={'30px'}
          height={'30px'}
          bg={'transparent'}
          onClick={() => handleEmojiClick(emoji)}
        >
          {emoji}
        </Button>
      ))}
    </Box>
  );
}

export default EmojiSelector;
