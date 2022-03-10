const express = require("express");
const db = require("./db/db");
const cors = require("cors");

//requiring db models
const Applicant = require("./models/Applicant");
const Recruiter = require("./models/Recruiter");
const Job = require("./models/Job");
const Requirment = require("./models/Requirment");
const ApplyFor = require("./models/ApplyFor");
const MCQ = require("./models/MCQ");
const Question = require("./models/Question");
const JobMCQ = require("./models/JobMCQ");
const MCQStat = require("./models/MCQStat");
const Task = require("./models/Task")
const ActiveTask = require("./models/ActiveTask")

//requiring db relations
const Relations = require("./models/Relations");

//requiring REST routes
const ApplicantRouter = require("./controller/routes/Applicant");
const RecruiterRouter = require("./controller/routes/Recruiter");
const GeneralRouter = require("./controller/routes/General");
const JobRouter = require("./controller/routes/Job");
const MCQRouter = require("./controller/routes/MCQ");
const TaskRouter = require("./controller/routes/Task");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// using App routers
app.use(ApplicantRouter);
app.use(RecruiterRouter);
app.use(GeneralRouter);
app.use(JobRouter);
app.use(MCQRouter);
app.use(TaskRouter)

// creating tables if not existed
Applicant.sync();
Recruiter.sync();
Job.sync();
Requirment.sync();
ApplyFor.sync();
MCQ.sync();
Question.sync();
JobMCQ.sync();
MCQStat.sync();
Task.sync() ;
ActiveTask.sync() ;

// iniallizing server on port 5000
app.listen(PORT, () => {
    console.log("Server is up on port " + PORT);
});
