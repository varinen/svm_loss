import {connect} from 'react-redux';
import DataControl from 'views/SVMLoss/Demo/Data/Control';
import {bindActionCreators} from 'redux'
import {fetchData, activateUpdateNeeded} from "actions";

const mapStateToProps = (state, props) => {
    const {data} = state;
    return {data};
};

const mapDispatchToProps = (dispatch, props, state) =>
    bindActionCreators({fetchData}, dispatch);

const ConnectedDataControl = connect(mapStateToProps, mapDispatchToProps)(DataControl);

export default ConnectedDataControl;
