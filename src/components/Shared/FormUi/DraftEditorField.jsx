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
  containerStyles = {},
  setNodeContent = false,
  setRawBlocks = false,
  setOnlyText = false,
}) {
  const [field] = useField(name);
  const { errors, touched, setFieldValue } = useFormikContext();

  const handleChange = (rawBlocks, plainText) => {
    if (setOnlyText) {
      setFieldValue(`${name}`, plainText);
      return;
    }
    if (setNodeContent) {
      //maybe use text
      setFieldValue(`${name}.nodeTextContent`, plainText);
    }
    setFieldValue(`${name}.rawBlocks`, rawBlocks);

    setFieldValue(`${name}.text`, plainText);
  };

  return (
    <FormControl
      isInvalid={touched[name] && errors[name]}
      sx={{
        ...containerStyles,
      }}
    >
      {label && <FormLabel variant={labelVariant}>{label}</FormLabel>}
      <AzistarEditor
        type={type}
        placeholder={placeholder}
        setFieldValue={handleChange}
        initialValue={field.value?.rawBlocks}
      />
      <FormErrorMessage>{errors[name]}</FormErrorMessage>
    </FormControl>
  );
}

export { DraftEditorField };
