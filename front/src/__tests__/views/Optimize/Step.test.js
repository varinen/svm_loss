import React from 'react';
import {createShallow} from '@material-ui/core/test-utils';
import Step from '../../../views/SVMLoss/Demo/Optimize/Step';

describe('Step renders correctly', () => {
    let component, props, shallow;
    const mockFetchStep = jest.fn();
    beforeEach(() => {
        props = {
            params: {},
            data: [],
            hyper: {},
            step: {iteration: 0},
            fetchStep: mockFetchStep
        };
        shallow = createShallow({dive: true});
        component = shallow(<Step {...props}/>);
    });

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });

    it('Click on Single Step causes the fetchStep be called', () => {
        const additional = [];
        component.find('#singe-step')
            .simulate('click');
        expect(mockFetchStep).toHaveBeenCalledWith(props.params, props.data, props.hyper);
    });

});
