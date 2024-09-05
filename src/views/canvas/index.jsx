import React, { useCallback, useEffect } from 'react';
import { CustomNode, askName, askPhone, askNumber, askEmail, autoComplete, picChoice
  , rating, askUrl, askAddress
 } from '../../components/CustomNode';

import SideView from '../../components/SideView';
import StartingNode from '../../components/StartingNode';
import AskAQuestion from '../../components/AskAQuestion';
import NodeDropdownMenu from '../../components/NodeDropdownMenu';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './canvas.css';
import '../../index.css';

import { useNodeContext } from './NodeContext';

const nodeTypes = {
  customNode: CustomNode,
  startingNode: StartingNode,
  AskAQuestion: AskAQuestion,
  askName: askName,
  askPhone: askPhone,
  askNumber: askNumber,
  askEmail: askEmail,
  autoComplete: autoComplete,
  picChoice: picChoice,
  askUrl: askUrl,
  askAddress: askAddress,
  rating: rating
};

const Canvas = () => {
  const { nodes, setNodes, edges, setEdges, setSideView, currentNode, sideViewVisible } = useNodeContext();
  const [dropdownPosition, setDropdownPosition] = React.useState({ x: 0, y: 0 });
  const [showDropdown, setShowDropdown] = React.useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddNode = (type) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: type },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      type,
    };
    
    setNodes((nds) => [...nds, newNode]);
  };

  const closeForm = () => {
    console.log('Attempting to close SideView');
    if (typeof setSideView === 'function') {
      setSideView(false);
      console.log('setSideView executed');
    } else {
      console.error('setSideView is not a function');
    }
  };

  useEffect(() => {
    const initialNode = {
      id: '1',
      data: {
        label: 'This is our parent',
        buttons: [],
      },
      position: { x: 650, y: 300 },
      type: 'startingNode',
    };

    setNodes([initialNode]);
  }, [setNodes]);

  return (
    <div className="canvas" style={{ height: '100vh', zIndex: '1000', background: '#454b6b', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitViewOptions={{ padding: 0.2 }}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <Controls />
        <Background variant="dots" />
      </ReactFlow>

      {sideViewVisible && currentNode && (
        <div className="newsetmessage absolute bg-gray-300 w-[400px] rounded-md">
          <SideView 
            closeForm={closeForm}
            nodeType={currentNode.type}
            currentNodeId={currentNode.id}
            setNodes={setNodes}
          />
        </div>
      )}

      {showDropdown && (
        <NodeDropdownMenu 
          handleAddNode={handleAddNode}
          dropdownPosition={dropdownPosition}
        />
      )}
    </div>
  );
};

export default Canvas;
