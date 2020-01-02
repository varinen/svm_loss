import {connect} from 'react-redux';
import Step from 'views/SVMLoss/Demo/Optimize/Step';
import {bindActionCreators} from 'redux'
import {fetchStep} from "actions";

const mapStateToProps = (state, props) => {
    const {step, params, hyper, data} = state;
    return {step, params, hyper, data};
};

const mapDispatchToProps = (dispatch, props, state) =>
    bindActionCreators({fetchStep}, dispatch);

const ConnectedStep = connect(mapStateToProps, mapDispatchToProps)(Step);

export default ConnectedStep;
