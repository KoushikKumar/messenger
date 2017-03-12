
export function flushUsers(users) {
    return {
        type:"USERS",
        payload:users
    }
}