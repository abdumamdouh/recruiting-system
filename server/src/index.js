const express = require('express')
const db = require('./db/db')
const Applicant = require('./models/Applicant')
const Recruiter = require('./models/Recruiter')

const app = express();
const PORT = 3000;

app.use(express.json()) 

Applicant.sync()
Recruiter.sync()

app.listen(PORT , () =>{
    console.log('Server is up on port '+ PORT)
})


