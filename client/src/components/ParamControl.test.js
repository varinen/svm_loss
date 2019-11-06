import React from 'react';
import {shallow} from 'enzyme';
import ParamControl from './ParamControl';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe('ParamControl', () => {
    const control = shallow(<ParamControl store={store}/>);

    it('renders correctly', () => {
        expect(control).toMatchSnapshot();
    });
});

