import React from 'react';
import { MdAdd } from 'react-icons/md';

const NodeDropdownMenu = ({ handleAddNode, data, dropdownPosition }) => {
  return (
    <div
      className="selected_dropdown-main"
      style={{
        position: 'absolute',
        top: dropdownPosition.y,
        left: dropdownPosition.x,
        zIndex: 10,
      }}
    >
      <div className='selected_dropdown-menu'>
        <div className='box_node' onClick={() => handleAddNode('customNode')}>
      
          <MdAdd />
          Custom Node
        </div>
      </div>
      <div className='selected_dropdown-menu'>
        <div className='box_node' onClick={() => handleAddNode('askAQuestion')}>
     
          <MdAdd />
          Ask A Question        </div>
      </div>
      <div className='selected_dropdown-menu'>
        <div className='box_node' onClick={() => handleAddNode('customNode')}>
          <MdAdd />
          Add Node
        </div>
      </div>
    </div>
  );
};

export default NodeDropdownMenu;
