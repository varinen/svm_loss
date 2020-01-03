import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/styles';
import Button from "components/CustomButtons/Button.js";


import styles from "svm_assets/jss/views/demo.js";

class Step extends React.Component {

    singleStep = () => {
        if (this.props.step.availableIterations <= 0) {
            this.props.toggleOptimize(true);
            this.props.setAvailableIterations(1);
        }
    };
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <h4>Optimize</h4>
                <p>Iterations: {this.props.step.iteration}</p>
                <Button id="singe-step" color="primary" onClick={this.singleStep}>Single Step</Button>
            </Fragment>

        )
    }
}

export default withStyles(styles)(Step);
