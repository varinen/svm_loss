import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'

import {fetchStep} from "../../actions";
import {apiUrl, pathFetchStep} from "../../api";
import stepReducer from "../../reducers/step";

const middlewares = [thunk];
let store;

beforeEach(() => {
    store = createStore(stepReducer, applyMiddleware(thunk))
});

test('initial state has to have the step data object to have only the iteration key eq 0', () => {
    const initState = {iteration: 0};
    expect(store.getState()).toEqual(initState);
});

test('fetchStep action should populate the step object', () => {
    const stepResult = {
        biases: [],
        cost_loss: 1,
        grad_b: [],
        grad_w: [],
        loss: [],
        mean_loss: 1,
        plot: 'some plot',
        reg_loss: 1,
        scores: [],
        total_loss: 1,
        weights: [],
        iteration: 1
    };

    const params = {weights:[], biases:[]};
    const data = [];
    const hyper = {};

    nock(`${apiUrl}`)
        .post(`${pathFetchStep}`, {params: params, data: data, hyper: hyper})
        .reply(200, stepResult);

    expect.assertions(1);
    const action = fetchStep(params, data, hyper);
    return store.dispatch(action)
        .then(() => {
            expect(store.getState()).toEqual(stepResult);
        });
});
