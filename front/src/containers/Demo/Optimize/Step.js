import {connect} from 'react-redux';
import Step from 'views/SVMLoss/Demo/Optimize/Step';
import {bindActionCreators} from 'redux'
import {toggleOptimize, setAvailableIterations} from "actions";

const mapStateToProps = (state, props) => {
    const {step} = state;
    return {step};
};

const mapDispatchToProps = (dispatch, props, state) =>
    bindActionCreators({toggleOptimize, setAvailableIterations}, dispatch);

const ConnectedStep = connect(mapStateToProps, mapDispatchToProps)(Step);

export default ConnectedStep;
