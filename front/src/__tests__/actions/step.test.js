import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock';
import {apiUrl, pathFetchStep} from "../../api";
import * as actionTypes from "../../actionTypes";
import {fetchStep, toggleOptimize, setAvailableIterations} from "../../actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

beforeEach(() => {
    store = mockStore(
        {
            params: {weights: [], biases: []},
            data: [],
            hyper: {},
            plot: {image: '', updateNeeded: false},
            step: {iteration: 0}
        });
});

afterEach(() => {
    nock.cleanAll()
});

describe('Step fetch action test', () => {
    const stepResult = {
        biases: [],
        cost_loss: 1,
        grad_b: [],
        grad_w: [],
        loss: [],
        mean_loss: 1,
        plot: 'some plot',
        reg_loss: 1,
        scores: [],
        total_loss: 1,
        weights: [],
        iteration: 1,
        availableIterations: 0,
        optimizeActive: false
    };

    test('dispatch get_step success', () => {
        const state = store.getState();
        nock(`${apiUrl}/`)
            .post(`${pathFetchStep}`,
                {params: state.params, data: state.data, hyper: state.hyper}
            )
            .reply(200, stepResult);

        const expectedActions = [
            {type: actionTypes.FETCH_STEP_REQUEST},
            {type: actionTypes.FETCH_STEP_SUCCESS, result: stepResult},
            {type: actionTypes.UPDATE_STEP_PARAMS, parentResult: stepResult},
            {type: actionTypes.UPDATE_STEP_PLOT, parentResult: stepResult},
            {type: actionTypes.TOGGLE_OPTIMIZE, optimizeActive: false, parentResult: stepResult},
        ];

        expect.assertions(1);
        return store.dispatch(fetchStep(state.params, state.data, state.hyper))
            .then(() =>
                expect(store.getActions()).toEqual(expectedActions)
            )
    });
});


describe('Optimize active toggle test', () => {
    describe('Generates correct actions', () => {
        test('Activates optimize', () => {
            const expectedAction = {type: actionTypes.TOGGLE_OPTIMIZE, optimizeActive: true};
            expect(toggleOptimize(true)).toEqual(expectedAction);
        });
        test('Deactivates optimize', () => {
            const expectedAction = {type: actionTypes.TOGGLE_OPTIMIZE, optimizeActive: false};
            expect(toggleOptimize(false)).toEqual(expectedAction);
        })
    })
});

describe('Set available iterations', () => {
    test('Set 10', () => {
        expect(setAvailableIterations(10))
            .toEqual({type: actionTypes.SET_AVAILABLE_ITERATIONS, availableIterations: 10});
    });

    test('Set 0', () => {
        expect(setAvailableIterations(0))
            .toEqual({type: actionTypes.SET_AVAILABLE_ITERATIONS, availableIterations: 0});
    });
})