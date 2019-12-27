import React from "react";
import MathJax from 'react-mathjax';
import {Typography} from "@material-ui/core";

const formulas = {
    f1: `W_{0,0}x_0+W_{0,1}x_1+b_0`,
    f2: `(x_0,x_1)`,
    f3: `(W_{0,0},W_{0,1})`
};


export default () => (
    <MathJax.Provider>
        <article>
            <Typography variant="body2" color="textSecondary" component="p">
                Data points are shown as circles colored by their class (red/green/blue). The background
                regions
                are colored by whichever class is most likely at any point according to the current weights.
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
                Each classifier is visualized by a line that indicates its zero score level set. For
                example,
                the blue classifier computes scores
                as <MathJax.Node inline
                                 formula={formulas.f1}/> and
                the blue line shows the set of
                points <MathJax.Node inline
                                     formula={formulas.f2}/> that
                give score of zero. The blue arrow draws
                the
                vector <MathJax.Node inline
                                     formula={formulas.f3}/> ,
                which shows the direction of score increase and its length is proportional to how steep the
                increase is.
            </Typography>
        </article>
    </MathJax.Provider>
)