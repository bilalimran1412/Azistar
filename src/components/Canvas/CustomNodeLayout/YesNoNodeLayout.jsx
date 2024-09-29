import React from 'react';
import CustomHandle from '../CustomHandle';

function YesNoNodeLayout({ onClick, buttons, id }) {
  return (
    <div className='item-list'>
      {buttons &&
        buttons.map((item) => (
          <div key={item.id} className='item-buttons'>
            {item.text || item.buttonStyle !== 'text' ? (
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <span>{item.text}</span>
              </div>
            ) : (
              <span
                style={{
                  color: 'lightgray',
                }}
              >
                Add button label
              </span>
            )}
            <CustomHandle
              type='source'
              key={item.id}
              id={`source-${id}-${item.id}`}
              onClick={() => onClick(`source-${id}-${item.id}`)}
              styles={{
                right: '-10px',
              }}
            />
          </div>
        ))}

      <div key='placeholder' className='placeholder-button'>
        <span>Any of the above</span>
        <CustomHandle
          type='source'
          id={`source-placeholder-${id}`}
          onClick={() => onClick(`source-placeholder-${id}`)}
          styles={{
            right: '-10px',
          }}
        />
      </div>
    </div>
  );
}

export default YesNoNodeLayout;
