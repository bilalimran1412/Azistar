import React, { useState } from 'react';
import { Handle } from 'reactflow';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';
import { useDropdownToggle, handleCopyNode, handleReplaceNode, handleDeleteNode, handleDuplicateNode, handleCopyNodeId } from './utils/nodeutils';
import NodeDropdownMenu from './NodeDropdownMenu';
import NodeActionDropdown from './NodeActionDropdown';
import nodeConfigurations from '../config/nodeConfigurations';
import { useNodeContext } from '../views/canvas/NodeContext';
import icons from '../config/nodeIcons';

const MultiHandleBaseNode = ({ id, data, type, label }) => {
  const { isDropdownVisible, toggleDropdown, dropdownPosition, nodeRef, dropdownRef } = useDropdownToggle();
  const { addNewNode, setCurrentNode, setSideView, nodes, setNodes } = useNodeContext();

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showReplaceMenu, setShowReplaceMenu] = useState(false);
  const [handleId, setHandleId] = React.useState("")

  const config = nodeConfigurations[type] || { title: 'Unknown Node Type', fields: [] };

  const placeholderText = config.fields[0]?.placeholder || 'No data available';
  const displayLabel = label || data.label || config.title;

  const displayContent = data.textareaFieldData ? { __html: data.textareaFieldData } : { __html: placeholderText };

  const handleAddNode = (newType) => {
    console.log('Adding node of type:', newType);
    addNewNode(id, newType, undefined, handleId);
    toggleDropdown();
  };

  const handleClick = () => {
    setCurrentNode({ id, type, data });
    setSideView(true);
  };

  const handleAction = (actionType) => {
    setIsMenuVisible(false);
    switch (actionType) {
      case 'copy':
        handleCopyNode(id, nodes, setNodes);
        break;
      case 'replace':
        setShowReplaceMenu(true); // Show replacement menu
        break;
      case 'delete':
        handleDeleteNode(id, nodes, setNodes);
        break;
      case 'duplicate':
        handleDuplicateNode(id, nodes, setNodes);
        break;
      case 'copyId':
        handleCopyNodeId(id, nodes);
        break;
      default:
        break;
    }
  };

  const handleReplaceNodeType = (newType) => {
    handleReplaceNode(id, nodes, setNodes, newType); // Pass newType for replacement
    setShowReplaceMenu(false);
  };
  const NodeIcon = icons[type] || null; // Default to null if type not found
  const isCustomNode = type === 'customNode'

  return (
    <div className={`text-node ${type}-node`} ref={nodeRef}>
      <div className="node-content" onClick={handleClick}>
        <div className='node_outer'>
          <div className='icon_different'>
            {NodeIcon}
          </div>
          <div className='node_date'>
            <h4>{displayLabel}</h4>
            <p dangerouslySetInnerHTML={displayContent} />
          </div>
          <div className='drop_down' onClick={() => setIsMenuVisible(!isMenuVisible)}>
            <MdMoreHoriz size={24} />
          </div>
        </div>
        <div className="item-list">
          {data.items && data.items.map((item) => (
            <div key={item.id} className="item-buttons">
              <span>{item.label}</span>
              <div
                onClick={() => {
                  toggleDropdown()
                  setHandleId(item.id)
                }}
              >
                <Handle
                  type='source'
                  position='right'
                  id={`source-${item.id}`}
                  style={{
                    background: '#4AB8B3',
                    padding: '10px',
                    right: '-20px',
                    cursor:"pointer"
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '3px',
                      left: '3px',
                      pointerEvents: 'none',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <MdAdd />
                  </div>
                </Handle>
              </div>
            </div>
          ))}
           <div key="placeholder" className="placeholder-button">
              <span>Any of the above</span>
              <div
                onClick={() => {
                  toggleDropdown()
                  setHandleId("placeholder")
                }}
              >
                <Handle
                  type='source'
                  position='right'
                  id='source-placeholder'
                  style={{
                    background: '#4AB8B3',
                    padding: '10px',
                    right: '-20px',
                    color:"#fff",
                    cursor:"pointer"
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '3px',
                      left: '3px',
                      pointerEvents: 'none',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <MdAdd />
                  </div>
                </Handle>
              </div>
            </div>
        </div>
      </div>

      {isMenuVisible && (
        <NodeActionDropdown
          onCopy={() => handleAction('copy')}
          onReplace={() => handleAction('replace')}
          onDelete={() => handleAction('delete')}
          onDuplicate={() => handleAction('duplicate')}
          onCopyId={() => handleAction('copyId')}
        />
      )}
      {showReplaceMenu && (
        <NodeDropdownMenu
          handleAddNode={handleReplaceNodeType}
          dropdownPosition={dropdownPosition}
          dropdownRef={dropdownRef}
        />
      )}
      {!isCustomNode && (
        <div className="icon_dropdown" onClick={toggleDropdown}>
          <MdAdd />
        </div>
      )}
      {isDropdownVisible && (
        <NodeDropdownMenu
          handleAddNode={handleAddNode}
          dropdownPosition={dropdownPosition}
          dropdownRef={dropdownRef}
        />
      )}
      {!isCustomNode && (<Handle
        type="source"
        position="right"
        id={`source-${id}`}
        style={{ background: '#555' }}
      />)}
      <Handle
        type="target"
        position="left"
        id={`target-${id}`}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default MultiHandleBaseNode;
