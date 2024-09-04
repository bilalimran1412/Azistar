// NodeDropdownMenu.jsx
import React from 'react';
import { MdAdd } from 'react-icons/md';

const NodeDropdownMenu = ({ handleAddNode, dropdownPosition }) => {
  const menuItems = [
    { type: 'customNode', label: 'Custom Node' },
    { type: 'askQuestion', label: 'Ask A Question' },
    { type: 'startingNode', label: 'Starting Node' }
  ];

  return (
    <div
      className="dropdown-menu"
      style={{
        position: 'absolute',
        top: dropdownPosition.y,
        left: dropdownPosition.x,
        zIndex: 10,
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '8px',
        minWidth: '150px'
      }}
    >
      {menuItems.map(({ type, label }) => (
        <div
          key={type}
          onClick={() => {
            console.log('Menu item clicked:', type); // Debugging line
            handleAddNode(type);
          }}
          style={{
            padding: '8px',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <MdAdd style={{ marginRight: '8px', fontSize: '16px' }} />
          {label}
        </div>
      ))}
    </div>
  );
};

export default NodeDropdownMenu;
