import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export default function ApplicantPage() {
    const [applicant, setApplicant] = useState({});
    const { ID } = useParams();
    const state = useSelector(state => state);
    useEffect(() => {
        async function fetchData() {
            try {
                const rawResponse = await fetch(
                    `http://localhost:5000/profile/${ID}`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + state.user.userInfo.token
                        }
                    }
                );
                const data = await rawResponse.json();
                console.log(data);
                setApplicant(data);
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchData();
    }, [ID]);

    return (
        <>
            {!applicant ? (
                <h1>loading</h1>
            ) : (
                <div className="card" style={{ width: "50rem", height: "80%" }}>
                    <div className="card-header">Info</div>
                    <div className="list-group list-group-flush">
                        <li className="list-group-item">
                            {" "}
                            <h4
                                className="card-title"
                                style={{ color: "#001233" }}
                            >
                                {applicant.firstName} {applicant.lastName}
                            </h4>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {applicant.userName}
                            </h6>
                            <p className="text-muted">
                                {" "}
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-envelope"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                    </svg>{" "}
                                    <span className="card-subtitle mb-2 text-muted">
                                        {" "}
                                        {applicant.email}{" "}
                                    </span>
                                </div>
                            </p>
                        </li>
                    </div>

                    {applicant.major !== undefined && (
                        <li className="list-group-item">
                            <h4
                                className="card-title"
                                style={{ color: "#001233" }}
                            >
                                Major
                            </h4>
                            <p
                                className="card-text"
                                style={{ color: "#33415c" }}
                            >
                                {" "}
                                {applicant.major}
                            </p>
                        </li>
                    )}

                    {applicant.level !== undefined && (
                        <li className="list-group-item">
                            <h4
                                className="card-title"
                                style={{ color: "#001233" }}
                            >
                                Level
                            </h4>
                            <p
                                className="card-text"
                                style={{ color: "#33415c" }}
                            >
                                {" "}
                                {applicant.level}
                            </p>
                        </li>
                    )}

                    {applicant.yearsOfExperience !== undefined && (
                        <li className="list-group-item">
                            <h4
                                className="card-title"
                                style={{ color: "#001233" }}
                            >
                                Years of Experience
                            </h4>
                            <p
                                className="card-text"
                                style={{ color: "#33415c" }}
                            >
                                {" "}
                                {applicant.yearsOfExperience}
                            </p>
                        </li>
                    )}

                    <li
                        className="list-group-item"
                        style={{ borderBottom: "0px" }}
                    >
                        <h4 className="card-title" style={{ color: "#001233" }}>
                            Qualifications
                        </h4>
                        <div className="row">
                            <div class="column">
                                {" "}
                                <h6 className="md"> Skill</h6>{" "}
                            </div>
                            <div class="column">
                                {" "}
                                <h6 className="md">Level</h6>
                            </div>
                        </div>
                        {applicant.qualifications !== undefined &&
                            applicant.qualifications.map(q => (
                                <div className="row">
                                    <div class="column">
                                        {" "}
                                        <span
                                            className="card-text"
                                            style={{ color: "#33415c" }}
                                        >
                                            {" "}
                                            {Object.keys(q)}
                                        </span>{" "}
                                    </div>
                                    <div class="column">
                                        {Object.values(q) == 1 && (
                                            <span
                                                className="card-text"
                                                style={{ color: "#33415c" }}
                                            >
                                                {" "}
                                                Beginner
                                            </span>
                                        )}
                                        {Object.values(q) == 2 && (
                                            <span
                                                className="card-text"
                                                style={{ color: "#33415c" }}
                                            >
                                                {" "}
                                                Experienced
                                            </span>
                                        )}
                                        {Object.values(q) == 3 && (
                                            <span
                                                className="card-text"
                                                style={{ color: "#33415c" }}
                                            >
                                                {" "}
                                                Advanced
                                            </span>
                                        )}
                                        {Object.values(q) == 4 && (
                                            <span
                                                className="card-text"
                                                style={{ color: "#33415c" }}
                                            >
                                                {" "}
                                                Expert
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        <br></br>
                    </li>
                </div>
            )}
        </>
    );
}
