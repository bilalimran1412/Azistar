import React from 'react';
import { Handle } from 'reactflow';
import { MdAdd } from 'react-icons/md';
import { useDropdownToggle } from '../utils/nodeutils';
import NodeDropdownMenu from './NodeDropdownMenu';
import nodeConfigurations from '../config/nodeConfigurations';
import { useNodeContext } from '../views/canvas/NodeContext';

const BaseNode = ({ id, data, type, label }) => {
  const { isDropdownVisible, toggleDropdown, dropdownPosition, nodeRef, dropdownRef } = useDropdownToggle();
  const { addNewNode } = useNodeContext();  
  const { setCurrentNode, setSideView } = useNodeContext();  

  const config = nodeConfigurations[type] || { title: 'Unknown Node Type', fields: [] };
  
  const placeholderText = config.fields[0]?.placeholder || 'No data available'; 

  const displayLabel = label || data.label || config.title;

  const displayContent = data.textareaFieldData || placeholderText; // Use textareaFieldData or placeholder

  const handleAddNode = (newType) => {
    console.log('Adding node of type:', newType); // Debugging line
    addNewNode(id, newType);
    toggleDropdown();
  };

  const handleClick = () => {
    setCurrentNode({ id, type, data });
    setSideView(true);
  };

  return (
    <div className={`text-node ${type}-node`} ref={nodeRef}>
      <div className="node-content" onClick={handleClick}>
        <h4>{displayLabel}</h4>
        <p>{displayContent}</p> {/* Display content or placeholder text */}
      </div>
      <div className="icon_dropdown" onClick={toggleDropdown}>
        <MdAdd />
      </div>
      {isDropdownVisible && (
        <NodeDropdownMenu
            handleAddNode={handleAddNode}
            dropdownPosition={dropdownPosition}
            dropdownRef={dropdownRef}
        />
      )}
      <Handle
        type="source"
        position="right"
        id={`source-${id}`}
        style={{ background: '#555' }}
      />
      <Handle
        type="target"
        position="left"
        id={`target-${id}`}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default BaseNode;
