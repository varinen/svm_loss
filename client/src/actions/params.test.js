import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {urls} from './api';

import {GET_PARAMS} from "./constants";
import {getParams} from "./params";

const createMockStore = configureMockStore([thunk]);
const store = createMockStore({params: {}});

const mockResponse = {
    body: {
        biases: [-0.04, 0.45, 0.41],
        weights: [[-2.05, -4.55], [-2.85, -4.34], [-0.87, 2.87]]
    }
};

fetchMock.get(
    urls.get_params,
    mockResponse
);

describe('API Param calls', () => {
    it('creates an async value to fetch the params value', () => {
        const expectedActions = [{
            params: mockResponse.body,
            type: GET_PARAMS
        }];

        store.dispatch(getParams()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});