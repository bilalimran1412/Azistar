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

export const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'orange', label: 'Orange' },
];

export const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'grape', label: 'Grape' },
  { value: 'orange', label: 'Orange' },
  { value: 'pineapple', label: 'Pineapple' },
];

export const initialGroupedOptions = [
  {
    label: 'Colors',
    options: colorOptions,
  },
  {
    label: 'Fruits',
    options: fruitOptions,
  },
];

const CustomOption = (props) => {
  const { data, innerRef, innerProps, isFocused, isSelected } = props;
  const firstLetter = data?.label?.charAt(0)?.toUpperCase();

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
            <Text fontWeight='bold' color='black' fontSize='small'>
              {firstLetter}
            </Text>
          </Box>

          <Text>{data.label}</Text>
        </Flex>

        {isFocused && (
          <Text color='gray.400' fontSize='sm'>
            Delete
          </Text>
        )}
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

export default function VariableDropdown({ onChange }) {
  const [groupedOptions, setGroupedOptions] = useState(initialGroupedOptions);
  const [selectedValue, setSelectedValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleCreateOption = (inputValue) => {
    const newOptionValue = inputValue.replace(/\s+/g, '_');

    const newOption = { value: newOptionValue, label: newOptionValue };

    setGroupedOptions((prevOptions) => {
      const customGroupIndex = prevOptions.findIndex(
        (group) => group.label === 'Custom'
      );

      if (customGroupIndex !== -1) {
        const updatedCustomGroup = {
          ...prevOptions[customGroupIndex],
          options: [...prevOptions[customGroupIndex].options, newOption],
        };

        return [
          ...prevOptions.slice(0, customGroupIndex),
          updatedCustomGroup,
          ...prevOptions.slice(customGroupIndex + 1),
        ];
      } else {
        return [
          ...prevOptions,
          {
            label: 'Custom',
            options: [newOption],
          },
        ];
      }
    });

    setSelectedValue(newOption);
    onChange && onChange(newOption);
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
    setSelectedValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <FormControl className='prevent-css'>
      <FormLabel>Save answers in the variable</FormLabel>
      <CreatableSelect
        name='colors'
        value={selectedValue}
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
    </FormControl>
  );
}
