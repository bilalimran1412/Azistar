// App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import MainApp from '../views/Main';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Canvas = () => {
  return (
    <Layout>
      <BrowserRouter>
        <ChakraProvider>
          <MainApp />
        </ChakraProvider>
      </BrowserRouter>
    </Layout>
  );
};

export default Canvas;
