import { Box, Button, Image, Input, Select } from '@chakra-ui/react';
import React from 'react';
import { FaGear } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import { PiDotsSixVertical } from 'react-icons/pi';
import { FaCameraRetro } from 'react-icons/fa';
import { useState } from 'react';
import UploadButton from './UploadButton';
// Custom button component
export const RedButton = ({ btnText }) => {
  const [selectedOption, setSelectedOption] = useState('icon');
  const [selected, setSelected] = useState('option1');
  const [imageSrc, setImageSrc] = useState(null);
  const [toggle, setToggle] = useState(true);

  const handleFileSelect = (fileUrl) => {
    setImageSrc(fileUrl);
  };
  // TODO MODIFY LINE 60 FOR INPUT FIELD
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          backgroundColor: '#42456A',
          width: '100%',
          padding: '8px',
        }}
      >
        <Box
          w='100%'
          color='white'
          style={{ backgroundColor: '#CD3C79' }}
          textAlign='left'
          h={'40px'}
          p={'10px 20px'}
          rounded={'6px'}
          mb={'16px'}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box
              display={'flex'}
              gap={'4'}
              justifyContent={'space-around'}
              alignItems={'center'}
            >
              <FaCameraRetro style={{ color: 'white' }} />

              <Box>{btnText || 'Text here'}</Box>
            </Box>
            <Box
              display={'flex'}
              gap={'10px'}
              justifyContent={'flex-end'}
              alignItems={'center'}
            >
              <div
                style={{
                  padding: 0,
                  margin: 0,
                  border: 'none',
                  width: 'auto',
                  cursor: 'pointer',
                }}
              >
                <PiDotsSixVertical style={{ color: 'white' }} />
              </div>
              <div
                style={{
                  padding: 0,
                  margin: 0,
                  border: 'none',
                  width: 'auto',
                  cursor: 'pointer',
                }}
                onClick={() => setToggle(!toggle)}
              >
                <FaGear style={{ color: 'white' }} />
              </div>
              <div
                style={{
                  padding: 0,
                  margin: 0,
                  border: 'none',
                  width: 'auto',
                  cursor: 'pointer',
                }}
              >
                <FaTrashAlt style={{ color: 'white' }} />
              </div>
            </Box>
          </Box>
        </Box>
        {toggle && (
          <Box
            bg={'#4D5273'}
            p={'6px'}
            display={'flex'}
            flexDir={'column'}
            borderRadius={'5px'}
          >
            <Box w={'100%'}>
              <label for='' style={{ color: 'white', marginBottom: '8px' }}>
                Button Style
              </label>
              <Box
                bgColor='transparent'
                w={'100%'}
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                mb={'16px'}
              >
                <Select
                  placeholder='Select option'
                  variant='outline'
                  style={{ borderColor: '1px solid white' }}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  value={selectedOption}
                >
                  <optgroup label='File Related Options'>
                    <option value='icon'>icons</option>
                    <option value='image'>Open File</option>
                    <option value='saveFile'>Save File</option>
                  </optgroup>
                  <optgroup label='Button Related Options'>
                    <option value='submitButton'>Submit Button</option>
                    <option value='resetButton'>Reset Button</option>
                    <option value='cancelButton'>Cancel Button</option>
                  </optgroup>
                </Select>
              </Box>
            </Box>

            {/* Select Icon Button */}

            <Box
              display={selectedOption === 'icon' && toggle ? 'flex' : 'none'}
              flexWrap={'wrap'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              minH='50px'
              px='8px'
              fontSize='14px'
              fontWeight='semibold'
              width={'100%'}
              gap={'8px'}
              bg={'#4D5273'}
              border={'1px'}
              borderColor={'gray'}
              borderRadius={'4px'}
              p={'8px'}
              overflow={'hidden'}
              overflowY={'scroll'}
              h={'80px'}
              mb={'16px'}
            >
              <Button
                _hover={{ bg: '#fff' }}
                as={'text'}
                p={'0'}
                m={'0'}
                width={'30px'}
                height={'30px'}
                bg={'transparent'}
              >
                <FaGear />
              </Button>
              <Button
                _hover={{ bg: '#fff' }}
                as={'text'}
                p={'0'}
                m={'0'}
                width={'30px'}
                height={'30px'}
                bg={'transparent'}
              >
                <FaGear />
              </Button>
              <Button
                _hover={{ bg: '#fff' }}
                as={'text'}
                p={'0'}
                m={'0'}
                width={'30px'}
                height={'30px'}
                bg={'transparent'}
              >
                <FaGear />
              </Button>
              <Button
                _hover={{ bg: '#fff' }}
                as={'text'}
                p={'0'}
                m={'0'}
                width={'30px'}
                height={'30px'}
                bg={'transparent'}
              >
                <FaGear />
              </Button>
              <Button
                _hover={{ bg: '#fff' }}
                as={'text'}
                p={'0'}
                m={'0'}
                width={'30px'}
                height={'30px'}
                bg={'transparent'}
              >
                <FaGear />
              </Button>
              <Button
                _hover={{ bg: '#fff' }}
                as={'text'}
                p={'0'}
                m={'0'}
                width={'30px'}
                height={'30px'}
                bg={'transparent'}
              >
                <FaGear />
              </Button>
              <Button
                _hover={{ bg: '#fff' }}
                as={'text'}
                p={'0'}
                m={'0'}
                width={'30px'}
                height={'30px'}
                bg={'transparent'}
              >
                <FaGear />
              </Button>
              <Button
                _hover={{ bg: '#fff' }}
                as={'text'}
                p={'0'}
                m={'0'}
                width={'30px'}
                height={'30px'}
                bg={'transparent'}
              >
                <FaGear />
              </Button>
            </Box>
            {selectedOption === 'icon' && (
              <Box
                display={'flex'}
                flexDir={'column'}
                justifyContent={'flex-start'}
                alignItems={'center'}
              >
                <label
                  for='link'
                  style={{
                    color: 'white',
                    marginBottom: '8px',
                    display: 'block',
                    width: '100%',
                    textAlign: 'start',
                  }}
                >
                  External Link
                </label>
                <Input
                  placeholder='https://'
                  size='md'
                  width='100%'
                  style={{
                    paddingBottom: '7.5px',
                    paddingTop: '7.5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </Box>
            )}
          </Box>
        )}

        {/* Upload file button */}

        <Box
          display={selectedOption === 'image' && toggle ? 'flex' : 'none'}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          minH='50px'
          fontSize='14px'
          fontWeight='semibold'
          width={'100%'}
          gap={'8px'}
          bg={'#4D5273'}
          borderColor={'gray'}
          borderRadius={'4px'}
          p={'8px'}
          mb={'16px'}
        >
          <p
            style={{
              margin: '0',
              padding: '0',
              marginBottom: '8px',
              textAlign: 'start',
              color: 'white',
              width: '100%',
            }}
          >
            Upload an image
          </p>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            width={'100%'}
            mb={'16px'}
          >
            <UploadButton onFileSelect={handleFileSelect} />

            {imageSrc && (
              <Box ml='10px'>
                <Image
                  src={imageSrc}
                  alt='Selected'
                  boxSize='40px'
                  objectFit='cover'
                  style={{ borderRadius: '4px' }}
                />
              </Box>
            )}
          </Box>

          <label
            for='link'
            style={{
              color: 'white',
              marginBottom: '8px',
              display: 'block',
              textAlign: 'start',
              width: '100%',
            }}
          >
            External Link
          </label>
          <Input
            placeholder='https://'
            size='md'
            width='100%'
            style={{
              paddingBottom: '7.5px',
              paddingTop: '7.5px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </Box>

        {/* Add Button */}

        <Box
          w={'100%'}
          borderRadius={'15px'}
          bg={'#3A3C5D'}
          minH={'40px'}
          display={'flex'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          textColor={'#fff'}
          style={{ cursor: 'pointer', fontSize: '9px' }}
          gap={'16px'}
          mt={'16px'}
        >
          <Box
            width={'40px'}
            height={'40px'}
            bg={'#9CA3AF'}
            borderRadius={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            display={'flex'}
            fontSize={'16px'}
            textColor={'#000'}
          >
            +
          </Box>
          Add another Button...
        </Box>
      </div>

      {/* Bottom Section */}
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        w={'100%'}
        gap={'1rem'}
        flexDirection={'column'}
        mt={'20px'}
      >
        <Box
          bg={'#E5E7EA'}
          rounded={'2px'}
          style={{ fontSize: '11px' }}
          w={'100%'}
          p={'8px'}
        >
          <p>Press ⚙️ to set up icons/images/URLs to the buttons</p>{' '}
        </Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'100%'}
          gap={'1rem'}
        >
          <p style={{ fontSize: '11px' }}>Buttons alignment</p>
          <Box display='flex' bg={'#D0D7DD'} p={'2px'} borderRadius={'2px'}>
            <Button
              onClick={() => setSelected('option1')}
              borderRadius='8px'
              fontWeight={'smaller'}
              color={selected === 'option1' ? 'white' : 'black'}
              style={{
                backgroundColor: selected === 'option1' ? 'white' : '#D0D7DD',
                border: 'none',
                fontSize: '11px',
                textTransform: 'uppercase',
              }}
              bg={'#D0D7DD'}
            >
              Option 1
            </Button>
            <Button
              onClick={() => setSelected('option2')}
              borderRadius='8px'
              fontWeight={'smaller'}
              color={selected === 'option2' ? 'white' : 'black'}
              style={{
                backgroundColor: selected === 'option2' ? 'white' : '#D0D7DD',
                border: 'none',
                fontSize: '11px',
                textTransform: 'uppercase',
              }}
            >
              Option 2
            </Button>
          </Box>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'100%'}
          gap={'1rem'}
        >
          <p style={{ fontSize: '11px' }}>Randomize order</p>
          <Box display='flex' bg={'#D0D7DD'} p={'2px'} borderRadius={'2px'}>
            <Button
              onClick={() => setSelected('no')}
              borderRadius='8px'
              fontWeight={'smaller'}
              color={selected === 'no' ? 'white' : 'black'}
              style={{
                backgroundColor: selected === 'no' ? 'white' : '#D0D7DD',
                border: 'none',
                fontSize: '11px',
                textTransform: 'uppercase',
              }}
              bg={'#D0D7DD'}
            >
              No
            </Button>
            <Button
              onClick={() => setSelected('yes')}
              borderRadius='8px'
              fontWeight={'smaller'}
              color={selected === 'yes' ? 'white' : 'black'}
              style={{
                backgroundColor: selected === 'yes' ? 'white' : '#D0D7DD',
                border: 'none',
                fontSize: '11px',
                textTransform: 'uppercase',
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'100%'}
          gap={'1rem'}
        >
          <p style={{ fontSize: '11px' }}>Searchable Options</p>
          <Box display='flex' bg={'#D0D7DD'} p={'2px'} borderRadius={'2px'}>
            <Button
              onClick={() => setSelected('no')}
              borderRadius='8px'
              fontWeight={'smaller'}
              color={selected === 'no' ? 'white' : 'black'}
              style={{
                backgroundColor: selected === 'no' ? 'white' : '#D0D7DD',
                border: 'none',
                fontSize: '11px',
                textTransform: 'uppercase',
              }}
              bg={'#D0D7DD'}
            >
              No
            </Button>
            <Button
              onClick={() => setSelected('yes')}
              borderRadius='8px'
              fontWeight={'smaller'}
              color={selected === 'yes' ? 'white' : 'black'}
              style={{
                backgroundColor: selected === 'yes' ? 'white' : '#D0D7DD',
                border: 'none',
                fontSize: '11px',
                textTransform: 'uppercase',
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
        <hr style={{ height: '1px', backgroundColor: '#ccc', width: '100%' }} />
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'100%'}
          gap={'1rem'}
        >
          <p style={{ fontSize: '11px' }}>Multiple Choices</p>
          <Box display='flex' bg={'#D0D7DD'} p={'2px'} borderRadius={'2px'}>
            <Button
              onClick={() => setSelected('no')}
              borderRadius='8px'
              fontWeight={'smaller'}
              color={selected === 'no' ? 'white' : 'black'}
              style={{
                backgroundColor: selected === 'no' ? 'white' : '#D0D7DD',
                border: 'none',
                fontSize: '11px',
                textTransform: 'uppercase',
              }}
              bg={'#D0D7DD'}
            >
              No
            </Button>
            <Button
              onClick={() => setSelected('yes')}
              borderRadius='8px'
              fontWeight={'smaller'}
              color={selected === 'yes' ? 'white' : 'black'}
              style={{
                backgroundColor: selected === 'yes' ? 'white' : '#D0D7DD',
                border: 'none',
                fontSize: '11px',
                textTransform: 'uppercase',
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
        {/* <CustomDropdown /> */}
      </Box>
    </div>
  );
};
