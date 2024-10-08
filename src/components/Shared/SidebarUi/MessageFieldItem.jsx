import { Box, Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import { FormMediaField, QuillEditorField } from '../FormUi';
import { FaEdit, FaGripVertical, FaRegCopy, FaTrashAlt } from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function MessageFieldItem({
  index,
  name,
  item,
  fieldValue,
  onOpen,
  handleCopy,
  handleDelete,
  isLastField,
}) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  return (
    <Box
      position='relative'
      ref={setNodeRef}
      key={item.id}
      _hover={{ '.iconGroup': { visibility: 'visible' } }}
      _focusWithin={{ '.iconGroup': { visibility: 'hidden' } }}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        position: isDragging ? 'static' : 'relative',
        zIndex: isDragging ? 1 : 'unset',
      }}
    >
      {item.type === 'message' ? (
        <QuillEditorField
          key={item.id}
          name={`${name}[${index}].message`}
          placeholder='Enter your message'
        />
      ) : (
        <FormMediaField value={fieldValue[index].media} />
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
            onClick={() => {
              onOpen();
            }}
          />
        )}
        <IconButton icon={<FaRegCopy />} onClick={() => handleCopy()} />
        {!isLastField && (
          <IconButton icon={<FaTrashAlt />} onClick={() => handleDelete()} />
        )}
        <IconButton
          icon={<FaGripVertical />}
          label='Drag'
          {...listeners}
          {...attributes}
          style={{ cursor: 'grab' }}
        />
      </Flex>
    </Box>
  );
}

export default MessageFieldItem;
