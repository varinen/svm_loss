import React from 'react';
import {shallow} from 'enzyme';
import Params from './Params';

describe('Params', () => {
    const params = shallow(<Params/>);

    it('renders correctly', () => {
        expect(params).toMatchSnapshot();
    });
});

