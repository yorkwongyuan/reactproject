import 'babel-polyfill'
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import '@config';
import Routes from '@configs/router.config';
import configure from '@middleware/configureStore'; // redux

const store = configure({ })
ReactDOM.render(
    <Provider store = {store}>
    <Routes />
    </Provider>
)