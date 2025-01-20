import React from 'react';
import { Box, Flex, FormLabel } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  ButtonFieldArrayAddButton,
  KeywordOptionButtonFieldItem,
} from 'components/Shared/SidebarUi';
import { seedID } from 'utils';

const SortableKeywordOptionButtons = ({
  name,
  label = 'Buttons',
  disableDelete = false,
}) => {
  const [field, , helpers] = useField(name);
  const fieldValue = field.value || [];

  const handleAddButton = (arrayHelpers) => {
    arrayHelpers.push({
      id: seedID(),
      text: '',
      sortOrder: fieldValue?.length + 1,
      keywords: [`${fieldValue?.length + 1}`],
    });
  };

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
      const sortedBySortOrder = updatedOrder.map((updatedItem, index) => {
        updatedItem['keywords'][0] = `${index}`;
        return { ...updatedItem, sortOrder: index + 1 };
      });
      helpers.setValue(sortedBySortOrder);
    }
  };

  return (
    <Box width='100%'>
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
                gap={8}
                overflow='hidden'
                whiteSpace='nowrap'
              >
                {fieldValue?.map((fieldItem, index) => (
                  <KeywordOptionButtonFieldItem
                    key={fieldItem.id}
                    id={fieldItem.id}
                    name={`${name}[${index}]`}
                    disableDelete={disableDelete}
                    handleDeleteClick={() => handleDelete(index, arrayHelpers)}
                  />
                ))}
                <ButtonFieldArrayAddButton
                  handleAddButton={() => {
                    handleAddButton(arrayHelpers);
                  }}
                />
              </Flex>
            )}
          />
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export { SortableKeywordOptionButtons };
