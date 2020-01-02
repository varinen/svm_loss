import React, {Fragment} from 'react';
import classNames from "classnames";

import {withStyles} from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "components/CustomButtons/Button.js";


import styles from "svm_assets/jss/views/demo.js";
import Divider from "@material-ui/core/Divider";
import {ACTIVATE_PLOT_UPDATE} from "../../../../actionTypes";

class DataControl extends React.Component {

    randomizeData = () => {
        this.props.fetchData(1, [{type: ACTIVATE_PLOT_UPDATE}]);
    };

    render() {
        const {classes} = this.props;
        let scores = this.props.data.map(row => [0, 0, 0]);
        let loss = this.props.data.map(row => 0);
        let meanLoss = false;
        if (this.props.step) {
            if (this.props.step.scores) {
                scores = this.props.step.scores;
            }
            if (this.props.step.loss) {
                loss = this.props.step.loss;
            }
            if (this.props.step.mean_loss) {
                meanLoss = this.props.step.mean_loss;
            }
        }
        const dataPoints = this.props.data.map(
            (row, rowIndex) =>
                [...row, scores[rowIndex][0], scores[rowIndex][1], scores[rowIndex][2], loss[rowIndex]]
        );
        return (
            <Fragment>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.psm} align="right">X[0]</TableCell>
                            <TableCell className={classes.psm} align="right">X[1]</TableCell>
                            <TableCell className={classNames(classes.borderRight, classes.psm)}
                                       align="right">y</TableCell>
                            <TableCell className={classes.psm} align="right">s[0]</TableCell>
                            <TableCell className={classes.psm} align="right">s[1]</TableCell>
                            <TableCell className={classNames(classes.borderRight, classes.psm)}
                                       align="right">s[3]</TableCell>
                            <TableCell className={classes.psm}
                                       align="right">L</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataPoints.map((row, index) => (
                            <TableRow key={`data-row${index}`} data-table-data-row="1">
                                {row.map((val, colIndex) => (
                                    <TableCell
                                        key={`data-cell-${index}-${colIndex}`}
                                        align="right"
                                        data-table-data-cell="1"
                                        className={colIndex === 2 || colIndex === 5 ? classNames(classes.borderRight, classes.psm) : classNames(classes.psm)}>
                                        {parseFloat(val).toFixed(2)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {meanLoss && (
                            <Fragment>
                                <TableRow key="mean_loss">
                                    <TableCell colSpan={6}
                                               align="right"
                                               className={classNames(classes.psm)}>
                                        Mean loss
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={classNames(classes.psm)}>
                                        {parseFloat(meanLoss).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                                <TableRow key="cost_loss">
                                    <TableCell colSpan={6}
                                        align="right"
                                        className={classNames(classes.psm)}>
                                        Total data loss
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={classNames(classes.psm)}>
                                        {parseFloat(this.props.step.cost_loss).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                                <TableRow key="reg_loss">
                                    <TableCell colSpan={6}
                                        align="right"
                                        className={classNames(classes.psm)}>
                                        Regularization loss
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={classNames(classes.psm)}>
                                        {parseFloat(this.props.step.reg_loss).toFixed(2)}
                                    </TableCell>
                                </TableRow>

                                <TableRow key="total_loss">
                                    <TableCell colSpan={6}
                                        align="right"
                                        className={classNames(classes.psm)}>
                                        Total loss
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={classNames(classes.psm)}>
                                        {parseFloat(this.props.step.total_loss).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            </Fragment>
                        )}
                    </TableBody>
                </Table>

                <Divider className={classNames(classes.mt1, classes.mb1)}/>
                <Button id="rand-data" color="primary" onClick={this.randomizeData}>Randomize</Button>
            </Fragment>
        );
    }
}

export default withStyles(styles)(DataControl);