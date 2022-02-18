const express = require("express");
// const _ = require("lodash");
const Applicant = require("../../models/Applicant");
const Recruiter = require("../../models/Recruiter");

const applicantAuth = require("../middleware/applicantAuth");
const recruiterAuth = require("../middleware/recruiterAuth");

const router = new express.Router();

router.post("/Applicant/Sign-up", async (req, res) => {
    const applicant = req.body;
    try {
        const takenEmail =
            (await Applicant.findOne({ where: { email: req.body.email } })) ||
            (await Recruiter.findOne({ where: { email: req.body.email } }));

        if (takenEmail) {
            throw new Error("Email is already registered.");
        } else {
            const record = await Applicant.create(applicant);
            const token = await record.generateAuthToken();
            res.status(200).send({
                token,
                type: "Applicant",
                name: `${applicant.firstName} ${applicant.lastName}.`
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get my profile data
router.post("/Applicant/me", applicantAuth, async (req, res) => {
    res.status(200).send(req.applicant.getPublicApplicantData());
});

// Update Applicant profile
router.patch("/Applicant/me/update", applicantAuth, async (req, res) => {
    res.status(200).send(
        await req.applicant.updatePublicApplicantData(req.body)
    );
});

// get profile by id
router.get("/profile/:id", recruiterAuth, async (req, res) => {
    try {
        const applicant = await Applicant.findByPk(req.params.id, {
            attributes: [
                "email",
                "firstName",
                "lastName",
                "major",
                "userName",
                "yearsOfExperience",
                "level",
                "qualifications"
            ]
        });
        if (!applicant) {
            return res.status(404).send();
        }
        res.send(applicant);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
