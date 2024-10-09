import React from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';
import { useDropdownToggle } from './utils/nodeutils';
import NodeDropdownMenu from './NodeDropdownMenu';
import { useNodeContext } from '../../views/canvas/NodeContext';

function BaseEdgeLayout({
  edgeId,
  sourceNodeId,
  onEdgeClick,
  labelX,
  labelY,
  isHover,
  sourceHandleId,
  targetId,
}) {
  const {
    isDropdownVisible,
    toggleDropdown,
    dropdownPosition,
    nodeRef,
    dropdownRef,
  } = useDropdownToggle();
  const { insertNodeFromEdge } = useNodeContext();

  const handleAddNode = (blockId) => {
    toggleDropdown();
    insertNodeFromEdge(edgeId, sourceNodeId, blockId, sourceHandleId, targetId);
  };
  const shown = isHover || isDropdownVisible;

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
        fontSize: 12,
        pointerEvents: 'all',
        display: shown ? 'flex' : 'none',
        gap: '10px',
        top: '10px',
        flexDirection: 'column',
        zIndex: 20,
      }}
      className='nodrag nopan'
      ref={nodeRef}
    >
      <div
        className='icon_dropdown'
        onClick={toggleDropdown}
        style={{
          position: 'relative',
        }}
      >
        <MdAdd />
      </div>
      <div
        className='icon_dropdown'
        onClick={onEdgeClick}
        style={{
          position: 'relative',
        }}
      >
        <MdDelete />
      </div>
      {isDropdownVisible && (
        <NodeDropdownMenu
          handleAddNode={handleAddNode}
          dropdownPosition={dropdownPosition}
          dropdownRef={dropdownRef}
        />
      )}
    </div>
  );
}

export default BaseEdgeLayout;
