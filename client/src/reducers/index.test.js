import rootReducer from './index';

describe('rootReducer', () => {
    it('initializes the default state', () => {
        const expected = {params: {}, data: []};
        expect(rootReducer({}, {})).toEqual(expected);
    });
});