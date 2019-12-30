import {connect} from 'react-redux';
import ParamControl from 'views/SVMLoss/Demo/Params/Control';
import {bindActionCreators} from 'redux'
import {updateParams} from "actions";

const mapStateToProps = (state, props) => {
    const {params} = state;
    return {params};
};

const mapDispatchToProps = (dispatch, props, state) =>
    bindActionCreators({updateParams}, dispatch);

const ConnectedParamsControl = connect(mapStateToProps, mapDispatchToProps)(ParamControl);

export default ConnectedParamsControl;
