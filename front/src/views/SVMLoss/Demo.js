import React, {Fragment} from 'react';
import {Grid, Typography} from "@material-ui/core";

import Background from "./Demo/Background";
import Visio from './Demo/Visio';
import Params from './Demo/Params';
import Data from "./Demo/Data";


export default function Demo() {
    return (
        <Fragment>
            <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={12}>
                    <Background/>
                </Grid>

                <Grid item container spacing={2}>
                    <Grid item md={7} sm={12}>
                        <Visio/>
                    </Grid>
                    <Grid item md={5} sm={12} container>
                        <Grid item xs container direction="column" alignItems="stretch">
                            <Grid item xs>
                                <Params/>
                            </Grid>
                            <Grid item xs>
                                <Data/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                        Copyright © SVM Loss 2019
                    </Typography>
                </Grid>
            </Grid>
        </Fragment>
    );
}