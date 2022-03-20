import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import AddExam from "../../components/MCQExam/AddExam";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./DashBoardPage.scss";
import AvailableMCQs from "../AvailableExamsPage/AvailableMCQs";
import ExamPage from "../ExamPage/ExamPage";
import UploadedExams from "../UploadedExamsPage/UploadedExams";
import AssignApplicantsPage from "../AssignApplicantsPage/AssignApplicantsPage";
import AssignCandidatesPage from "../AssignCandidatesPage/AssignCandidatesPage"
import CandidatesPage from "../CandidatesPage/CandidatesPage";
import ApplicantPage from "../ApplicantPage/ApplicantPage"
import QuestionBank from "../../components/QuestionBank/QuestionBank"
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
                        <Route path="/dashboard/exam/:id">
                            <ExamPage />
                        </Route>
                        <Route exact path="/dashboard/uploadedexams">
                            <UploadedExams />
                        </Route>
                        <Route path="/dashboard/uploadedexams/assignapplicants/:id">
                            <AssignApplicantsPage />
                        </Route>
                        <Route path="/dashboard/uploadedexams/assigncandidates/:id">
                            <AssignCandidatesPage />
                        </Route>
                        <Route path="/dashboard/candidates">
                            <CandidatesPage />
                        </Route>
                        <Route path="/dashboard/applicant/:ID">
                          <ApplicantPage/>
                        </Route>
                        <Route path="/dashboard/questionbank">
                          <QuestionBank/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default DashBoardPage;
