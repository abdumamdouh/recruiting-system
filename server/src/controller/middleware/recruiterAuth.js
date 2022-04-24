const Recruiter = require("../../models/Recruiter");
const jwt = require("jsonwebtoken");

const recruiterAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        // console.log(token);
        const decoded = jwt.verify(token, "123456");
        const recruiter = await Recruiter.findOne({
            where: { id: decoded._id }
        });
        const recruiterTokens = JSON.parse(recruiter.tokens);

        // checking if the recruiter has the token
        let found = 0;
        recruiterTokens.forEach((item) => {
            if (item.token === token) {
                found = 1;
            }
        });

        // console.log(recruiterTokens)

        if (!recruiter || !found) {
            throw new Error();
        }
        req.token = token;
        req.recruiter = recruiter;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please Authenticate" }); //401 auth failed
    }
};

module.exports = recruiterAuth;
