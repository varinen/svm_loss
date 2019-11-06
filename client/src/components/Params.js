import React, {Component} from 'react';
import {connect} from 'react-redux';
import MathJax from 'react-mathjax';
import Button from 'react-bootstrap/Button';
import {getParams} from '../actions/params';
import ParamControl from  './ParamControl';

const formulas = {
    f1: `W`,
    f2: `b`
};

class Params extends Component {

    getParams = () => {
        this.props.getParams(1)
    };

    componentDidMount() {
        this.props.getParams();
    }

    render() {
        return (
            <MathJax.Provider>
                <div className="params card shadow">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                            Classifier Parameters</h6>
                    </div>
                    <div className="card-body">
                        <article>
                            <p>
                                Parameters <MathJax.Node inline
                                                         formula={formulas.f1}/>
                                , <MathJax.Node inline
                                                formula={formulas.f2}/> are
                                shown below. The value is in <b>bold</b> and
                                its gradient
                                (computed with backprop) is in <span
                                className="text-red font-italic">red, italic</span> below. Click the triangles to
                                control the parameters.
                            </p>
                            <ParamControl />
                            <div>
                                <Button className="btn btn-primary" onClick={this.getParams}>
                                    Randomize parameters
                                </Button>
                            </div>


                        </article>
                    </div>
                </div>
            </MathJax.Provider>

        );
    }
}

export default connect(state=> state, {getParams})(Params);