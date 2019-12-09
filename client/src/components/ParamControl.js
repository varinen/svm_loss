import React, {Component} from 'react';
import {connect} from 'react-redux';

const renderWeight = (weightItem, num) => (
    weightItem.map((weight, index) => (
            <div key={`weight-${index}`} className="col-xs-4 p-1">
                <div className="form-group">
                    <label className="small">W[{num},{index}]</label>
                    <input
                        type="number"
                        step="1"
                        className="form-control form-control-sm"
                        onChange={() => {
                        }}
                        value={weight}/>
                    <span
                        className="d-block text-red font-italic small">0</span>
                </div>
            </div>
        )
    )
);


export class ParamControl extends Component {

    render() {
        const params = this.props.params;

        if (params && params.weights && params.biases) {
            console.log(params);
            return (
                params.weights.map((weight, index) => {
                    return (
                        <div key={`param-row-${index}`} className="row">
                            {renderWeight(weight, index)}
                            <div key={`bias-${index}`}
                                 className="col-xs-4 p-1">
                                <div className="form-group">
                                    <label className="small">b[{index}]</label>
                                    <input type="number"
                                           step="1"
                                           onChange={() => {
                                           }}
                                           value={params.biases[index]}
                                           className="form-control form-control-sm"/>
                                    <span
                                        className="d-block text-red font-italic small">0</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }

        return <div></div>;
    }
}

const mapPropsToStore = state => {
    const {params} = state;
    return params
};

export default connect(mapPropsToStore)(ParamControl);