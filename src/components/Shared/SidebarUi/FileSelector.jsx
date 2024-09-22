import React, { useState } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import UploadButton from './UploadButton';

const FileSelector = ({ onFileSelect }) => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      if (onFileSelect) {
        onFileSelect(file, e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Flex
      flexWrap={'wrap'}
      alignItems={'center'}
      minH='50px'
      width={'100%'}
      gap={3}
      bg={'#8a9ba826'}
      borderColor={'gray'}
      borderRadius={'4px'}
      p={'10px 12px 9px'}
    >
      <p
        style={{
          margin: '0',
          padding: '0',
          textAlign: 'start',
          color: 'white',
          width: '100%',
        }}
      >
        Upload an image
      </p>
      <Box display={'flex'} alignItems={'center'} width={'100%'}>
        <UploadButton onFileSelect={handleFileSelect} />
        {imageSrc && (
          <Box ml='10px'>
            <Image
              src={imageSrc}
              alt='Selected'
              boxSize='40px'
              objectFit='cover'
              style={{ borderRadius: '4px' }}
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default FileSelector;
