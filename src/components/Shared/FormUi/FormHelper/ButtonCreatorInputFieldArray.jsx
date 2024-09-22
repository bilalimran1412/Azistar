import React from 'react';
import { Box, Flex, FormLabel } from '@chakra-ui/react';
import { FieldArray, useFormikContext } from 'formik';
import {
  ButtonCreatorInput,
  FileSelector,
  IconSelector,
} from '../../SidebarUi';
import FormDropdown from '../FormDropdown';
import FormTextField from '../FormTextField';
import EmojiSelector from '../../SidebarUi/EmojiSelector';

const buttonStyleOptions = [
  {
    value: 'text',
    label: 'Text button',
  },
  {
    label: 'Icon',
    value: 'icon',
  },
  {
    label: 'Emoji',
    value: 'emoji',
  },
  {
    label: 'Image',
    value: 'image',
  },
];

//TODO remove file saving as field. as file must be uploaded.
// todo implement emoji picker

const ButtonCreatorInputFieldArray = ({ label = 'Buttons Editor', name }) => {
  const { values } = useFormikContext();
  const fieldValue = values?.[name] || [];

  const handleAddButton = (arrayHelpers) => {
    arrayHelpers.push({
      text: '',
      buttonStyle: 'text',
      icon: null,
      externalLink: '',
      isSettingExpand: false,
      sortOrder: fieldValue?.length,
    });
  };

  const handleDelete = (index, arrayHelpers) => {
    arrayHelpers.remove(index);
  };

  const isLastItem = fieldValue?.length === 1;

  const handleFieldItemPropChange = (index, arrayHelpers, changedProp) => {
    const fieldItemToUpdate = {
      ...arrayHelpers.form.values[arrayHelpers.name][index],
      file: '',
      icon: '',
      image: '',
      emoji: '',
      ...(changedProp && { ...changedProp }),
    };

    arrayHelpers.replace(index, fieldItemToUpdate);
  };

  return (
    <Box width='100%'>
      <FormLabel>{label}</FormLabel>
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <Flex
            bgColor={'#42456A'}
            padding='10px'
            rounded={'3px'}
            width='100%'
            flex={1}
            direction='column'
            gap={2}
          >
            {fieldValue?.map((fieldItem, index) => (
              <Flex flex={1} gap={2} direction='column' key={index}>
                <ButtonCreatorInput
                  name={`${name}[${index}]`}
                  handleDeleteClick={() => handleDelete(index, arrayHelpers)}
                  hideDelete={isLastItem}
                />
                {fieldItem?.isSettingExpand && (
                  <Flex
                    bg={'#8a9ba826'}
                    borderRadius={'3px'}
                    flex={1}
                    padding='10px 12px 9px'
                    direction='column'
                    gap={5}
                    className='button-select-container'
                  >
                    <FormDropdown
                      name={`${name}[${index}].buttonStyle`}
                      label='Button Style'
                      options={buttonStyleOptions}
                      className='select-hide-empty-option'
                      onChange={(value) => {
                        handleFieldItemPropChange(index, arrayHelpers, {
                          buttonStyle: value || 'text',
                        });
                      }}
                    />
                    {fieldItem?.buttonStyle === 'icon' && (
                      <IconSelector
                        setIcon={(icon) => {
                          handleFieldItemPropChange(index, arrayHelpers, {
                            icon,
                          });
                        }}
                      />
                    )}
                    {fieldItem?.buttonStyle === 'image' && (
                      <FileSelector
                        onFileSelect={(file, image) => {
                          //TODO remove file as we need url after uploading to server
                          handleFieldItemPropChange(index, arrayHelpers, {
                            file,
                            image,
                          });
                        }}
                      />
                    )}
                    {fieldItem?.buttonStyle === 'emoji' && (
                      <EmojiSelector
                        setEmoji={(emoji) => {
                          handleFieldItemPropChange(index, arrayHelpers, {
                            emoji,
                          });
                        }}
                      />
                    )}
                    <FormTextField
                      name={`${name}[${index}].externalLink`}
                      label='External Link'
                      placeholder='https://'
                    />
                  </Flex>
                )}
              </Flex>
            ))}
            <Box
              w={'100%'}
              borderRadius={'15px'}
              bg={'#3A3C5D'}
              minH={'40px'}
              display={'flex'}
              alignItems={'center'}
              textColor={'#fff'}
              style={{ cursor: 'pointer' }}
              gap={'16px'}
              onClick={() => handleAddButton(arrayHelpers)}
            >
              <Box
                width={'40px'}
                height={'40px'}
                bg={'#9CA3AF'}
                borderRadius={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
                display={'flex'}
                textColor={'#000'}
              >
                +
              </Box>
              Add another Button...
            </Box>
          </Flex>
        )}
      />
    </Box>
  );
};

export default ButtonCreatorInputFieldArray;
