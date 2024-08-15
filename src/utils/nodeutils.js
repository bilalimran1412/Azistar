import { useState, useRef } from 'react';
import { useReactFlow } from 'reactflow';



// Function to toggle the visibility of a dropdown
export const useDropdownToggle = (initialState = false) => {
  const [isDropdownVisible, setDropdownVisible] = useState(initialState);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

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

  return {
    isDropdownVisible,
    toggleDropdown,
    setDropdownVisible, // Make sure this is returned
    dropdownPosition,
    nodeRef,
  };
};

// Function to handle node deletion
export const handleDeleteNode = (id, data) => {
  if (window.confirm('Are you sure you want to delete this node?')) {
    if (typeof data.onDeleteNode === 'function') {
      data.onDeleteNode(id);
    } else {
      console.error('onDeleteNode is not a function');
    }
  }
};




// Function to handle adding a button
export const handleAddButton = (id, data, setDropdownVisible) => {
  setDropdownVisible(false);
  if (typeof data.onAddButton === 'function') {
    data.onAddButton(id);
  } else {
    console.error('onAddButton is not a function');
  }
};

// Function to add a new node
export const addNewNode = (id, data, reactFlowInstance,tp) => {
  const newNode = {
    id: `${Date.now()}`, 
    type: tp, 
    position: { x: 20, y: 30 },
    data: {
      label: `New Node`,
      onAddButton: data.onAddButton,
      onButtonClick: data.onButtonClick,
      onDeleteNode: () => handleDeleteNode(id, data),
      buttons: []
    }
  };

  reactFlowInstance.addNodes([newNode]);
};
