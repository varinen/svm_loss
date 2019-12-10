import React from 'react';
import {mount, shallow} from 'enzyme';
import {Datapoints} from './Datapoints';


describe('Datapoints', () => {
    const mockGetData = jest.fn();
    const datapoints = shallow(<Datapoints/>);

    it('renders correctly', () => {
        expect(datapoints).toMatchSnapshot();
    });

    const data = {
        data: [[0, 1, 2], [3, 4, 5]]
    };


    describe('displays data params correctly', () => {
        const control = mount(<Datapoints datapoints={data}
                                          getData={mockGetData}/>);

        it('calls the getData function', () => {
            expect(mockGetData).toHaveBeenCalled();
        });

        it('generates correct number of rows', () => {
            expect(control.find('.data-row').length).toEqual(2);
        })

    })

});

