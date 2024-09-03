import React, { createContext, useContext, useState, useCallback } from 'react';

const NodeContext = createContext({
  nodes: [],
  edges: [],
  addNewNode: () => {},  // Provide a default no-op function
  setNodes: () => {},
  setEdges: () => {}
});

export const useNodeContext = () => useContext(NodeContext);

export const NodeProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  console.log(nodes);
  const addNewNode = useCallback((sourceId, type, label) => {
    const newNodeId = `node_${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: type,
      position: { x: Math.random() * window.innerWidth * 0.8, y: Math.random() * window.innerHeight * 0.8 },
      data: { label: label || `${type} Node` }
    };

    const newEdge = {
      id: `e${sourceId}-${newNodeId}`,
      source: sourceId,
      target: newNodeId,
      animated: true,
    };

    setNodes(prev => [...prev, newNode]);
    setEdges(prev => [...prev, newEdge]);
    
    
  }, [setNodes, setEdges]);

  return (
    <NodeContext.Provider value={{ nodes, setNodes, edges, setEdges, addNewNode }}>
      {children}
    </NodeContext.Provider>
  );
};
