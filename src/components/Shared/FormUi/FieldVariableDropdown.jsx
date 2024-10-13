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
  PopoverContent,
  PopoverBody,
  useDisclosure,
  useOutsideClick,
  Portal,
  Button,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { initialGroupedOptions } from 'config/constant';
import React, { useRef, useState } from 'react';
import { FaCross, FaTrashAlt, FaWindowClose } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

function AdvancedInput({
  containerStyle,
  name,
  labelVariant,
  label,
  placeholder,
  rightIcon: RightIcon,
  styles,
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  // const inputRef = useRef(null);
  const containerRef = useRef(null);
  const popoverContainer = useRef(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleFocus = () => {
    setIsFocused(true);
    onOpen();
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  useOutsideClick({ ref: popoverContainer, handler: onClose });

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
                    value={value}
                    onChange={({ target }) => {
                      setValue(target.value);
                      if (!isOpen) {
                        onOpen();
                      }
                    }}
                    autoComplete='off'
                  />
                  {RightIcon && (
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
            <CreateNewOption onClose={onClose} />
            {/* <PopoverContent
              onMouseDown={(e) => e.preventDefault()}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              width='100%'
              style={{
                overflow: 'auto',
                maxHeight: '240px',
                borderColor: '#cfd0d1',
                borderRadius: '0 0 3px 3px',
                backgroundColor: '#fff',
                borderTop: 'none',
              }}
            >
              <PopoverBody
                // onClick={() => {
                //   setValue('popover selection');
                //   onClose();
                // }}
                style={{
                  padding: 0,
                }}
              ></PopoverBody>
            </PopoverContent> */}
          </Portal>
        </Popover>
      </Box>
    </Box>
  );
}

export default AdvancedInput;

function NewVariableContent() {
  return (
    <>
      <Box
        display='flex'
        cursor='pointer'
        _hover={{
          backgroundColor: '#ddd',
        }}
        padding={2}
        marginY={1}
        gap={2}
        alignItems='center'
        fontWeight='500'
        fontStyle={'italic'}
      >
        <FiPlusCircle />
        <Text>{'lorem'}</Text>
        <Text>(new)</Text>
      </Box>
    </>
  );
}

const CustomOption = (props) => {
  const { option } = props;
  const isDeleteAble = option?.category === 'CUSTOM_VARIABLES';

  return (
    <Box
      _hover={{
        bg: 'gray.100',
        '.trash_box': {
          visibility: 'visible',
        },
        '.sample': {
          display: isDeleteAble ? 'none' : 'block',
        },
      }}
      cursor='pointer'
    >
      <Flex align='center' justify='space-between' p={1} mr={2}>
        <Flex align='center'>
          <Box
            bg='gray.200'
            borderRadius='full'
            width='24px'
            height='24px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            mx={3}
          >
            <Text fontSize='12px' fontWeight='700'>
              A
            </Text>
          </Box>

          <Text fontSize='12px'>{option?.label}</Text>
        </Flex>
        {isDeleteAble && (
          <Box
            className='trash_box'
            visibility='hidden'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('deleting option');
            }}
          >
            <FaTrashAlt />
          </Box>
        )}
        {option?.sample && (
          <Text color='gray.400' fontSize='12px' className='sample'>
            {typeof option?.sample === 'object'
              ? JSON.stringify(option.sample)
              : option.sample}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

const CustomMenuList = () => {
  return (
    <Box>
      {initialGroupedOptions.map((groupedOptions, index) => (
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
          {groupedOptions?.options?.map((option) => (
            <CustomOption option={option} />
          ))}
          {initialGroupedOptions?.length - 1 !== index && <Divider my={2} />}
        </React.Fragment>
      ))}

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
    </Box>
  );
};

function CreateNewOption({ onClose }) {
  return (
    <PopoverContent
      width='100%'
      style={{
        overflow: 'auto',
        maxHeight: '240px',
        borderColor: '#cfd0d1',
        borderRadius: '0 0 3px 3px',
        backgroundColor: '#fff',
        borderTop: 'none',
      }}
    >
      <PopoverBody
        style={{
          padding: 0,
        }}
      >
        <Box padding='8px 10px' display='flex' gap={3} flexDirection='column'>
          <Box display='flex' justifyContent='space-between'>
            <Text fontSize='12px' fontWeight='700'>
              CREATE A NEW VARIABLE
            </Text>
            <MdClose cursor='pointer' onClick={onClose} />
          </Box>
          <Divider />
          <Box>
            <Input placeholder='Type the name' variant='custom' />
          </Box>
          <Box>
            <TypeSelectionPopover />
          </Box>
        </Box>
      </PopoverBody>
    </PopoverContent>
  );
}

function TypeSelectionPopover() {
  return <></>;
}
