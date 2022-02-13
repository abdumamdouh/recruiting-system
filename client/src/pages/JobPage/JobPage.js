import React from "react";
import Job from "../../components/Job/Job";

//TODO: replace the jobObject with the data from BE
const jobObject = {
    description: "Backend Engineer",
    workPlaceType: "On Site",
    employmentType: "Full Time",
    title: "Engineer",
    yearsOfExperience: 3,
    careerLevel: "junior"
};

export default function JobPage() {
    return (
        <>
            {/* TODO: add prop for applicant or recuriter and add coditional rendering */}
            <Job />
        </>
    );
}
