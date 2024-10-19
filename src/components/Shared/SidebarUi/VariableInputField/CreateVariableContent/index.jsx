import {
  Box,
  Input,
  Text,
  PopoverContent,
  PopoverBody,
  Button,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import { MdClose } from 'react-icons/md';
import VariableTypeSelection from './VariableTypeSelection';
import { useDropdownStore } from 'zustandStores';

function CreateVariableContent({ inputValue, onClose, setInputValue }) {
  const [type, setType] = React.useState('Select the format');
  const addCustomVariable = useDropdownStore(
    (store) => store.addCustomVariable
  );
  const handleCreate = () => {
    addCustomVariable(inputValue, type);
    onClose();
  };

  return (
    <PopoverContent
      width='100%'
      style={{
        overflow: 'auto',
        maxHeight: '240px',
        borderColor: '#cfd0d1',
        borderRadius: '0 0 3px 3px',
        backgroundColor: '#fff',
        borderTop: 'none',
      }}
    >
      <PopoverBody
        style={{
          padding: 0,
        }}
      >
        <Box
          padding='8px 10px'
          display='flex'
          gap={3}
          flexDirection='column'
          mb={6}
        >
          <Box display='flex' justifyContent='space-between'>
            <Text fontSize='12px' fontWeight='700'>
              CREATE A NEW VARIABLE
            </Text>
            <MdClose cursor='pointer' onClick={onClose} />
          </Box>
          <Divider />
          <Box>
            <Input
              placeholder='Type the name'
              variant='custom'
              value={inputValue}
              onChange={({ target }) => {
                setInputValue(target.value);
              }}
            />
          </Box>
          <Box>
            <VariableTypeSelection setType={setType} type={type} />
          </Box>
          <Box>
            <Button
              variant='solid'
              style={{
                minHeight: 0,
                height: '32px',
                fontSize: '12px',
                padding: '1px',
                color: 'white',

                backgroundColor: 'rgb(215, 55, 107)',
              }}
              width='100%'
              isDisabled={type === 'Select the format'}
              onClick={handleCreate}
            >
              CREATE
            </Button>
          </Box>
        </Box>
      </PopoverBody>
    </PopoverContent>
  );
}

export default CreateVariableContent;
