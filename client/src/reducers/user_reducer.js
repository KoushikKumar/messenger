export default function(state={}, action) {
    switch(action.type) {
        case "USERS":
            return {...state, users:action.payload}
    }
    return state;
}