import React from 'react';
import { Box, Button, Flex, FormLabel } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { ListButtonFieldItem } from 'components/Shared/SidebarUi';
import { seedID } from 'utils';

const SortableListButtons = ({ name, label = 'Section and Item' }) => {
  const [field, , helpers] = useField(name);
  const fieldValue = field.value || [];

  const handleDelete = (index, arrayHelpers) => {
    arrayHelpers.remove(index);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !fieldValue?.length) {
      return;
    }

    if (active.id !== over.id) {
      const draggedIndex = fieldValue?.findIndex(
        (item) => item.id === `${active.id}`
      );
      const overIndex = fieldValue?.findIndex(
        (item) => item.id === `${over.id}`
      );
      const updatedOrder = arrayMove(fieldValue, draggedIndex, overIndex);
      const sortedBySortOrder = updatedOrder.map((updatedItem, index) => ({
        ...updatedItem,
        sortOrder: index + 1,
      }));
      helpers.setValue(sortedBySortOrder);
    }
  };

  const handleAddItem = (arrayHelpers) => {
    arrayHelpers.push({
      id: seedID(),
      text: '',
      description: '',
      value: '',
      sortOrder: fieldValue?.length + 1,
      isCategory: false,
    });
  };

  const handleAddSection = (arrayHelpers) => {
    arrayHelpers.push({
      id: seedID(),
      text: '',
      sortOrder: fieldValue?.length + 1,
      isCategory: true,
    });
  };

  return (
    <Box
      width='100%'
      sx={{
        '& .item': {
          width: '95%',
          alignSelf: 'flex-end',
        },
        // '& .category': {
        //   mt: '20px !important',
        // },
        // '& .category:first-of-type': {
        //   mt: 0,
        // },
      }}
    >
      <FormLabel variant='h2'>{label}</FormLabel>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={fieldValue?.map((option) => option.id) || []}
        >
          <FieldArray
            name={name}
            render={(arrayHelpers) => (
              <Flex
                bgColor={'#42456A'}
                padding='10px'
                rounded={'3px'}
                width='100%'
                direction='column'
                gap={3}
                overflow='hidden'
                whiteSpace='nowrap'
              >
                {fieldValue?.map((fieldItem, index) => (
                  <ListButtonFieldItem
                    key={fieldItem.id}
                    id={fieldItem.id}
                    isCategory={fieldItem?.isCategory}
                    name={`${name}[${index}]`}
                    handleDeleteClick={() => handleDelete(index, arrayHelpers)}
                  />
                ))}
                <Flex flexDir='column' gap='12px'>
                  <Button
                    className='item'
                    borderRadius='4px'
                    textColor='#fff'
                    variant='outline'
                    _hover={{
                      bgColor: 'lightgray',
                    }}
                    onClick={() => handleAddItem(arrayHelpers)}
                  >
                    Add new Item
                  </Button>
                  <Button
                    borderRadius='4px'
                    textColor='#fff'
                    variant='outline'
                    _hover={{
                      bgColor: 'lightgray',
                    }}
                    bgColor='#9ca3af'
                    onClick={() => handleAddSection(arrayHelpers)}
                  >
                    Add new section
                  </Button>
                </Flex>
              </Flex>
            )}
          />
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export { SortableListButtons };
