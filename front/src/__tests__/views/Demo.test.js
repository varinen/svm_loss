import React from 'react';
import {shallow} from 'enzyme';
import Demo from '../../views/SVMLoss/Demo';

describe('Demo', () => {
    const component = shallow(<Demo/>);

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });
});

