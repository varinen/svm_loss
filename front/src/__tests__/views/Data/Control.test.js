import React from "react";
import DataControl from "views/SVMLoss/Demo/Data/Control";
import {createShallow} from '@material-ui/core/test-utils';

describe('Data control renders correct grid', () => {
    let component, shallow;
    const mockFetchData = jest.fn();
    const props = {
        data: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        fetchData: mockFetchData,
    };
    beforeEach(() => {
        shallow = createShallow({dive: true});
        component = shallow(<DataControl {...props}/>);
    });

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });

    it('Generates a correct number of table rows elements', () => {
        expect(component.find('[data-table-data-row="1"]').length).toEqual(props.data.length);
    });


    it('Click on randomize button causes the fetchData be called', () => {
        const additional = [{"type": "ACTIVATE_PLOT_UPDATE"}];
        component.find('#rand-data')
            .simulate('click');
        expect(mockFetchData).toHaveBeenCalledWith(1, additional);
    });
});
