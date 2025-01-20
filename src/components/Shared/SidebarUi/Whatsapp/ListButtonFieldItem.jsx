import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { FaGripVertical, FaTrashAlt } from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormTextField } from 'components/Shared/FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaGear } from 'react-icons/fa6';

function ListButtonFieldItem({ name, id, handleDeleteClick, isCategory }) {
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
      {isCategory ? (
        <CategoryContent
          listeners={listeners}
          attributes={attributes}
          name={name}
          handleDeleteClick={handleDeleteClick}
        />
      ) : (
        <ItemContent
          listeners={listeners}
          attributes={attributes}
          name={name}
          handleDeleteClick={handleDeleteClick}
        />
      )}
    </Box>
  );
}

export { ListButtonFieldItem };

function ItemContent({ listeners, attributes, name, handleDeleteClick }) {
  return (
    <Flex className='item' flexDir='column'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        color='white'
        backgroundColor='#CD3C79'
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
          <UiIconButton
            icon={<FaGear />}
            label='Settings'
            // onClick={handleSettingClick}
          />
          <UiIconButton
            icon={<FaTrashAlt />}
            label='Delete'
            onClick={handleDeleteClick}
          />
        </Box>
      </Box>
      {false && <Box>setting</Box>}{' '}
    </Flex>
  );
}

function CategoryContent({ listeners, attributes, name, handleDeleteClick }) {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      backgroundColor='#6361f0'
      color='white'
      p='5px 10px'
      rounded='3px'
      boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
      paddingLeft='0'
      mt='20px'
      className='category'
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
        <UiIconButton
          icon={<FaTrashAlt />}
          label='Delete'
          onClick={handleDeleteClick}
        />
      </Box>
    </Box>
  );
}
