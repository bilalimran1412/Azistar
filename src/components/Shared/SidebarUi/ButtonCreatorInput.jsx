import { Box } from '@chakra-ui/react';
import React from 'react';
import { FormTextField } from '../FormUi';
import { FaGear } from 'react-icons/fa6';
import { FaGripVertical, FaTrashAlt } from 'react-icons/fa';
import { useField, useFormikContext } from 'formik';
import { UiIconButton } from '../UiComponents';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ButtonFieldArraySettings from './ButtonFieldArraySettings';
import ButtonIconContent from './ButtonContentIcon';

function ButtonCreatorInput({
  name,
  id,
  showOptions = true,
  hideDelete = false,
  handleDeleteClick,
  isSortable = false,
  fieldItem,
  handleFieldItemPropChange,
  showExternalLinkField,
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

  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const fieldValue = field?.value;

  const handleSettingClick = () => {
    setFieldValue(`${name}.isSettingExpand`, !fieldValue?.isSettingExpand);
  };

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
            <ButtonIconContent
              buttonStyle={fieldValue?.buttonStyle}
              value={field.value}
            />
          )}
          <FormTextField
            placeholder='Click to edit'
            name={`${name}.text`}
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
              icon={<FaGear />}
              label='Settings'
              onClick={handleSettingClick}
            />
            {!hideDelete && (
              <UiIconButton
                icon={<FaTrashAlt />}
                label='Delete'
                onClick={handleDeleteClick}
              />
            )}
          </Box>
        )}
      </Box>
      {fieldItem?.isSettingExpand && (
        <ButtonFieldArraySettings
          subFieldName={`${name}`}
          showExternalLinkField={showExternalLinkField}
          fieldValue={fieldValue}
          fieldItem={fieldItem}
          handleFieldItemPropChange={(changesValues) => {
            handleFieldItemPropChange(changesValues);
          }}
        />
      )}
    </Box>
  );
}

export default ButtonCreatorInput;
