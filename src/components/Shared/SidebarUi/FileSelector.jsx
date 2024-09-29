import React, { useState } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import UploadButton from './UploadButton';
import { fetchWrapper } from '../../../utils/fetchWrapper';
import { useNodeContext } from '../../../views/canvas/NodeContext';

const FileSelector = ({ onFileSelect, imageSrc }) => {
  const [file, setFile] = useState(null);
  const { currentNodeId } = useNodeContext();

  const handleFileSelect = (file) => {
    setFile(file);
  };
  const uploadFile = async () => {
    if (!file || !currentNodeId) {
      return;
    }
    const url = `/media/${currentNodeId}`;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetchWrapper({
        url,
        method: 'POST',
        body: formData,
      });
      if (response?.fileUrl) {
        onFileSelect(response?.fileUrl);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleSave = async (tabIndex, data) => {
    switch (tabIndex) {
      case 0:
        uploadFile();
        break;

      case 1:
        onFileSelect(data);
        break;
      case 2:
        onFileSelect(data);
        break;

      default:
    }
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
        <UploadButton onFileSelect={handleFileSelect} onSave={handleSave} />
        {imageSrc && (
          <Box ml='10px'>
            <Image
              src={imageSrc}
              alt='icon'
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
