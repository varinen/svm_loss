import React from 'react';
import {shallow} from 'enzyme';
import {Datapoints} from './Datapoints';

describe('Datapoints', () => {
    const datapoints = shallow(<Datapoints/>);

    it('renders correctly', () => {
        expect(datapoints).toMatchSnapshot();
    });
});

