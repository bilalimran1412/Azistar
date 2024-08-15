import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';
import CustomNode from '../../components/CustomNode';
import SideView from '../../components/SideView';
import StartingNode from '../../components/StartingNode';
import ReactFlow, {
  Controls, Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';
import './canvas.css';
import '../../index.css';



// Node type mapping
const nodeTypes = {
  customNode: CustomNode,
  startingNode:StartingNode
};

const Canvas = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [messageForm, setMessageForm] = useState('closeform');
  const [lastNodeId, setLastNodeId] = useState(null);


  

  // Update nodes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Update edges
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Handle connections between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Handle button click within a node
  const handleButtonClick = (nodeId, buttonId) => {
    alert(`Button ${buttonId} clicked on node ${nodeId}`);
  };

  // Show form to add buttons
  const handleAddButton = (nodeId) => {
    setCurrentNodeId(nodeId);
    setIsFormVisible(true);
    setMessageForm('openform');
  };

  // Close the form
  const closeForm = () => {
    setMessageForm('closeform');
    setIsFormVisible(false);
  };

  // Add a new field node
  const addNewField = async () => {
    const newNodeId = (nodes.length + 1).toString();
    const lastNode = nodes[nodes.length - 1];
    const newNode = {
      id: newNodeId,
      data: {
        label: 'New Field',
        buttons: [],
        onButtonClick: handleButtonClick,
        onAddButton: () => handleAddButton(newNodeId),
        buttons: []
      },
      position: lastNode
        ? { x: lastNode.position.x + 30, y: lastNode.position.y + 30 }
        : { x: 250, y: 250 },
      type: 'customNode',
    };

    const newEdge = {
      id: `e${lastNode?.id || '1'}-${newNodeId}`,
      source: lastNode?.id || '1',
      target: newNodeId,
    };

    try {
      const response = await axios.post('http://localhost:3007/v1/addnode', newNode);
      const addedNode = response.data;

      setNodes((prevNodes) => [...prevNodes, addedNode]);
      if (lastNode) {
        setEdges((prevEdges) => [...prevEdges, newEdge]);
      }
    } catch (error) {
      console.error('Error adding node:', error);
    }
  };

  // Initialize with a parent node
  useEffect(() => {
    const initialNode = {
      id: '1',
      data: {
        label: 'This is our parent',
        buttons: [],
        onButtonClick: handleButtonClick,
        onAddButton: () => handleAddButton('1'),
      },
      position: { x: 650, y: 300 },
      type: 'startingNode',
    };

    setNodes([initialNode]);
  }, []);
  
  const fitViewOptions = {
    padding: 0.2,
  };

  return (
    <div className="canvas" style={{ height: '100vh', zIndex: '1000', background: '#454b6b', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // fitView
        fitViewOptions={fitViewOptions}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <Controls />
        <Background variant="dots" />
      </ReactFlow>

      <Button
        onClick={addNewField}
        leftIcon={<MdAdd />}
        className="add-node-button"
      >
        Add New Field
      </Button>

      {isFormVisible && (
        <div className={`newsetmessage ${messageForm} absolute bg-gray-300 w-[400px] rounded-md`}>
          <SideView
            closeForm={closeForm}
            currentNodeId={currentNodeId}
            setNodes={setNodes}
            initialButtons={nodes.find(node => node.id === currentNodeId)?.data?.buttons || []}
          />
        </div>
      )}
    </div>
  );
};

export default Canvas;