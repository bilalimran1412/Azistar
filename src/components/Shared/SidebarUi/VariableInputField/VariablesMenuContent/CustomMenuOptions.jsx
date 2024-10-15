import { Box, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const CustomMenuOption = (props) => {
  const { option, handleOptionClick } = props;
  const isDeleteAble = option?.category === 'CUSTOM_VARIABLES';

  return (
    <Box
      _hover={{
        bg: 'gray.100',
        '.trash_box': {
          visibility: 'visible',
        },
        '.sample': {
          display: isDeleteAble ? 'none' : 'block',
        },
      }}
      cursor='pointer'
      onClick={() => handleOptionClick(option)}
    >
      <Flex align='center' justify='space-between' p={1} mr={2}>
        <Flex align='center'>
          <Box
            bg='gray.200'
            borderRadius='full'
            width='24px'
            height='24px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            mx={3}
          >
            <Text fontSize='12px' fontWeight='700'>
              A
            </Text>
          </Box>

          <Text fontSize='12px'>{option?.label}</Text>
        </Flex>
        {isDeleteAble && (
          <Box
            className='trash_box'
            visibility='hidden'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('deleting option');
            }}
          >
            <FaTrashAlt />
          </Box>
        )}
        {option?.sample && (
          <Text color='gray.400' fontSize='12px' className='sample'>
            {typeof option?.sample === 'object'
              ? JSON.stringify(option.sample)
              : option.sample}
          </Text>
        )}
      </Flex>
    </Box>
  );
};
export default CustomMenuOption;
