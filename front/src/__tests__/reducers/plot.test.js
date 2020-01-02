import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'

import {fetchPlot} from "../../actions";
import {apiUrl, pathFetchPlot} from "../../api";
import plotReducer from "../../reducers/plot";

const middlewares = [thunk];
let store;

beforeEach(() => {
    store = createStore(plotReducer, applyMiddleware(thunk))
});

test('initial state has to have the plot data object as an empty string', () => {
    const plotState = {image: '', updateNeeded: false};
    expect(store.getState()).toEqual(plotState);
});

test('fetchPlot action should populate the plot string', () => {
    const rand = 0;
    const plotResponse = {plot: 'plotdata'};
    const plotState = {image: 'plotdata', updateNeeded: false};
    const params = {weights:[], biases:[]};
    const data = [];

    nock(`${apiUrl}`)
        .post(`${pathFetchPlot}`, {params: params, data: data})
        .reply(200, plotResponse);

    expect.assertions(1);
    const action = fetchPlot(params, data);
    return store.dispatch(action)
        .then(() => {
            expect(store.getState()).toEqual(plotState);
        });
});
