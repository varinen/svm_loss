import React from "react";

import {makeStyles} from "@material-ui/core";

import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardHeader from "../../../components/Card/CardHeader.js";

import styles from "svm_assets/jss/views/demo.js";
import Article from "./Data/Article";

const useStyles = makeStyles(styles);

const Data = () => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader color="info">Data Point And Loss Values</CardHeader>
            <CardBody className={classes.pt2}>
                <Article/>
            </CardBody>
        </Card>
    )
};

export default Data;