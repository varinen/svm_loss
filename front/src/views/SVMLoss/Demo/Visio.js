import React from "react";
import {Card, CardHeader, CardContent} from "@material-ui/core";

import useStyles from "../styles";
import Article from "./Visio/Article";

const Visio = () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader title="Data and Classifier Visualization">
            </CardHeader>
            <CardContent>
                <Article/>
            </CardContent>
        </Card>
    )
};

export default Visio;