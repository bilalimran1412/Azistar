import { Text, HStack, Input } from '@chakra-ui/react';
import {
  BusinessHoursFieldWrapper,
  BusinessHoursOpenDay,
} from 'components/Shared/SidebarUi';
import React from 'react';
import { FormToggleSwitch } from '../..';
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
        Define the days and hours when your business will be open
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
                      <Input
                        placeholder='Start Time'
                        type='time'
                        name={`${name}.${day}.time[${index}].start`}
                        value={time.start}
                        onChange={(e) => {
                          const newTime = [...field.value[day].time];
                          newTime[index] = {
                            start: e.target.value,
                            end: newTime[index]?.end || '',
                          };
                          field.onChange({
                            target: {
                              name: `${name}.${day}.time`,
                              value: newTime,
                            },
                          });
                        }}
                      />
                      <Input
                        placeholder='End Time'
                        type='time'
                        name={`${name}.${day}.time[${index}].end`}
                        value={time.end}
                        onChange={(e) => {
                          const newTime = [...field.value[day].time];
                          newTime[index] = {
                            start: newTime[index]?.start || '',
                            end: e.target.value,
                          };
                          field.onChange({
                            target: {
                              name: `${name}.${day}.time`,
                              value: newTime,
                            },
                          });
                        }}
                      />
                      <button type='button' onClick={() => remove(index)}>
                        Remove
                      </button>
                    </HStack>
                  ))}
                  <button
                    type='button'
                    onClick={() => push({ start: '', end: '' })}
                  >
                    Add Time
                  </button>
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
