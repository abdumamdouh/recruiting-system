const express = require('express')
const multer = require('multer')
const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')
const recruiterAuth = require('../middleware/recruiterAuth') 


const router = new express.Router()

// Sign-up
router.post('/Recruiter/Sign-up' , async (req,res) =>{
    const recruiter = req.body
    try {
        const takenEmail = await Applicant.findOne({ where: { email:req.body.email } }) || await Recruiter.findOne({ where: { email:req.body.email } })
        
        if (takenEmail){
            throw new Error("Email is already registered.")
        } else {
            const record = await Recruiter.create( recruiter )
            const token = await record.generateAuthToken()
            res.status(200).send({token,
                type:"Recruiter",
                name:`${recruiter.firstName} ${recruiter.lastName}.`
            })   
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Read recruiter profile
router.post('/Recruiter/me' , recruiterAuth, async (req,res) => {
    res.status(200).send(req.recruiter.getPublicRecruiterData())
})

// Update recruiter profile
router.patch('/Recruiter/me/update' , recruiterAuth, async (req,res) => {
    res.status(200).send(await req.recruiter.updatePublicRecruiterData( req.body ))
})


const upload = multer({
    limits: {
        fileSize: 1000000
    }, 
    fileFilter(req, file, cb) {
        if( !file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a Image file'))
        }
        cb(undefined, true)

    }
})

// Update recruiter's avatar
router.post('/Recruiter/me/avatar', recruiterAuth, upload.single('avatar'), async (req, res) => {
    await req.recruiter.saveAvatar(req.file.buffer)
    console.log(req.file.buffer)
    res.send('Updated successfully')
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// Get recruiter's avatar
router.get('/Recruiter/me/avatar', recruiterAuth, async (req, res) => {
    res.send(req.recruiter.avatar)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})







module.exports = router