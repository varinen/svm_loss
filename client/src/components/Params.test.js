import React from 'react';
import {shallow} from 'enzyme';
import Params from './Params';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe('Params', () => {
    let props = {store: store, params: {weights:{}, biases:{}}};
    let paramsComponent = shallow(<Params {...props}/>);

    it('renders correctly', () => {
        expect(paramsComponent).toMatchSnapshot();
    });
});

