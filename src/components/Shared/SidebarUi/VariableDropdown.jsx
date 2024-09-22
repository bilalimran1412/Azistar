// import React, { useState } from 'react';
// import {
//   FormControl,
//   FormLabel,
//   Box,
//   Flex,
//   Text,
//   Icon,
// } from '@chakra-ui/react';
// import { CreatableSelect, components } from 'chakra-react-select';
// import { FaAt } from 'react-icons/fa';
// import { MdAddCircle } from 'react-icons/md';
// import {
//   FaFileAlt,
//   FaToggleOn,
//   FaCalendarAlt,
//   FaSortNumericDown,
// } from 'react-icons/fa';

// const groupedTypesWithIcons = {
//   STRING: FaFileAlt,
//   BOOLEAN: FaToggleOn,
//   DATE: FaCalendarAlt,
//   AUTO_NUMBER: FaSortNumericDown,
//   NUMBER: FaSortNumericDown,
//   ARRAY: FaSortNumericDown,
// };

// export const leadDataOptions = [
//   {
//     value: 'id',
//     label: 'ID',
//     type: 'AUTO_NUMBER',
//     sample: 4213513453453,
//     category: 'LEAD_DATA',
//   },
//   {
//     value: 'name',
//     label: 'Name',
//     type: 'STRING',
//     sample: 'John Smith',
//     category: 'LEAD_DATA',
//   },
//   {
//     value: 'email',
//     label: 'Email',
//     type: 'STRING',
//     sample: 'email@tesla.com',
//     category: 'LEAD_DATA',
//   },
//   {
//     value: 'company',
//     label: 'Company',
//     type: 'STRING',
//     sample: 'NASA',
//     category: 'LEAD_DATA',
//   },
//   {
//     value: 'phone',
//     label: 'Phone',
//     type: 'STRING',
//     sample: '+34 690 708 181',
//     category: 'LEAD_DATA',
//   },
// ];

// export const usageDetailsOptions = [
//   {
//     value: 'chat_transcription',
//     label: 'Chat Transcription',
//     type: 'STRING',
//     readOnly: true,
//     category: 'USAGE_DETAILS',
//   },
//   {
//     value: 'online',
//     label: 'Agents Online',
//     type: 'BOOLEAN',
//     sample: true,
//     readOnly: true,
//     category: 'USAGE_DETAILS',
//   },
//   {
//     value: 'last_seen',
//     label: 'Last Seen',
//     type: 'DATE',
//     sample: 'Oct 29, 20:36',
//     readOnly: true,
//     category: 'USAGE_DETAILS',
//   },
//   {
//     value: 'created',
//     label: 'Created',
//     type: 'DATE',
//     sample: 'Oct 27, 17:41',
//     readOnly: true,
//     category: 'USAGE_DETAILS',
//   },
//   {
//     value: 'url',
//     label: 'Url',
//     type: 'STRING',
//     sample: 'https://...',
//     readOnly: true,
//     category: 'USAGE_DETAILS',
//   },
//   {
//     value: 'country',
//     label: 'Country',
//     type: 'STRING',
//     sample: 'Spain',
//     readOnly: true,
//     category: 'USAGE_DETAILS',
//   },
//   {
//     value: 'navigator',
//     label: 'Browser',
//     type: 'STRING',
//     sample: 'Chrome',
//     readOnly: true,
//     category: 'USAGE_DETAILS',
//   },
//   {
//     value: 'device',
//     label: 'Device',
//     type: 'STRING',
//     sample: 'Other',
//     readOnly: true,
//     category: 'USAGE_DETAILS',
//   },
//   {
//     value: 'os',
//     label: 'OS',
//     type: 'STRING',
//     sample: 'Mac OS X',
//     readOnly: true,
//     category: 'USAGE_DETAILS',
//   },
// ];

// export const timeReferencesOptions = [
//   {
//     value: 'yesterday',
//     label: 'Yesterday',
//     type: 'DATE',
//     sample: 'Yesterday',
//     readOnly: true,
//     category: 'TIME_REFERENCES',
//   },
//   {
//     value: 'today',
//     label: 'Today',
//     type: 'DATE',
//     sample: new Date(),
//     readOnly: true,
//     category: 'TIME_REFERENCES',
//   },
//   {
//     value: 'tomorrow',
//     label: 'Tomorrow',
//     type: 'DATE',
//     sample: 'Tomorrow',
//     readOnly: true,
//     category: 'TIME_REFERENCES',
//   },
// ];

// export const initialGroupedOptions = [
//   {
//     label: 'LEAD DATA',
//     data: 'LEAD_DATA',
//     options: leadDataOptions,
//   },
//   {
//     label: 'USAGE DETAILS',
//     data: 'USAGE_DETAILS',
//     options: usageDetailsOptions,
//   },
//   {
//     label: 'TIME REFERENCES',
//     data: 'TIME_REFERENCES',
//     options: timeReferencesOptions,
//   },
//   {
//     label: 'CUSTOM VARIABLES',
//     data: 'CUSTOM_VARIABLES',
//     options: [],
//   },
// ];

// const filterOptionsByType = (type, groupedOptions) => {
//   return groupedOptions
//     .map((group) => {
//       const filteredOptions =
//         type === 'all'
//           ? group.options
//           : group.options.filter((option) => option.type === type);
//       return {
//         ...group,
//         options: filteredOptions,
//       };
//     })
//     .filter((group) => group.options.length > 0);
// };

// const CustomOption = (props) => {
//   const { data, innerRef, innerProps, isFocused, isSelected } = props;
//   const firstLetter = data?.label?.charAt(0)?.toUpperCase();
//   const isDeleteAble = data?.category === 'CUSTOM_VARIABLES';
//   return (
//     <Box
//       ref={innerRef}
//       {...innerProps}
//       _hover={{
//         bg: 'gray.100',
//       }}
//       bg={isFocused ? 'gray.100' : isSelected ? 'gray.200' : 'white'}
//       cursor='pointer'
//     >
//       <Flex align='center' justify='space-between' p={1}>
//         <Flex align='center'>
//           <Box
//             bg='gray.200'
//             borderRadius='full'
//             width='24px'
//             height='24px'
//             display='flex'
//             alignItems='center'
//             justifyContent='center'
//             mr={3}
//           >
//             <Text fontWeight='bold' color='black' fontSize='small'>
//               {firstLetter}
//             </Text>
//           </Box>

//           <Text>{data.label}</Text>
//         </Flex>

//         {isFocused && isDeleteAble && (
//           <Text color='gray.400' fontSize='sm'>
//             Delete
//           </Text>
//         )}
//       </Flex>
//     </Box>
//   );
// };

// const CustomMenuList = (props) => {
//   return (
//     <components.MenuList {...props}>
//       {props.children}
//       <Box
//         p={4}
//         bg='gray.50'
//         borderTop='1px solid #e2e8f0'
//         cursor='default'
//         _hover={{ bg: 'gray.50' }}
//       >
//         <Text fontSize='sm' color='gray.600'>
//           Information about variables
//         </Text>
//       </Box>
//     </components.MenuList>
//   );
// };

// const DropdownIndicator = (props) => {
//   return (
//     components.DropdownIndicator && (
//       <components.DropdownIndicator {...props}>
//         <FaAt />
//       </components.DropdownIndicator>
//     )
//   );
// };
// const CustomNoOptionsMessage = ({ inputValue }) => {
//   return (
//     <Box p={4} display='flex' alignItems='center'>
//       <Icon as={MdAddCircle} boxSize={6} color='gray.400' />
//       <Text ml={2} fontSize='sm' color='gray.600'>
//         No options found. Type "{inputValue}" to create a new option.
//       </Text>
//     </Box>
//   );
// };

// export default function VariableDropdown({ onChange, allowedType = 'all' }) {
//   const [groupedOptions, setGroupedOptions] = useState(() =>
//     filterOptionsByType(allowedType, initialGroupedOptions)
//   );
//   const [selectedValue, setSelectedValue] = useState(null);
//   const [inputValue, setInputValue] = useState('');

//   const handleCreateOption = (inputValue) => {
//     const newOptionValue = inputValue.replace(/\s+/g, '_');
//     const newOption = {
//       value: newOptionValue,
//       label: newOptionValue,
//       type: 'STRING',
//       category: 'CUSTOM_VARIABLES',
//     };

//     setGroupedOptions((prevOptions) => {
//       const customVariablesGroupIndex = prevOptions.findIndex(
//         (group) => group.data === 'CUSTOM_VARIABLES'
//       );

//       if (customVariablesGroupIndex !== -1) {
//         const updatedCustomVariablesGroup = {
//           ...prevOptions[customVariablesGroupIndex],
//           options: [
//             ...prevOptions[customVariablesGroupIndex].options,
//             newOption,
//           ],
//         };

//         return [
//           ...prevOptions.slice(0, customVariablesGroupIndex),
//           updatedCustomVariablesGroup,
//           ...prevOptions.slice(customVariablesGroupIndex + 1),
//         ];
//       } else {
//         return [
//           ...prevOptions,
//           {
//             label: 'CUSTOM VARIABLES',
//             data: 'CUSTOM_VARIABLES',
//             options: [newOption],
//           },
//         ];
//       }
//     });

//     setSelectedValue(newOption);
//     onChange && onChange(newOption);
//   };

//   const handleInputChange = (newInputValue, actionMeta) => {
//     if (actionMeta.action === 'input-change') {
//       setInputValue(newInputValue);
//     } else if (
//       actionMeta.action === 'input-blur' ||
//       actionMeta.action === 'menu-close'
//     ) {
//       setInputValue('');
//     }
//   };

//   const handleChange = (newValue) => {
//     setSelectedValue(newValue);
//     onChange && onChange(newValue);
//   };

//   return (
//     <FormControl className='prevent-css'>
//       <FormLabel>Save answers in the variable</FormLabel>
//       <CreatableSelect
//         name='colors'
//         value={selectedValue}
//         inputValue={inputValue}
//         options={groupedOptions}
//         placeholder=''
//         closeMenuOnSelect={true}
//         menuPlacement='auto'
//         onCreateOption={handleCreateOption}
//         onInputChange={handleInputChange}
//         onChange={handleChange}
//         className='dropdown-selector'
//         components={{
//           Option: CustomOption,
//           MenuList: CustomMenuList,
//           IndicatorSeparator: () => null,
//           DropdownIndicator,
//           NoOptionsMessage: CustomNoOptionsMessage,
//         }}
//       />
//     </FormControl>
//   );
// }

import React from 'react';

function VariableDropdown() {
  return <div>VariableDropdown</div>;
}

export default VariableDropdown;
