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
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

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
            <PopoverContent
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
                onClick={() => {
                  setValue('popover selection');

                  onClose();
                }}
              >
                'Default popover content
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Box>
    </Box>
  );
}

export default AdvancedInput;
