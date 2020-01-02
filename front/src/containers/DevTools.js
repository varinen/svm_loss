import React from 'react'

import {createDevTools} from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import MultipleMonitors from 'redux-devtools-multiple-monitors';
import LogMonitor from 'redux-devtools-log-monitor'
import Dispatcher from 'redux-devtools-dispatch';

import * as actionTypes from '../actionTypes'

const actionCreators = {
    activatePlotUpdate() {
        return {type: actionTypes.ACTIVATE_PLOT_UPDATE};
    },
};


const DevTools = createDevTools(
    <DockMonitor
        toggleVisibilityKey='ctrl-b'
        changePositionKey='ctrl-q'
        defaultIsVisible={true}
    >
        <MultipleMonitors>
            <LogMonitor theme='tomorrow'/>
            <Dispatcher theme='tomorrow' actionCreators={actionCreators}/>
        </MultipleMonitors>
    </DockMonitor>
);

export default DevTools
