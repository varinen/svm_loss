import rootReducer from './index';

describe('rootReducer', () => {
    it('initializes the default state', () => {
        const expected = {0: {biases: [], weights: []}, 1: [], 2: []};
         expect(rootReducer({}, {})).toEqual(expected);
    });
});