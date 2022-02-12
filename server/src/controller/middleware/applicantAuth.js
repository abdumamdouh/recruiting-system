const Applicant = require('../../models/Applicant')
const jwt = require('jsonwebtoken')

const applicantAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, '123456')
        const applicant = await Applicant.findOne({ where: { id:decoded._id } }) 
        const applicantTokens = JSON.parse(applicant.tokens)
         
        // checking if the applicant has the token
        let found = 0 ;
        applicantTokens.forEach(item => {
            if (item.token === token){
                found = 1 
            }
        });
        if( !applicant || !found) {
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