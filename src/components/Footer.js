import { useHistory } from 'react-router-dom';
import { useGoogleLogout } from 'react-google-login'

import { useAuth } from './Auth';

function Footer() {
    let history = useHistory();
    let auth = useAuth();
    const { signOut } = useGoogleLogout({
        onLogoutSuccess: () => {
            auth.signout(() => history.push("/"));
        },
        onFailure: () => console.log(`Failure: Can't retrieve googleUser!`),
        clientId: "815652919811-04teroae4aok8u52359jdr99fg4hdbk1.apps.googleusercontent.com",
        cookiePolicy: 'single_host_origin',
        uxMode: 'redirect',
      })

    return (
        <footer className="rtr-footer--container">
            <a className="google-logout" onClick={signOut}>Log out</a>
        </footer>
    );
}

export default Footer;