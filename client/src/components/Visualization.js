import React, {Component} from 'react';
import MathJax from 'react-mathjax';
import {connect} from 'react-redux';
import {getPlot} from '../actions/visualization'


const formulas = {
    f1: `W_{0,0}x_0+W_{0,1}x_1+b_0`,
    f2: `(x_0,x_1)`,
    f3: `(W_{0,0},W_{0,1})`
};

export class Visualization extends Component {
    componentDidMount() {
        this.props.getPlot(this.props.data, this.props.params);
    }

    render() {
        return (
            <MathJax.Provider>
                <div className="visualization card shadow">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                            Data And Classifier Visualization
                        </h6>
                    </div>
                    <div className="card-body">
                        <article>
                            <p>
                                Data points are shown as circles colored by
                                their
                                class (red/green/blue). The background regions
                                are
                                colored by whichever class is most likely at
                                any
                                point according to the current weights.
                            </p>

                            <p>
                                Each classifier is visualized by a line that
                                indicates its zero score level set. For
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
                                which shows the direction of score increase and
                                its
                                length is proportional to how steep the
                                increase
                                is.
                            </p>
                        </article>

                        <article>
                            <div className="mb-4">
                                <img alt="Plot" id="plot" className="img-fluid"
                                     src={this.props.plot}/>
                            </div>
                        </article>

                        <hr/>

                    </div>
                </div>
            </MathJax.Provider>
        );
    }
}

const mapStateToProps = state => {
    const plot = state.plot;
    const datapoints = state.data;
    const hyperparams = state.params;
    return {plot: plot, data: state.data.data, params: state.params.params}
};

export default connect(mapStateToProps, {getPlot})(Visualization);