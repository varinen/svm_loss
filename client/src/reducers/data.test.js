import dataReducer from './data';
import {GET_DATA} from "../actions/constants";

describe('dataReducer', () => {
    const datapoints = {data: []};
    it('fetches and sets the data points', () => {
        expect(dataReducer({}, {type: GET_DATA, data: datapoints.data}))
            .toEqual(datapoints);
    });
});