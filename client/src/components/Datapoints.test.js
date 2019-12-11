import React from 'react';
import {mount, shallow} from 'enzyme';
import {Datapoints} from './Datapoints';


describe('Datapoints', () => {
    const mockGetData = jest.fn();
    const data = [[0, 1, 2], [3, 4, 5]];
    const params = {};
    const datapoints = shallow(<Datapoints data={data} params={params}
                                           getData={mockGetData}/>);

    it('renders correctly', () => {
        expect(datapoints).toMatchSnapshot();
    });


    describe('displays data params correctly', () => {
        const control = mount(<Datapoints data={data}  params={params}
                                          getData={mockGetData}/>);

        it('calls the getData function', () => {
            expect(mockGetData).toHaveBeenCalled();
        });

        it('generates correct number of rows', () => {
            expect(control.find('.data-row').length).toEqual(2);
        })

    });

    describe('executes the randomization fo data points', () => {
        beforeEach(() => {
            datapoints.find('.randomize-data').simulate('click')
        });
        it('randomizes params', () => {
            expect(mockGetData).toHaveBeenCalledWith(1);
        })

    })

});

