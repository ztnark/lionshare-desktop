// Import a library to help create a component
import React from 'react';
import { AppRegistry, View, Text, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Flex } from 'reflexbox';
import stores from './src/stores';
import WSInstance from './src/utils/ChatWebsocket';
import * as ChatActions from './src/actions/ChatActions';

import reducers from './src/reducers';
// import stores from './src/stores/index';

import Application from './src/scenes/Application';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers)


// Create a Component
const App = () => (
  <Provider store={ store }>
    <View style={{"backgroundColor": "black"}}>
      <StatusBar
        barStyle="light-content"
      />
      <Application/>
    </View>
  </Provider>
);

// Render it to device
AppRegistry.registerComponent('lionshare', () => App);

const sock = {
  ws: null,
  URL: 'api.lionshare.capital',
  wsDipatcher: (msg) => {
    return store.dispatch(ChatActions.receiveMessage(msg));
  },
  wsListener: () => {
      return sock.startWS();
  },
  startWS: () => {
    if(!!sock.ws) sock.ws.close();

    sock.ws = new WSInstance(sock.URL, sock.wsDipatcher)
  }
};

store.subscribe(() => sock.wsListener());
