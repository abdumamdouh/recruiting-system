//requiring db models 
const Applicant = require('./Applicant')
const Recruiter = require('./Recruiter')
const Job = require('./Job')
const Requirment = require("./Requirment")


// relation between requirment and job (Has) ( 1-->N )
Job.hasMany(Requirment, {
    foreignKey: 'JobId'
});
Requirment.belongsTo(Job);

// relation between job and recruiter (Posts) ( 1-->N )
Recruiter.hasMany(Job,{
    foreignKey:'RecruiterId'
})
Job.belongsTo(Recruiter)

