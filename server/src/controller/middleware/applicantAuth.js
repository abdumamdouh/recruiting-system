const Applicant = require('../../models/Applicant')
const jwt = require('jsonwebtoken')

const applicantAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, '123456')
        const applicant = await Applicant.findOne({ where: { id:decoded._id } }) 
        // await Applicant.findOne( { where:{id: decoded._id-48 /*, 'tokens.token': token*/}})
        console.log(applicant)
        if( !applicant ) {
            throw new Error()
        }
        req.token = token
        req.applicant = applicant 
        next()
    }   catch(e) {
        res.status(401).send({ error: 'Please Authenticate'})  //401 auth failed
    }
}

module.exports = applicantAuth