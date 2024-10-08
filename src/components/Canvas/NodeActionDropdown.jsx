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
  const handleMenuClick = (event) => {
    event.stopPropagation();
  };
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FiMoreHorizontal />}
        variant='outline'
        onClick={handleMenuClick}
      />
      <MenuList>
        <MenuItem onClick={() => onCopy(nodeId)}>Copy Node</MenuItem>
        <MenuItem onClick={() => onReplace(nodeId)}>Replace Node</MenuItem>
        <MenuItem onClick={() => onDelete(nodeId)}>Delete Node</MenuItem>
        <MenuItem onClick={() => onDuplicate(nodeId)}>Duplicate Node</MenuItem>
        <MenuItem onClick={() => onCopyId(nodeId)}>Copy Block ID</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NodeActionDropdown;
