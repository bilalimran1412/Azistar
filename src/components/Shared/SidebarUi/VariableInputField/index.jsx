import React, { useRef, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Popover,
  PopoverTrigger,
  useDisclosure,
  useOutsideClick,
  Portal,
  Button,
} from '@chakra-ui/react';
import CreateVariableContent from './CreateVariableContent';
import ListVariableContent from './VariablesMenuContent';
import { useDropdownStore } from 'zustandStores';
import { variableDropdownManager } from './utils';

function VariableInputField({
  containerStyle,
  name,
  allowedType = 'all',
  readOnly = true,
  label,
  placeholder,
  styles,
  // popupType will be button or input, it will define the trigger element and design changes
  popupType = 'input',
  ...rest
}) {
  const [contentType, setContentType] = React.useState('list');

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef(null);
  const popoverContainer = useRef(null);
  const groupedOptions = useDropdownStore((store) => store.groupedOptions);
  const addCustomVariable = useDropdownStore(
    (store) => store.addCustomVariable
  );

  const { enableCreate } = variableDropdownManager(
    allowedType,
    inputValue,
    groupedOptions
  );

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleFocus = () => {
    setIsFocused(true);
    onOpen();
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  useOutsideClick({ ref: popoverContainer, handler: onClose });

  const handleOptionClick = (option) => {
    setInputValue(option?.value);
    onClose();
  };

  const onCreateClick = () => {
    if (allowedType === 'all') {
      setContentType('create');
    } else addCustomVariable(inputValue, allowedType);
  };

  return (
    <Box>
      {label && (
        <FormLabel htmlFor={name} variant={'h3'}>
          {label}
        </FormLabel>
      )}
      <Box ref={popoverContainer}>
        <Popover
          isOpen={isOpen}
          closeOnBlur={true}
          autoFocus={false}
          matchWidth
          closeDelay={100}
          openDelay={100}
          offset={0}
        >
          <PopoverTrigger>
            <Box
              ref={containerRef}
              tabIndex={0}
              padding='10px 8px'
              fontSize='12px'
              display='inline-flex'
              backgroundColor='#fff'
              border='1px solid #cfd0d1'
              width='100%'
              height='46px'
              boxShadow={isFocused ? '0 1px 10px -1px #6268e55c' : 'none'}
              borderRadius={isOpen ? '3px 3px 0 0' : '3px'}
            >
              <FormControl
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  ...containerStyle,
                }}
              >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    minHeight={0}
                    minWidth={0}
                    style={{
                      height: '100%',
                      width: '20px',
                    }}
                  >
                    <Text
                      fontSize='14px'
                      lineHeight='16px'
                      fontWeight='700'
                      ml='5px'
                      position='relative'
                    >
                      @
                    </Text>
                  </InputLeftElement>
                  <Input
                    id={name}
                    // ref={inputRef}
                    placeholder={placeholder}
                    {...rest}
                    style={{
                      fontSize: '14px',
                      height: '30px',
                      padding: '0 30px',
                      ...styles,
                    }}
                    onClick={() => {
                      if (!isOpen) {
                        onOpen();
                      }
                    }}
                    variant='unstyled'
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    value={inputValue}
                    onChange={({ target }) => {
                      setInputValue(target.value);
                      if (!isOpen) {
                        onOpen();
                      }
                    }}
                    autoComplete='off'
                  />
                  {enableCreate && (
                    <InputRightElement
                      minHeight={0}
                      minWidth={0}
                      style={{
                        height: '100%',
                        width: 'auto',
                      }}
                    >
                      <Button
                        minH={0}
                        minW={0}
                        h='22px'
                        paddingX={4}
                        borderRadius={0}
                        backgroundColor='rgb(215, 55, 107)'
                        _hover={{
                          backgroundColor: 'rgb(215, 55, 107)',
                        }}
                        onClick={onCreateClick}
                      >
                        <Text
                          fontSize='12px'
                          textTransform='uppercase'
                          color='white'
                        >
                          Create
                        </Text>
                      </Button>
                      {/* <RightIcon /> */}
                    </InputRightElement>
                  )}
                </InputGroup>
              </FormControl>
            </Box>
          </PopoverTrigger>
          <Portal containerRef={popoverContainer}>
            {contentType === 'list' && (
              <ListVariableContent
                inputValue={inputValue}
                handleOptionClick={handleOptionClick}
                allowedType={allowedType}
                onCreateClick={onCreateClick}
              />
            )}
            {contentType === 'create' && (
              <CreateVariableContent
                onClose={() => {
                  setContentType('list');
                  onClose();
                }}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            )}
          </Portal>
        </Popover>
      </Box>
    </Box>
  );
}

export default VariableInputField;
