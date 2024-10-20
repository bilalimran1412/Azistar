import React, { useState } from 'react';
import { useField } from 'formik';
import { Box, Flex, Image } from '@chakra-ui/react';
import { FaImage, FaFile } from 'react-icons/fa';

const FormMediaField = ({ name, onCopy }) => {
  const [field, , helpers] = useField(name);
  const [preview, setPreview] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      helpers.setValue(file);
      if (file.type.startsWith('image/')) {
        const fileURL = URL.createObjectURL(file);
        setPreview(fileURL);
      } else {
        setPreview(null);
      }
    }
  };

  return (
    <Box
      width='100%'
      minH='100px'
      h='100px'
      pos='relative'
      _hover={{ '> .iconGroup': { visibility: 'visible' } }}
    >
      <input
        type='file'
        id={`fileInput-${name}`}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
      <Flex bg='#d2d5da' flex={1} height='100%' justify='center' align='center'>
        {preview ? (
          <Image
            src={preview}
            alt='file-preview'
            width='100%'
            height='100%'
            objectFit='cover'
          />
        ) : field.value ? (
          <FaFile fontSize='48px' />
        ) : (
          <FaImage fontSize='24px' />
        )}
      </Flex>
    </Box>
  );
};

export default FormMediaField;
