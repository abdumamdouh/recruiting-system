const Sequelize = require("sequelize");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const Requirment = require("./Requirment");
const ApplyFor = require("./ApplyFor");
const Applicant = require("./Applicant");

const Job = db.define("Job", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(5000),
        allowNull: false,
        unique: false
    },
    workPlaceType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    employmentType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    yearsOfExperience: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    careerLevel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// return job main informaton and its requirments
// deprecated replaced by SQL JOINS

// Job.prototype.getJobData = async function (type) {
//     const job = this
//     const jobData =  {
//         description: job.description ,
//         workPlaceType: job.workPlaceType ,
//         employmentType: job.employmentType ,
//         title: job.title ,
//         yearsOfExperience: job.yearsOfExperience,
//         careerLevel: job.careerLevel ,
//         company: job.Recruiter.dataValues.company,
//         place:job.place
//     }
//     const requirments = await Requirment.findAll({
//         attributes: ['name', 'weight'],
//         where: {
//             JobId : job.id
//         }
//     })

//     jobData.requirments = requirments
//     if (type === 'Applicant'){
//         return jobData
//     } else if (type === 'Recruiter'){
//         result = await ApplyFor.findAndCountAll({
//             where: {
//                 JobId: job.id
//             }
//         })
//         const records = result.rows
//         jobData.applicants = []
//         jobData.ApplicantsCount = result.count

//         for (let i = 0 ; i < records.length ; i++){
//             item = records[i]
//             const x = await Applicant.findOne({
//                 attributes:['id','firstName','lastName'],
//                 where: {
//                     id:item.dataValues.ApplicantId
//                 }
//             })
//             const applicant = {
//                 id : x.id ,
//                 Name:`${x.firstName} ${x.lastName}`
//             }
//             jobData.applicants.push(JSON.parse(JSON.stringify(applicant)))
//         }
//         return  jobData
//     }
// }

Job.prototype.addRequirments = async function (requirments) {
    await requirments.forEach(async (requirment) => {
        const requirmentName = Object.keys(requirment)[0];
        const requirmentWeight = Object.values(requirment)[0];
        await Requirment.create({
            name: requirmentName,
            weight: requirmentWeight,
            JobId: this.id
        });
    });
};

applicantScores = async function (job) {
    // get applicants(Names,IDs) applied for that job
    const [results, metadata] = await db.query(
        "SELECT A.userName,A.id FROM ApplyFors AS AF INNER JOIN Applicants AS A ON AF.ApplicantId = A.id WHERE AF.JobId=?",
        {
            replacements: [job.id]
        }
    );  


    // Formula => Requirments[75%] + yearsOfExperience[25%]  

    let maxScore = 0;
    job.Requirments.forEach((requirement) => {
        maxScore = maxScore + requirement.weight * 4;
    });
    const maxYearsOfExperienceFactor = ( 50 * job.yearsOfExperience  ) / (maxScore / 3);
    const maxYearsOfExperience = maxScore / 3;


    // calculate the score of each applicant and append it to each applicant
    for (let index = 0; index < results.length; index++) {
        const a = results[index];
        let aScore = 0;
        const applicantA = await Applicant.findOne({
            where: {
                id: a.id
            }
        });

        for (
            let index = 0;
            index < applicantA.qualifications.length;
            index++
        ) {
            const qualification = applicantA.qualifications[index];
            const requirmentObj = await job.Requirments.find(
                (req) => {
                    return req.name == Object.keys(qualification);
                }
            );

            if (requirmentObj) {
                aScore =
                    aScore +
                    requirmentObj.weight *
                        Object.values(qualification)[0];
            }
        }

        const applicantYearsOfExperienceScore = ( applicantA.yearsOfExperience * job.yearsOfExperience ) / maxYearsOfExperienceFactor;

        results[index].score = Math.ceil( ( ( aScore + applicantYearsOfExperienceScore ) / ( maxScore + maxYearsOfExperience) ) * 100);
    }

    // sort the applicants by the score
    results.sort((a, b) => {
        return b.score - a.score;
    });
    return results;  
}

module.exports = Job;
