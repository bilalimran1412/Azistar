import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { DraftEditorField, FormReactSelect } from 'components/Shared/FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaTrashAlt } from 'react-icons/fa';
import { hubspotEvents, loadOptions } from './data';
import { useFormikContext } from 'formik';

function ExtraFieldItem({ onRemove, subFieldName, item }) {
  return (
    <Box key={item.id} mt={1}>
      <Flex direction='row' alignItems='flex-start' gap={1}>
        <FieldDropdown subFieldName={subFieldName} />
        <DraftEditorField
          name={`${subFieldName}.value`}
          placeholder='Introduce your value'
          variant='custom'
          type='inline'
          containerStyles={{
            maxWidth: '220px',
          }}
        />
        <Box>
          <UiIconButton
            icon={<FaTrashAlt />}
            label='Delete'
            color='black'
            onClick={onRemove}
          />
        </Box>
      </Flex>
    </Box>
  );
}

export { ExtraFieldItem };

const FieldDropdown = React.memo(({ subFieldName }) => {
  const [options, setOptions] = React.useState([]);
  const { values } = useFormikContext();

  const selectedEvent = React.useMemo(
    () => hubspotEvents.find((event) => event.value === values?.event),
    [values?.event]
  );

  useEffect(() => {
    const fetchOptions = async () => {
      const opt = await loadOptions(selectedEvent.key);
      setOptions(opt);
    };

    if (selectedEvent?.key) {
      fetchOptions();
    }
  }, [selectedEvent?.key]);

  return (
    <FormReactSelect
      name={`${subFieldName}.key`}
      options={options}
      containerStyles={{ flexBasis: '300px' }}
    />
  );
});
