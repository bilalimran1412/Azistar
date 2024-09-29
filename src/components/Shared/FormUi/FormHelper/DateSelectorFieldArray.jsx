import { Box, Icon } from '@chakra-ui/react';
import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import FormTextField from '../FormTextField';
import { MdAdd } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

function DateSelectorFieldArray({ name }) {
  const { values } = useFormikContext();

  const onAdd = (arrayHelpers) => {
    arrayHelpers.push({ fromDate: '', toDate: '' });
  };

  const onDelete = (arrayHelpers, index) => {
    arrayHelpers.remove(index);
  };
  const fieldValue = values?.[name] || [];

  const isLastField = fieldValue?.length === 1;

  return (
    <>
      {values?.enabledDateType === 'custom' && (
        <FieldArray
          name={name}
          render={(arrayHelpers) => (
            <>
              <Box background='lightgray' padding='6px'>
                {fieldValue.map((dateRange, index) => (
                  <Box position='relative' key={index} display='flex'>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      width='100%'
                    >
                      <FormTextField
                        name={`${name}.${index}.fromDate`}
                        type='date'
                        label='From Date'
                        fullWidth={false}
                      />
                      <FormTextField
                        name={`${name}.${index}.toDate`}
                        type='date'
                        label='To Date'
                        fullWidth={false}
                      />
                      {!isLastField && (
                        <Icon
                          fontSize='larger'
                          top={1}
                          right={1}
                          pos='absolute'
                          cursor='pointer'
                          onClick={() => onDelete(arrayHelpers, index)}
                        >
                          <FaTrash />
                        </Icon>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box
                onClick={() => onAdd(arrayHelpers)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                  color: 'white',
                  background: '#cc3c79',
                  height: '32px',
                  width: '32px',
                  alignSelf: 'flex-end',
                  cursor: 'pointer',
                }}
              >
                <MdAdd />
              </Box>
            </>
          )}
        />
      )}
    </>
  );
}

export default DateSelectorFieldArray;
