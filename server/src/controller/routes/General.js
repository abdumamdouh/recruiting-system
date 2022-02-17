const express = require("express");
// const { JSON } = require("sequelize/dist");
const Applicant = require("../../models/Applicant");
const Recruiter = require("../../models/Recruiter");
const RecOrApp = require("../middleware/RecOrApp");

const router = new express.Router();

// login for recruiters or applicants
router.post("/Login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {

        const record =
            (await Recruiter.findByCredentials(email, password)) ||
            (await Applicant.findByCredentials(email, password));
        if (record) {
            const token = await record.generateAuthToken();
            res.status(200).send({ token, record });
        } else {
            throw new Error("Email or password is incorrect.");

        const recruiter = await Recruiter.findByCredentials(email,password)
        const applicant = await Applicant.findByCredentials(email,password)
        if (recruiter){
            const token = await recruiter.generateAuthToken() 
            res.status(200).send({token,
                type:"Recruiter",
                name:`${recruiter.firstName} ${recruiter.lastName}.`
            })
        } else if (applicant){
            const token = await applicant.generateAuthToken() 
            res.status(200).send({token,
                type:"Applicant",
                name:`${applicant.firstName} ${applicant.lastName}.`
            })
        } 
        else {
            throw new Error('Email or password is incorrect.')

        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// logout for recruiters or applicants
router.post("/logout", RecOrApp, async (req, res) => {
    try {
        let user = req.recruiter ? req.recruiter : req.applicant;
        let tokens = JSON.parse(user.tokens);
        // console.log("current token", req.token);
        // console.log("list of tokens before filter", JSON.parse(user.tokens));
        tokens = tokens.filter((token) => token.token !== req.token);
        // console.log("list of tokens after filter", tokens);
        user.tokens = JSON.stringify(tokens);
        await user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = router;
