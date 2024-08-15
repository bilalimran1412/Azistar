import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Canvas from './views/canvas/index';

const App = () => {
  return (
    <ChakraProvider>
      <Canvas />
    </ChakraProvider>
  );
};

export default App;
