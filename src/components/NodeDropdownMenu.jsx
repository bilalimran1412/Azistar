// NodeDropdownMenu.jsx
import React from 'react';
import { MdAdd } from 'react-icons/md';

const NodeDropdownMenu = ({ handleAddNode, dropdownPosition }) => {
  const menuItems = [
    { type: 'customNode', label: 'Buttons' },
    { type: 'AskAQuestion', label: 'Ask a question' },
    { type: 'askName', label: 'Ask for a name' },
    { type: 'askEmail', label: 'Ask for a email' },
    { type: 'askPhone', label: 'Ask for a phone' },
    { type: 'askNumber', label: 'Ask for a number' },
    { type: 'autoComplete', label: 'Autocomplete' },
    { type: 'askUrl', label: 'Ask for a url' },
    { type: 'askAddress', label: 'Ask for an address' },
    { type: 'picChoice', label: 'Picture choice' },
    { type: 'rating', label: 'Rating' },

  ];

  return (
    <div
      className="dropdown-menu"
      style={{
        position: 'absolute',
        padding: '10px 10px',
        top: dropdownPosition.y,
        left: dropdownPosition.x,
        zIndex: 10,
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        minWidth: '220px'
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
            alignItems: 'center',
            fontSize: '16px',
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
