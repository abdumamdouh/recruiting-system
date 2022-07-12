const express = require("express");
const _ = require("lodash");
const Applicant = require("../../models/Applicant");
const Recruiter = require("../../models/Recruiter");
const Job = require("../../models/Job");
const MCQ = require("../../models/MCQ");
const JobMCQ = require("../../models/JobMCQ");
const Requirment = require("../../models/Requirment");
const ApplyFor = require("../../models/ApplyFor");
const ActiveTask = require("../../models/ActiveTask")
const ActiveCodingProblems = require("../../models/ActiveCodingProbelms")
const CodingProblemStats = require("../../models/CodingProblemStats")


const Sequelize = require("sequelize");
const db = require("../../db/db");
const Op = require("Sequelize").Op;

// requiring applicant and recruiter authentication
const recruiterAuth = require("../middleware/recruiterAuth");
const applicantAuth = require("../middleware/applicantAuth");
const RecOrApp = require("../middleware/RecOrApp");
const { where, TINYINT } = require("sequelize");
const { object } = require("joi");
const Task = require("../../models/Task");
const MCQStat = require("../../models/MCQStat");
const TaskUploads = require("../../models/TaskUploads");
const CodingProblemBank = require("../../models/CodingProblemBank");
const { over } = require("lodash");

const router = new express.Router();

// creating a job
router.post("/CreateJob", recruiterAuth, async (req, res) => {
    const job = req.body;
    job.RecruiterId = req.recruiter.id;
    job.company = req.recruiter.company;
    try {
        const newJob = await Job.create(job);
        await newJob.addRequirments(job.stack);
        res.status(200).send("Job Posted successfuly.");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all jobs Feed for applicants and recruiters
// todo --> pagination
// more optimization on Auth

router.post("/Feed", async (req, res) => {
    const pageNumber = req.body.pageNumber;
    // const Limit = req.body.limit
    try {
        const result = await Job.findAndCountAll({
            include: [
                {
                    model: Recruiter,
                    attributes: ["company", "avatar"],
                    // INNER JOIN
                    required: true
                }
            ],
            attributes: [
                "id",
                "title",
                "workPlaceType",
                "employmentType",
                "careerLevel",
                "place",
                "createdAt"
            ],
            offset: (pageNumber - 1) * 10,
            limit: 10
        });
        res.send({
            Jobs: result.rows,
            Count: result.count
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get job info for the applicant and job stats for the recruiter
router.get("/jobs/:id", RecOrApp, async (req, res) => {
    try {
        if (req.applicant) {
            const job = await Job.findOne({
                include: [
                    {
                        model: Recruiter,
                        attributes: ["company", "avatar"],
                        // INNER JOIN
                        required: true
                    },
                    {
                        model: Requirment,
                        attributes: ["name"],
                        // INNER JOIN
                        required: true
                    }
                ],
                where: {
                    id: req.params.id
                }
            });

            const appliedForTheJob = await ApplyFor.findOne({
                where: {
                    JobId: req.params.id,
                    ApplicantId: req.applicant.id
                }
            });
            if (appliedForTheJob) {
                job.dataValues.applied = true;
            } else {
                job.dataValues.applied = false;
            }
            // console.log(job);
            res.send(job);
        } else if (req.recruiter) {
            const job = await Job.findOne({
                include: [
                    {
                        model: Recruiter,
                        attributes: ["company", "avatar"],
                        // INNER JOIN
                        required: true
                    },
                    {
                        model: Requirment,
                        attributes: ["name", "weight"],
                        // INNER JOIN
                        required: true
                    }
                ],
                where: {
                    id: req.params.id,
                    RecruiterId: req.recruiter.id
                }
            });
            if (job) {

                job.dataValues.applicants = await applicantScores(job);
                res.send(job);

            } else {
                throw new Error("You are not authorized to view this job");
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all jobs posted by a certain recruiter
router.post("/recruiter/myjobs", recruiterAuth, async (req, res) => {
    const pageNumber = req.body.pageNumber;
    // const Limit = req.body.limit
    try {
        const result = await Job.findAndCountAll({
            include: [
                {
                    model: Recruiter,
                    attributes: ["company", "avatar"],
                    // INNER JOIN
                    required: true
                }
            ],
            attributes: [
                "id",
                "title",
                "workPlaceType",
                "employmentType",
                "careerLevel"
            ],
            where: {
                RecruiterId: req.recruiter.id
            },
            offset: (pageNumber - 1) * 10,
            limit: 10
        });
        res.send({
            Jobs: result.rows,
            Count: result.count
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all jobs applicant applied for
router.post("/applicant/myjobs", applicantAuth, async (req, res) => {
    const pageNumber = req.body.pageNumber;
    const applicantId = req.applicant.id;

    try {
        const jobs = await db.query(
            "SELECT J.id,J.description,J.workPlaceType,J.employmentType,J.title,J.yearsOfExperience,J.careerLevel,J.place,AF.createdAt,AF.status FROM Jobs AS J INNER JOIN ApplyFors AS AF ON J.id = AF.JobId WHERE AF.ApplicantId=? LIMIT ?,10",
            {
                replacements: [applicantId, pageNumber - 1]
            }
        );
        // console.log(jobs)
        res.send(jobs);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// edit a job by recruiter
router.patch("/jobs/:id", recruiterAuth, async (req, res) => {
    try {
        const job = await Job.findOne({
            where: {
                id: req.params.id,
                RecruiterId: req.recruiter.id
            }
        });
        if (!job) {
            return res.status(404).send();
        }
        Object.keys(req.body).forEach(
            (title) => (job[title] = req.body[title])
        );
        if (req.body.stack.length) {
        
            Requirment.destroy({ where: { JobId: job.id }, force: true });
            const requirements = req.body.stack.map((requirment) => ({
                name: Object.keys(requirment)[0],
                weight: Object.values(requirment)[0],
                JobId: job.id
            }));
            Requirment.bulkCreate(requirements);
            _.set(
                job.dataValues,
                "stack",
                requirements.map((requirement) =>
                    _.omit(requirement, ["JobId"])
                )
            );
        }
        // console.log(requirements);
        await job.save();
        res.send(job);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Apply for a job
router.post("/jobs/applyFor/:id", applicantAuth, async (req, res) => {
    const job = {
        JobId: req.params.id,
        ApplicantId: req.applicant.id
    };

    try {
        const applicant = await ApplyFor.findOne({
            where: job
        });
        if (applicant) {
            throw new Error("This Applicant already applied for the job");
        } else {
            const jobApply = await ApplyFor.create(job);
            res.send("Applied for the job successfully");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// get all availale tasks of the job
router.get("/getAllTasks/:id", recruiterAuth, async (req, res) => {
    try {
        const jobId = req.params.id;

        const mcqs = await JobMCQ.findAndCountAll({
            include: {
                model: MCQ,
                attributes: ["title"]
            },
            attributes: ["MCQId", "expiryDate"],
            where: {
                jobId: jobId,
                expiryDate: {
                    [Op.gt]: new Date()
                }
            }
        });

        res.send({
            MCQs: mcqs.rows,
            Count: mcqs.count
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});



// assign the diffrent tasks of the job to applicants
router.post("/assignTasks", recruiterAuth, async (req, res) => {
    try {
        const jobId = req.body.jobId;
        if (req.body.MCQ) {
            const mcq = req.body.MCQ;
            const MCQId = mcq.MCQId;
            
            const mcqRecord = await MCQ.findByPk(MCQId);
            if(!mcqRecord) {
                throw new Error("This MCQ id is invalid");
            }
            
            const jobRecord = await Job.findByPk(jobId);
            if(!jobRecord) {
                throw new Error("This Job id is invalid");
            } else if ( jobRecord.RecruiterId !== req.recruiter.id ) {
                throw new Error("You are not authorized to view this job");
            }

            const applicants = await ApplyFor.findAll({
                // attributes: ["assigned"],
                where: {
                    jobId: jobId,
                    ApplicantId: {
                        [Op.in]: mcq.applicants
                    }
                }
            });
            if(!applicants.length) {
                throw new Error("Applicants are not applied for this job");
            } else if (applicants.length !== mcq.applicants.length) {
                throw new Error("Applicants are not applied for this job");
            } else {
                applicants.forEach(async (applicant) => {
                    const assigned = JSON.parse(applicant.dataValues.assigned);
    
                    // console.log(assigned)
                    assigned.MCQs.push(MCQId);
                    assigned.MCQs = assigned.MCQs.filter(
                        (v, i, a) => a.indexOf(v) === i
                    );
                    applicant.assigned = JSON.stringify(assigned);
                    // console.log(typeof applicant)
                    await applicant.save();
                });
            }
            
            res.send("MCQ Assigned");
        } else if (req.body.codingProblem) {
            // console.log('coding',req.body.codingProblem)
            const codingProblems = req.body.codingProblem;
            const codingProblemId = codingProblems.codingProblemId;

            const problemRecord = await ActiveCodingProblems.findOne({
                where: {
                    codingProblemId:codingProblemId}
            });
            if(!problemRecord) {
                throw new Error("This Problem is not Active");
            }
            
            const jobRecord = await Job.findByPk(jobId);
            if(!jobRecord) {
                throw new Error("This Job id is invalid");
            } else if ( jobRecord.RecruiterId !== req.recruiter.id ) {
                throw new Error("You are not authorized to view this job");
            }

            const applicants = await ApplyFor.findAll({
                // attributes: ["assigned"],
                where: {
                    jobId: jobId,
                    ApplicantId: {
                        [Op.in]: codingProblems.applicants
                    }
                }
            });
            if(!applicants.length) {
                throw new Error("No applicants applied for this job");
            } else if (applicants.length !== codingProblems.applicants.length) {
                throw new Error("No applicants applied for this job");
            } else {
                applicants.forEach(async (applicant) => {
                    const assigned = JSON.parse(applicant.dataValues.assigned);
    
                    // console.log(assigned)
                    assigned.codingProblems.push(codingProblemId);
                    assigned.codingProblems = assigned.codingProblems.filter(
                        (v, i, a) => a.indexOf(v) === i
                    );
                    applicant.assigned = JSON.stringify(assigned);
                    // console.log(typeof applicant)
                    await applicant.save();
                });
            }
            res.send("Problem assigned successfully.");
        } else if (req.body.task) {
            const task = req.body.task;
            const TaskId = task.TaskId;

            const taskRecord = await ActiveTask.findOne({
                where: {
                    TaskId:TaskId}
            });
            if(!taskRecord) {
                throw new Error("This task is not Active");
            }

            const jobRecord = await Job.findByPk(jobId);
            if(!jobRecord) {
                throw new Error("This Job id is invalid");
            } else if ( jobRecord.RecruiterId !== req.recruiter.id ) {
                throw new Error("You are not authorized to view this job");
            }

            const applicants = await ApplyFor.findAll({
                // attributes: ["assigned"],
                where: {
                    jobId: jobId,
                    ApplicantId: {
                        [Op.in]: task.applicants
                    }
                }
            });
            if(!applicants.length) {
                throw new Error("No applicants applied for this job");
            } else if (applicants.length !== task.applicants.length) {
                throw new Error("No applicants applied for this job");
            } else {
                applicants.forEach(async (applicant) => {
                    const assigned = JSON.parse(applicant.dataValues.assigned);
    
                    // console.log(assigned)
                    assigned.tasks.push(TaskId);
                    assigned.tasks = assigned.tasks.filter(
                        (v, i, a) => a.indexOf(v) === i
                        );
                    applicant.assigned = JSON.stringify(assigned);
                    // console.log(typeof applicant)
                    await applicant.save();
                });
            }
            res.send("Task assigned successfully.");
        } else {
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// m[6] = {(time+memory,1),(2),(3)}
// m[5] = {4,5}
//     |
//     -
// m[6] = {3,2,1}
// m[5] = {5,4} 


const calculateCodingScore = async function(id){
    // return: name , id ,  results , overallscore(scoreMap)
    let score = {} ;
    let scoreMap = new Map() ;
    const lastKeyInMap = map => Array.from(map)[map.size-1][0]
    const firstKeyInMap = map => Array.from(map)[0][0]

    score = await db.query(`SELECT A.firstName, A.lastName , A.id , ST.results FROM codingproblemstats AS ST INNER JOIN Applicants AS A ON ST.applicantId = A.id WHERE ST.JobId=${id};`,
    {
        type: db.QueryTypes.SELECT
    }) ;

    const testcasesCount = Object.keys(score[0].results).length;

    score.forEach(cp => {
        let passedCount = 0 ;
        let totalTime = 0 ;
        let totalMemory = 0 ;
        // console.log(cp.results);
        for (const testCase in cp.results) {
            // console.log(cp.results[testCase]);
            if(cp.results[testCase].result === "PASSED")
                {
                    passedCount++;
                    totalTime += (Number(cp.results[testCase].timeConsumption.split(" ")[0]) )
                    totalMemory += (Number(cp.results[testCase].memoryConsumption.split(" ")[0]) / 1e6)
                }
        }
        let temp = scoreMap.get(passedCount) || []
        temp.push([totalTime,totalMemory,cp.id])
        scoreMap.set(passedCount ,temp ) 
    })
    scoreMap = new Map([...scoreMap].sort());
    for (let [key, value] of scoreMap) {
        value.sort((a, b) => { 
            if (a[0] < b[0])
                return -1 ;
            else if (a[0] > b[0])
                return 1 ;
            else if (a[0] === b[0]) {
                // a[1] > b[1] ? 1 : -1 ;
                if (a[1] > b[1]) 
                    return 1
                else
                    return -1 ; 
            } else
                return 0 ;
        })
    }


    const maxTestcase = lastKeyInMap(scoreMap)
    const minTestcase = firstKeyInMap(scoreMap)
    // loop on the map from the bottom (Bohemyaaa)
    for(let i = testcasesCount ; i >= 0; i--){
        if (scoreMap.get(i) !== undefined){
            let minTime = 1e7+9 
            let maxTime = 0 
            let minMemory = 1e7+9  
            let maxMemory = 0 
            
            const currList = scoreMap.get(i)
            currList.forEach((tinyList) => {
                maxTime = Math.max(maxTime,tinyList[0])
                minTime = Math.min(minTime,tinyList[0])

                maxMemory = Math.max(maxMemory,tinyList[1])
                minMemory = Math.min(minMemory,tinyList[1])
            })
            // (max-value / max - min) * 100
            currList.forEach((tinyList) => {
                let correctnessMark 
                let timeMark
                let memoryMark 

                if (maxTestcase === minTestcase && maxTestcase === 0){
                    correctnessMark = 0
                } else if (maxTestcase === minTestcase && maxTestcase !== 0){
                    correctnessMark = 50
                } else {
                    correctnessMark = (((i-minTestcase) / (maxTestcase-minTestcase))*100)/2
                }

                if (maxTime === minTime && maxTime === 0){
                    timeMark = 25
                } else if (maxTime === minTime && maxTime !== 0){
                    timeMark = 0
                } else {
                    timeMark = (((maxTime-tinyList[0]) / (maxTime-minTime))*100)/4
                }
                
                if (maxMemory === minMemory && maxMemory === 0){
                    memoryMark = 25
                } else if (maxMemory === minMemory && maxMemory !== 0){
                    memoryMark = 0
                } else {
                    memoryMark = (((maxMemory-tinyList[1]) / (maxMemory-minMemory))*100)/4
                }
                // console.log(maxMemory - minMemory)
                // console.log(correctnessMark,timeMark,memoryMark,tinyList[2])

                // adding total mark to each applicant
                const index  = score.findIndex((applicant) => applicant.id === tinyList[2])
                score[index].mark = (correctnessMark+timeMark+memoryMark)
            })

        }
    }
    // console.log(score);
    //     console.log(scoreMap)
    
    return score ;
}

router.get("/report/:id", recruiterAuth, async (req, res) => {
    try {
        const jobId = req.params.id;
        const applicantsApplied = await ApplyFor.count({
            where: {
                JobId: jobId
            }
        })

        // Candidates = 50%

        
        // const mcqs = await JobMCQ.findAndCountAll({
        //     include: {
        //         model: MCQ,
        //         attributes: ["title"],
        //     },
        //     attributes: ["MCQId"],
        //     where: {
        //         jobId: jobId
        //     }
        // });

        // const mcqResults = await MCQStat.findAll({
        //     attributes: ["applicantId","MCQId", "score"],
        //     where: {
        //         jobId: jobId
        //     }

        // }) 

        let mcqsStats = await db.query(
            "SELECT A.firstName, A.lastName, M.id, M.title, MS.score  FROM mcqstats AS MS INNER JOIN Applicants AS A ON MS.ApplicantId = A.id INNER JOIN mcqs AS M ON MS.MCQId = M.id WHERE MS.JobId=?;",
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT 
            }
        );

        mcqsStats = mcqsStats.map( (mcq) => {
            obj = {}
            obj[mcq.id] = { 
                title: mcq.title,
                applicantScore: {
                    
                    applicantName : `${mcq.firstName} ${mcq.lastName}`,
                    score : mcq.score
                }
            }  
            return obj
        })

        const mcqsResults = {};
        mcqsStats.forEach((mcq) => {
            const key = Object.keys(mcq)[0];
            const title = Object.values(mcq)[0].title;
            const value = Object.values(mcq)[0].applicantScore;
            let values
            if( typeof mcqsResults[key] == 'undefined' ) {
                values = mcqsResults[key] || [];
                values.push( value );
            } else {
                values = mcqsResults[key].values || [];
                values.push( value );

            }

            mcqsResults[key] = {
                title: title,
                values: values
            };
        })

        for (const [key, value] of Object.entries(mcqsResults)) {
            // console.log(`${key}: ${value.values}`);
            mcqsResults[key].values = value.values.sort( (a, b)=> {
                if ( a.score < b.score ) {
                    return 1
                }
                else 
                    return -1
            })
        }
        const average_MCQS_score = await db.query(
            "SELECT MCQId, round( AVG(score), 2) AS average_MCQ_score FROM mcqstats WHERE jobId = ? GROUP BY MCQId;", 
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );

        const applicant_MCQS_score = await db.query(
            "SELECT applicantId,MCQId, score FROM mcqstats WHERE jobId = ?;", 
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );
     

        const overallMCQs = await db.query(
            "SELECT A.firstName , A.lastName, MS.applicantId, SUM(MS.score) AS overallMCQsScore FROM mcqstats AS MS  INNER JOIN applicants AS A ON  MS.applicantId = A.id WHERE MS.jobId = ? GROUP BY MS.applicantId;", 
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );
        // const overallMCQs = await MCQStat.findAll({
        //     attributes: [
        //       'applicantId',
        //       [Sequelize.fn('sum', Sequelize.col('score')), 'overallMCQsScore'],
        //     ],
        //     where: {
        //         jobId: jobId
        //     },
        //     group: ['applicantId'],
        //     raw: true
        // });

        // const overallTasks = await TaskUploads.findAll({
        // attributes: [
        //     'applicantId',
        //     [Sequelize.fn('sum', Sequelize.col('score')), 'overallTasksScore'],
        // ],
        // where: {
        //     jobId: jobId
        // },
        // group: ['applicantId'],
        // raw: true
        // }); 
          

        // console.log(average_MCQS_score)
        // const tasks = await TaskUploads.findAndCountAll({
        //     include: {
        //         model: Task,
        //         attributes: ["title"]

        //     },
        //     attributes: ["TaskId"],
        //     where: {
        //         jobId: jobId,
        //     }
        // });

        // const taskResults = await TaskUploads.findAll({
        //     attributes: ["ApplicantId","TaskId", "score"],
        //     where: {
        //         jobId: jobId
        //     }
        // }) 
        let taskStats = await db.query(
            "SELECT A.firstName, A.lastName, T.id, T.title, TA.score  FROM `gp-db`.taskuploads AS TA INNER JOIN `gp-db`.Applicants AS A ON TA.ApplicantId = A.id INNER JOIN `gp-db`.tasks AS T ON TA.taskId = T.id WHERE TA.JobId=?;",
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );
        
        taskStats = taskStats.map( (task) => {
            obj = {}
            obj[task.id] = { 
                title: task.title,
                applicantScore : {
                    applicantName : `${task.firstName} ${task.lastName}`,
                    score : task.score
                }
            }  
            return obj
        })
        const tasksResults = {};
        taskStats.forEach((task) => {
            const key = Object.keys(task)[0];
            const title = Object.values(task)[0].title;
            const value = Object.values(task)[0].applicantScore;

            let values
            if( typeof tasksResults[key] == 'undefined' ) {
                values = tasksResults[key] || [];
                values.push( value );
            } else {
                values = tasksResults[key].values;
                // console.log(value)
                // console.log(values)
                values.push( value );

            }
            tasksResults[key] = {
                title: title,
                values: values
            };
        })

        for (const [key, value] of Object.entries(tasksResults)) {
            // console.log(`${key}: ${value.values}`);
            tasksResults[key].values = value.values.sort( (a, b)=> {
                if ( a.score < b.score ) {
                    return 1
                }
                else 
                    return -1
            })
        }

        const average_Tasks_score = await db.query( "SELECT TaskId, round( AVG(score), 2) AS average_Task_score FROM `gp-db`.taskuploads WHERE jobId = ? GROUP BY TaskId;" ,
            {                
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
            
        );

        const applicant_Tasks_score = await db.query(
            "SELECT ApplicantId, TaskId, score FROM `gp-db`.taskuploads WHERE jobId = ?;", 
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );

        const overallTasks = await db.query(
            "SELECT A.firstName , A.lastName, TU.applicantId, SUM(TU.score) AS overallTasksScore FROM taskuploads AS TU  INNER JOIN applicants AS A ON  TU.applicantId = A.id WHERE TU.jobId = ? GROUP BY TU.applicantId;", 
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );
        // console.log(overallTasks)

        // coding problem

        // 1-) get all coding problem ids to this job
        // const codingProblemIds = await ActiveCodingProblems.findAll({
        //     attributes:['codingProblemId'],
        //     where:{
        //         jobId:jobId
        //     },
        //     raw:true
        // })
        const codingProblems = await db.query(
            `SELECT AC.codingProblemId , CP.title FROM activeCodingProblems AS AC INNER JOIN codingproblembanks AS CP ON AC.codingProblemId = CP.id WHERE AC.jobId = ${jobId};`, 
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );

        
        // console.log(codingProblems)
        // 3-) call function to each coding problem obtained in 1
        // calculateCodingScore(codingProblemIds,testcasesCount)

        const codingProblemsScores = await Promise.all(codingProblems.map( async (cb) => {


            const codingProblemScore = await calculateCodingScore( cb.codingProblemId )

            // console.log(codingProblemScore)
            const score = codingProblemScore.map( (cbs) => {
                const cbScore  = {}
                cbScore[cb.codingProblemId] = {
                    title : cb.title,
                    applicantScore : {
                        applicantId : cbs.id,
                        applicantName : `${cbs.firstName} ${cbs.lastName}`,
                        score : parseFloat((cbs.mark).toPrecision(3))
                    }
                }
                return cbScore;
            })
            return score;
        
        }));

        // console.log(codingProblemsScores);
        // codingProblemsScores = codingProblemsScores.flat();
        const codingProblemsResults = {};
        codingProblemsScores.flat().forEach((cb) => {
            const key = Object.keys(cb)[0];
            const title = Object.values(cb)[0].title;
            const value = Object.values(cb)[0].applicantScore;

            let values
            if( typeof codingProblemsResults[key] == 'undefined' ) {
                values = codingProblemsResults[key] || [];
                values.push( value );
            } else {
                values = codingProblemsResults[key].values;
                // console.log(value)
                // console.log(values)s
                values.push( value );

            }
            codingProblemsResults[key] = {
                title: title,
                values: values
            };
        })

        // console.log(codingProblemsResults);
        
        const avgCodingProblemsScore = []

        for (const [key, value] of Object.entries(codingProblemsResults)) {
            // console.log(`${key}: ${value.values}`);
            let score = 0
            value.values.forEach( (app) => {
                score = score + app.score
            })
            const avgScore = {
                CodingProblemId : parseInt(key),
                average_CodingProblem_score : (score / value.values.length).toPrecision(3)
            }
            avgCodingProblemsScore.push(avgScore)

        }

        for (const [key, value] of Object.entries(codingProblemsResults)) {
            // console.log(`${key}: ${value.values}`);
            codingProblemsResults[key].values = value.values.sort( (a, b)=> {
                if ( a.score < b.score ) {
                    return 1
                }
                else 
                    return -1
            })
        }


        // console.log(avgCodingProblemsScore)

        const codingProblemsApplicants = await CodingProblemStats.findAll({
            attributes:['applicantId', 'codingProblemId'],
            where:{
                jobId:jobId
            },
            raw:true
        })

        // console.log(codingProblemsApplicants);

        const applicantsCodingProblems  = _.groupBy(codingProblemsApplicants, cp => cp.applicantId)
        
        // console.log(applicantsCodingProblems)

        const overAllCodingProblems = {};
        const applicant_CodingProblems_score = {}

        // console.log(codingProblemsResults); 
        for (const [key, value] of Object.entries(applicantsCodingProblems)) {
            const applicantCodingProblemScore = []
            let score = 0
            for (let index = 0; index < value.length; index++) {
                const applicantScore = await codingProblemsResults[value[index].codingProblemId].values.find( applicant => {
                    return applicant.applicantId == key
                }) 
                
                applicantCodingProblemScore.push({
                    codingProblemId: value[index].codingProblemId,
                    score :  applicantScore.score
                })
                score = score + applicantScore.score            
            }
            applicant_CodingProblems_score[key] = applicantCodingProblemScore
            overAllCodingProblems[key] = parseFloat(score.toPrecision(3))
        }
        // console.log(applicant_CodingProblems_score);
        // console.log(overallMCQs)
        // console.log(overallTasks)
        // console.log(overAllCodingProblems)
        const overall = await db.query(
            "SELECT A.firstName , A.lastName, AF.applicantId FROM applyfors AS AF  INNER JOIN applicants AS A ON  AF.applicantId = A.id WHERE AF.jobId = ?;", 
            {
                replacements: [jobId],
                type: db.QueryTypes.SELECT
            }
        );
        
        const overallScore = overall.map((app) => {
            
            const id = app.applicantId

            let mcqs_score = applicant_MCQS_score.filter( (mcq)=> {
                return mcq.applicantId === id 
            })

            mcqs_score = mcqs_score.map( mcq => {
                return {
                    MCQId : mcq.MCQId,
                    score : parseFloat(mcq.score)
                }
            })
            // console.log(mcqs_score)


            const mcq = overallMCQs.find( (mcq) => {
                return mcq.applicantId === id 
            }) 

            let overallMCQsScore = 0
            if(typeof mcq == 'undefined') {
                overallMCQsScore = 0
            } else {
                overallMCQsScore = mcq.overallMCQsScore
            }

            let tasks_score = applicant_Tasks_score.filter( (task)=> {
                return task.ApplicantId === id 
            })

            tasks_score = tasks_score.map( task => {
                return {
                    TaskId : task.TaskId,
                    score : task.score
                }
            })

            const task = overallTasks.find( (task) => {
                return task.applicantId === id 
            }) 


            

            let overallTasksScore = 0

            if(typeof task == 'undefined') {
                overallTasksScore = 0
            } else {
                overallTasksScore = task.overallTasksScore
            }

            
            let overAllCodingProblemsScore = overAllCodingProblems[id]

            if(typeof overAllCodingProblemsScore == 'undefined') {
                overAllCodingProblemsScore = 0
            }


            
            return {
                applicantName: `${app.firstName} ${app.lastName}`,
                applicantId: id,
                overallScore: Number((parseFloat(overallMCQsScore) + parseFloat(overallTasksScore) + overAllCodingProblemsScore).toFixed(2)),
                mcqsScore: mcqs_score,
                tasksScore: tasks_score,
                codingProblemsScore: applicant_CodingProblems_score[id]
            }
        })


        overallScore.sort( (a, b)=> {
                if ( a.overallScore < b.overallScore ) {
                    return 1
                }
                else 
                    return -1
        })
    
        res.send({
            mcqsResults : mcqsResults,
            tasksResults : tasksResults,
            codingProblemsResults : codingProblemsResults,
            applicantsAppliedCount: applicantsApplied,
            avgMCQsScore: average_MCQS_score,
            avgTasksScore: average_Tasks_score,
            avgCodingProblemsScore : avgCodingProblemsScore,
            // overallMCQs: overallMCQs,
            // overallTasks: overallTasks,
            overallScore: overallScore,
            // codingProblemsScores: codingProblemsScores
            // MCQs: mcqs.rows,
            // MCQSCount: mcqs.count,
            // tasks: tasks.rows,
            // tasksCount: tasks.count
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a job
router.delete("/DeleteJob/:id", recruiterAuth, async (req, res) => {
    const JobId = req.params.id;
    try {
        const job = await Job.findByPk(JobId);
        if (job) {
            job.destroy();
            res.send("Job deleted successfully.");
        } else {
            throw new Error("Could not delete that job");
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;
