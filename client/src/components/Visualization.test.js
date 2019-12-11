import React from 'react';
import {shallow} from 'enzyme';
import {Visualization} from './Visualization';
import configureMockStore from "redux-mock-store";

describe('Visualization', () => {
    const props = {
        visualization: {
            plot: 'VBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP09l5cDwAD3AG60PCC3wAAAABJRU5ErkJggg=='
        }

    };

    const vis = shallow(<Visualization {...props}/>);

    it('renders correctly', () => {
        expect(vis).toMatchSnapshot();
        expect(vis.find('img').length).toEqual(1);
        expect(vis.find('#plot').prop('src')).toEqual(`data:image/png;base64,${props.visualization.plot}`)
    });
});

