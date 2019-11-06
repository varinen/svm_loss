import React from 'react';
import {shallow, mount} from 'enzyme';
import {Params} from './Params';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe('Params', () => {
    const mockGetParams = jest.fn();
    let props = {
        store: store,
        params: {weights: {}, biases: {}},
        getParams: mockGetParams
    };
    let paramsComponent = shallow(<Params {...props}/>);

    it('renders correctly', () => {
        expect(paramsComponent).toMatchSnapshot();
    });


    it('has a randomize button', () => {
        expect(paramsComponent.find('.randomize-params').exists()).toBe(true);
    });

    describe('the user wants to randomize params', () => {
        beforeEach(() => {
            paramsComponent.find('.randomize-params').simulate('click')
        });
        it('randomizes params', () => {
            expect(mockGetParams).toHaveBeenCalledWith(1);
        })
    });

});

