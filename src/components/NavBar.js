import { useAuth } from './Auth';

function NavItem ({ children }) {
    return (
        <div className="rtr-navbar--item">
            { children }
        </div>
    );
}

function NavBar ({ children }) {
    let auth = useAuth();
    return (
        <>
            { auth.user ?
                <header className="rtr-navbar--container">
                    { children }
                </header>
                :
                null
            }
        </>
    );
}

export { NavBar, NavItem };