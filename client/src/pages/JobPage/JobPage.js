import React from "react";
import Job from "../../components/Job/Job";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//TODO: replace the jobObject with the data from BE
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

export default function JobPage() {
    //state
    const state = useSelector((state) => state);
    const { jobs } = state;
    console.log(state);

    //router param
    const { ID } = useParams();
    console.log(ID);

    return (
        <>
            <Job job={jobObject} />
        </>
    );
}
