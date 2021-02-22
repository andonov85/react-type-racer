import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { useAuth, ProvideAuth, PrivateRoute } from './components/Auth';
import { NavBar, NavItem } from './components/NavBar';
import Footer from './components/Footer';
import TypeRacer from './components/TypeRacer';
import LeaderBoard from './components/LeaderBoard';
import Welcome from './components/Welcome';

import './App.scss';

function App() {
  const auth = useAuth();
  console.log(auth)

  return (
    <div className="app--container">
      <ProvideAuth>
        <Router>
          { true &&
            <NavBar>
              <NavItem>
                <Link to="/type-racer">Type Racer</Link>
              </NavItem>
              <NavItem>
                <Link to="/leaderboard">Previous Games</Link>
              </NavItem>
            </NavBar>
          }

          <div className="rtr--container">
            <div className="rtr--container-inner">
              <Switch>
                <PrivateRoute path="/type-racer">
                  <TypeRacer randomWordsCount={10} />
                </PrivateRoute>
                <PrivateRoute path="/leaderboard">
                  <LeaderBoard />
                </PrivateRoute>
                <Route path="/">
                  <Welcome />
                </Route>
              </Switch>
            </div>
          </div>

          <Footer />
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
