import React, {Component} from 'react';
//import {connect} from 'react-redux';
import Background from './Background';
import Visualization from './Visualization';
import Params from './Params';
import Datapoints from './Datapoints';

class Demo extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <Background/>
                <Visualization />
                <Params />
                <Datapoints />
            </div>
        )
    }
}

export default Demo;