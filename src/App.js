// App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import MainApp from './views/Main';
import { BrowserRouter } from 'react-router-dom';
import theme from './config/theme';

const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <MainApp />
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
