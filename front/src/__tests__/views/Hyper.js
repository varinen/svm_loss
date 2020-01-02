import React from 'react';
import {createShallow} from '@material-ui/core/test-utils';
import Hyper from '../../views/SVMLoss/Demo/Optimize/Hyper';

describe('Hyper renders correctly', () => {
    let component, props, shallow;
    const mockUpdateHyper = jest.fn();
    beforeEach(() => {
        props = {
            hyper: {reg_c: 0.1, learning_rate:0.1, loss_type: 'ww'},
            updateHyper: mockUpdateHyper
        };
        shallow = createShallow({dive: true});
        component = shallow(<Hyper {...props}/>);
    });

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });

    it('Change in a select control calls updateHyper', () => {
        const additional =  [{"type": "ACTIVATE_PLOT_UPDATE"}];
        component.find('[name="loss_type"]')
            .simulate('change', {target: {name:"loss_type", value: 'ova'}});
        expect(mockUpdateHyper).toHaveBeenCalledWith("loss_type", "ova");
    });

    it('Change in a text input control calls updateHyper', () => {
        const additional =  [{"type": "ACTIVATE_PLOT_UPDATE"}];
        component.find('[name="reg_c"]')
            .simulate('change', {target: {name:"reg_c", value: '2'}});
        expect(mockUpdateHyper).toHaveBeenCalledWith("reg_c", "2");
    });

});
