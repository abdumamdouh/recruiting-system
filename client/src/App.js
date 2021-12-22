import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// pages

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Applicant from "./pages/SignUpPage/Applicant";
import Recruiter from "./pages/SignUpPage/Recruiter";
// components
import HelloWorld from "./components/HelloWorld";
import Layout from "./components/layout/Layout";
// protected route
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Router>
     <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/signup-applicant" exact>
          <Applicant />
        </Route>
        <Route path="/signup-recruiter" exact>
          <Recruiter/>
        </Route>
      </Switch>
    </Layout>
      {/* <Switch>
        <ProtectedRoute exact path="/" component={HelloWorld} name="" />
        <Route exact path="" component={HelloWorld} name="" />
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
      <Footer /> */}
    </Router>
  );
};

export default App;
