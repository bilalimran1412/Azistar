import React, { createContext, useContext, useState, useCallback } from 'react'
import { edgeType, initialNode } from '../../config/constant'
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations'
import { v4 as uuidv4 } from 'uuid';

const NodeContext = createContext({
  nodes: [],
  edges: [],
  addNewNode: () => { },
  setNodes: () => { },
  setEdges: () => { },
  setSideView: () => { },
  currentNodeId: null,
  setCurrentNodeId: () => { },
  getNodeById: () => { },
  updateNodeById: () => { },
})

export const useNodeContext = () => useContext(NodeContext)

export const NodeProvider = ({ children }) => {
  const [nodes, setNodes] = useState([initialNode])
  const [edges, setEdges] = useState([])
  const [sideViewVisible, setSideViewVisible] = useState(false) // State to control SideView visibility
  const [currentNodeId, setCurrentNodeId] = useState('')

  const addNewNode = useCallback(
    (sourceId, blockId, sourceHandleId) => {
      const nodeToCreate = nodeConfigurationBlockIdMap[blockId]
      const sourceNode = nodes.find(n => n.id === sourceId)
      const newNodeId = uuidv4()
      setCurrentNodeId(newNodeId)

      const position = { x: sourceNode.position.x + 400 || 100, y: sourceNode.position.y || 20 }
      const newNode = {
        ...nodeToCreate, id: newNodeId, position: position, type: nodeToCreate.nodeType, data: {
          ...nodeToCreate?.data,
          blockId: nodeToCreate.blockId,
        }
      }

      const newEdge = {
        id: `e${sourceId}-${newNodeId}`,
        source: sourceId,
        target: newNodeId,
        animated: true,
        type: edgeType,
        ...(sourceHandleId && { sourceHandle: `source-${sourceHandleId}` }),
      }

      setNodes((prev) => [...prev, newNode])
      setEdges((prev) => [...prev, newEdge])
      setSideViewVisible(true) // Show SideView
    },
    [nodes]
  )

  const setSideView = (visible) => {
    setSideViewVisible(visible)
  }

  const getNodeById = React.useCallback((nodeID) => {
    return nodes.find(node => node.id === nodeID)
  }, [nodes])

  const updateNodeById = React.useCallback((nodeID, updatedNodeData) => {
    setNodes(prevNodes =>
      prevNodes.map(n =>
        n.id === nodeID ? { ...n, data: { ...n.data, ...updatedNodeData, isReplaced: false } } : n
      )
    );
  }, [])
  return (
    <NodeContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        addNewNode,
        setSideView, // Expose the function
        currentNodeId,
        setCurrentNodeId,
        sideViewVisible,
        getNodeById,
        updateNodeById
      }}
    >
      {children}
    </NodeContext.Provider>
  )
}
