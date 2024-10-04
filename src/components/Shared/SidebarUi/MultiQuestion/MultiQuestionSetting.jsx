import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { FormDropdown, FormTextField, FormToggleSwitch } from '../../FormUi';
import FormVariableSelectorDropdown from '../../FormUi/FormVariableSelectorDropdown';
import { multiQuestionTypeOptions } from './multiQuestionData';
import MultiQuestionExtraOptions from './MultiQuestionsExtraOptions';
import OptionsCreatorFieldArray from './OptionsCreatorFieldArray';

function MultiQuestionSetting({
  subFieldNameMain,
  handleFieldItemPropChange,
  fieldValue,
}) {
  const subFieldName = `${subFieldNameMain}.config`;

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
            config: {
              type: value,
              ...(value === 'color' && { required: false }),
            },
          });
        }}
        variant='customMini'
        labelVariant='h3'
      />
      <FormVariableSelectorDropdown name={`${subFieldName}.name`} />
      <Box display='flex' gap={1} flexDirection='column'>
        <FormTextField
          name={`${subFieldNameMain}.label`}
          label='Label'
          placeholder='Label'
          labelVariant='h3'
          variant='customMini'
        />
        <OptionsCreatorFieldArray
          subFieldName={subFieldName}
          type={fieldValue?.config?.type}
        />
        {fieldValue?.config?.type !== 'color' && (
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
