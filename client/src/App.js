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
import ApplicantPage from "./pages/ApplicantPage/ApplicantPage";
import CustomiseHiringPage from "./pages/CustomiseHiringPage/CustomiseHiringPage";
import AddExam from "./components/MCQExam/AddExam";
import McqTestPage from "./pages/McqTestPage/McqTestPage";
import UpdatesPage from "./pages/UpdatesPage/UpdatesPage";
import AssignedTaskPage from "./pages/AssignedTaskPage/AssignedTaskPage";
import AssignedCodingProblemPage from "./pages/AssignedCodingProblemPage/AssignedCodingProblemPage";
// components
import Layout from "./components/layout/Layout";
// import HelloWorld from "./components/HelloWorld";
// protected route
import ProtectedRoute from "./ProtectedRoute";
import DashBoardPage from "./pages/DashBoardPage/DashBoardPage";
import Question from "./components/QuestionBank/Question";

const App = () => {
    return (
        <Router>
            {/* <SnackBar willopen={true} /> */}
            <Layout>
                <Switch>
                    <Route exact path="/" component={HomePage} name="/" />

                    <Route
                        exact
                        path="/login"
                        component={LoginPage}
                        name="login"
                    />

                    <Route
                        exact
                        path="/signup-applicant"
                        component={Applicant}
                        name="Applicant"
                    />

                    <Route
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
                        path="/feed/job/:ID"
                        component={JobPage}
                        name="job"
                    />

                    <ProtectedRoute
                        exact
                        path="/applicant/:ID"
                        component={ApplicantPage}
                        name="applicant"
                    />

                    <ProtectedRoute
                        exact
                        path="/createjob"
                        component={CreateJob}
                        name="createJob"
                    />

                    <ProtectedRoute
                        exact
                        path="/customiseHiring/:ID"
                        component={CustomiseHiringPage}
                        name="customiseHiringPipeline"
                    />

                    <ProtectedRoute
                        path="/dashboard/:ID"
                        component={DashBoardPage}
                        name="screeningDashboard"
                    />

                    {/* recruiter add exam */}
                    <ProtectedRoute
                        exact
                        path="/AddExam"
                        component={AddExam}
                        name="createJob"
                    />

                    <ProtectedRoute
                        exact
                        path="/questionbank"
                        component={Question}
                        name="createJob"
                    />

                    {/* Applicant can take MCQ exam */}
                    <ProtectedRoute
                        exact
                        path="/job/exam/:ID"
                        component={McqTestPage}
                        name="McqTest"
                    />

                    <ProtectedRoute
                        exact
                        path="/updates"
                        component={UpdatesPage}
                        name="updates"
                    />

                    <ProtectedRoute
                        exact
                        path="/job/task/:TaskID"
                        component={AssignedTaskPage}
                        name="taskApplicantView"
                    />
                    <ProtectedRoute
                        exact
                        path="/job/codingproblem/:codingProblemId"
                        component={AssignedCodingProblemPage}
                        name="codingProblemApplicantView"
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
