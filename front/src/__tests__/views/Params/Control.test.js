import React from "react";
import ParamsControl from "views/SVMLoss/Demo/Params/Control";
import {createShallow} from '@material-ui/core/test-utils';

describe('Params control renders correct grid', () => {
    let component, props, shallow;
    const mockUpdateParams = jest.fn();
    const mockFetchParams = jest.fn();
    const mockActivateUpdateNeeded = jest.fn();

    beforeEach(() => {
        props = {
            params: {weights: [[1, 2], [3, 4]], biases: [1, 2]},
            updateParams: mockUpdateParams,
            fetchParams: mockFetchParams,
            activateUpdateNeeded: mockActivateUpdateNeeded
        };
        shallow = createShallow({dive: true});
        component = shallow(<ParamsControl {...props}/>);
    });

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });

    it('Generates a correct number of grid elements', () => {
        expect(component.find('GridItem').length).toEqual(6);
    });

    // mockActivateUpdateNeeded is called in a promise resolve, so use async
    it('Change in a weight input calls a function to change a weight', async () => {
        const w00 = 10;
        await component.find('[label="w[0, 0]"]')
            .simulate('change', {target: {value: w00}});
        expect(mockUpdateParams).toHaveBeenCalledWith(0, 0, 'weights', w00);
        expect(mockActivateUpdateNeeded).toHaveBeenCalled();
    });

    it('Change in a bias input calls a function to change a bias', async () => {
        const b0 = 10;
        await component.find('[label="b[0]"]')
            .simulate('change', {target: {value: b0}});
        expect(mockUpdateParams).toHaveBeenCalledWith(0, 2, 'biases', b0);
        expect(mockActivateUpdateNeeded).toHaveBeenCalled();
    });

    it('Click on randomize button causes the fetchParams be called', () => {
        const additional =  [{"type": "ACTIVATE_PLOT_UPDATE"}];
        component.find('#rand-params')
            .simulate('click');
        expect(mockFetchParams).toHaveBeenCalledWith(1, additional);
    });
});
