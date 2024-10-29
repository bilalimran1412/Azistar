import React from 'react';
import { useField, useFormikContext } from 'formik';
import { FormControl, FormLabel, FormHelperText, Box } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

const FormReactSelect = ({
  name,
  label,
  options = [],
  placeholder = 'Select',
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  const isError = meta.touched && !!meta.error;

  const handleChange = (selectedOption) => {
    setFieldValue(name, selectedOption ? selectedOption.value : '');
  };

  const chakraStyles = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      paddingInline: 'auto !important',
      paddingY: '11px',
      w: '32px',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '14px',
    }),
  };
  return (
    <FormControl isInvalid={isError}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Box>
        <Select
          id={name}
          options={options}
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
          onBlur={() => helpers.setTouched(true)}
          value={options.find((option) => option.value === field.value) || null}
          variant='custom'
          chakraStyles={chakraStyles}
          {...props}
        />
      </Box>
      {isError && <FormHelperText color='red.500'>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export { FormReactSelect };
