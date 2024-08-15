import React from 'react';
import { Handle, useReactFlow } from 'reactflow'; // Import useReactFlow here
import { MdAdd } from 'react-icons/md';
import { handleDeleteNode, handleAddButton, addNewNode, useDropdownToggle } from '../utils/nodeutils';


const StartingNode = ({ id, data }) => {
  const { isDropdownVisible, toggleDropdown, setDropdownVisible, dropdownPosition, nodeRef } = useDropdownToggle();
  const reactFlowInstance = useReactFlow(); // Call useReactFlow at the top level

  const handleAddNode = (typ) => {
    // handleAddButton(id, data, setDropdownVisible);// enabling side bar , button  
    addNewNode(id, data, reactFlowInstance,typ); // Pass reactFlowInstance to addNewNode
  };

  return (
    <div className="text-node" ref={nodeRef}>
      <div className="node-content custom-node">
        <h4>{data.label}</h4>
      </div>
      <div className="icon_dropdown" onClick={toggleDropdown}>
        <MdAdd />
      </div>
      {isDropdownVisible && (
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
            <div className='box_node' onClick={() => handleAddNode('customNode',)}>
            {console.log(data)}
              <MdAdd />

              {/* addbuton -> sidebar/ -1> customnode */}
              {/*hmare saare nodes*/}

              Add Node
            </div>
            
          </div>
        </div>
      )}
      <Handle type="source" position="right" id={`source-${id}`} />
    </div>
  );
};

export default StartingNode;
