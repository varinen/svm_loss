import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/styles';

import GridContainer from 'components/Grid/GridContainer'
import GridItem from "components/Grid/GridItem";

import styles from "svm_assets/jss/views/demo.js";
import TextField from "@material-ui/core/TextField";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Card from "components/Card/Card";


class Hyper extends React.Component {

    updateHyper = (evt) => this.props.updateHyper(evt.target.name, evt.target.value);

    render() {
        const {classes, hyper: {reg_c, learning_rate, loss_type}} = this.props;
        return (
            <Card className={classes.mt3}>
                <CardHeader color="info">Optimization & Hyper Parameters</CardHeader>
                <CardBody className={classes.pt2}>
                    <GridContainer container spacing={2}>
                        <GridItem xs={4} key="loss_type">
                            <FormControl className={classes.formControl} style={{width: "100%"}}>
                                <InputLabel>
                                    Loss formulation
                                </InputLabel>
                                <Select
                                    name="loss_type"
                                    value={loss_type}
                                    onChange={this.updateHyper}
                                >
                                    <MenuItem value="ww">Weston Watkins 1999</MenuItem>
                                    <MenuItem value="ova">One-vs-All</MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>
                        <GridItem xs={4} key="learning_rate">
                            <TextField label="Learning rate"
                                       type="number"
                                       step="0.1"
                                       name="learning_rate"
                                       onChange={this.updateHyper}
                                       value={learning_rate}/>
                        </GridItem>
                        <GridItem xs={4} key="reg_c">
                            <TextField label="Regularization strength"
                                       type="number"
                                       step="0.1"
                                       name="reg_c"
                                       onChange={this.updateHyper}
                                       value={reg_c}/>
                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>

        )
    }
}

export default withStyles(styles)(Hyper);
