import React from "react";
import {makeStyles} from "@material-ui/core";

import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardHeader from "../../../components/Card/CardHeader.js";

import Article from "./Visio/Article";
import styles from "svm_assets/jss/views/demo.js";

const useStyles = makeStyles(styles);

const Visio = () => {
        const classes = useStyles();
        return (
            <Card>
                <CardHeader color="info">Data and Classifier Visualization</CardHeader>
                <CardBody className={classes.pt2}>
                    <Article/>
                </CardBody>
            </Card>
        )
    }
;

export default Visio;