// App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactFlowProvider } from 'reactflow';
import Canvas from './views/canvas/index';
import { NodeProvider } from './views/canvas/NodeContext'; // Correct import path
import MainApp from './views/Main';

const App = () => {
  return (
    <ReactFlowProvider>
      <ChakraProvider>
        <NodeProvider>
          <MainApp />
          {/* <Canvas /> */}
        </NodeProvider>
      </ChakraProvider>
    </ReactFlowProvider>
  );
};

export default App;
