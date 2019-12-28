import React from "react";
import MathJax from 'react-mathjax';

const formulas = {
    f1: `W_{0,0}x_0+W_{0,1}x_1+b_0`,
    f2: `(x_0,x_1)`,
    f3: `(W_{0,0},W_{0,1})`
};

export default () => (
    <MathJax.Provider>
        <article>
            <p>
                Parameters <MathJax.Node inline formula={formulas.f1}/>,
                <MathJax.Node inline formula={formulas.f2}/> are shown below. The value is in <b>bold</b> and
                its gradient (computed with backprop) is in <span className="text-red font-italic">red, italic</span>
                below. Click the triangles to control the parameters.
            </p>

        </article>
    </MathJax.Provider>
)