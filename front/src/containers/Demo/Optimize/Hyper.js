import {connect} from 'react-redux';
import Hyper from 'views/SVMLoss/Demo/Optimize/Hyper';
import {bindActionCreators} from 'redux'
import {updateHyper} from "actions";

const mapStateToProps = (state, props) => {
    const {hyper} = state;
    return {hyper};
};

const mapDispatchToProps = (dispatch, props, state) =>
    bindActionCreators({updateHyper}, dispatch);

const ConnectedHyper = connect(mapStateToProps, mapDispatchToProps)(Hyper);

export default ConnectedHyper;
