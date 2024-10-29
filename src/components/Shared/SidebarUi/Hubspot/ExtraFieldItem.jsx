import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { DraftEditorField, FormReactSelect } from 'components/Shared/FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaTrashAlt } from 'react-icons/fa';
import { loadOptions } from './data';

function ExtraFieldItem({ onRemove, subFieldName, item }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const opt = await loadOptions('company');
        setOptions(opt);
      } catch (error) {
        console.error('Error loading options:', error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <Box key={item.id} mt={1}>
      <Flex direction='row' alignItems='flex-start' gap={1}>
        <FormReactSelect name={`${subFieldName}.key`} options={options} />
        <DraftEditorField
          name={`${subFieldName}.value`}
          placeholder='Introduce your value'
          variant='custom'
          setOnlyText={true}
          type='inline'
          containerStyles={{
            maxWidth: '220px',
          }}
        />
        <Box>
          <UiIconButton
            icon={<FaTrashAlt />}
            label='Delete'
            color='black'
            onClick={onRemove}
          />
        </Box>
      </Flex>
    </Box>
  );
}

export { ExtraFieldItem };
