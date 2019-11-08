import React, {Component} from 'react';
import MathJax from 'react-mathjax';
import {connect} from "react-redux";
import {getData} from "../actions/data";

const formulas = {
    f1: `x_i`,
    f2: `y_i`,
    f3: `f(x_i;W,b)=Wx_i+b`,
    f4: `s[0] = x[0] * W[0,0] + x[1] * W[0,1] + b[0]`,
    f5: `L_i`
};

export class Datapoints extends Component {
    getData = () => {
        this.props.getData(1)
    };

    componentDidMount() {
        this.props.getData();
    }

    render() {
        return (
            <MathJax.Provider>
                <div className="datapoints card shadow">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                            Data Point And Loss Values
                        </h6>
                    </div>
                    <div className="card-body">
                        <article>
                            <p>
                                Each row is loss due to one datapoint. The
                                first
                                three
                                columns are the 2D data <MathJax.Node inline
                                                                      formula={formulas.f1}/> and
                                the label <MathJax.Node inline
                                                        formula={formulas.f2}/>.

                                The next three columns are the three class
                                scores
                                from
                                each classifier <MathJax.Node inline
                                                              formula={formulas.f3}/> (E.g., <MathJax.Node
                                inline formula={formulas.f4}/>). The last
                                column is
                                the
                                data loss for a single example, <MathJax.Node
                                inline
                                formula={formulas.f5}/>

                            </p>


                            <div>

                            </div>
                        </article>
                    </div>
                </div>
            </MathJax.Provider>

        )
    }

}

export default connect(state=> (state.data), {getData})(Datapoints);
