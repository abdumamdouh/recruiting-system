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
import PageNotFound404 from "./pages/PageNotFound404";
import Info from "./components/profile/Info";
import CreateJob from "./components/CreateJob/CreateJob";
import Feed from "./components/Feed/FeedPage";
import JobPage from "./pages/JobPage/JobPage";

// components
import Layout from "./components/layout/Layout";
// protected route
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        component={HomePage}
                        name="/"
                    />

                    <Route
                        exact
                        path="/login"
                        component={LoginPage}
                        name="login"
                    />

                    <ProtectedRoute
                        exact
                        path="/signup-applicant"
                        component={Applicant}
                        name="Applicant"
                    />

                    <ProtectedRoute
                        exact
                        path="/signup-recruiter"
                        component={Recruiter}
                        name="signup-recruiter"
                    />
                    <ProtectedRoute
                        exact
                        path="/account"
                        component={Info}
                        name="Info"
                    />

                    <ProtectedRoute
                        exact
                        path="/feed"
                        component={Feed}
                        name="Feed"
                    />

                    <ProtectedRoute
                        exact
                        //TODO: replace job with dynamic route
                        path="/feed/job"
                        component={JobPage}
                        name="job"
                    />

                    <ProtectedRoute
                        exact
                        path="/createjob"
                        component={CreateJob}
                        name="createJob"
                    />

                    <Route
                        exact
                        path="/404"
                        component={PageNotFound404}
                        name="PageNotFound404"
                    />

                    <Redirect to="/404" />
                </Switch>
            </Layout>
        </Router>
    );
};

export default App;
