import React from 'react';
import { Button, Icon, Box, useDisclosure } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';
import MediaSelectModal from './MediaSelectionModal';

const UploadButton = ({ onFileSelect, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e) => {
    const file = e.target?.files[0];
    if (file) {
      onFileSelect(file);
    }
  };
  const handleSaveAction = (tabIndex, data) => {
    onSave(tabIndex, data);
  };

  return (
    <Box>
      <Button
        bg='white'
        color='black'
        border='1px'
        borderColor='gray.300'
        _hover={{ bg: 'gray.100' }}
        _active={{ bg: 'gray.200' }}
        leftIcon={<Icon as={FaUpload} color='black' />}
        variant='solid'
        p='10px 20px'
        onClick={onOpen}
      >
        Select
      </Button>

      <MediaSelectModal
        onClose={onClose}
        isOpen={isOpen}
        onSaveAction={handleSaveAction}
        onFileSelect={handleChange}
      />
    </Box>
  );
};

export default UploadButton;
