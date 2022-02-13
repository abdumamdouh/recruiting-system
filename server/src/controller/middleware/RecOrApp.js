const Applicant = require('../../models/Applicant')
const Recruiter = require('../../models/Recruiter')
const jwt = require('jsonwebtoken')

const RecOrApp = async (req, res, next) => {
    try {
        // getting token from request header 
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, '123456')
        
        // finding an applicant with the coming id
        const applicant = await Applicant.findOne({ where: { id:decoded._id } }) 
        const applicantTokens = applicant ? JSON.parse(applicant.tokens):[]

        // finding an recruiter with the coming id
        const recruiter = await Recruiter.findOne({ where: { id:decoded._id } })
        const recruiterTokens = recruiter ? JSON.parse(recruiter.tokens):[] 

        // checking if the applicant has the token
        let isApplicant = 0 ;
        applicantTokens.forEach(item => {
            if (item.token === token && applicant){
                isApplicant = 1 
            }
        });

        // checking if the recruiter has the token
        let isRecruiter = 0 ;
        recruiterTokens.forEach(item => {
            if (item.token === token && recruiter){
                isRecruiter = 1 
            }
        });
        
        if(!isApplicant && !isRecruiter) {
            throw new Error()
        }
        req.token = token

        if (isApplicant){
            req.applicant = applicant 
        } else if (isRecruiter){
            req.recruiter = recruiter
        }
        next()
    }   catch(e) {
        res.status(401).send({ error: 'Please Authenticate'})  //401 auth failed
    }
}


module.exports = RecOrApp