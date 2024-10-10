import { Text, HStack, Button } from '@chakra-ui/react';
import {
  BusinessHoursFieldWrapper,
  BusinessHoursOpenDay,
} from 'components/Shared/SidebarUi';
import React from 'react';
import { FormDatePicker, FormToggleSwitch } from '../..';
import { useField, FieldArray } from 'formik';

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function BusinessHoursOpenHoursField({ name }) {
  const [field] = useField(name);

  return (
    <BusinessHoursFieldWrapper title='2. Business Hours'>
      <Text mb={3}>
        Define the days and hours when your business will be open.
      </Text>
      {weekdays.map((day) => (
        <BusinessHoursOpenDay key={day}>
          <FormToggleSwitch name={`${name}.${day}.enabled`} label={day} />
          {field.value[day]?.enabled && (
            <FieldArray
              name={`${name}.${day}.time`}
              render={({ push, remove }) => (
                <>
                  {field.value[day].time.map((time, index) => (
                    <HStack key={index} spacing={4} mb={2}>
                      <>
                        <FormDatePicker
                          name={`${name}.${day}.time[${index}].start`}
                          // label={`Start Time for ${day}`}
                        />
                        <FormDatePicker
                          name={`${name}.${day}.time[${index}].end`}
                          // label={`End Time for ${day}`}
                        />
                        <Button
                          onClick={() => remove(index)}
                          colorScheme='red'
                          variant='outline'
                        >
                          Remove
                        </Button>
                      </>
                    </HStack>
                  ))}
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
