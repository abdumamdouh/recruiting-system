import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import AddExam from "../../components/MCQExam/AddExam";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./DashBoardPage.scss";
import AvailableMCQs from "../AvailableExamsPage/AvailableMCQs";
import AvailableTasks from "../AvailableTasksPage/AvailableTasks";
import ExamPage from "../ExamPage/ExamPage";
import UploadedExams from "../UploadedExamsPage/UploadedExams";
import AssignApplicantsPage from "../AssignApplicantsPage/AssignApplicantsPage";
import AssignCandidatesPage from "../AssignCandidatesPage/AssignCandidatesPage";
import CandidatesPage from "../CandidatesPage/CandidatesPage";
import ApplicantPage from "../ApplicantPage/ApplicantPage";
import QuestionBank from "../../components/QuestionBank/QuestionBank";
import TaskPage from "../TaskPage/TaskPage";
import TaskReviewPage from '../TaskReviewPage/TaskReviewPage'
import CodingProblem from '../CodingProblemPage/CodingProblem'
import CodingProblemBank from '../CodingProblemPage/CodingProblemBank'
import CodingProblemView from "../CodingProblemPage/CodingProblemView";
import Reports from "../ReportsPage/Reports";
const DashBoardPage = () => {
    return (
        <Router>
            <div className="container">
                <SideBar />
                <div className="others">
                    <Switch>
                        <Route path="/dashboard/AddExam">
                            <AddExam />
                        </Route>
                        <Route path="/dashboard/availableMCQs">
                            <AvailableMCQs />
                        </Route>
                        <Route path="/dashboard/availableTasks">
                            <AvailableTasks />
                        </Route>
                        <Route path="/dashboard/exam/:id">
                            <ExamPage />
                        </Route>
                        <Route exact path="/dashboard/uploadedexams">
                            <UploadedExams />
                        </Route>
                        <Route path="/dashboard/uploadedexams/assignapplicants/:t/:id">
                            <AssignApplicantsPage />
                        </Route>
                        <Route path="/dashboard/uploadedexams/assigncandidates/:t/:id">
                            <AssignCandidatesPage />
                        </Route>
                        <Route path="/dashboard/candidates">
                            <CandidatesPage />
                        </Route>
                        <Route path="/dashboard/applicant/:ID">
                            <ApplicantPage />
                        </Route>
                        <Route path="/dashboard/questionbank">
                            <QuestionBank />
                        </Route>
                        <Route path="/dashboard/task">
                            <TaskPage />
                        </Route>
                        <Route path="/dashboard/uploadedexams/reviewsubmissions/:id">
                            <TaskReviewPage />
                        </Route>
                        <Route path="/dashboard/problem/:id">
                            <CodingProblemView />
                        </Route>
                        <Route path="/dashboard/codingProblemBank">
                            <CodingProblemBank />
                        </Route>
                        <Route path="/dashboard/codingProblem">
                            <CodingProblem />
                        </Route>
                        <Route path="/dashboard/reports">
                            <Reports />
                        </Route>

                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default DashBoardPage;
