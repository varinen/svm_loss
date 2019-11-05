import React from 'react';
import {shallow} from 'enzyme';
import Background from './Background';

describe('Background', () => {
    const background = shallow(<Background/>);

    it('renders correctly', () => {
        expect(background).toMatchSnapshot();
    });
});

