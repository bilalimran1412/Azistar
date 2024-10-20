import { Box, Icon, IconButton, Image } from '@chakra-ui/react';
import React from 'react';
import { FormTextField } from '../FormUi';
import { FaGear } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import { useField, useFormikContext } from 'formik';
import { buttonCreatorIcons } from '../../../config/constant';

//TODO image should be URL but cannot upload it to server as backend work is on halt
// See File selector in fieldArray component
const ButtonIconContent = ({ buttonStyle, value }) => {
  return (
    <Box display='flex' alignItems='center'>
      {buttonStyle === 'icon' && value?.icon && (
        <Icon as={buttonCreatorIcons[value?.icon]} boxSize={4} marginLeft={2} />
      )}

      {buttonStyle === 'image' && value?.image && (
        <Image src={value?.image} boxSize='32px' marginLeft={2} />
      )}
      {buttonStyle === 'emoji' && value?.emoji && (
        <Box fontSize='16px' marginLeft={2}>
          {value?.emoji}
        </Box>
      )}
    </Box>
  );
};

function ButtonCreatorInput({
  name,
  showOptions = true,
  hideDelete = false,
  handleDeleteClick,
}) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const fieldValue = field?.value;

  const handleSettingClick = () => {
    setFieldValue(`${name}.isSettingExpand`, !fieldValue?.isSettingExpand);
  };

  return (
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
          className='button-input'
        />
      </Box>
      {showOptions && (
        <Box display='flex' justifyContent='flex-end' alignItems='center'>
          <IconButton
            aria-label='Settings'
            icon={<FaGear />}
            background='none'
            color='white'
            cursor='pointer'
            style={{
              padding: 0,
              margin: 0,
              border: 'none',
            }}
            onClick={handleSettingClick}
          />
          {!hideDelete && (
            <IconButton
              aria-label='Delete'
              icon={<FaTrashAlt />}
              background='none'
              color='white'
              cursor='pointer'
              onClick={handleDeleteClick}
              style={{
                padding: 0,
                margin: 0,
                border: 'none',
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
}

export default ButtonCreatorInput;
