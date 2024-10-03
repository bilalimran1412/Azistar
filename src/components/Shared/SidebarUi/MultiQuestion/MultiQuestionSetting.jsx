import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { FormDropdown, FormTextField, FormToggleSwitch } from '../../FormUi';
import FormVariableSelectorDropdown from '../../FormUi/FormVariableSelectorDropdown';
import { ExtraOptionsAccordion } from '../../UiComponents';
import {
  columnWidthOptions,
  getFieldsByType,
  multiQuestionTypeOptions,
} from './multiQuestionData';

function MultiQuestionSetting({
  subFieldName,
  handleFieldItemPropChange,
  fieldValue,
}) {
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
      <FormDropdown
        name={`${subFieldName}.type`}
        label='Question type'
        options={multiQuestionTypeOptions}
        onChange={(value) => {
          handleFieldItemPropChange({
            type: value,
          });
        }}
        variant='customMini'
        labelVariant='h3'
      />
      <FormVariableSelectorDropdown name='name' />
      <Box display='flex' gap={1} flexDirection='column'>
        <FormTextField
          name={`${subFieldName}.label`}
          label='Label'
          placeholder='Label'
          labelVariant='h3'
          variant='customMini'
        />
        {fieldValue?.type !== 'color' && (
          <FormToggleSwitch
            name={`${subFieldName}.required`}
            label='Is required?'
          />
        )}
        <MultiQuestionExtraOptions
          fieldValue={fieldValue}
          subFieldName={subFieldName}
        />
      </Box>
    </Flex>
  );
}

export { MultiQuestionSetting };
function MultiQuestionExtraOptions({ fieldValue, subFieldName }) {
  const fields = getFieldsByType(fieldValue?.type);

  if (!fields.length) {
    return <Text color='#fff'>Select field to enable options</Text>;
  }

  return (
    <ExtraOptionsAccordion>
      <Flex flexDirection='column'>
        <Flex wrap='wrap' justifyContent='space-between'>
          {fields.map((field, index) => {
            const isLastUnpaired =
              index === fields.length - 1 && fields.length % 2 !== 0;
            if (field.type === 'dropdown') {
              return (
                <FormDropdown
                  key={index}
                  name={`${subFieldName}.${field.name}`}
                  label={field.label}
                  options={columnWidthOptions}
                  placeholder={field.placeholder}
                  containerStyle={{
                    flexBasis: isLastUnpaired ? '100%' : '48%',
                  }}
                  labelVariant='h3'
                  variant='customMini'
                />
              );
            }
            return (
              <FormTextField
                key={index}
                name={`${subFieldName}.${field.name}`}
                label={field.label}
                placeholder={field.placeholder}
                containerStyle={{
                  flexBasis: isLastUnpaired ? '100%' : '48%',
                }}
                labelVariant='h3'
                variant='customMini'
              />
            );
          })}
        </Flex>
      </Flex>
    </ExtraOptionsAccordion>
  );
}

export default MultiQuestionExtraOptions;
