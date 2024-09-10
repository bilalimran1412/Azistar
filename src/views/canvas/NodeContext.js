import React, { createContext, useContext, useState, useCallback } from 'react'
import { buttonNodeData, edgeType } from '../../config/constant'

const NodeContext = createContext({
  nodes: [],
  edges: [],
  addNewNode: () => {},
  setNodes: () => {},
  setEdges: () => {},
  setSideView: () => {}, // Function to control SideView visibility
  currentNode: null,
  setCurrentNode: () => {},
})

export const useNodeContext = () => useContext(NodeContext)

export const NodeProvider = ({ children }) => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [sideViewVisible, setSideViewVisible] = useState(false) // State to control SideView visibility
  const [currentNode, setCurrentNode] = useState(null)

  const addNewNode = useCallback(
    (sourceId, type, label, sourceHandleId) => {
      const newNodeId = `node_${Date.now()}`
      const data =
        type === 'customNode'
          ? { label: label || `${type} Node`, ...buttonNodeData }
          : { label: label || `${type} Node` }
      const newNode = {
        id: newNodeId,
        type: type,
        position: {
          x: Math.random() * window.innerWidth * 0.8,
          y: Math.random() * window.innerHeight * 0.8,
        },
        data: data,
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
      setCurrentNode(newNode)
      setSideViewVisible(true) // Show SideView
    },
    [setNodes, setEdges, setCurrentNode]
  )

  const setSideView = (visible) => {
    setSideViewVisible(visible)
  }

  return (
    <NodeContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        addNewNode,
        setSideView, // Expose the function
        currentNode,
        setCurrentNode,
        sideViewVisible, // Provide the state for visibility
      }}
    >
      {children}
    </NodeContext.Provider>
  )
}
