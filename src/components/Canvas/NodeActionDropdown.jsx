import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';

const NodeActionDropdown = ({
  onCopy,
  onReplace,
  onDelete,
  onDuplicate,
  onCopyId,
  nodeId,
}) => {
  return (
    <Menu closeOnBlur={true}>
      <MenuButton
        as={IconButton}
        icon={<FiMoreHorizontal />}
        variant='outline'
        sx={{
          minW: 0,
          border: 'none',
          h: '22px',
          p: 1,
        }}
      />
      <MenuList>
        <MenuItem onClick={onCopy}>Copy Node</MenuItem>
        <MenuItem onClick={onReplace}>Replace Node</MenuItem>
        <MenuItem onClick={onDelete}>Delete Node</MenuItem>
        <MenuItem onClick={onDuplicate}>Duplicate Node</MenuItem>
        <MenuItem onClick={onCopyId}>Copy Block ID</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NodeActionDropdown;
