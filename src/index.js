import React from 'react';
import ReactDOM from 'react-dom';
import Customer from './customer';
import {Provider} from 'react-redux';
import store from './redux/store/store';

const rootElement = document.getElementById("root");

const App = () => (
  <Provider  store={store}>
    <Customer/>
  </Provider>
)

ReactDOM.render(<App/>,rootElement);