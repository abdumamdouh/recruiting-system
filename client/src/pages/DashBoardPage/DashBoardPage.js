import React from 'react';
import SideBar from '../../components/SideBar/SideBar'
import AddExam from '../../components/MCQExam/AddExam'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './DashBoardPage.scss'
import AvailableMCQs from '../AvailableExamsPage/AvailableMCQs';
import ExamPage from '../ExamPage/ExamPage'
const DashBoardPage = () => {
    return (
        <Router>
        <div className="container">
            <SideBar /> 
            <div className="others">
            <Switch>
            <Route path="/AddExam">
            <AddExam />
          </Route>
            <Route path="/availableMCQs">
            <AvailableMCQs />
          </Route>
            <Route path="/exam/:id">
            <ExamPage />
          </Route>
            </Switch>
            </div>  
        </div>
        </Router>
    );
}

export default DashBoardPage;
