import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// @material-ui/icons
import {Typography} from "@material-ui/core";
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Parallax from "components/Parallax/Parallax.js";

import styles from "svm_assets/jss/views/demo.js";

import Demo from "./Demo";
import HeaderLinks from "./Header/HeaderLinks.js";
import Header from "./Header/Header.js";


const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function App(props) {
    const classes = useStyles();
    const {...rest} = props;
    return (
        <div>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="SVM Loss Demo"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 150,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax filter image={require("svm_assets/img/gray.png")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>SVM Loss Demo</h1>
                            <Typography variant="body2" className={classes.subtitle} component="p">
                                This projects implements the visualization of
                                optimization loss for a linear multiclass
                                classifier using Python and Flask. The idea is
                                based on the <b>Multiclass Linear Classification
                                Optimization Loss Visualization</b> <a
                                href="http://vision.stanford.edu/teaching/cs231n-demos/linear-classify/"
                                target="_blank" rel="noopener noreferrer">web
                                demo</a> by Justin Johnson. The text below is
                                taken from that demo page as well.
                            </Typography>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classNames(classes.container, classes.pt2)}>
                    <Demo/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
