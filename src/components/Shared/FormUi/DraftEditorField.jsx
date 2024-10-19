import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import AzistarEditor from '../UiComponents/AzistarEditor';

function DraftEditorField({
  name,
  label,
  placeholder,
  labelVariant = '',
  type = 'full',
}) {
  const [field, , helpers] = useField(name);
  const { errors, touched, setFieldValue, values } = useFormikContext();

  const handleChange = (rawBlocks, plainText) => {
    setFieldValue('textareaFieldData', plainText);
    setFieldValue('rawBlocks', rawBlocks);
    helpers.setValue(plainText);
  };

  return (
    <FormControl isInvalid={touched[name] && errors[name]}>
      <FormLabel variant={labelVariant}>{label}</FormLabel>
      <AzistarEditor
        type={type}
        placeholder={placeholder}
        setFieldValue={handleChange}
        initialValue={values?.rawBlocks}
      />
      <FormErrorMessage>{errors[name]}</FormErrorMessage>
    </FormControl>
  );
}

export { DraftEditorField };
