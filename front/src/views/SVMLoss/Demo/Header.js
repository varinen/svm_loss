import React, {Fragment} from "react";
import {Typography} from "@material-ui/core";
import useStyles from "../styles";

export default () => {
    const classes = useStyles();
    return (
        <Fragment>
            <Typography variant="h2" component="h1" gutterBottom className={classes.heading}>
                SVM Loss
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom className={classes.heading}>
                Linear Classifier Demo
            </Typography>
        </Fragment>
    )
}
