import React, { useCallback, useEffect } from 'react';
import {
    CustomNode, askName, askPhone, askNumber, askEmail, autoComplete, picChoice
    , rating, askUrl, askAddress, uploadMedia, askFile
} from '../../components/CustomNode';
import StartingNode from '../../components/StartingNode';
import AskAQuestion from '../../components/AskAQuestion';
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
    askFile: askFile,
    autoComplete: autoComplete,
    picChoice: picChoice,
    askUrl: askUrl,
    askAddress: askAddress,
    rating: rating,
    uploadMedia: uploadMedia,
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

