import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'

import {fetchParams} from "../../actions";
import {apiUrl, pathGetParams} from "../../api";
import paramsReducer from "../../reducers/params";


const middlewares = [thunk];
let store;

beforeEach(() => {
    store = createStore(paramsReducer, applyMiddleware(thunk))
});


test('initial state has to have a params object with empty weights and biases', () => {
    expect (store.getState()).toEqual({weights:[], biases:[]});
});

test('fetchParams action should populate weights and biases', () => {
    const rand = 0;
    const paramsObjs = {weights:[[1,2],[3,4]], biases:[1,2]};

    nock(`${apiUrl}`)
        .get(`${pathGetParams}?rand=${rand}`)
        .reply(200, paramsObjs);

    expect.assertions(1);
    const action = fetchParams(rand);
    return store.dispatch(action)
        .then(() => {
            expect(store.getState()).toEqual(paramsObjs);
        });

});