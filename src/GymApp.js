import React from 'react';
import Router from './Router';

import { StatusBar } from 'react-native'; 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(reduxThunk)
));

const GymApp = prop => (
    <>
      <StatusBar  barStyle="dark-content" backgroundColor="#F5F5F5" />
      <Provider store={store}>
        <Router />
      </Provider>
    </>
); 

export default GymApp;