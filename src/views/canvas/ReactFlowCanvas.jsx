import React, { useCallback, useEffect } from 'react';
import { CustomNode } from '../../components/CustomNode';

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
    baseNode: CustomNode,

};


const ReactFlowCanvas = () => {
    const { nodes, setNodes, edges, setEdges, } = useNodeContext();

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



    return (
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
    );
};

export default ReactFlowCanvas;

