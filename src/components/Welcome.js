import { useHistory, useLocation } from 'react-router-dom';
import { useGoogleLogin } from 'react-google-login';

import { useAuth } from './Auth';

function Welcome() {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
    const { from } = location.state || { from: { pathname: "/" } };
    const { signIn } = useGoogleLogin({
        onSuccess: (res) => {
            return auth.signin(() => {
                setTimeout(() => {
                    history.replace(from);
                }, 100);
                return res.profileObj;
            })
        },
        clientId: "815652919811-04teroae4aok8u52359jdr99fg4hdbk1.apps.googleusercontent.com",
        cookiePolicy: 'single_host_origin',
        isSignedIn: false,
        onFailure: () => console.log(`Failure: Can't retrieve googleUser!`),
        uxMode: 'popup',
    });

    return (
        <article className="rtr-footer--container">
            <h1 className="welcome-title">
                Welcome to Type Racer
            </h1>
            <button onClick={signIn}>Log in</button>
        </article>
    );
}

export default Welcome;