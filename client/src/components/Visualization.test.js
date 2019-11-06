import React from 'react';
import {shallow} from 'enzyme';
import Visualization from './Visualization';

describe('Visualization', () => {
    const vis = shallow(<Visualization/>);

    it('renders correctly', () => {
        expect(vis).toMatchSnapshot();
    });
});

