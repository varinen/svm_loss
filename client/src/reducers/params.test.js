import paramsReducer from './params';
import {GET_PARAMS} from "../actions/constants";

describe('paramsReducer', () => {
    const paramData = {params: {weights:[], biases:[]}};

    it('fetches and sets the params data', () => {
        expect(paramsReducer({}, {type: GET_PARAMS, params: paramData.params}))
            .toEqual(paramData);
    });
});