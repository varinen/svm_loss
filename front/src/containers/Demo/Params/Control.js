import {connect} from 'react-redux';
import ParamControl from 'views/SVMLoss/Demo/Params/Control';
import {bindActionCreators} from 'redux'
import {fetchParams, updateParams, activateUpdateNeeded} from "actions";

const mapStateToProps = (state, props) => {
    let  {params, step} = state;
    if (!step.grad_b ) {
        step.grad_b = [];
        step.grad_w = [];
    }
    return {params, step};
};

const mapDispatchToProps = (dispatch, props, state) =>
    bindActionCreators({updateParams, fetchParams, activateUpdateNeeded}, dispatch);

const ConnectedParamsControl = connect(mapStateToProps, mapDispatchToProps)(ParamControl);

export default ConnectedParamsControl;
