import React, {Component} from 'react';
//import {connect} from 'react-redux';
import Background from './Background';
import Visualization from './Visualization';
import Params from './Params';

class Demo extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <Background/>
                <Visualization />
                <Params />
            </div>
        )
    }
}

export default Demo;