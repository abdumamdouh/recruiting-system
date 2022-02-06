const Recruiter = require('../../models/Recruiter')
const jwt = require('jsonwebtoken')

const recruiterAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, '123456')
        const recruiter = await Recruiter.findOne({ where: { id:decoded._id } }) 
        // await Applicant.findOne( { where:{id: decoded._id-48 /*, 'tokens.token': token*/}})
        if( !recruiter ) {
            throw new Error()
        }
        req.token = token
        req.recruiter = recruiter
        next()
    }   catch(e) {
        res.status(401).send({ error: 'Please Authenticate'})  //401 auth failed
    }
}

module.exports = recruiterAuth