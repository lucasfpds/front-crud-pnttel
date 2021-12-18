import "./App.css";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import InputAdornments from "./components/InputAdornments/InputAdornments";
import Header from "./components/Header/Header";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalContext";
import useGlobal from "./hooks/useGlobal";
import EditUser from "./pages/EditUser/EditUser";

function ProtectedRoutes(props) {
  const { token } = useGlobal();

  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function Routes() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <GlobalProvider>
            <Header />
            <Route path={["/", "/sign-in"]} exact component={SignIn} />
            <Route path="/sign-up" exact component={SignUp} />
            <ProtectedRoutes>
              {/* <Route path="/home" exact component={InputAdornments} /> */}
              <Route path="/edit" exact component={EditUser} />

            </ProtectedRoutes>
          </GlobalProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
