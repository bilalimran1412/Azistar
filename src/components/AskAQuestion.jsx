import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { MdAdd } from 'react-icons/md';
import { useDropdownToggle } from '../utils/nodeutils';
import { useNodeContext } from '../views/canvas/NodeContext';
import NodeDropdownMenu from './NodeDropdownMenu';  // Ensure this component is properly designed

const AskAQuestion = ({ id, data }) => {
  const { isDropdownVisible, toggleDropdown, dropdownPosition, nodeRef } = useDropdownToggle();
  const reactFlowInstance = useReactFlow();
  const { addNewNode } = useNodeContext();
  const handleAddNode = (type) => {
    // Function to add new node connected to this one
    addNewNode(id, data, reactFlowInstance, type);
  };

  return (
    <div className="text-node" ref={nodeRef}>
      <div className="node-content custom-node ask-a-question-node">
        <h4>Ask A Question</h4> 
      </div>
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

export default AskAQuestion;
