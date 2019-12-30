import React from "react";

import {makeStyles} from "@material-ui/core";

import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardHeader from "../../../components/Card/CardHeader.js";

import styles from "svm_assets/jss/views/demo.js";
import Article from "./Params/Article";
import ConnectedParamsControl from "containers/Demo/Params/Control";

const useStyles = makeStyles(styles);

const Params = (props) => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader color="info">Classifier Parameters</CardHeader>
            <CardBody className={classes.pt2}>
                <Article/>
                <ConnectedParamsControl store={props.store}/>
            </CardBody>
        </Card>
    )
};

export default Params;