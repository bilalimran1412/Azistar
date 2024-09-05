import { useState, useRef } from 'react';
import { useReactFlow } from 'reactflow';



// Function to toggle the visibility of a dropdown

export const useDropdownToggle = (initialState = false) => {
  const [isDropdownVisible, setDropdownVisible] = useState(initialState);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  const toggleDropdown = (event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation(); // Stop event propagation only if event is defined
    }
    setDropdownVisible((prev) => !prev);

    if (nodeRef.current) {
      const nodeRect = nodeRef.current.getBoundingClientRect();
      setDropdownPosition({
        x: 150, // Adjust position as needed
        y: 30,  // Adjust position as needed
      });
    }
  };

  return {
    isDropdownVisible,
    toggleDropdown,
    setDropdownVisible,
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

// // Function to add a new node
// export const addNewNode = (id, data, reactFlowInstance,tp,label) => {
//   const newNode = {
//     id: `${Date.now()}`, 
//     type: tp, 
//     position: { x: 20, y: 30 },
//     data: {
//       label: label,
//       onAddButton: data.onAddButton,
//       onButtonClick: data.onButtonClick,
//       onDeleteNode: () => handleDeleteNode(id, data),
//       buttons: []
//     }
//   };

//   reactFlowInstance.addNodes([newNode]);
// };
