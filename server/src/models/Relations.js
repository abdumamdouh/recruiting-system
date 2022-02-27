//requiring db models
const Applicant = require("./Applicant");
const Recruiter = require("./Recruiter");
const Job = require("./Job");
const Requirment = require("./Requirment");
const MCQ = require("./MCQ");
const Question = require("./Question");
const JobMCQ = require("./JobMCQ");
const MCQQuestion = require("./MCQQuestion");

// relation between requirment and job (Has) ( 1-->N )
Job.hasMany(Requirment, {
    // as: "stack",
    foreignKey: "JobId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    hooks: true
});
Requirment.belongsTo(Job);

// relation between job and recruiter (Posts) ( 1-->N )
Recruiter.hasMany(Job, {
    foreignKey: "RecruiterId",
    onDelete: "cascade"
});
Job.belongsTo(Recruiter);

// relation between job and MCQ ( M-->N )
Job.belongsToMany(MCQ, { through: JobMCQ });
MCQ.belongsToMany(Job, { through: JobMCQ });
// relation between MCQ nad question ( M-->N )
MCQ.belongsToMany(Question, { through: MCQQuestion });
Question.belongsToMany(MCQ, { through: MCQQuestion });
