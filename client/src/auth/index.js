import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
};

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
    });
    const history = useHistory();
    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                });
            }
            default:
                return auth;
        }
    };

    auth.logoutUser = async function () {
        authReducer({
            type: AuthActionType.GET_LOGGED_IN,
            payload: {
                loggedIn: false,
                user: null
            }
        })
        history.push("/");
    }

    auth.loginUser = async function (payload) {
        try {
            const response = await api.loginUser(payload);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: true,
                        user: response.data.user,
                    },
                });
                history.push("/");
            }
            return "";
        } catch (error) {
            return error.response.data.errorMessage;
        }
    };

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user,
                },
            });
        }
    };

    auth.registerUser = async function (userData, store) {
        try {
            const response = await api.registerUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user,
                    },
                });
                history.push("/");
                store.loadIdNamePairs();
                return "";
            }
        } catch (error) {
            return error.response.data.errorMessage;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };
