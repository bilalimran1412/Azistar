import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';

const NodeDropdownMenu = ({ handleAddNode, dropdownPosition }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Menu items with types and labels
  const menuItems = [
    { type: 'customNode', label: 'Buttons' },
    { type: 'AskAQuestion', label: 'Ask a question' },
    { type: 'askName', label: 'Ask for a name' },
    { type: 'askEmail', label: 'Ask for an email' },
    { type: 'askPhone', label: 'Ask for a phone' },
    { type: 'askNumber', label: 'Ask for a number' },
    { type: 'askFile', label: 'Ask for a file' },
    { type: 'autoComplete', label: 'Autocomplete' },
    { type: 'askUrl', label: 'Ask for a URL' },
    { type: 'askAddress', label: 'Ask for an address' },
    { type: 'picChoice', label: 'Picture choice' },
    { type: 'rating', label: 'Rating' },
    { type: 'uploadMedia', label: 'Upload a file' }
  ];

  // Filter menu items based on the search query
  const filteredMenuItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="dropdown-menu"
      style={{
        position: 'absolute',
        padding: '10px',
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
      <div className='search_frop'>
        <div className="sc-iGgVNO pcBUt">
          <div className="sc-aYaIB sc-gEvDqW lfziQO hFCtfK">
            <span className="sc-jXbVAB Cxxqa">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="magnifying-glass" className="svg-inline--fa fa-magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"></path>
              </svg>
            </span>
          </div>
          <input 
            placeholder="Search by name"
            className="sc-gsFSjX hwwsqP"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className='selected_dropdown-menu'>
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map(({ type, label }) => (
            <div
              className='menu_btn'
              key={type}
              onClick={() => {
                console.log('Menu item clicked:', type); // Debugging line
                handleAddNode(type);
              }}
              style={{
                padding: '3px',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background-color 0.3s',
                display: 'flex',
                alignItems: 'center',
                fontSize: '15px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <MdAdd style={{ marginRight: '8px', fontSize: '16px' }} />
              {label}
            </div>
          ))
        ) : (
          <div style={{ padding: '10px', textAlign: 'center' }}>
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeDropdownMenu;
