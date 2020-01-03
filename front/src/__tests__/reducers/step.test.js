import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'

import {fetchStep, setAvailableIterations, toggleOptimize} from "../../actions";
import {apiUrl, pathFetchStep} from "../../api";
import stepReducer from "../../reducers/step";

const middlewares = [thunk];
let store;

beforeEach(() => {
    store = createStore(stepReducer, applyMiddleware(thunk))
});

test('initial state has to have the step data object to have only the iteration key eq 0', () => {
    const initState = {iteration: 0, optimizeActive: false, availableIterations: 0};
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
        iteration: 1,
        optimizeActive: false,
        availableIterations: 0
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

describe('Step reducer toggles optimizeActive', () => {
    test('Set optimize active true', () => {
        store.dispatch(toggleOptimize(true));
        expect(store.getState().optimizeActive).toBe(true);
    });

    test('Set optimize active false', () => {
        store.dispatch(toggleOptimize(false));
        expect(store.getState().optimizeActive).toBe(false);
    });
});

describe('Step reduces modifies the availableIterations', () => {
    test('Set available iterations to 0', () => {
        store.dispatch(setAvailableIterations(0));
        expect(store.getState().availableIterations).toBe(0);
    });

    test('Set available iterations to 10', () => {
        store.dispatch(setAvailableIterations(10));
        expect(store.getState().availableIterations).toBe(10);
    });
});