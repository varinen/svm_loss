import paramsReducer from './params';
import {GET_PARAMS, MODIFY_PARAM} from "../actions/constants";

describe('paramsReducer', () => {
    const paramData = {params: {weights: [], biases: []}};

    it('fetches and sets the params data', () => {
        expect(paramsReducer({}, {type: GET_PARAMS, params: paramData.params}))
            .toEqual(paramData);
    });
});

describe('paramsModifierReducer Bias', () => {
    const initState = {params: {weights: [0, 1], biases: [0, 1]}};
    const modifiedState = {params: {weights: [0, 1], biases: [0, 2]}};
    const actionData = {paramType: 'bias', paramIndex: 1, paramValue: 2};

    it('modifies', () => {
        expect(paramsReducer(initState, {
            type: MODIFY_PARAM,
            modified: actionData
        }))
            .toEqual(modifiedState);
    });
});

describe('paramsModifierReducer Weight', () => {
    const initState = {params: {weights: [[0, 1], [2, 3]], biases: [0, 1]}};
    const modifiedState = {params: {weights: [[2, 1], [2, 3]], biases: [0, 1]}};
    const actionData = {paramType: 'weights', paramIndex: [0,0], paramValue: 2};

    it('modifies', () => {
        expect(paramsReducer(initState, {
            type: MODIFY_PARAM,
            modified: actionData
        }))
            .toEqual(modifiedState);
    });
});