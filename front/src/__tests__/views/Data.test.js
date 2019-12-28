import React from 'react';
import {shallow} from 'enzyme';
import Data from '../../views/SVMLoss/Demo/Data';

describe('Data', () => {
    const component = shallow(<Data/>);

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });
});

