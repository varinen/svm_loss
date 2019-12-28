import React from 'react';
import {shallow} from 'enzyme';
import Visio from '../../views/SVMLoss/Demo/Visio';

describe('Visio', () => {
    const component = shallow(<Visio/>);

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });
});
