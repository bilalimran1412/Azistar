import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Box,
  Flex,
  Text,
  Icon,
} from '@chakra-ui/react';
import { CreatableSelect, components } from 'chakra-react-select';
import { FaAt } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import { useField } from 'formik';
import { useNodeContext } from '../../../views/canvas/NodeContext';
import { groupedTypesWithIcons } from '../../../config/constant';

const filterOptionsByType = (type, groupedOptions, excludeReadOnly = false) => {
  return groupedOptions
    .map((group) => {
      const filteredOptions =
        type === 'all'
          ? group.options
          : group.options.filter(
              (option) =>
                option.type === type && (!excludeReadOnly || !option.readOnly)
            );

      return {
        ...group,
        options: filteredOptions,
      };
    })
    .filter((group) => group.options.length > 0);
};

const CustomOption = (props) => {
  const { data, innerRef, innerProps, isFocused, isSelected } = props;
  const isDeleteAble = data?.category === 'CUSTOM_VARIABLES';
  const type = data?.type;

  return (
    <Box
      ref={innerRef}
      {...innerProps}
      _hover={{
        bg: 'gray.100',
      }}
      bg={isFocused ? 'gray.100' : isSelected ? 'gray.200' : 'white'}
      cursor='pointer'
    >
      <Flex align='center' justify='space-between' p={1}>
        <Flex align='center'>
          <Box
            bg='gray.200'
            borderRadius='full'
            width='24px'
            height='24px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            mr={3}
          >
            {groupedTypesWithIcons?.[type]}
          </Box>

          <Text>{data.label}</Text>
        </Flex>

        <Text
          color='gray.400'
          fontSize='sm'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('deleting option');
          }}
        >
          {isDeleteAble && isFocused
            ? 'Delete'
            : data?.sample
              ? JSON.stringify(data.sample)
              : ''}
        </Text>
      </Flex>
    </Box>
  );
};

const CustomMenuList = (props) => {
  return (
    <components.MenuList {...props}>
      {props.children}
      <Box
        p={4}
        bg='gray.50'
        borderTop='1px solid #e2e8f0'
        cursor='default'
        _hover={{ bg: 'gray.50' }}
      >
        <Text fontSize='sm' color='gray.600'>
          Information about variables
        </Text>
      </Box>
    </components.MenuList>
  );
};

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <FaAt />
      </components.DropdownIndicator>
    )
  );
};
const CustomNoOptionsMessage = ({ inputValue }) => {
  return (
    <Box p={4} display='flex' alignItems='center'>
      <Icon as={MdAddCircle} boxSize={6} color='gray.400' />
      <Text ml={2} fontSize='sm' color='gray.600'>
        No options found. Type "{inputValue}" to create a new option.
      </Text>
    </Box>
  );
};
export default function FormVariableSelectorDropdown({
  name,
  allowedType = 'all',
  label = 'Save answers in the variable',
  readOnly = true,
}) {
  const { groupedOptions: variableDropdownOptions, setGroupedOptions } =
    useNodeContext();

  const groupedOptions = React.useMemo(() => {
    return filterOptionsByType(allowedType, variableDropdownOptions, readOnly);
  }, [allowedType, variableDropdownOptions, readOnly]);

  const [inputValue, setInputValue] = useState('');

  const [field, meta, helpers] = useField(name);

  const handleCreateOption = (inputValue) => {
    const newOptionValue = inputValue.replace(/\s+/g, '_');
    const newOption = {
      value: newOptionValue,
      label: newOptionValue,
      type: allowedType,
      category: 'CUSTOM_VARIABLES',
    };

    setGroupedOptions((prevOptions) => {
      const customVariablesGroupIndex = prevOptions.findIndex(
        (group) => group.data === 'CUSTOM_VARIABLES'
      );

      if (customVariablesGroupIndex !== -1) {
        const updatedCustomVariablesGroup = {
          ...prevOptions[customVariablesGroupIndex],
          options: [
            ...prevOptions[customVariablesGroupIndex].options,
            newOption,
          ],
        };

        return [
          ...prevOptions.slice(0, customVariablesGroupIndex),
          updatedCustomVariablesGroup,
          ...prevOptions.slice(customVariablesGroupIndex + 1),
        ];
      } else {
        return [
          ...prevOptions,
          {
            label: 'CUSTOM VARIABLES',
            data: 'CUSTOM_VARIABLES',
            options: [newOption],
          },
        ];
      }
    });

    helpers.setValue(newOption);
  };

  const handleInputChange = (newInputValue, actionMeta) => {
    if (actionMeta.action === 'input-change') {
      setInputValue(newInputValue);
    } else if (
      actionMeta.action === 'input-blur' ||
      actionMeta.action === 'menu-close'
    ) {
      setInputValue('');
    }
  };

  const handleChange = (newValue) => {
    helpers.setValue(newValue);
  };

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel variant='h3'>{label}</FormLabel>
      <CreatableSelect
        name={name}
        value={field.value}
        inputValue={inputValue}
        options={groupedOptions}
        placeholder=''
        closeMenuOnSelect={true}
        menuPlacement='auto'
        onCreateOption={handleCreateOption}
        onInputChange={handleInputChange}
        onChange={handleChange}
        className='dropdown-selector'
        components={{
          Option: CustomOption,
          MenuList: CustomMenuList,
          IndicatorSeparator: () => null,
          DropdownIndicator,
          NoOptionsMessage: CustomNoOptionsMessage,
        }}
      />
      {meta.touched && meta.error && (
        <Text color='red.500' fontSize='sm'>
          {meta.error}
        </Text>
      )}
    </FormControl>
  );
}
