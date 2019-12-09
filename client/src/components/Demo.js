import React from 'react';
import Background from './Background';
import Visualization from './Visualization';
import Params from './Params';
import Datapoints from './Datapoints';

const Demo = () => (
            <div className="content-wrapper">
                <Background/>
                <Visualization />
                <Params />
                <Datapoints />
            </div>
        );

export default Demo;