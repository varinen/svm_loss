import React, {Component} from 'react';
import {connect} from 'react-redux';
import {modifyParam} from '../actions/params';


export class ParamControl extends Component {
    render() {
        const params = this.props.hyperparams.params;
        const modifyParam = this.props.modifyParam;

        if (params && params.weights && params.biases) {
            return (
                params.weights.map((weight, index) => {
                    return (
                        <div key={`param-row-${index}`} className="row">
                            {weight.map((weightItem, indexItem) => (
                                    <div key={`weight-${indexItem}`}
                                         className="col-xs-4 p-1">
                                        <div className="form-group">
                                            <label
                                                className="small">W[{index},{indexItem}]</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                className="form-control form-control-sm"
                                                onChange={(e) => {
                                               modifyParam('weight', [index, indexItem], e.target.value);
                                           }}
                                                value={weightItem}/>
                                            <span
                                                className="d-block text-red font-italic small">0</span>
                                        </div>
                                    </div>
                                )
                            )}
                            <div key={`bias-${index}`}
                                 className="col-xs-4 p-1">
                                <div className="form-group">
                                    <label className="small">b[{index}]</label>
                                    <input type="number"
                                           step="0.1"
                                           onChange={(e) => {
                                               modifyParam('bias', index, e.target.value);
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
    const hyperparams = state.params;
    return {hyperparams}
};


export default connect(mapPropsToStore, {modifyParam})(ParamControl);