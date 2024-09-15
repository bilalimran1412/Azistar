import React, { useState } from 'react';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';
import { useDropdownToggle, handleCopyNode, handleReplaceNode, handleDuplicateNode, handleCopyNodeId } from './utils/nodeutils';
import NodeDropdownMenu from './NodeDropdownMenu';
import NodeActionDropdown from './NodeActionDropdown';
import { contentType, nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { useNodeContext } from '../../views/canvas/NodeContext';
import TargetHandle from './TargetHandle';
import { initialNode } from '../../config/constant';
import { Handle } from '@xyflow/react';

const BaseNode = (props) => {
  const { id, data, type } = props
  const { isDropdownVisible, toggleDropdown, dropdownPosition, nodeRef, dropdownRef } = useDropdownToggle();
  const { addNewNode, setCurrentNodeId, setSideView, nodes, handleAddNewNode, handleNodeRemove } = useNodeContext();
  const [handleId, setHandleId] = React.useState("")

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showReplaceMenu, setShowReplaceMenu] = useState(false);

  const config = nodeConfigurationBlockIdMap[data.blockId]
  const placeholderText = config?.fields?.[0]?.placeholder || 'No data available';

  const displayLabel = data.label || config.title;

  const displayContent = data.textareaFieldData ? { __html: data.textareaFieldData } : { __html: placeholderText };

  const handleAddNode = (blockId) => {
    addNewNode(id, blockId, handleId);
    toggleDropdown();
  };
  const isStartingNode = config?.data?.contentType === contentType.startingNode
  const isMultiHandleNode = config?.data?.multipleHandles
  const isButtonNode = config?.data?.contentType === contentType.buttonNode
  const customHandles = !isButtonNode ? config?.customHandle : []
  const disableSourceHandle = config?.data?.contentType === contentType.incomingOnly
  const disableAllHandles = config?.data?.contentType === contentType.placeholderNodes

  const handleClick = () => {
    if (isStartingNode) {
      return
    }
    setCurrentNodeId(id);
    setSideView(true);
  };

  const handleAction = (actionType) => {
    setIsMenuVisible(false);

    switch (actionType) {
      case 'copy':
        handleCopyNode(id, nodes, handleAddNewNode);
        break;
      case 'replace':
        setShowReplaceMenu(true); // Show replacement menu
        break;
      case 'delete':
        setSideView(false)
        handleNodeRemove(id)
        break;
      case 'duplicate':
        handleDuplicateNode(id, nodes, handleAddNewNode);
        break;
      case 'copyId':
        handleCopyNodeId(id, nodes);
        break;
      default:
        break;
    }
  };

  const handleReplaceNodeType = (blockId) => {
    handleReplaceNode(id, nodes, handleAddNewNode, blockId); // Pass newType for replacement
    setShowReplaceMenu(false);
  };

  const NodeIcon = isStartingNode ? initialNode.icon : config?.icon

  const onClick = (id) => {
    setHandleId(id)
    toggleDropdown()
  }

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
          {!isStartingNode &&
            (
              <div className='drop_down' onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsMenuVisible(!isMenuVisible)
              }}>
                <MdMoreHoriz size={24} />
              </div>
            )}
        </div>
        {isMultiHandleNode && (
          <div className="item-list">
            {data.items && data.items.map((item) => (
              <div key={item.id} className="item-buttons">
                <span>{item.label}</span>
                <div
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onClick(item.id)
                  }}
                >
                  <Handle
                    type='source'
                    position='right'
                    id={`source-${item.id}`}
                    style={{
                      background: '#4AB8B3',
                      padding: '10px',
                      right: '-10px',
                      cursor: "pointer"
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '3px',
                        left: '3px',
                        pointerEvents: 'none',

                      }}
                    >
                      <MdAdd />
                    </div>
                  </Handle>
                </div>
              </div>
            ))}
            {isButtonNode && <div key="placeholder" className="placeholder-button">
              <span>Any of the above</span>
              <div
                onClick={() => {
                  onClick(`placeholder-${id}`)
                }}
              >
                <Handle
                  type='source'
                  position='right'
                  id={`source-placeholder-${id}`}
                  style={{
                    background: '#4AB8B3',
                    padding: '10px',
                    right: '-10px',
                    color: "#fff",
                    cursor: "pointer"
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
            </div>}
          </div>
        )}
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

      {isDropdownVisible && (
        <NodeDropdownMenu
          handleAddNode={handleAddNode}
          dropdownPosition={dropdownPosition}
          dropdownRef={dropdownRef}
        />
      )}
      {(!isMultiHandleNode && !disableSourceHandle && !disableAllHandles) && (
        <div
          onClick={
            toggleDropdown
          }
        >
          <Handle
            type='source'
            position='right'
            style={{
              background: '#4AB8B3',
              padding: '10px',
              right: '0',
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: '3px',
                pointerEvents: 'none',
                fontSize: "14px",
                color: "white"
              }}
            >
              <MdAdd />
            </div>
          </Handle>
        </div>
      )}
      {!!customHandles && customHandles.map((handle, idx) =>
        <div
          onClick={() => {
            onClick(handle.id)
          }}
        >
          <Handle
            type='source'
            position='right'
            id={`source-${handle.id}`}
            style={{
              background: handle.type === "success" ? '#4AB8B3' : "#d7376b",
              padding: '10px',
              right: '-10px',
              cursor: "pointer",
              top: `${(idx * 30) + 15}px`
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: '3px',
                pointerEvents: 'none',
                fontSize: "14px",
                color: "white"
              }}
            >
              <MdAdd />
            </div>
          </Handle>
        </div>
      )}

      {
        (!isStartingNode && !disableAllHandles) &&
        <TargetHandle
          id={id}
        />
      }
    </div >
  );
};

export default BaseNode;
