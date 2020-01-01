import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Plot extends React.Component {
    render () {
        return (
            <article>
                <div>
                    {this.props.plot ? (
                    <img alt="Plot" id="plot"
                         style={{
                             border: "0",
                             borderStyle: "none",
                             maxWidth: "100%",
                             height: "auto",
                             verticalAlign: "middle"
                         }}
                         src={this.props.plot &&
                         `data:image/png;base64,${this.props.plot}`}/>
                        ): <CircularProgress />}
                </div>
            </article>
        )
    }
}

export default Plot;