import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from "components/CustomButtons/Button.js";
import GridContainer from 'components/Grid/GridContainer'
import GridItem from "components/Grid/GridItem";



import styles from "svm_assets/jss/views/demo.js";

class Step extends React.Component {
    autoIterations = 25;
    singleStep = () => {
        if (this.props.step.availableIterations <= 0) {
            this.props.toggleOptimize(true);
            this.props.setAvailableIterations(1);
        }
    };
    toggleAuto = (evt) => {
        if (evt.target.checked && this.props.step.availableIterations <= 0) {
            this.props.toggleOptimize(true);
            this.props.setAvailableIterations(this.autoIterations);
        } else if (!evt.target.checked) {
            this.props.toggleOptimize(false);
            this.props.setAvailableIterations(0);
        }
    };
    render() {
        return (
            <Fragment>
                <h4>Optimize</h4>

                <GridContainer container spacing={2}>

                    <GridItem xs={6} key="single_step">
                        <p>Iterations: {this.props.step.iteration}</p>
                        <Button id="singe-step" color="primary" onClick={this.singleStep}>Single Step</Button>{' '}
                    </GridItem>
                    <GridItem xs={6} key="auto_update">
                        <p>{this.props.step.availableIterations >= 1 && (<span>Iterations remaining: {this.props.step.availableIterations}</span>)}&nbsp;</p>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.props.step.availableIterations > 1}
                                    onChange={this.toggleAuto}
                                    color="primary"
                                />
                            }
                            label={`Run for ${this.autoIterations} auto iterations`}
                        />
                    </GridItem>
                </GridContainer>
            </Fragment>

        )
    }
}

export default withStyles(styles)(Step);
