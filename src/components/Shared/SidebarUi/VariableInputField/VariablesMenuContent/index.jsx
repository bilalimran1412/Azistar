import React from 'react';

import { PopoverContent, PopoverBody } from '@chakra-ui/react';
import CustomMenuList from './CustomMenuList';

function VariablesMenuContent({
  value,
  handleOptionClick,
  allowedType,
  onCreateClick,
}) {
  return (
    <PopoverContent
      onMouseDown={(e) => e.preventDefault()}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      width='100%'
      style={{
        overflow: 'auto',
        maxHeight: '240px',
        borderColor: '#cfd0d1',
        borderRadius: '0 0 3px 3px',
        backgroundColor: '#fff',
        borderTop: 'none',
      }}
    >
      <PopoverBody
        style={{
          padding: 0,
        }}
      >
        <CustomMenuList
          value={value}
          handleOptionClick={handleOptionClick}
          allowedType={allowedType}
          onCreateClick={onCreateClick}
        />
      </PopoverBody>
    </PopoverContent>
  );
}
export default VariablesMenuContent;
