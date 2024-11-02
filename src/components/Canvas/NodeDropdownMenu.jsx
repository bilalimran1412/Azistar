import React, { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { menuOptionList } from 'config/nodeConfigurations';

const NodeDropdownMenu = ({ handleAddNode, dropdownPosition }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMenuItems = menuOptionList.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      position='absolute'
      paddingY={4}
      paddingX={2}
      top={dropdownPosition.y}
      left={dropdownPosition.x}
      zIndex='10'
      bg='white'
      border='1px solid'
      borderColor='gray.200'
      borderRadius='md'
      boxShadow='lg'
      minW='220px'
    >
      {/* Search Input */}
      <InputGroup mb='3'>
        <InputLeftElement pointerEvents='none'>
          <Icon as={MdSearch} color='gray.400' />
        </InputLeftElement>
        <Input
          placeholder='Search by name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          focusBorderColor='blue.400'
        />
      </InputGroup>

      {/* Menu Items */}
      <VStack align='start' spacing='1' maxH='200px' overflowY='auto'>
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map(({ blockId, label }) => (
            <Flex
              key={blockId}
              onClick={() => handleAddNode(blockId)}
              align='center'
              width='full'
              padding='2'
              borderRadius='md'
              cursor='pointer'
              _hover={{ bg: 'gray.100' }}
              transition='background-color 0.2s'
            >
              <Icon as={MdAdd} mr='2' color='blue.500' />
              <Text fontSize='sm'>{label}</Text>
            </Flex>
          ))
        ) : (
          <Text padding='4' textAlign='center' color='gray.500'>
            No results found
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default NodeDropdownMenu;
