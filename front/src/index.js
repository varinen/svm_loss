import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux'

import configureStore from './store'
import initStore from './initStore'


import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";

import SVMLoss from "views/SVMLoss/App";

var hist = createBrowserHistory();

const store = configureStore({});
initStore(store);

console.log('initial state:', JSON.stringify(store.getState(), null, 2))

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                <Route path="/demo" component={SVMLoss}/>
                <Route path="/landing-page" component={LandingPage}/>
                <Route path="/profile-page" component={ProfilePage}/>
                <Route path="/login-page" component={LoginPage}/>
                <Route path="/" component={Components}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
