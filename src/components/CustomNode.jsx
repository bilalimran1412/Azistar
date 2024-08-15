import React, { useState, useRef } from 'react';
import { Handle } from 'reactflow';
import { Button } from '@chakra-ui/react';
import { MdAdd, MdDelete } from 'react-icons/md';
import { useReactFlow } from 'reactflow';


const CustomNode = ({ id, data }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);
  const reactFlowInstance = useReactFlow();

  // Function to toggle the visibility of the dropdown menu
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownVisible(!isDropdownVisible);

    if (nodeRef.current) {
      const nodeRect = nodeRef.current.getBoundingClientRect();
      setDropdownPosition({
        x: 130,
        y: 100,
      });
    }
  };

  // Function to handle node deletion
  const handleDeleteNode = () => {
    if (window.confirm('Are you sure you want to delete this node?')) {
      if (typeof data.onDeleteNode === 'function') {
        data.onDeleteNode(id);
      } else {
        console.error('onDeleteNode is not a function');
      }
    }
  };

  // Function to handle adding a button
  const handleAddButton = () => {
    setDropdownVisible(false);
    console.log("in custom node",data)
    if (typeof data.onAddButton === 'function') {
      data.onAddButton(id);
    } else {
      console.error('onAddButton is not a function');
    }
  };

  // Function to add a new node
  const addNewNode = () => {
    const newNode = {
      id: `${Date.now()}`, 
      type: 'customNodes', 
      position: { x: 20, y: 30 },
      data: {
        label: `New Node`,
        onAddButton: data.onAddButton,
        onButtonClick: data.onButtonClick,
        onDeleteNode: handleDeleteNode,
        buttons: []
      }
    };

    reactFlowInstance.addNodes([newNode]);
  };

  return (
    <div className="custom-node" ref={nodeRef}>
      <div className="node-content">
        <div className="node-header">
          <h4>{data.label}</h4>
          <Button
            className="delete-button"
            onClick={handleDeleteNode}
            size="sm"
            variant="ghost"
            colorScheme="red"
            aria-label="Delete node"
          >
            <MdDelete />
          </Button>
        </div>
        <div className="buttons-container">
          {data.buttons?.map((button, index) => (
            <div key={button.id} className="button-handle-container">
              <Button onClick={() => data.onButtonClick(id, button.id)}>
                {button.label}
              </Button>
              <MdAdd 
                type="source" 
                position="right" 
                id={`handle-${id}-${button.id}`} 
                style={{ top: `${(index + 1) * 10}px` }} // Adjusts the position for each handle
              />
            </div>
          ))}
        </div>
        <Button onClick={handleAddButton}>Add Button</Button>
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
            <div className='search_frop'>
              <div className="sc-iGgVNO pcBUt">
                <div className="sc-aYaIB sc-gEvDqW lfziQO hFCtfK">
                  <span className="sc-jXbVAB Cxxqa">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="magnifying-glass" className="svg-inline--fa fa-magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor" d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"></path>
                    </svg>
                  </span>
                </div>
                <input placeholder="Search by name" className="sc-gsFSjX hwwsqP" />
              </div>
            </div>
            <div className='selected_dropdown-menu'>
              <div className='box_node' onClick={() => {
                handleAddButton(); 
                addNewNode(); 
              }}>
                <span className="sc-jXbVAB iRxoOW">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 35.5556C40 38.01 38.01 40 35.5556 40H4.44444C1.99 40 0 38.01 0 35.5556V4.44444C0 1.99 1.99 0 4.44444 0H35.5556C38.01 0 40 1.99 40 4.44444V35.5556Z" fill="#3B88C3"></path>
                    <path d="M20.0001 32.2223C26.7502 32.2223 32.2223 26.7502 32.2223 20.0001C32.2223 13.2499 26.7502 7.77783 20.0001 7.77783C13.2499 7.77783 7.77783 13.2499 7.77783 20.0001C7.77783 26.7502 13.2499 32.2223 20.0001 32.2223Z" fill="white"></path>
                  </svg>
                </span>
                <Button fontSize="sm" me="0px" borderRadius="16px" fontWeight="500">Buttons</Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Handle type="target" position="left" />
    </div>
  );
};

// Default props to avoid undefined function errors
CustomNode.defaultProps = {
  data: {
    label: 'Default Label',
    onDeleteNode: () => {},
    onAddButton: () => {},
    onButtonClick: () => {},
    buttons: [],
  },
};

export default CustomNode;