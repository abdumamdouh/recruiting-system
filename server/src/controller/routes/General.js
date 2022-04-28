const express = require("express");
const Applicant = require("../../models/Applicant");
const Recruiter = require("../../models/Recruiter");
const ApplyFor = require("../../models/ApplyFor");
const RecOrApp = require("../middleware/RecOrApp");

const router = new express.Router();

// login for recruiters or applicants
router.post("/Login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const recruiter = await Recruiter.findByCredentials(email, password);
        const applicant = await Applicant.findByCredentials(email, password);
        if (recruiter) {
            const token = await recruiter.generateAuthToken();
            res.status(200).send({
                token,
                type: "Recruiter",
                name: `${recruiter.firstName} ${recruiter.lastName}.`
            });
        } else if (applicant) {
            const token = await applicant.generateAuthToken();
            const records = await ApplyFor.findAll({
                where: { ApplicantId: applicant.id },
                attributes: ["assigned"]
                // raw: true
            });
            let hasAssessments = null;
            if (records !== []) {
                hasAssessments = records.some((record) => {
                    let { assigned } = record;
                    assigned = JSON.parse(assigned);
                    let hasAssessment = Object.keys(assigned).some(
                        (key) => assigned[key].length !== 0
                    );
                    return hasAssessment;
                });
            }
            // console.log(hasAssessment);
            res.status(200).send({
                token,
                type: "Applicant",
                name: `${applicant.firstName} ${applicant.lastName}.`,
                ...(hasAssessments && { hasAssessments })
            });
        } else {
            throw new Error("Email or password is incorrect.");
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
        tokens = tokens.filter((token) => token.token !== req.token);
        user.tokens = JSON.stringify(tokens);
        await user.save();
        res.send("Logged out successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
