import React from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@reach/menu-button';
import '@reach/menu-button/styles.css'; 

const NodeActionDropdown = ({ onCopy, onReplace, onDelete, onDuplicate, onCopyId, nodeId }) => {
  return (
    <Menu>
      <MenuItems className="dropdown_menu">
        <MenuItem className='btn_node_action' onClick={() => onCopy(nodeId)}>Copy Node</MenuItem>
        <MenuItem className='btn_node_action' onClick={() => onReplace(nodeId)}>Replace Node</MenuItem>
        <MenuItem className='btn_node_action' onClick={() => onDelete(nodeId)}>Delete Node</MenuItem>
        <MenuItem className='btn_node_action' onClick={() => onDuplicate(nodeId)}>Duplicate Node</MenuItem>
        <MenuItem className='btn_node_action' onClick={() => onCopyId(nodeId)}>Copy Block ID</MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default NodeActionDropdown;
