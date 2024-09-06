import { useState, useRef } from 'react';
import { useReactFlow } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

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

// Action Handlers

export const handleCopyNode = (nodeId, nodes, setNodes) => {
  console.log('handleCopyNode called with nodeId:', nodeId);
  const nodeToCopy = nodes.find((node) => node.id === nodeId);
  if (nodeToCopy) {
    const newNode = { 
      ...nodeToCopy, 
      id: uuidv4(), // Generate a new unique ID
      data: { ...nodeToCopy.data, label: `${nodeToCopy.data.label} (Copy)` } // Modify data if needed
    };
    setNodes((nds) => [...nds, newNode]);
  }
};


export const handleReplaceNode = (nodeId, nodes, setNodes, newType) => {
  console.log('handleReplaceNode called with nodeId:', nodeId, 'newType:', newType);
  setNodes((nds) => 
    nds.map((node) => 
      node.id === nodeId
        ? { ...node, type: newType } // Replace the node type
        : node
    )
  );
};


// Delete Node
export const handleDeleteNode = (nodeId, nodes, setNodes) => {
  console.log('handleDeleteNode called with nodeId:', nodeId);
  const nodeExists = nodes.some(node => node.id === nodeId);
  if (nodeExists) {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    console.log('Node deleted:', nodeId);
  } else {
    console.warn('Node not found for deletion:', nodeId);
  }
};


export const handleDuplicateNode = (nodeId, nodes, setNodes) => {
  console.log('handleDuplicateNode called with nodeId:', nodeId);
  const nodeToDuplicate = nodes.find((node) => node.id === nodeId);
  if (nodeToDuplicate) {
    // Calculate new position: Offset by 100 pixels below the original node
    const newPosition = {
      x: nodeToDuplicate.position.x,
      y: nodeToDuplicate.position.y + 100,
    };

    const newNode = { 
      ...nodeToDuplicate, 
      id: uuidv4(), 
      position: newPosition, 
      data: { ...nodeToDuplicate.data, label: `${nodeToDuplicate.data.label} (Copy)` } // Modify data if needed
    };
    console.log('Duplicating node:', newNode); 
    setNodes((nds) => {
      const updatedNodes = [...nds, newNode];
      console.log('Updated nodes:', updatedNodes); 
      return updatedNodes;
    });
  } else {
    console.warn('Node not found for duplication:', nodeId);
  }
};



let copiedNode = null;

export const handleCopyNodeId = (nodeId, nodes) => {
  console.log('handleCopyNodeId called with nodeId:', nodeId);
  const nodeToCopy = nodes.find((node) => node.id === nodeId);
  if (nodeToCopy) {
    navigator.clipboard.writeText(nodeToCopy.id).then(() => {
      alert('Node ID copied to clipboard');
    });
  }
};
