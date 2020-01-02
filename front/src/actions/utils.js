export const thunkCreator = (action) => {
    const {types, promise, ...other} = action;
    const {additional, ...rest} = other;
    const [REQUESTED, RESOLVED, REJECTED] = types;

    return (dispatch) => {
        dispatch({...rest, type: REQUESTED});

        return promise
            .then(result => {
                if (result.error) throw new Error(result.error);
                dispatch({...rest, type: RESOLVED, result});
                if (additional && additional.length) {
                    additional.map(addAction => dispatch({...addAction, parentResult: result}));
                }
                return result
            })
            .catch(error => {
                dispatch({...rest, type: REJECTED, error});
                throw error
            })
    }
};
