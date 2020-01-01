import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock';
import {apiUrl, pathGetData} from "../../api";
import * as actionTypes from "../../actionTypes";
import {fetchData} from "../../actions/data";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

beforeEach(() => {
    store = mockStore({params: {weights: [], biases: []}})
});

afterEach(() => {
    nock.cleanAll()
});

describe('Data fetch action test non-rand', () => {
    const rand = 0;
    const data = [1, 2, 3];

    test('dispatch get_data success', () => {
        nock(`${apiUrl}/`)
            .get(`${pathGetData}?rand=${rand}`)
            .reply(200, data);

        const expectedActions = [
            {type: actionTypes.FETCH_DATA_REQUEST},
            {type: actionTypes.FETCH_DATA_SUCCESS, result: data}
        ];

        expect.assertions(1);
        return store.dispatch(fetchData(rand))
            .then(() =>
                expect(store.getActions()).toEqual(expectedActions)
            )
    });
});