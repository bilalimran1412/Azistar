import { Box, Icon, Text } from '@chakra-ui/react';
import { FaGripVertical, FaTrash } from 'react-icons/fa';
import { questionTypes } from './data';
import React from 'react';
import { FormNodePortal } from './FormNodePortal';

export function FormQuestionCard({
  question,
  handleQuestionDelete,
  subFieldName,
}) {
  const questionConfig = questionTypes?.find(
    (type) => type.layoutType === question?.type
  );

  return (
    <>
      <Box
        backgroundColor='rgb(255, 255, 255)'
        borderRadius='3px'
        padding='12px 8px'
        border='2px solid rgb(99, 97, 240)'
        alignItems='center'
        position='relative'
        color='inherit'
        display='flex'
        flexDirection='row'
        lineHeight='20px'
        cursor='pointer'
        key={question.id}
      >
        <Box padding={2.5}>
          <Icon as={questionConfig.icon} />
        </Box>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          flex={1}
        >
          <Box>
            <Text>{questionConfig?.title}</Text>
            <Text fontSize='small'>{question?.label}</Text>
          </Box>
          <Box display='flex' gap={2}>
            <Icon color='lightgray' fontSize='larger'>
              <FaGripVertical />
            </Icon>
            <FormNodePortal
              type={questionConfig.layoutType}
              subFieldName={subFieldName}
            />
            <Icon
              color='lightgray'
              fontSize='larger'
              onClick={handleQuestionDelete}
            >
              <FaTrash />
            </Icon>
          </Box>
        </Box>
      </Box>
    </>
  );
}
