import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import {
  ButtonFieldArrayAddButton,
  FormQuestionCard,
  FormRowHeader,
} from 'components/Shared/SidebarUi';
import { seedID } from 'utils';
import { FieldArray, useField } from 'formik';
import { RowAddItemMenu } from 'components/Shared/SidebarUi/FormNode/AddRowItemMenu';
import { sideViewLayoutType } from 'config/nodeConfigurations';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
const DND_ITEMS_TYPES = {
  PARAMETER: 'question',
  PARAMETER_PAGE: 'row',
};
const findActiveQuestion = (activeItem, fieldValue) => {
  if (!activeItem) {
    return null;
  }
  return fieldValue
    ?.flatMap((row) => row?.questions)
    ?.find((question) => question?.id === activeItem?.id);
};

function FormNodeRowsFieldArray({ name }) {
  const [activeItem, setActiveItem] = React.useState(null);
  const [field, , helpers] = useField(name);
  const arrayHelpersRef = React.useRef(null);
  const fieldValue = field?.value || [];

  const handleAddQuestion = (rowIndex, questionType) => {
    const arrayHelpers = arrayHelpersRef.current;
    if (!arrayHelpers) return;
    const defaultRange = [
      {
        fromDate: '',
        toDate: '',
      },
    ];

    const newQuestion = {
      id: seedID(),
      sortOrder: fieldValue[rowIndex].questions?.length + 1 || 0,
      type: questionType,
      hint: 'placeholder',
      label: '',
      isRequired: false,
      helpText: '',
      hintText: '',
      name: '',
      ...(questionType === sideViewLayoutType.askQuestion && {
        min: 0,
        max: 99999,
        inputSize: 'short',
        pattern: '',
        errorMessage: 'Please enter a valid value',
      }),
      ...(questionType === sideViewLayoutType.date && {
        format: '',
        enabledCustomRanges: defaultRange,
        showDatePicker: false,
        enabledDateType: '',
        enabledDaysOfWeek: [1, 0, 2, 3, 4, 5, 6],
      }),
      ...(questionType === sideViewLayoutType.askNumber && {
        min: 0,
        max: 0,
        format: '',
        prefix: '',
      }),
      ...(questionType === sideViewLayoutType.askPhone && {
        showCountryCodeSelector: false,
      }),
    };
    const isFirstQuestion = !fieldValue[rowIndex].questions?.length;

    arrayHelpers.replace(rowIndex, {
      ...fieldValue[rowIndex],
      layout: isFirstQuestion ? '1' : '1/2',
      questions: [...fieldValue[rowIndex].questions, newQuestion],
    });
  };

  const handleAddRow = () => {
    const arrayHelpers = arrayHelpersRef.current;
    if (!arrayHelpers) return;
    arrayHelpers?.push({
      questions: [],
      layout: '1',
      id: seedID(),
    });
  };

  const handleQuestionDelete = (rowIndex, questionIndex) => {
    const arrayHelpers = arrayHelpersRef.current;
    if (!arrayHelpers) return;

    const updatedQuestions = fieldValue[rowIndex].questions.filter(
      (q, index) => index !== questionIndex
    );

    arrayHelpers.replace(rowIndex, {
      ...fieldValue[rowIndex],
      questions: updatedQuestions,
    });
  };

  const handleRowDelete = (index) => {
    const arrayHelpers = arrayHelpersRef.current;
    if (!arrayHelpers) return;
    arrayHelpers.remove(index);
  };
  const isLasItem = fieldValue?.length === 1;

  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;
    setActiveItem({ id, type: active?.data?.current?.type });
  };

  const handleDragMove = (event) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) {
      return;
    }
    if (
      active.data.current?.type === 'question' &&
      over?.data.current?.type === 'row'
    ) {
      const activeContainer = findValueOfItems(
        active.id,
        DND_ITEMS_TYPES.PARAMETER
      );
      const overContainer = findValueOfItems(
        over.id,
        DND_ITEMS_TYPES.PARAMETER_PAGE
      );

      if (!activeContainer || !overContainer) {
        return;
      }
      const activeContainerIndex = fieldValue?.findIndex(
        (container) => container.id === activeContainer.id
      );

      const overContainerIndex = fieldValue?.findIndex(
        (container) => container?.id === overContainer?.id
      );
      const activeItemIndex = activeContainer.questions?.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...fieldValue];
      const [removedItem] = newItems[activeContainerIndex].questions.splice(
        activeItemIndex,
        1
      );

      newItems[overContainerIndex].questions.push(removedItem);
      helpers.setValue(newItems);
      return;
    }
    if (
      active.data.current?.type === DND_ITEMS_TYPES.PARAMETER &&
      over?.data.current?.type === DND_ITEMS_TYPES.PARAMETER &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(
        active.id,
        DND_ITEMS_TYPES.PARAMETER
      );
      const overContainer = findValueOfItems(
        over.id,
        DND_ITEMS_TYPES.PARAMETER
      );

      if (
        !activeContainer ||
        !overContainer ||
        activeContainer.id === overContainer.id
      ) {
        return;
      }

      const activeContainerIndex = fieldValue?.findIndex(
        (container) => container.id === activeContainer.id
      );

      const overContainerIndex = fieldValue?.findIndex(
        (container) => container?.id === overContainer?.id
      );
      const activeItemIndex = activeContainer.questions?.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = overContainer.questions.findIndex(
        (item) => item.id === over.id
      );
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...fieldValue];
        newItems[activeContainerIndex].questions = arrayMove(
          newItems[activeContainerIndex].questions,
          activeItemIndex,
          overItemIndex
        );

        helpers.setValue(newItems);
      } else {
        let newItems = [...fieldValue];
        const [removedItem] = newItems[activeContainerIndex].questions.splice(
          activeItemIndex,
          1
        );
        newItems[overContainerIndex].questions.splice(
          overItemIndex,
          0,
          removedItem
        );
        helpers.setValue(newItems);
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (
      active.data.current?.type === DND_ITEMS_TYPES.PARAMETER &&
      over?.data.current?.type === DND_ITEMS_TYPES.PARAMETER &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(
        active.id,
        DND_ITEMS_TYPES.PARAMETER
      );
      const overContainer = findValueOfItems(
        over.id,
        DND_ITEMS_TYPES.PARAMETER
      );

      if (!activeContainer || !overContainer) return;
      const activeContainerIndex = fieldValue.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = fieldValue.findIndex(
        (container) => container.id === overContainer.id
      );
      const activeItemIndex = activeContainer.questions.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = overContainer.questions.findIndex(
        (item) => item.id === over.id
      );

      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...fieldValue];
        newItems[activeContainerIndex].questions = arrayMove(
          newItems[activeContainerIndex].questions,
          activeItemIndex,
          overItemIndex
        );

        helpers.setValue(newItems);
      } else {
        let newItems = [...fieldValue];
        const [removedItem] = newItems[activeContainerIndex].questions.splice(
          activeItemIndex,
          1
        );
        newItems[overContainerIndex].questions.splice(
          overItemIndex,
          0,
          removedItem
        );
        helpers.setValue(newItems);
      }
    }
    if (
      active.data.current?.type === DND_ITEMS_TYPES.PARAMETER &&
      over?.data.current?.type === DND_ITEMS_TYPES.PARAMETER_PAGE &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(
        active.id,
        DND_ITEMS_TYPES.PARAMETER
      );
      const overContainer = findValueOfItems(
        over.id,
        DND_ITEMS_TYPES.PARAMETER_PAGE
      );

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = fieldValue.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = fieldValue.findIndex(
        (container) => container.id === overContainer.id
      );
      const activeItemIndex = activeContainer.questions.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...fieldValue];
      const [removedItem] = newItems[activeContainerIndex].questions.splice(
        activeItemIndex,
        1
      );
      newItems[overContainerIndex].questions.push(removedItem);

      helpers.setValue(newItems);
    }
    setActiveItem(null);
  };

  const findValueOfItems = (id, type) => {
    if (type === 'row') {
      return fieldValue?.find((row) => row.id === id);
    }
    if (type === 'question') {
      return fieldValue?.find((row) =>
        row.questions.find((question) => question?.id === id)
      );
    }
  };
  return (
    <>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
      >
        <FieldArray
          name={name}
          render={(arrayHelpers) => {
            if (!arrayHelpersRef.current) {
              arrayHelpersRef.current = arrayHelpers;
            }
            return (
              <>
                {fieldValue?.map((row, index) => {
                  return (
                    <DroppableRowContainer
                      row={row}
                      handleAddQuestion={(type) =>
                        handleAddQuestion(index, type)
                      }
                      isLasItem={isLasItem}
                      index={index}
                      subFieldName={`${name}[${index}]`}
                      handleRowDelete={() => handleRowDelete(index)}
                    >
                      <QuestionSortableContext
                        row={row}
                        subFieldName={`${name}[${index}]`}
                        handleAddQuestion={(type) => {
                          handleAddQuestion(index, type);
                        }}
                        handleQuestionDelete={(qIndex) => {
                          handleQuestionDelete(index, qIndex);
                        }}
                      />
                    </DroppableRowContainer>
                  );
                })}
              </>
            );
          }}
        />
        <DragOverlay>
          <FormQuestionCard
            key={findActiveQuestion(activeItem, fieldValue)?.id}
            id={findActiveQuestion(activeItem, fieldValue)?.id}
            question={findActiveQuestion(activeItem, fieldValue)}
            subFieldName={'preview'}
            handleQuestionDelete={() => {}}
            active={activeItem?.id}
          />
        </DragOverlay>
      </DndContext>

      <Box>
        <ButtonFieldArrayAddButton
          handleAddButton={handleAddRow}
          containerStyles={{
            backgroundColor: '#9CA3AF',
          }}
          buttonStyles={{
            backgroundColor: '#3A3C5D',
          }}
          label='Add a new row'
        />
      </Box>
    </>
  );
}

export default FormNodeRowsFieldArray;

function QuestionSortableContext({
  row,
  subFieldName,
  handleQuestionDelete,
  handleAddQuestion,
}) {
  return (
    <>
      <SortableContext
        items={row.questions.map((q) => q.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box display='flex' flexDirection='column' gap={2}>
          {row.questions.map((question, qIndex) => (
            <FormQuestionCard
              key={question?.id}
              id={question?.id}
              question={question}
              subFieldName={`${subFieldName}.questions[${qIndex}]`}
              handleQuestionDelete={() => {
                handleQuestionDelete(qIndex);
              }}
            />
          ))}
          {row.questions?.length === 1 && (
            <Box width='100%' display='flex' justifyContent='flex-end'>
              <RowAddItemMenu
                onAddQuestion={(type) => {
                  handleAddQuestion(type);
                }}
              />
            </Box>
          )}
        </Box>
      </SortableContext>
    </>
  );
}
function DroppableRowContainer({
  row,
  handleAddQuestion,
  index,
  subFieldName,
  isLasItem,
  handleRowDelete,
  children,
}) {
  const { setNodeRef } = useDroppable({
    id: row?.id,
    data: {
      type: 'row',
    },
  });
  return (
    <React.Fragment key={row.id}>
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
        isOver
        ref={setNodeRef}
      >
        <FormRowHeader
          handleAddQuestion={(type) => handleAddQuestion(type)}
          index={index}
          subFieldName={subFieldName}
          row={row}
          isLasItem={isLasItem}
          handleRowDelete={handleRowDelete}
        />
        {children}
      </Box>
      <Divider />
    </React.Fragment>
  );
}
