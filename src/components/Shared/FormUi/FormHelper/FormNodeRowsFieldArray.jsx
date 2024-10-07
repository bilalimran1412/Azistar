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

function FormNodeRowsFieldArray({ name }) {
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
      sortOrder: fieldValue[rowIndex].questions.length + 1,
      type: questionType,
      //this should be options based on type
      //commom in ask question and email
      hint: 'placeholder',

      label: '',
      isRequired: false,
      helpText: '',
      hintText: '',
      name: '',

      //
      //   type ask question and min/max in number
      min: 0,
      max: 99999,

      inputSize: 'short',
      pattern: '',
      errorMessage: 'Please enter a valid value',
      enabledCustomRanges: defaultRange,
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
  return (
    <>
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
                  <React.Fragment key={row.id}>
                    <Box display='flex' flexDirection='column' gap={2}>
                      <FormRowHeader
                        handleAddQuestion={(type) =>
                          handleAddQuestion(index, type)
                        }
                        index={index}
                        subFieldName={`${name}[${index}]`}
                        row={row}
                        isLasItem={isLasItem}
                        handleRowDelete={() => {
                          handleRowDelete(index);
                        }}
                      />
                      {!!row.questions?.length && (
                        <Box display='flex' flexDirection='column' gap={2}>
                          {row.questions.map((question, qIndex) => (
                            <FormQuestionCard
                              question={question}
                              subFieldName={`${name}[${index}].questions[${qIndex}]`}
                              handleQuestionDelete={() => {
                                handleQuestionDelete(index, qIndex);
                              }}
                            />
                          ))}
                          {row.questions?.length === 1 && (
                            <Box
                              width='100%'
                              display='flex'
                              justifyContent='flex-end'
                            >
                              <RowAddItemMenu
                                onAddQuestion={(type) => {
                                  handleAddQuestion(index, type);
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                    <Divider />
                  </React.Fragment>
                );
              })}
            </>
          );
        }}
      />

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
