import React from 'react';
import {shallow} from 'enzyme';
import Optimize from '../../views/SVMLoss/Demo/Optimize';

describe('Optimize', () => {
    const component = shallow(<Optimize/>);

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });
});
