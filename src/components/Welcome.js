import { useHistory, useLocation } from 'react-router-dom';
import { useGoogleLogin } from 'react-google-login';

import { useAuth } from './Auth';
import googleLogo from '../assets/images/google-logo.png';

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
                // console.log(res.profileObj)
                return res.profileObj;
            })
        },
        clientId: "815652919811-04teroae4aok8u52359jdr99fg4hdbk1.apps.googleusercontent.com",
        cookiePolicy: 'single_host_origin',
        isSignedIn: true,
        onFailure: () => console.log(`Failure: Can't retrieve googleUser!`),
        uxMode: 'redirect',
    });

    return (
        <article className="rtr-footer--container">
            <h1 className="welcome-title">
                Welcome to Type Racer
            </h1>
            <button className="rtr-button google-button" onClick={signIn}><img src={googleLogo}></img><span>Login with Google</span></button>
        </article>
    );
}

export default Welcome;