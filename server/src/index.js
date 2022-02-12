const express = require('express')
const db = require('./db/db')
const cors = require('cors')

//requiring db models 
const Applicant = require('./models/Applicant')
const Recruiter = require('./models/Recruiter')
const Job = require('./models/Job')
const Requirment = require("./models/Requirment")
const ApplyFor = require("./models/ApplyFor")

//requiring db relations
const Relations = require('./models/Relations')

//requiring REST routes
const ApplicantRouter = require('./controller/routes/Applicant')
const RecruiterRouter = require('./controller/routes/Recruiter')
const GeneralRouter = require('./controller/routes/General')

const app = express();
const PORT = 5000;

app.use(express.json()) 
app.use(cors())

// using App routers
app.use(ApplicantRouter)
app.use(RecruiterRouter)
app.use(GeneralRouter)

// creating tables if not existed
Applicant.sync()
Recruiter.sync()
Job.sync()
Requirment.sync()
ApplyFor.sync()

// iniallizing server on port 5000
app.listen(PORT , () =>{
    console.log('Server is up on port '+ PORT)
})


