import React, { useState } from 'react';
import { Handle } from 'reactflow';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';
import { useDropdownToggle, handleCopyNode, handleReplaceNode, handleDeleteNode, handleDuplicateNode, handleCopyNodeId } from './utils/nodeutils';
import NodeDropdownMenu from './NodeDropdownMenu';
import NodeActionDropdown from './NodeActionDropdown';
import nodeConfigurations from '../config/nodeConfigurations';
import { useNodeContext } from '../views/canvas/NodeContext';

const BaseNode = ({ id, data, type, label }) => {
  const { isDropdownVisible, toggleDropdown, dropdownPosition, nodeRef, dropdownRef } = useDropdownToggle();
  const { addNewNode, setCurrentNode, setSideView, nodes, setNodes } = useNodeContext();

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showReplaceMenu, setShowReplaceMenu] = useState(false);

  const config = nodeConfigurations[type] || { title: 'Unknown Node Type', fields: [] };

  const placeholderText = config.fields[0]?.placeholder || 'No data available'; 
  const displayLabel = label || data.label || config.title;

  const displayContent = data.textareaFieldData ? { __html: data.textareaFieldData } : { __html: placeholderText };

  const handleAddNode = (newType) => {
    console.log('Adding node of type:', newType);
    addNewNode(id, newType);
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

  return (
    <div className={`text-node ${type}-node`} ref={nodeRef}>
      <div className="node-content" onClick={handleClick}>
        <h4>{displayLabel}</h4>
        <p dangerouslySetInnerHTML={displayContent} />
      </div>
      <div className='drop_down' onClick={() => setIsMenuVisible(!isMenuVisible)}>
        <MdMoreHoriz size={24} />
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
      <div className="icon_dropdown" onClick={toggleDropdown}>
        <MdAdd />
      </div>
      {isDropdownVisible && (
        <NodeDropdownMenu
          handleAddNode={handleAddNode}
          dropdownPosition={dropdownPosition}
          dropdownRef={dropdownRef}
        />
      )}
      <Handle
        type="source"
        position="right"
        id={`source-${id}`}
        style={{ background: '#555' }}
      />
      <Handle
        type="target"
        position="left"
        id={`target-${id}`}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default BaseNode;
