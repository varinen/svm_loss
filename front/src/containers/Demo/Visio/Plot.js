import {connect} from 'react-redux';
import Plot from 'views/SVMLoss/Demo/Visio/Plot';
import {bindActionCreators} from 'redux'
import {fetchPlot} from "actions";

const mapStateToProps = (state, props) => {
    const {plot} = state;
    return {plot};
};

const mapDispatchToProps = (dispatch, props, state) =>
    bindActionCreators({fetchPlot}, dispatch);

const ConnectedPlotControl = connect(mapStateToProps, mapDispatchToProps)(Plot);

export default ConnectedPlotControl;
