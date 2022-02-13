import React from "react";
import Job from "../../components/Job/Job";

//TODO: replace the jobObject with the data from BE
const jobObject = {
    description: "Frontend Engineer",
    workPlaceType: "Remote",
    place: "US",
    employmentType: "Full Time",
    title: "Mid-Level Front End UI Engineer",
    yearsOfExperience: 3,
    careerLevel: "junior",
    companyName: "Valeo",
    companyDescription:
        "Purpose Jobs is the #1 startup community in the Midwest/n/n We connect top talent with purpose-driven startups based on values, experience and culture contribution.",
    numOfApplicants: 75,
    period: 3
};

export default function JobPage() {
    return (
        <>
            {/* TODO: add prop for applicant or recuriter and add coditional rendering */}
            <Job job={jobObject} />
        </>
    );
}
