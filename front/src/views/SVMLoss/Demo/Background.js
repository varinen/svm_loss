import React from 'react'

import {makeStyles, Typography} from "@material-ui/core";

import styles from "svm_assets/jss/views/demo.js";

import MathJax from 'react-mathjax';
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardHeader from "../../../components/Card/CardHeader.js";

const useStyles = makeStyles(styles);

const formulas = {
    f1: `f(x_i;W,b)=Wx_i+b`,
    f2: `W`,
    f3: `b`,
    f4: `x_i`,
    f5: `y_i`,
    f6: `[3 \\times 2]`,
    f7: `[3 \\times 1]`,
    f8: `f`,
    f9: `L= \\underbrace{\\frac{1}{N}\\sum_{i=1}^{N}\\sum_{j\\neq y_i} max(0, f_j -
        f_{y_i} + 1)}_{\\text{data loss}} + \\underbrace{\\sum_k\\sum_l
        W_{k,l}^2}_{\\text{regularization loss}}`,
    f10: `N`,
    f11: `λ`,
    f12: `L2`,
    f13: `R(W)=\\sum_k\\sum_l W_{k, l}^2`
};

export default () => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader color="primary">Background of the Demo</CardHeader>
            <CardBody className={classes.pt2}>
                <MathJax.Provider>
                    <p>
                        The class scores for linear classifiers are
                        computed as <MathJax.Node inline formula={formulas.f1}/>, where
                        the parameters consist of weights <MathJax.Node inline formula={formulas.f2}/> and
                        biases <MathJax.Node inline formula={formulas.f3}/>.
                        The training data is <MathJax.Node inline formula={formulas.f4}/>,
                        with labels <MathJax.Node inline formula={formulas.f5}/>. In
                        this demo, the data points <MathJax.Node inline formula={formulas.f4}/>,
                        are 2-dimensional and there are 3 classes, so the
                        weight matrix is of size <MathJax.Node inline formula={formulas.f6}/>,
                        and the bias vector is of size <MathJax.Node inline formula={formulas.f7}/>.
                        The multi-class loss function can be formulated in
                        many ways. The default in this demo is an SVM that
                        follows [Weston and Watkins 1999]. Denoting <MathJax.Node inline formula={formulas.f8}/>, as
                        the <MathJax.Node inline formula={formulas.f7}/>,
                        vector that holds the class scores, the loss has
                        the form:
                    </p>

                    <div style={{width: "100%", overflowX: "auto"}}>
                        <MathJax.Node formula={formulas.f9}/>
                    </div>
                    <p>
                        Where <MathJax.Node inline formula={formulas.f10}/> is
                        the number of examples, and <MathJax.Node inline formula={formulas.f11}/> is a
                        hyperparameter that controls the strength of the <MathJax.Node inline formula={formulas.f12}/>
                        regularization penalty <MathJax.Node inline formula={formulas.f13}/>
                        On the bottom right of this demo you can also
                        flip to different formulations for the Multiclass
                        SVM including One vs All (OVA) where a separate
                        binary SVM is trained for every class independently
                        (vs. other classes all labeled as negatives), and
                        Structured SVM which maximizes the margin between
                        the correct score and the score of the highest
                        runner-up class. You can also choose to use the
                        cross-entropy loss which is used by the Softmax
                        classifier.
                    </p>
                </MathJax.Provider>
            </CardBody>
        </Card>
    )
}