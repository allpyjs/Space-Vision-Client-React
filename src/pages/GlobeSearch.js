import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';
import theme from '../theme';
import MasterContainer from '../components/MasterContainer';
import Navbar from '../components/Navbar';
import Globe from '../components/globeselect/Globe';

const GlobeSearch = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Navbar tab={2} />
          <Globe />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default GlobeSearch;
