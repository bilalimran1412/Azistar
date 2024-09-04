// App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactFlowProvider } from 'reactflow';
import Canvas from './views/canvas/index';
import { NodeProvider } from './views/canvas/NodeContext'; // Correct import path

const App = () => {
  return (
    <ReactFlowProvider>
      <ChakraProvider>
        <NodeProvider>
          <Canvas />
        </NodeProvider>
      </ChakraProvider>
    </ReactFlowProvider>
  );
};

export default App;
