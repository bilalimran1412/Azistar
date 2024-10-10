import { Text, HStack, Button, Box } from '@chakra-ui/react';
import {
  BusinessHoursFieldWrapper,
  BusinessHoursOpenDay,
  CopyWeekValues,
  weekdays,
} from 'components/Shared/SidebarUi';
import React from 'react';
import { FormDatePicker, FormToggleSwitch } from '../..';
import { useField, FieldArray } from 'formik';

function BusinessHoursOpenHoursField({ name }) {
  const [field] = useField(name);

  return (
    <BusinessHoursFieldWrapper title='2. Business Hours'>
      <Text mb={3}>
        Define the days and hours when your business will be open.
      </Text>
      {weekdays.map((day) => (
        <BusinessHoursOpenDay key={day}>
          <CopyWeekValues fieldName={`${name}.${day}`} dayClicked={day} />
          <FormToggleSwitch name={`${name}.${day}.enabled`} label={day} />
          {field.value[day]?.enabled && (
            <FieldArray
              name={`${name}.${day}.time`}
              render={({ push, remove }) => (
                <>
                  {field.value[day].time.map((time, index) => {
                    return (
                      <HStack key={index} spacing={4} my={3}>
                        <>
                          <FormDatePicker
                            name={`${name}.${day}.time[${index}].start`}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption='Time'
                            dateFormat='HH:mm'
                            timeFormat='HH:mm'
                            customInput={<CustomTimeInputField />}
                          />
                          <FormDatePicker
                            name={`${name}.${day}.time[${index}].end`}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption='Time'
                            dateFormat='HH:mm'
                            timeFormat='HH:mm'
                            customInput={<CustomTimeInputField />}
                          />
                          {field.value[day].time?.length > 1 && (
                            <Button
                              onClick={() => remove(index)}
                              colorScheme='red'
                              variant={'unstyled'}
                            >
                              X
                            </Button>
                          )}
                        </>
                      </HStack>
                    );
                  })}
                  <Button
                    type='button'
                    onClick={() => push({ start: '', end: '' })}
                  >
                    Add Time
                  </Button>
                </>
              )}
            />
          )}
        </BusinessHoursOpenDay>
      ))}
    </BusinessHoursFieldWrapper>
  );
}

export { BusinessHoursOpenHoursField };

const CustomTimeInputField = React.forwardRef(({ value, onClick }, ref) => (
  <Box
    as='input'
    ref={ref}
    onClick={onClick}
    value={value || 'Select'}
    readOnly
    style={{
      outline: '1px solid black',
      borderRadius: '3px',
      width: '100%',
      padding: '5px',
    }}
  />
));
