export default  function({dispatch}) {
    return next => action => {

        // If not a promise
        if(!action.payload || !action.payload.then) {
            return next(action)
        }

        action.payload
            .then((response) => {
                const newAction = {
                    ...action, payload: response.data
                }
                dispatch(newAction);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}