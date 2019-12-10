import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {urls} from './api';

import {GET_PLOT} from "./constants";
import {getPlot} from "./visualization";

const createMockStore = configureMockStore([thunk]);
const store = createMockStore({plot: ''});

const mockResponse = {
    plot: 'data:image/png;base64,459845904584=='
};

fetchMock.get(
    urls.get_plot,
    mockResponse
);

describe('API get_plot calls', () => {
    it('creates an async value to fetch the plot value', () => {
        const expectedActions = [{
            plot: mockResponse.plot,
            type: GET_PLOT
        }];

        store.dispatch(getPlot()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
