import React from 'react';
import {shallow, mount} from 'enzyme';
import {ParamControl} from './ParamControl';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe('ParamControl', () => {
    let props = {
        store: store
    };
    let control = mount(<ParamControl store={props.store}/>);

    it('renders correctly', () => {
        expect(control).toMatchSnapshot();
    });

    describe('displays params correctly', () => {
        props = {
            params: {
                biases: [-0.04, 0.45, 0.41],
                weights: [[-2.05, -4.55], [-2.85, -4.34], [-0.87, 2.87]]
            }
        };
        control = mount(<ParamControl params={props.params}/>);

        it('generates correct number of rows', () => {
            expect(control.find('.row').length).toEqual(3);
        })

    })

});

