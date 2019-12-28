import React from 'react';
import {shallow} from 'enzyme';
import Params from '../../views/SVMLoss/Demo/Params';

describe('Params', () => {
    const component = shallow(<Params/>);

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });
});

