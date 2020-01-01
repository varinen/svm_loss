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
    expect(store.getState()).toEqual('');
});

test('fetchPlot action should populate the plot string', () => {
    const rand = 0;
    const plot = {plot: 'plotdata'};
    const params = {weights:[], biases:[]}
    const data = [];

    nock(`${apiUrl}`)
        .post(`${pathFetchPlot}`, {params: params, data: data})
        .reply(200, plot);

    expect.assertions(1);
    const action = fetchPlot(params, data);
    return store.dispatch(action)
        .then(() => {
            expect(store.getState()).toEqual(plot.plot);
        });
});
