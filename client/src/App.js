import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// pages

// components
import HelloWorld from "./components/HelloWorld";

// protected route
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={HelloWorld} name="" />
        <Route exact path="" component={} name="" />
        <ProtectedRoute
          exact
          path=""
          component={}
          name=""
        />
        <Route
          exact
          path="/404"
          component={}
          name=""
        />
        <Redirect to="/404" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
