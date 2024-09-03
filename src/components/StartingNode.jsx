import React from 'react';
import { Handle } from 'reactflow';
import { MdAdd } from 'react-icons/md';
import { useDropdownToggle } from '../utils/nodeutils';
import NodeDropdownMenu from './NodeDropdownMenu';
import { useNodeContext } from '../views/canvas/NodeContext';  // Correct the import path

const StartingNode = ({ id, data }) => {
  const { isDropdownVisible, toggleDropdown, dropdownPosition, nodeRef } = useDropdownToggle();
  const { addNewNode } = useNodeContext();  // Correctly extracting from context

  const handleAddNode = (type) => {
    addNewNode(id, type, `New ${type}`);  // Simplified call, assuming you manage types and labels elsewhere
  };

  return (
    <div className="text-node" ref={nodeRef}>
      <div className="node-content custom-node">
        <h4>{data.label}</h4>
        <div className="icon_dropdown" onClick={toggleDropdown}>
          <MdAdd />
        </div>
        {isDropdownVisible && (
          <NodeDropdownMenu
            handleAddNode={handleAddNode}
            data={data}
            dropdownPosition={dropdownPosition}
          />
        )}
        <Handle type="source" position="right" id={`source-${id}`} />
        <Handle type="target" position="left" id={`target-${id}`} />
      </div>
    </div>
  );
};

export default StartingNode;
