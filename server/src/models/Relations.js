//requiring db models
const Applicant = require("./Applicant");
const Recruiter = require("./Recruiter");
const Job = require("./Job");
const Requirment = require("./Requirment");
const MCQ = require("./MCQ");
const Question = require("./Question");
const Task = require("./Task")

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
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    hooks: true
});
Job.belongsTo(Recruiter);

// relation between Recruiter and MCQ ( 1-->N )
Recruiter.hasMany(MCQ, {
    foreignKey: "recruiterId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    hooks: true
});
MCQ.belongsTo(Recruiter, { foreignKey: "recruiterId" });

// relation between MCQ and Questions ( 1-->N )
MCQ.hasMany(Question, {
    as: "questions",
    foreignKey: "MCQId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    hooks: true
});
Question.belongsTo(MCQ);

// relation between recruiter and task( 1-->N )
Recruiter.hasMany(Task, {
    foreignKey: "RecruiterId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    hooks: true
});
Task.belongsTo(Recruiter);

