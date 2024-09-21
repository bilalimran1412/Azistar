import React from 'react';
import { Field, useFormikContext } from 'formik';
import { Box, Button, FormLabel } from '@chakra-ui/react';

// CUSTOM OPTIONS FOR STARTING
// const selectionOptions = [
//   { label: 'Long', value: 'long' },
//   { label: 'Short', value: 'short' },
// ];
const FormCustomOptionSelector = ({
  name,
  options,
  label,
  bgColor = '#D0D7DD',
}) => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <Field name={name}>
      {() => (
        <Box
          display={'flex'}
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          w={'100%'}
          gap={'1rem'}
        >
          <FormLabel>{label}</FormLabel>
          <Box
            display={'flex'}
            bg={bgColor}
            p={'2px'}
            borderRadius={'3px'}
            justifyContent={'space-between'}
            alignItems={'center'}
            w='min-content'
          >
            {options.map((option) => {
              const isSelected = values[name] === option.value;
              const buttonStyle = {
                border: 'none',
                fontSize: '11px',
                textTransform: 'uppercase',
                backgroundColor: isSelected ? 'white' : bgColor,
                color: isSelected ? 'black' : 'white',
              };

              return (
                <Button
                  key={option.value}
                  onClick={() => setFieldValue(name, option.value)}
                  borderRadius='8px'
                  fontWeight={'smaller'}
                  style={{
                    ...buttonStyle,
                    color: 'red !important',
                    borderRadius: '2px',
                  }}
                >
                  {option.label}
                </Button>
              );
            })}
          </Box>
        </Box>
      )}
    </Field>
  );
};

export default FormCustomOptionSelector;
