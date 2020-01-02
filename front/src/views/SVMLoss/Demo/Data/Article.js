import React from "react";
import MathJax from 'react-mathjax';

const formulas = {
    f1: `x_i`,
    f2: `y_i`,
    f3: `f(x_i;W,b)=Wx_i+b`,
    f4: `s[0] = x[0] * W[0,0] + x[1] * W[0,1] + b[0]`,
    f5: `L_i`
};

export default () => (
    <MathJax.Provider>
        <article>
            <p>
                Each row is loss due to one data point. The first three columns are the 2D
                data <MathJax.Node inline formula={formulas.f1}/> and the
                label <MathJax.Node inline formula={formulas.f2}/>.
            </p>
            <p>
                The next three columns are the three class scores from each
                classifier <MathJax.Node inline formula={formulas.f3}/><br/> (e.g., <MathJax.Node inline formula={formulas.f4}/>).
            </p>
            <p>
                The last column is the data loss for a single example, <MathJax.Node inline formula={formulas.f5}/>.
            </p>
        </article>
    </MathJax.Provider>
)