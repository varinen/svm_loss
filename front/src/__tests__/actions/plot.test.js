import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock';
import {apiUrl, pathFetchPlot} from "../../api";
import * as actionTypes from "../../actionTypes";
import {fetchPlot} from "../../actions/plot";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

beforeEach(() => {
    store = mockStore({params: {weights: [], biases: []}, data: [], plot: ''})
});

afterEach(() => {
    nock.cleanAll()
});

describe('Plot fetch action test', () => {
    const rand = 0;
    const plot = {plot: 'plotdata'};

    test('dispatch get_plot success', () => {
        const state = store.getState();
        nock(`${apiUrl}/`)
            .post(`${pathFetchPlot}`,
                {params: state.params, data: state.data}
            )
            .reply(200, plot);

        const expectedActions = [
            {type: actionTypes.FETCH_PLOT_REQUEST},
            {type: actionTypes.FETCH_PLOT_SUCCESS, result: plot}
        ];

        expect.assertions(1);
        return store.dispatch(fetchPlot(state.params, state.data))
            .then(() =>
                expect(store.getActions()).toEqual(expectedActions)
            )
    });
});