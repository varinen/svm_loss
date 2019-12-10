import React from 'react';
import {shallow, mount} from 'enzyme';
import {ParamControl} from './ParamControl';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});
const props = {
            params: {
                biases: [-0.04, 0.45, 0.41],
                weights: [[-2.05, -4.55], [-2.85, -4.34], [-0.87, 2.87]]
            }
        };

describe('ParamControl', () => {

    let control = mount(<ParamControl hyperparams={props}/>);

    it('renders correctly', () => {
        expect(control).toMatchSnapshot();
    });

    describe('displays params correctly', () => {

        control = mount(<ParamControl hyperparams={props}/>);

        it('generates correct number of rows', () => {
            expect(control.find('.row').length).toEqual(3);
        })

    })

});

