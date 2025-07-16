

export const addUserDetails = (data) => {
    return function(dispatch) {
        console.log(data);
        return dispatch({ type: "USER", user: data });
    }
}

