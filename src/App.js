import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Canvas from './views/canvas/index';
import { ReactFlowProvider } from 'reactflow';

const App = () => {
  return (
    <ReactFlowProvider>
    <ChakraProvider>
      <Canvas />
    </ChakraProvider>
    </ReactFlowProvider>
  );
};

export default App;
