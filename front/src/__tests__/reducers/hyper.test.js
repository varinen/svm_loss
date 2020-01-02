import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {updateHyper} from "../../actions";

import hyperReducer, {initState} from "../../reducers/hyper";

const middlewares = [thunk];
let store;

beforeEach(() => {
    store = createStore(hyperReducer, applyMiddleware(thunk))
});

test('initial state has to have a hyper object with initial values', () => {
    expect(store.getState()).toEqual(initState);
});

test('updateHyper can update a reg_c entry', () => {
    const expectedState = {...initState, reg_c: 2};
    const action = updateHyper('reg_c', 2);
    expect(hyperReducer(initState, action)).toEqual(expectedState);
});

test('updateHyper can update a loss_type entry', () => {
    const expectedState = {...initState, loss_type: 'ova'};
    const action = updateHyper('loss_type', 'ova');
    expect(hyperReducer(initState, action)).toEqual(expectedState);
});

test('updateHyper can update a learning_rate entry', () => {
    const expectedState = {...initState, learning_rate: '2'};
    const action = updateHyper('learning_rate', '2');
    expect(hyperReducer(initState, action)).toEqual(expectedState);
});
