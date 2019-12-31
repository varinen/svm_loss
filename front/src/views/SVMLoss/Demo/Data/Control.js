import React, {Fragment} from 'react';
import classNames from "classnames";

import {withStyles} from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from "svm_assets/jss/views/demo.js";

class DataControl extends React.Component {

    render() {
        const {classes} = this.props;
        const dataPoints = this.props.data.map(row => [...row, '', '', '', '']);
        return (
            <Fragment>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.psm} align="right">X[0]</TableCell>
                                <TableCell className={classes.psm} align="right">X[1]</TableCell>
                                <TableCell className={classes.psm} align="right">y</TableCell>
                                <TableCell className={classNames(classes.borderRight, classes.psm)} align="right" >s[0]</TableCell>
                                <TableCell className={classes.psm} align="right">s[1]</TableCell>
                                <TableCell className={classes.psm} align="right">s[3]</TableCell>
                                <TableCell className={classNames(classes.borderRight, classes.psm)} align="right">L</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataPoints.map((row, index) => (
                                <TableRow key={`data-row${index}`}>
                                    {row.map((val, colIndex) => (
                                        <TableCell
                                            align="right"
                                            className={colIndex === 3 ? classNames(classes.borderRight, classes.psm) : classNames(classes.psm)} >{val}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </Fragment>
        );
    }
}

export default withStyles(styles)(DataControl);