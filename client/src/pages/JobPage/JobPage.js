import React from "react";
import Job from "../../components/Job/Job";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//plain js for testing
const jobObject = {
    description:
        "We're looking for a Mid-Level Front End UI Engineer to join a company in the Purpose Jobs network. Purpose Jobs is a recruiting marketplace connecting top talent with purpose-driven companies. We are focused on the Midwest startup & tech ecosystem.",
    workPlaceType: "Remote",
    place: "US",
    employmentType: "Full Time",
    title: "Mid-Level Front End UI Engineer",
    yearsOfExperience: 2,
    careerLevel: "Junior",
    companyName: "Valeo",
    companyDescription:
        "Valeo is the #1 startup community in the Midwest. We connect top talent with purpose-driven startups based on values, experience and culture contribution.",
    numOfApplicants: 75,
    period: 3,
    employees: 29
};

//ex from the object from the state

// const jobb = {
//     careerLevel: "Mid-Level",
//     createdAt: "2022-02-14T13:37:34.000Z",
//     employmentType: "fullTime",
//     id: 1,
//     title: "Mid-Level Front End UI Engineer",
//     workPlaceType: "Remote"
// };

export default function JobPage() {
    //router param
    const { ID } = useParams();
    // console.log(ID);

    //state
    const state = useSelector((state) => state);
    const { Jobs } = state.jobs;

    // filter the jobs array based on the id of the job
    // eslint-disable-next-line eqeqeq
    const job = Jobs.filter((job) => job.id == ID);
    // console.log(state);
    // console.log(job[0]);

    return (
        <>
            {job.length === 0 ? <h1>404 - Not Found</h1> : <Job job={job[0]} />}
        </>
    );
}
