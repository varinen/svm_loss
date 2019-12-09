import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {urls} from './api';

import {GET_PARAMS, MODIFY_PARAM} from "./constants";
import {getParams, modifyParam} from "./params";

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

describe('Param value modified', () => {
    it('modifies a param value', () => {
        const expectedAction = {
            modified: {paramType: 'bias', paramIndex: 1, paramValue: 2},
            type: MODIFY_PARAM
        };

        expect(store.dispatch(
            modifyParam('bias', 1, 2)
        )).toEqual(expectedAction);
    });
});