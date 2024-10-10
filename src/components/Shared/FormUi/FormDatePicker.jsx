import React from 'react';
import { useField } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, FormLabel, Tooltip, Box } from '@chakra-ui/react';

const FormDatePicker = ({ name, label, labelVariant, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const selectedDate = field.value ? new Date(field.value) : null;

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel htmlFor={name} variant={labelVariant}>
        {label}
      </FormLabel>
      <Box>
        <Tooltip
          hasArrow
          bg='teal.500'
          color='white'
          placement='top'
          label={
            selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'
          }
        >
          <DatePicker
            id={name}
            selected={selectedDate}
            onChange={(date) => helpers.setValue(date)}
            {...props}
          />
        </Tooltip>
      </Box>
      {meta.touched && meta.error ? (
        <Box color='red.500' mt={2}>
          {meta.error}
        </Box>
      ) : null}
    </FormControl>
  );
};

export { FormDatePicker };
