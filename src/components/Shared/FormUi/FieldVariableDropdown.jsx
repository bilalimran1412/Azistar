import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

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

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <Box>
      {label && (
        <FormLabel htmlFor={name} variant={labelVariant}>
          {label}
        </FormLabel>
      )}
      <Box
        tabIndex={0}
        padding='10px 8px'
        fontSize='12px'
        display='inline-flex'
        backgroundColor='#fff'
        border='1px solid #cfd0d1'
        width='100%'
        height='46px'
        boxShadow={isFocused ? '0 1px 10px -1px #6268e55c' : 'none'}
        borderRadius={isFocused ? '3px 3px 0 0' : '3px'}
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
                width: '18px',
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
              placeholder={placeholder}
              {...rest}
              style={{
                fontSize: '14px',
                height: '30px',
                ...styles,
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoComplete='off'
            />
            {RightIcon && (
              <InputRightElement
                pointerEvents='none'
                minHeight={0}
                minWidth={0}
                style={{
                  height: '100%',
                  width: '18px',
                  marginRight: '10px',
                }}
              >
                <RightIcon />
              </InputRightElement>
            )}
          </InputGroup>
        </FormControl>
      </Box>
    </Box>
  );
}

export default AdvancedInput;
