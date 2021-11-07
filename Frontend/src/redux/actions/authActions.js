export const ACTION_LOGIN = "ACTION_LOGIN";
export const ACTION_LOGOUT = "ACTION_LOGOUT";

export const login = ()=>{
    return {
        type: ACTION_LOGIN,
        payload: {
            isLogged: true,
            //type: localStorage.getItem("type")
        },
    }
}

export const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    return {
        type: ACTION_LOGOUT,
        payload: {
            isLogged: false,
        },
   }
}