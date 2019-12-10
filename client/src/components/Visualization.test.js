import React from 'react';
import {shallow} from 'enzyme';
import {Visualization} from './Visualization';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});


describe('Visualization', () => {
    const props = {
        plot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP09l5cDwAD3AG60PCC3wAAAABJRU5ErkJggg=='
    };

    const vis = shallow(<Visualization {...props}/>);

    it('renders correctly', () => {
        expect(vis).toMatchSnapshot();
        expect(vis.find('img').length).toEqual(1);
        expect(vis.find('#plot').prop('src')).toEqual(props.plot)
    });
});

