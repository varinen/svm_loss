import React, {Fragment} from 'react';
import GridContainer from 'components/Grid/GridContainer'
import GridItem from "components/Grid/GridItem";
import TextField from '@material-ui/core/TextField';

class ParamsControl extends React.Component {

    updateParams = (rowIndex, colIndex, type) => (evt) => {
        this.props.updateParams(rowIndex, colIndex, type, evt.target.value);
    };
    render() {
        const {weights, biases} = this.props.params;
        const paramRows = weights.map(
            (weightRow, rowIndex) => [...weightRow, biases[rowIndex]]
        );

        return (
            <Fragment>
                {paramRows.map((row, rowIndex) => {
                    return (
                        <GridContainer key={`params-${rowIndex}`} container spacing={2}>
                            {row.map((entry, colIndex) => {
                                const xs = Math.floor(12 / row.length);
                                let label = `b[${rowIndex}]`;
                                let type = 'biases';
                                if (colIndex < row.length - 1) {
                                    label = `w[${rowIndex}, ${colIndex}]`
                                    type = 'weights';
                                }
                                return (
                                    <GridItem xs={xs} key={label}>
                                        <TextField label={label}
                                                   type="number"
                                                   step="0.1"
                                                   onChange={this.updateParams(rowIndex, colIndex, type)}
                                                   value={entry}/>
                                    </GridItem>
                                )
                            })}
                        </GridContainer>
                    )
                })}
            </Fragment>
        )
    }
}

export default ParamsControl;