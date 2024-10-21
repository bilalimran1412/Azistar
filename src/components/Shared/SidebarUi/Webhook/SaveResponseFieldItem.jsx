import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FormVariableSelectorDropdown } from 'components/Shared/FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaTrashAlt } from 'react-icons/fa';

function SaveResponseFieldItem({ onRemove, subFieldName, item, isLastItem }) {
  return (
    <Box key={item.id} mt={3}>
      <Flex direction='column' width='100%' alignItems='flex-end'>
        <Box width='100%'>
          <Text
            my={2}
            color='white'
            bgColor='#66f'
            padding={2}
            mb={0}
            borderRadius='3px'
          >
            Entire Response body
          </Text>
          <FormVariableSelectorDropdown name={`${subFieldName}`} label='' />
        </Box>
        {!isLastItem && (
          <Flex mt={4}>
            <Box>
              <UiIconButton
                icon={<FaTrashAlt />}
                label='Delete'
                color='black'
                onClick={onRemove}
              />
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export { SaveResponseFieldItem };
