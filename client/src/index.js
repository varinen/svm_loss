import React from 'react';
import {render} from 'react-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './reducers';

import App from './components/App';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);