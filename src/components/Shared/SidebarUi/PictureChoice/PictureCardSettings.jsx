import { Flex } from '@chakra-ui/react';
import React from 'react';
import { FormTextField } from '../../FormUi';
import FileSelector from '../FileSelector';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Icon,
} from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

function PictureCardSettings({
  subFieldName,
  handleFieldItemPropChange,
  fieldValue,
}) {
  return (
    <Flex
      bg={'#8a9ba826'}
      borderRadius={'3px'}
      flex={1}
      padding='10px 12px 9px'
      direction='column'
      gap={5}
      className='button-select-container'
    >
      <FormTextField
        name={`${subFieldName}.text`}
        label='Title'
        placeholder='Choice title'
      />
      <FileSelector
        sectionLabel=''
        imageSrc={fieldValue.image}
        onFileSelect={(image) => {
          handleFieldItemPropChange({
            image,
          });
        }}
      />
      <FormTextField
        name={`${subFieldName}.externalLink`}
        label='External Link'
        placeholder='https://'
      />
      <CustomAccordion
        subFieldName={subFieldName}
        imageSrc={fieldValue.footerImage}
        onFileSelect={(footerImage) => {
          handleFieldItemPropChange({
            footerImage,
          });
        }}
      />
    </Flex>
  );
}

export { PictureCardSettings };

const CustomAccordion = ({ subFieldName, imageSrc, onFileSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <Accordion allowToggle>
      <AccordionItem style={{ border: 'none' }} marginBottom={4}>
        <h2>
          <AccordionButton
            backgroundColor='inherit'
            padding={0}
            width='min-content'
          >
            <Box
              as='span'
              display='flex'
              alignItems='center'
              onClick={handleToggle}
              cursor='pointer'
              color='white'
            >
              <Box as='span' mr={2}>
                Extra Options
              </Box>
              <Icon
                as={FaChevronRight}
                transform={isOpen ? 'rotate(270deg)' : 'rotate(90deg)'}
                transition='transform 0.2s'
              />
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel p={0} marginTop={2}>
          <FormTextField
            name={`${subFieldName}.description`}
            label='Description'
          />
          <FormTextField name={`${subFieldName}.details`} label='Details' />
          <Flex gap={1}>
            <FormTextField
              name={`${subFieldName}.highlighted`}
              label='Highlighted'
            />
            <FormTextField
              name={`${subFieldName}.buttonText`}
              label='Button Text'
            />
          </Flex>
          <FileSelector
            sectionLabel='Image with footer'
            imageSrc={imageSrc}
            onFileSelect={onFileSelect}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
