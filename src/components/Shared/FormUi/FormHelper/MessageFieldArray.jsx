import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import QuillEditorField from '../QuillEditorField';
import FormMediaField from '../FormMediaField';
import { FaPlus, FaEdit, FaRegCopy, FaTrashAlt } from 'react-icons/fa';

const MessageFieldArray = ({ name, label }) => {
  const { values } = useFormikContext();

  const fieldValue = values?.[name];

  const handleAddMessage = (arrayHelpers) => {
    arrayHelpers.push({
      type: 'message',
      message: '',
      sortOrder: fieldValue?.length,
    });
  };

  const handleAddMedia = (arrayHelpers) => {
    arrayHelpers.push({
      type: 'media',
      media: null,
      sortOrder: fieldValue?.length,
    });
  };

  const handleDelete = (index, arrayHelpers) => {
    arrayHelpers.remove(index);
  };

  const handleCopy = (index, arrayHelpers) => {
    arrayHelpers.insert(index + 1, { ...fieldValue?.[index] });
  };

  const isLastField = fieldValue?.length === 1;

  const openFileSelector = (mediaFieldName) => {
    document.getElementById(`fileInput-${mediaFieldName}`).click();
  };

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <VStack align='stretch'>
          <FormLabel>{label}</FormLabel>
          {(fieldValue || [])?.map((item, index) => (
            <Box
              position='relative'
              key={index}
              _hover={{ '.iconGroup': { visibility: 'visible' } }}
              _focusWithin={{ '.iconGroup': { visibility: 'hidden' } }}
            >
              {item.type === 'message' ? (
                <QuillEditorField
                  name={`${name}[${index}].message`}
                  placeholder='Enter your message'
                />
              ) : (
                <FormMediaField name={`${name}[${index}].media`} />
              )}
              <Flex
                className='iconGroup'
                pos='absolute'
                top='5px'
                right='10px'
                gap={1}
                visibility='hidden'
              >
                {item.type !== 'message' && (
                  <IconButton
                    icon={<FaEdit />}
                    onClick={() => openFileSelector(`${name}[${index}].media`)}
                  />
                )}
                <IconButton
                  icon={<FaRegCopy />}
                  onClick={() => handleCopy(index, arrayHelpers)}
                />
                {!isLastField && (
                  <IconButton
                    icon={<FaTrashAlt />}
                    onClick={() => handleDelete(index, arrayHelpers)}
                  />
                )}
              </Flex>
            </Box>
          ))}
          <Divider my={4} />
          <Flex gap={3}>
            <Button
              colorScheme='black'
              onClick={() => handleAddMessage(arrayHelpers)}
              variant='outline'
              p={3}
              h={2}
              fontSize='small'
              leftIcon={<FaPlus />}
            >
              Add Message
            </Button>
            <Button
              colorScheme='black'
              onClick={() => handleAddMedia(arrayHelpers)}
              variant='outline'
              p={3}
              h={2}
              fontSize='small'
              leftIcon={<FaPlus />}
            >
              Add Media
            </Button>
          </Flex>
        </VStack>
      )}
    />
  );
};

export default MessageFieldArray;
