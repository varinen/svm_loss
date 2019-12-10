import visReducer from './visualization';
import {GET_PLOT} from "../actions/constants";

describe('visReducer', () => {
    const data = {plot: 'data:image/png;base64,54605846468==='};
    it('fetches and sets the plot image source', () => {
        expect(visReducer({}, {type: GET_PLOT, plot: data.plot}))
            .toEqual(data);
    });
});