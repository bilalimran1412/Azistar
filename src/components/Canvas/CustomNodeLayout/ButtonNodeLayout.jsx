import React from 'react';
import CustomHandle from '../CustomHandle';
import { Box, Text } from '@chakra-ui/react';

function ButtonNodeLayout({ onClick, buttons, id }) {
  return (
    <Box className='item-list'>
      {buttons &&
        buttons.map((item) => (
          <Box key={item.id} className='item-buttons'>
            <Box
              style={{
                display: 'flex',
                gap: '10px',
                opacity: item.text ? '1' : '0.5',
              }}
            >
              <Text>{item.text || 'Add label'}</Text>
            </Box>

            <CustomHandle
              type='source'
              key={item.id}
              id={`source-${id}-${item.id}`}
              onClick={() => onClick(`source-${id}-${item.id}`)}
              styles={{
                right: '-10px',
              }}
            />
          </Box>
        ))}

      <Box key='placeholder' className='placeholder-button'>
        <Text>Any of the above</Text>
        <CustomHandle
          type='source'
          id={`source-placeholder-${id}`}
          onClick={() => onClick(`source-placeholder-${id}`)}
          styles={{
            right: '-10px',
          }}
        />
      </Box>
    </Box>
  );
}

export default ButtonNodeLayout;
