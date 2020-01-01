import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from "@material-ui/styles";
import styles from "svm_assets/jss/views/demo.js";

class Plot extends React.Component {
    render () {
        const {classes} = this.props;
        return (
            <article>
                    {this.props.plot ? (
                    <img alt="Plot" id="plot"
                         className={classes.plot}
                         src={this.props.plot &&
                         `data:image/png;base64,${this.props.plot}`}/>
                        ): <CircularProgress id="loading-plot" />}
            </article>
        )
    }
}

export default withStyles(styles)(Plot);