import React from 'react';
import {withStyles} from '@material-ui/styles';

import styles from "svm_assets/jss/views/demo.js";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

import Card from "components/Card/Card";
import ConnectedHyper from "containers/Demo/Optimize/Hyper";

class Optimize extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.mt3}>
                <CardHeader color="info">Optimization & Hyper Parameters</CardHeader>
                <CardBody className={classes.pt2}>
                    <ConnectedHyper store={this.props.store} />
                </CardBody>
            </Card>

        )
    }
}

export default withStyles(styles)(Optimize);
