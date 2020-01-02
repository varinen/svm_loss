import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'

import {fetchData} from "../../actions";
import {apiUrl, pathGetData} from "../../api";
import dataReducer from "../../reducers/data";

const middlewares = [thunk];
let store;

beforeEach(() => {
    store = createStore(dataReducer, applyMiddleware(thunk))
});

test('initial state has to have a data object as an empty array', () => {
    expect(store.getState()).toEqual([]);
});

test('fetchData action should populate data', () => {
    const rand = 0;
    const dataObj = [1, 2, 3];

    nock(`${apiUrl}`)
        .get(`${pathGetData}?rand=${rand}`)
        .reply(200, dataObj);

    expect.assertions(1);
    const action = fetchData(rand);
    return store.dispatch(action)
        .then(() => {
            expect(store.getState()).toEqual(dataObj);
        });
});
