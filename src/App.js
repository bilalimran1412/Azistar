// App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import MainApp from './views/Main';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <MainApp />
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
