import dataReducer from './data';
import {GET_DATA} from "../actions/constants";

describe('dataReducer', () => {
    let data = [];
    it('fetches and sets the data points', () => {
        expect(dataReducer([], {type: GET_DATA, data}))
            .toEqual(data);
    });

    data = [[0, 1, 2], [3, 4, 5]];

    it('fetches and sets the data points', () => {
        expect(dataReducer([], {type: GET_DATA, data}))
            .toEqual(data);
    });

    data = [[0, 1, 2], [6, 7, 8]];

    it('fetches and sets the data points', () => {
        expect(dataReducer([], {type: GET_DATA, data}))
            .toEqual(data);
    });
});