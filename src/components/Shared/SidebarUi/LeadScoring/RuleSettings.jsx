import { Box, Flex, Text } from '@chakra-ui/react';
import { FormDropdown, FormTextField } from 'components/Shared/FormUi';
import React from 'react';
import { conditionsOptions, getLabel } from './data';

const scoreSignOptions = [
  {
    value: '+',
    label: '+',
  },
  {
    label: '-',
    value: '-',
  },
];

function RuleSettings({
  subFieldName,
  handleFieldItemPropChange,
  fieldValue,
  selectedVariable,
}) {
  const selectedVariableValue = getLabel(selectedVariable);
  const conditionDropdownOptions =
    conditionsOptions[selectedVariableValue.type];
  const selectedOption = conditionDropdownOptions?.find(
    (option) => option.value === fieldValue?.condition
  );

  const dateInput = selectedVariableValue.type === 'DATE';
  return (
    <Flex
      bg={'#8a9ba826'}
      borderRadius={'3px'}
      flex={1}
      padding='10px 12px 9px'
      direction='column'
      gap={5}
      className='button-select-container'
    >
      <Flex gap={4}>
        <Box width='50%'>
          <FormDropdown
            name={`${subFieldName}.condition`}
            label='Meets this condition'
            options={conditionDropdownOptions}
            onChange={(value) => {
              handleFieldItemPropChange({
                condition: value,
              });
            }}
            labelVariant='h3White'
            variant='customMini'
          />
        </Box>
        {selectedOption?.args > 0 && (
          <FormTextField
            name={`${subFieldName}.args[0]`}
            label='Argument'
            labelVariant='h3White'
            variant='customMini'
            fullWidth={false}
            {...(dateInput && { type: 'date' })}
          />
        )}
      </Flex>
      {selectedOption?.args === 2 && (
        <Flex alignItems='flex-end' direction='column'>
          <Text textAlign='center' width='50%' fontSize='small' color='#fff'>
            AND
          </Text>
          <FormTextField
            name={`${subFieldName}.args[1]`}
            label=''
            labelVariant='h3White'
            variant='customMini'
            fullWidth={false}
            {...(dateInput && { type: 'date' })}
          />
        </Flex>
      )}
      <Flex gap={4}>
        <FormDropdown
          name={`${subFieldName}.scoreSign`}
          label='Then assign this score'
          labelVariant='h3White'
          variant='customMini'
          options={scoreSignOptions}
          onChange={(value) => {
            handleFieldItemPropChange({
              scoreSign: value,
            });
          }}
        />
        <FormTextField
          name={`${subFieldName}.score`}
          label='Value'
          labelVariant='h3White'
          variant='customMini'
        />
      </Flex>
    </Flex>
  );
}

export { RuleSettings };
