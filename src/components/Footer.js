import { useHistory } from 'react-router-dom';
import GoogleLogout from 'react-google-login';

import { useAuth } from './Auth';

function Footer({ children }) {
    let history = useHistory();
    let auth = useAuth();

    const logOut = () => {
        auth.signout(() => history.push("/"));
    }

    return (
        <footer className="rtr-footer--container">
            <a className="google-logout" href="/" onClick={logOut}>Log out</a>
            {/* <GoogleLogout
                className=""
                clientId="815652919811-04teroae4aok8u52359jdr99fg4hdbk1.apps.googleusercontent.com"
                tag={'a'}
                // render={renderProps => (
                //     <a className="google-log-out" onClick={renderProps.onClick} disabled={renderProps.disabled}>Log Out</a>
                // )}
                buttonText="Log Out"
                onLogoutSuccess={logout}
                isSignedIn={false}
            /> */}
        </footer>
    );
}

export default Footer;