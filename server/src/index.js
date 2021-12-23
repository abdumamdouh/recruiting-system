const express = require('express')
const db = require('./db/db')

const Applicant = require('./models/Applicant')
const Recruiter = require('./models/Recruiter')

const ApplicantRouter = require('./controller/routes/Applicant')
const RecruiterRouter = require('./controller/routes/Recruiter')
const GeneralRouter = require('./controller/routes/General')

const app = express();
const PORT = 3000;

app.use(express.json()) 

// using App routers
app.use(ApplicantRouter)
app.use(RecruiterRouter)
app.use(GeneralRouter)

// creating tables if not existed
Applicant.sync({ force: true })
Recruiter.sync({ force: true })

app.listen(PORT , () =>{
    console.log('Server is up on port '+ PORT)
})


