import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { FaGripVertical, FaTrashAlt } from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormTextField } from 'components/Shared/FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FieldArray, useField } from 'formik';

function KeywordOptionButtonFieldItem({
  name,
  id,
  handleDeleteClick,
  disableDelete,
}) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
  });
  return (
    <Box
      key={id}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        position: isDragging ? 'static' : 'relative',
        zIndex: isDragging ? 1 : 'unset',
      }}
      display='flex'
      flexDirection='column'
      gap={2}
    >
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        backgroundColor='#CD3C79'
        color='white'
        p='5px 10px'
        rounded='3px'
        boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
        paddingLeft='0'
      >
        <Box display='flex' justifyContent='space-around' alignItems='center'>
          <FormTextField
            placeholder='Click to edit'
            name={`${name}.text`}
            autoComplete='off'
            sx={{
              border: 'none',
              outline: 'none',
              height: '14px',
              fontSize: '14px',
            }}
            _active={{
              border: 'none !important',
              outline: 'none !important',
              boxShadow: 'none',
            }}
            _focus={{
              border: 'none !important',
              outline: 'none !important',
              boxShadow: 'none',
            }}
            _placeholder={{
              color: '#ffffff80',
            }}
            maxLength={20}
          />
        </Box>
        <Box display='flex' justifyContent='flex-end' alignItems='center'>
          <UiIconButton
            icon={<FaGripVertical />}
            label='Drag'
            {...listeners}
            {...attributes}
            style={{ cursor: 'grab' }}
          />
          {!disableDelete && (
            <UiIconButton
              icon={<FaTrashAlt />}
              label='Delete'
              onClick={handleDeleteClick}
            />
          )}
        </Box>
      </Box>
      <ButtonKeywords name={`${name}.keywords`} />
    </Box>
  );
}

export { KeywordOptionButtonFieldItem };

function ButtonKeywords({ name }) {
  const [field] = useField(name);
  const fieldValue = field.value || [];

  return (
    <Box width='100%' paddingX='1px'>
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <>
            {fieldValue?.map((_, index) => (
              <ButtonKeywordsFields
                name={`${name}[${index}]`}
                readonly={index === 0}
                onRemove={() => arrayHelpers.remove(index)}
                key={`${name}[${index}]`}
              />
            ))}
            <Box width='100%' height='24px' padding='2px'>
              <Button
                width='100%'
                bgColor='transparent'
                _active={{
                  bgColor: '#545885',
                }}
                _hover={{
                  bgColor: '#545885',
                }}
                height='30px'
                fontSize='14px'
                fontWeight='400'
                color='#fff'
                borderRadius='1px'
                border='1px solid #545885'
                onClick={() => {
                  arrayHelpers.push('');
                }}
              >
                + Add keyword
              </Button>
            </Box>
          </>
        )}
      />
    </Box>
  );
}
function ButtonKeywordsFields({ name, readonly = false, onRemove }) {
  return (
    <Box
      pos='relative'
      _hover={{
        '& .delete': { visibility: 'visible' },
      }}
    >
      <FormTextField
        placeholder='Type the keyword'
        name={`${name}`}
        autoComplete='off'
        containerSx={{
          '& label': {
            display: 'none',
          },
        }}
        sx={{
          border: 'none',
          backgroundColor: '#545885',
          outline: 'none',
          fontSize: '14px',
          height: '28px',
          borderRadius: '1px',
          color: '#fff',
          paddingLeft: '10px',
        }}
        _active={{
          border: 'none !important',
          outline: 'none !important',
          boxShadow: 'none',
        }}
        _focus={{
          border: 'none !important',
          outline: 'none !important',
          boxShadow: 'none',
        }}
        _placeholder={{
          color: '#ffffff80',
        }}
        readonly={readonly}
        _readOnly={{
          opacity: '.6',
        }}
      />
      {!readonly && (
        <Box
          pos='absolute'
          top='0'
          right='5px'
          zIndex={5}
          className='delete'
          visibility='hidden'
        >
          <UiIconButton
            icon={<FaTrashAlt />}
            label='Delete'
            onClick={onRemove}
            style={{ height: '24px', padding: '5px' }}
          />
        </Box>
      )}
    </Box>
  );
}
