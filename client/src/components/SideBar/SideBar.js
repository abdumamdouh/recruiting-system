import React from "react";
import "./sidebar.scss";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    BarChart,
    WorkOutline,
    Report
} from "@mui/icons-material";
import AddchartIcon from "@mui/icons-material/Addchart";
import AdbIcon from "@mui/icons-material/Adb";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Link } from "react-router-dom";
const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        {/* <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link> */}
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Create Exams</h3>
                    <ul className="sidebarList">
                        <Link to="/dashboard/AddExam" className="link">
                            <li className="sidebarListItem">
                                <AddchartIcon className="sidebarIcon" />
                                MCQ Exam
                            </li>
                        </Link>

                        {
                            // for Question Bnak
                        }
                        <Link to="/dashboard/questionbank" className="link">
                            <li className="sidebarListItem">
                                <BackupTableIcon className="sidebarIcon" />
                                Questions Bank
                            </li>
                        </Link>
                        {
                            //////////////////////////////////////////////////////
                        }
                        <Link to="/dashboard/codingProblem" className="link">
                            <li className="sidebarListItem">
                                <AdbIcon className="sidebarIcon" />
                                Coding Problem
                            </li>
                        </Link>
                        <Link to="/dashboard/task" className="link">
                            <li className="sidebarListItem">
                                <AddTaskIcon className="sidebarIcon" />
                                Task
                            </li>
                        </Link>
                    </ul>
                    <h3 className="sidebarTitle">Available Exams</h3>
                    <ul className="sidebarList">
                        <Link to="/dashboard/availableMCQs" className="link">
                            <li className="sidebarListItem">
                                <BackupTableIcon className="sidebarIcon" />
                                MCQ Exam
                            </li>
                        </Link>
                        <Link to="/dashboard/codingProblemBank" className="link">
                            <li className="sidebarListItem">
                                <AdbIcon className="sidebarIcon" />
                                Coding Problem Bank
                            </li>
                        </Link>
                        <Link to="/dashboard/availableTasks" className="link">
                            <li className="sidebarListItem">
                                <AssignmentIcon className="sidebarIcon" />
                                Task
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/dashboard/candidates" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Candidates
                            </li>
                        </Link>
                        <Link to="/dashboard/uploadedexams" className="link">
                            <li className="sidebarListItem">
                                <WorkOutline className="sidebarIcon" />
                                Assign Exams
                            </li>
                        </Link>
                        <Link to="/dashboard/reports" className="link">
                        <li className="sidebarListItem">
                            <BarChart className="sidebarIcon" />
                            Reports
                        </li>
                        </Link>
                       
                    </ul>
                </div>
                {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div> */}
            </div>
        </div>
    );
};

export default SideBar;
