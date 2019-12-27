import React from "react";
import {Card, CardHeader, CardContent} from "@material-ui/core";

import useStyles from "../styles";
import Article from "./Data/Article";

const Data = () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader title="Data Point And Loss Values">
            </CardHeader>
            <CardContent>
                <Article/>
            </CardContent>
        </Card>
    )
};

export default Data;