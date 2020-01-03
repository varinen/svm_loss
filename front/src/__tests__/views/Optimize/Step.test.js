import React from 'react';
import {createShallow} from '@material-ui/core/test-utils';
import Step from '../../../views/SVMLoss/Demo/Optimize/Step';

describe('Step control', () => {
    let component, props, shallow;
    const mockToggleOptimize = jest.fn();
    const mockSetAvailableIterations = jest.fn();
    beforeEach(() => {
        props = {
            params: {},
            data: [],
            hyper: {},
            step: {iteration: 0, availableIterations: 0},
            toggleOptimize: mockToggleOptimize,
            setAvailableIterations: mockSetAvailableIterations
        };
        shallow = createShallow({dive: true});
        component = shallow(<Step {...props}/>);
    });

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });

    it('Click on Single Step causes the toggleOptimize and setAvailableIterations be called', () => {
        const additional = [];
        component.find('#singe-step')
            .simulate('click');
        expect(mockToggleOptimize).toHaveBeenCalledWith(true);
        expect(mockSetAvailableIterations).toHaveBeenCalledWith(1);
    });
});
