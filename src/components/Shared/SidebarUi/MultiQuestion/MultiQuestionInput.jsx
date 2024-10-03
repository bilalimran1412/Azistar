import { Box } from '@chakra-ui/react';
import React from 'react';
import { FaGear } from 'react-icons/fa6';
import { FaGripVertical, FaTrashAlt } from 'react-icons/fa';
import { useField, useFormikContext } from 'formik';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormTextField } from '../../FormUi';
import { UiIconButton } from '../../UiComponents';
import { MultiQuestionSetting } from './MultiQuestionSetting';

function MultiQuestionInput({
  name,
  id,
  handleDeleteClick,
  fieldItem,
  handleFieldItemPropChange,
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

  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const fieldValue = field?.value;

  const handleSettingClick = () => {
    setFieldValue(`${name}.isOpen`, !fieldValue?.isOpen);
  };
  const required =
    fieldValue?.type !== 'color' ? `${fieldValue.required ? '*' : ''}` : '';
  const inputValue = `${fieldValue?.label || fieldValue?.type}`;
  const defaultInputValue = `${inputValue} ${required}`;
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
        cursor='pointer'
        onClick={handleSettingClick}
      >
        <Box display='flex' justifyContent='space-around' alignItems='center'>
          <FormTextField
            readOnly={true}
            name={`${name}.type`}
            value={defaultInputValue}
            className='button-input'
            autoComplete='off'
            style={{ cursor: 'pointer' }}
          />
        </Box>
        <Box
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
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
            onClick={handleSettingClick}
          />
          <UiIconButton
            icon={<FaTrashAlt />}
            label='Delete'
            onClick={handleDeleteClick}
          />
        </Box>
      </Box>
      {fieldItem?.isOpen && (
        <MultiQuestionSetting
          subFieldName={name}
          fieldValue={fieldValue}
          handleFieldItemPropChange={(changesValues) => {
            handleFieldItemPropChange(changesValues);
          }}
        />
      )}
    </Box>
  );
}

export { MultiQuestionInput };
