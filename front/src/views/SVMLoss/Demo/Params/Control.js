import React, {Fragment} from 'react';
import classNames from "classnames";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/styles';

import styles from "svm_assets/jss/views/demo.js";

import Button from "components/CustomButtons/Button.js";
import GridContainer from 'components/Grid/GridContainer'
import GridItem from "components/Grid/GridItem";
import {ACTIVATE_PLOT_UPDATE} from "../../../../actionTypes";

class ParamsControl extends React.Component {

    updateParams = (rowIndex, colIndex, type) => (evt) => {
        let val = Number.isInteger(parseInt(evt.target.value, 10)) ? parseFloat(evt.target.value): 0;
        const prom = new Promise(resolve => {
            this.props.updateParams(rowIndex, colIndex, type, val);
            resolve()
        });
        prom.then(() => this.props.activateUpdateNeeded());
    };

    randomizeParams = () => {
        this.props.fetchParams(1, [{type: ACTIVATE_PLOT_UPDATE}]);
    };

    render() {
        const {classes, params: {weights, biases}} = this.props;
        const paramRows = weights.map(
            (weightRow, rowIndex) => [...weightRow, biases[rowIndex]]
        );

        return (
            <Fragment>
                {paramRows.map((row, rowIndex) => {
                    return (
                        <GridContainer key={`params-${rowIndex}`} container spacing={2}>
                            {row.map((entry, colIndex) => {
                                const xs = Math.floor(12 / row.length);
                                let label = `b[${rowIndex}]`;
                                let type = 'biases';
                                if (colIndex < row.length - 1) {
                                    label = `w[${rowIndex}, ${colIndex}]`
                                    type = 'weights';
                                }
                                return (
                                    <GridItem xs={xs} key={label}>
                                        <TextField label={label}
                                                   type="number"
                                                   step="0.1"
                                                   onChange={this.updateParams(rowIndex, colIndex, type)}
                                                   value={entry}/>
                                    </GridItem>
                                )
                            })}
                        </GridContainer>
                    )
                })}
                <Divider className={classNames(classes.mt1, classes.mb1)}/>
                <Button id="rand-params" color="primary" onClick={this.randomizeParams}>Randomize</Button>
            </Fragment>
        )
    }
}

export default withStyles(styles)(ParamsControl);
