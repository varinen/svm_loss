import paramsReducer from './params';
import {GET_PARAMS, MODIFY_PARAM} from "../actions/constants";

describe('paramsReducer', () => {
    const paramDataInit = {weights: [], biases: []};

    it('fetches and sets the params data', () => {
        expect(paramsReducer({}, {type: GET_PARAMS, params: paramDataInit}))
            .toEqual(paramDataInit);
    });

    const paramData1 = {weights:[[1,2],[3,4],[5,6]], biases:[0,1,2]};
    it('fetches and sets the params data', () => {
        expect(paramsReducer(paramDataInit, {type: GET_PARAMS, params: paramData1}))
            .toEqual(paramData1);
    });

});

describe('paramsModifierReducer Bias', () => {
    const initState = {weights: [0, 1], biases: [0, 1]};
    const modifiedState = {weights: [0, 1], biases: [0, 2]};
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
    const initState = {weights: [[0, 1], [2, 3]], biases: [0, 1]};
    const modifiedState = {weights: [[2, 1], [2, 3]], biases: [0, 1]};
    const actionData = {paramType: 'weights', paramIndex: [0,0], paramValue: 2};

    it('modifies', () => {
        expect(paramsReducer(initState, {
            type: MODIFY_PARAM,
            modified: actionData
        }))
            .toEqual(modifiedState);
    });
});