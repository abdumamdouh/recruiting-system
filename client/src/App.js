import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// pages

// components

// protected route
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} name="Home Page" />
        <Route exact path="/login" component={Login} name="Login Page" />
        <ProtectedRoute
          exact
          path="/shirts"
          component={Shirts}
          name="Shirts Page"
        />
        <Route
          exact
          path="/404"
          component={PageNotFound404}
          name="Error Page"
        />
        <Redirect to="/404" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
