import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {urls} from './api';

import {GET_DATA} from "./constants";
import {getData} from "./data";

const createMockStore = configureMockStore([thunk]);
const store = createMockStore({data: {}});

const mockResponse = {
    body: [
        [1.1, 1, 0],
        [1.2, 1, 0],
        [1.3, 1, 0],
        [1.4, 1, 0],
        [1.5, 1, 0],
        [1.6, 1, 0],
        [1.7, 1, 0],
        [1.8, 1, 0],
        [1.9, 1, 0]
    ]
};

fetchMock.get(
    urls.get_data,
    mockResponse
);

describe('API Get Data calls', () => {
    it('creates an async value to fetch the data value', () => {
        const expectedActions = [{
            data: mockResponse.body,
            type: GET_DATA
        }];

        store.dispatch(getData()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});