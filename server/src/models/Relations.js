//requiring db models 
const Applicant = require('./Applicant')
const Recruiter = require('./Recruiter')
const Job = require('./Job')
const Requirment = require("./Requirment")


// relation between requirment and job ( 1-->N )
Job.hasMany(Requirment, {
    foreignKey: 'id'
});
Requirment.belongsTo(Job);

// relation between job and recruiter ( 1-->N )
Recruiter.hasMany(Job,{
    foreignKey:'id'
})
Job.belongsTo(Recruiter)

