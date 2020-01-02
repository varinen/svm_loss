import React from "react";
import Plot from "views/SVMLoss/Demo/Visio/Plot";
import {createShallow} from '@material-ui/core/test-utils';

describe('Plot renders correctly', () => {
    let component, props, shallow;
    beforeEach(() => {
        props = {
            plot: {image:'', updateNeeded: false}
        };
        shallow = createShallow({dive: true});
        component = shallow(<Plot {...props}/>);
    });

    it('renders correctly', () => {
        expect(component).toMatchSnapshot();
    });

});


describe('Plot renders a loading component when the plot is empty', () => {
    let component, props, shallow;
    beforeEach(() => {
        props = {
            plot: {image:'', updateNeeded: false}
        };
        shallow = createShallow({dive: true});
        component = shallow(<Plot {...props}/>);
    });

    it('renders no plot', () => {
        expect(component.find('#plot').length).toBe(0)
    });

    it('renders a loading animation', () => {
        expect(component.find('#loading-plot').length).toBe(1)
    });

});


describe('Plot renders a plot image when the plot is not empty', () => {
    let component, props, shallow;
    beforeEach(() => {
        props = {
            plot: {image:'some plot', updateNeeded: false}
        };
        shallow = createShallow({dive: true});
        component = shallow(<Plot {...props}/>);
    });

    it('renders no loader', () => {
        expect(component.find('#loading-plot').length).toBe(0)
    });

    it('renders a plot', () => {
        expect(component.find('#plot').length).toBe(1)
    });

});
