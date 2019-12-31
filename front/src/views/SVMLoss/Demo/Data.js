import React from "react";

import {makeStyles} from "@material-ui/core";

import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardHeader from "../../../components/Card/CardHeader.js";

import styles from "svm_assets/jss/views/demo.js";
import Article from "./Data/Article";
import ConnectedDataControl from "containers/Demo/Data/Control";

const useStyles = makeStyles(styles);

const Data = (props) => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader color="info">Data Point And Loss Values</CardHeader>
            <CardBody className={classes.pt2}>
                <Article/>
                <ConnectedDataControl store={props.store}/>
            </CardBody>
        </Card>
    )
};

export default Data;