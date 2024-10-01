import React from 'react';
import { FormTextField } from '../../FormUi';
import { FaGripVertical, FaRegImage, FaTrashAlt } from 'react-icons/fa';
import { useField } from 'formik';
import { UiIconButton } from '../../UiComponents';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ButtonIconContent from '../ButtonContentIcon';
import { PictureCardSettings, PictureChoicePreview } from '..';
import { Box } from '@chakra-ui/react';

function PictureCardItem({
  name,
  id,
  showOptions = true,
  handleDeleteClick,
  isSortable = false,
  handleFieldItemPropChange,
  handleConfigsClick,
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
    disabled: !isSortable,
  });

  const [field] = useField(name);

  const fieldValue = field?.value;

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
          {fieldValue?.buttonStyle !== 'text' && (
            <ButtonIconContent buttonStyle={'image'} value={field.value} />
          )}
          <FormTextField
            placeholder='Click to edit'
            name={`${name}.text`}
            className='button-input'
            autoComplete='off'
          />
        </Box>
        {showOptions && (
          <Box display='flex' justifyContent='flex-end' alignItems='center'>
            {isSortable && (
              <UiIconButton
                icon={<FaGripVertical />}
                label='Drag'
                {...listeners}
                {...attributes}
                style={{ cursor: 'grab' }}
              />
            )}
            <UiIconButton
              icon={<FaRegImage />}
              label='Config'
              onClick={handleConfigsClick}
            />
            <UiIconButton
              icon={<FaTrashAlt />}
              label='Delete'
              onClick={handleDeleteClick}
            />
          </Box>
        )}
      </Box>
      {fieldValue?.isOpen && (
        <>
          <PictureCardSettings
            subFieldName={name}
            fieldValue={fieldValue}
            handleFieldItemPropChange={(changesValues) => {
              handleFieldItemPropChange(changesValues);
            }}
          />
          <PictureChoicePreview fieldValue={fieldValue} />
        </>
      )}
    </Box>
  );
}

export { PictureCardItem };
