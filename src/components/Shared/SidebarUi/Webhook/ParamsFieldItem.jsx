import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { FormTextField } from 'components/Shared/FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaTrashAlt } from 'react-icons/fa';

function ParamsFieldItem({ onRemove, subFieldName, item, isLastItem }) {
  return (
    <Box key={item.id} mt={3}>
      <Flex direction='row' alignItems='center'>
        <FormTextField
          name={`${subFieldName}.key`}
          label={`Key`}
          placeholder='key'
          variant='custom'
          labelVariant='h1'
        />
        <FormTextField
          name={`${subFieldName}.value`}
          label={`Value`}
          placeholder='value'
          variant='custom'
          labelVariant='h1'
        />
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

export { ParamsFieldItem };
