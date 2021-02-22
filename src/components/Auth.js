import { useContext, createContext, useState } from "react";
import { Route, Redirect } from 'react-router-dom';

const authContext = createContext();

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = callback => {
        setUser(callback());
    };

    const signout = callback => {
        setUser(null);
    };

    return {
        user,
        signin,
        signout
    };
}

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

function useAuth() {
    return useContext(authContext);
}

function PrivateRoute({ children,...rest }) {
    const auth = useAuth();
    console.log('PrivateRoute', auth.user)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export { useAuth, ProvideAuth, PrivateRoute };