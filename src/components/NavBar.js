function NavItem ({ children }) {
    return (
        <div className="rtr-navbar--item">
            { children }
        </div>
    );
}

function NavBar ({ children }) {
    return (
        <header className="rtr-navbar--container">
            { children }
        </header>
    );
}

export { NavBar, NavItem };