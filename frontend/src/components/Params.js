import React from "react";
import {Card, CardHeader, CardContent} from "@material-ui/core";

import useStyles from "../styles";
import Article from "./Params/Article";

const Params = () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader title="Classifier Parameters">
            </CardHeader>
            <CardContent>
                <Article/>
            </CardContent>
        </Card>
    )
};

export default Params;