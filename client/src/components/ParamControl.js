import React from 'react';
import {connect} from 'react-redux';

const renderWeight = (weightItem, num) => (
    weightItem.map((weight, index) => (
            <div className="col-xs-4 p-1">
                <div className="form-group">
                    <label className="small">W[{num},{index}]</label>
                    <input
                        type="number"
                        step="1"
                        className="form-control form-control-sm"
                        value={weight}/>
                    <span
                        className="d-block text-red font-italic small">0</span>
                </div>
            </div>
        )
    )
);

export const ParamControl = ({params}) => {
    if (params && params.weights && params.biases) {
        return (
            params.weights.map((weight, index) => {
                return (
                    <div className="row">
                        {renderWeight(weight, index)}
                        <div className="col-xs-4 p-1">
                            <div className="form-group">
                                <label className="small">b[{index}]</label>
                                <input type="number"
                                       step="1"
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

    return null;
};

export default connect(state => {
    return {params: state.params}
})(ParamControl);