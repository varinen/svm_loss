import React, {Component} from 'react';
import MathJax from 'react-mathjax';
import {connect} from "react-redux";
import {getData} from "../actions/data";
import Button from "react-bootstrap/Button";
import {getPlot} from "../actions/visualization";

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

    requestPlot() {
        const {data, params, getPlot} = this.props;
        if (data.length > 0 && params.weights && params.weights.length > 0) {
            getPlot(data, params);
        }
    }

    render() {
        this.requestPlot();
        return (
            <div className="datapoints card shadow">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        Data Point And Loss Values
                    </h6>
                </div>
                <div className="card-body">
                    <article>
                        <MathJax.Provider>
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
                        </MathJax.Provider>

                        <div className="w-100" style={{overflowY: 'auto'}}>
                            <table className="table small">
                                <thead>
                                <tr>
                                    <th>X[0]</th>
                                    <th>X[1]</th>
                                    <th className="border-right">y</th>
                                    <th>s[0]</th>
                                    <th>s[1]</th>
                                    <th className="border-right">s[2]</th>
                                    <th>L</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props && this.props.data &&
                                this.props.data.map((entry, index) => (
                                    <tr key={`${index}-data-row`}
                                        className="data-row">
                                        <td key={`${index}-x-0-0`}>{entry[0]}</td>
                                        <td key={`${index}-x-0-1`}>{entry[1]}</td>
                                        <td key={`${index}-y-0`}
                                            className="border-right">{entry[2]}
                                        </td>
                                        <td key={`${index}-s-0-0`}></td>
                                        <td key={`${index}-s-0-1`}></td>
                                        <td key={`${index}-s-0-2`}
                                            className="border-right"></td>
                                        <td key={`${index}-L-0`}></td>
                                    </tr>
                                ))
                                }
                                <tr>
                                    <td colSpan="5"></td>
                                    <td>Mean:</td>
                                    <td data-target="mean_loss"></td>
                                </tr>

                                </tbody>
                            </table>

                            <hr/>
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>Total data loss</td>
                                    <td data-target="mean_loss"></td>
                                </tr>
                                <tr>
                                    <td>Regularization loss</td>
                                    <td data-target="reg_loss"></td>
                                </tr>
                                <tr>
                                    <td>Total loss</td>
                                    <td data-target="total_loss"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <Button
                                className="btn btn-primary randomize-data"
                                onClick={this.getData}>
                                Randomize data
                            </Button>
                        </div>

                    </article>
                </div>
            </div>
        )
    }
}

const mapPropsToStore = state => {
    const {data, params} = state;
    return {data, params};
};

export default connect(mapPropsToStore, {getData, getPlot})(Datapoints);