import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock';
import {apiUrl, pathGetParams} from "../../api";
import * as actionTypes from "../../actionTypes";
import {fetchParams} from "../../actions/params";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

beforeEach(() => {
    store = mockStore({params: {weights: [], biases: []}})
});

afterEach(() => {
    nock.cleanAll()
});

describe('params action test non-rand', () => {
    const rand = 0;
    const params = {weights: [[1, 2], [3, 4]], biases: [1, 2]};

    test('dispatch get_params success', () => {
        nock(`${apiUrl}/`)
            .get(`${pathGetParams}?rand=${rand}`)
            .reply(200, params);

        const expectedActions = [
            {type: actionTypes.FETCH_PARAMS_REQUEST},
            {type: actionTypes.FETCH_PARAMS_SUCCESS, result: params}
        ];

        expect.assertions(1);
        return store.dispatch(fetchParams(rand))
            .then(() =>
                expect(store.getActions()).toEqual(expectedActions)
            )
    });
});