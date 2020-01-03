import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'

import configureStore from './store'
import initStore from './initStore'


import "assets/scss/material-kit-react.scss?v=1.8.0";

import SVMLoss from "views/SVMLoss/App";

const store = configureStore({});
initStore(store);

//console.log('initial state:', JSON.stringify(store.getState(), null, 2));

ReactDOM.render(
    <Provider store={store}>
        <SVMLoss store={store} />
    </Provider>,
    document.getElementById("root")
);
