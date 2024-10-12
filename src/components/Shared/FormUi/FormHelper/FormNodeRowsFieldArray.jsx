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
  const [field] = useField(name);
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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeRowIndex = fieldValue.findIndex((row) =>
      row.questions.some((question) => question.id === activeId)
    );
    const overRowIndex = fieldValue.findIndex((row) =>
      row.questions.some((question) => question.id === overId)
    );

    if (activeRowIndex === overRowIndex) {
      // Reorder within the same row
      const activeQuestionIndex = fieldValue[
        activeRowIndex
      ].questions.findIndex((question) => question.id === activeId);
      const overQuestionIndex = fieldValue[overRowIndex].questions.findIndex(
        (question) => question.id === overId
      );
      const updatedQuestions = arrayMove(
        fieldValue[activeRowIndex].questions,
        activeQuestionIndex,
        overQuestionIndex
      );
      arrayHelpersRef.current.replace(activeRowIndex, {
        ...fieldValue[activeRowIndex],
        questions: updatedQuestions,
      });
    } else {
      const activeQuestion = fieldValue[activeRowIndex].questions.find(
        (question) => question.id === activeId
      );
      const updatedActiveRowQuestions = fieldValue[
        activeRowIndex
      ].questions.filter((question) => question.id !== activeId);
      const updatedOverRowQuestions = [
        ...fieldValue[overRowIndex].questions,
        activeQuestion,
      ];

      arrayHelpersRef.current.replace(activeRowIndex, {
        ...fieldValue[activeRowIndex],
        questions: updatedActiveRowQuestions,
      });
      arrayHelpersRef.current.replace(overRowIndex, {
        ...fieldValue[overRowIndex],
        questions: updatedOverRowQuestions,
      });
    }
  };
  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;
    setActiveItem({ id });
  };

  const handleDragMove = (event) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) {
      return;
    }
    console.log(active, over, fieldValue);
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
  const { setNodeRef } = useDroppable({ id: row?.id });
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
