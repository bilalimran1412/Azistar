import { Box, Text, Divider } from '@chakra-ui/react';
import { initialGroupedOptions } from 'config/constant';
import React from 'react';
import {
  filterOptionsByType,
  hasExactMatch,
  searchGroupedOptions,
} from '../utils';
import CustomMenuOption from './CustomMenuOptions';
import CreateVariableOption from './CreateVariableOption';

const CustomMenuList = ({
  handleOptionClick,
  value,
  allowedType,
  onCreateClick,
}) => {
  const groupedOptions = React.useMemo(() => {
    return filterOptionsByType(allowedType, initialGroupedOptions);
  }, [allowedType]);

  const filteredOptions = React.useMemo(() => {
    return searchGroupedOptions(groupedOptions, value);
  }, [groupedOptions, value]);

  const hasExtractValue = React.useMemo(() => {
    if (value?.length < 3) {
      return false;
    }
    return hasExactMatch(filteredOptions, value);
  }, [filteredOptions, value]);

  const isEmpty = React.useMemo(() => {
    return !filteredOptions?.flatMap((group) => group.options)?.length;
  }, [filteredOptions]);

  return (
    <Box
      sx={{
        'hr:last-of-type': { display: 'none' },
      }}
    >
      {isEmpty && value?.length > 2 ? (
        <CreateVariableOption value={value} onCreateClick={onCreateClick} />
      ) : (
        <>
          {!hasExtractValue && value?.length > 2 && (
            <CreateVariableOption value={value} onCreateClick={onCreateClick} />
          )}
          <>
            {filteredOptions.map((groupedOptions, index) => (
              <React.Fragment key={index}>
                <Box position='sticky' top={0} bg='white' zIndex={1}>
                  <Text
                    mx={3}
                    textTransform='uppercase'
                    fontSize='11px'
                    paddingY={2}
                    color='gray.400'
                  >
                    {groupedOptions.label}
                  </Text>
                </Box>
                {groupedOptions?.options?.map((option, index) => (
                  <CustomMenuOption
                    option={option}
                    handleOptionClick={handleOptionClick}
                    key={index}
                  />
                ))}
                <Divider my={2} />
              </React.Fragment>
            ))}

            {!isEmpty && (
              <Box mt={2}>
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
              </Box>
            )}
          </>
        </>
      )}
    </Box>
  );
};
export default CustomMenuList;
