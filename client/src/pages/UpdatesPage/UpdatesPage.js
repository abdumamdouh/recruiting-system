import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./UpdatePage.scss";

const UPDATES = [
    {
        examTopic: "nigga",
        recruiter: "elsisi",
        jobTitile: "zbal",
        img: "https://a.allegroimg.com/original/115895/b594fa094f3288495c442ac555f5/KLOCKI-HAM-BMW-T-E60-E61-VALEO-Typ-samochodu-Samochody-osobowe"
    }
];

const UpdatesPage = (props) => {
    //slice of state for udpates
    const [updates, setUpdates] = useState([]);

    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUpdates = async () => {
            console.log("alo");
            try {
                const response = await fetch(
                    `http://localhost:5000/assessments`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + userInfo.token
                        }
                    }
                );
                const data = await response.json();
                console.log(data);
                setUpdates(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (userInfo.hasOwnProperty("hasAssessment")) fetchUpdates();
    }, []);

    return (
        <div className="c">
            {!userInfo.hasOwnProperty("hasAssessment") ? (
                <h3 className="hh3">You don't have any Assessment yet.</h3>
            ) : (
                <>
                    <h3 className="hh3">Your Assessments</h3>
                    <div className="updates">
                        {updates.map((update) => (
                            <div className="update">
                                <img
                                    src="https://a.allegroimg.com/original/115895/b594fa094f3288495c442ac555f5/KLOCKI-HAM-BMW-T-E60-E61-VALEO-Typ-samochodu-Samochody-osobowe"
                                    alt="logo"
                                    className="immg"
                                />
                                <p>
                                    <strong>Title:</strong> {update.title}{" "}
                                    <br></br>
                                    <strong>Company:</strong> {update.company}{" "}
                                    <br></br>
                                    <strong>Description:</strong>{" "}
                                    {update.description} <br></br>
                                    <div className="mcq">
                                        <strong>MCQs:</strong>
                                        <ul class="nav flex-row goleft">
                                            {update.MCQ.map((obj) => (
                                                <li
                                                    key={obj.topic}
                                                    class="nav-item"
                                                >
                                                    <a
                                                        class="nav-link active"
                                                        rel="popover"
                                                        href="#"
                                                        data-bs-content="dsadasdas"
                                                        data-trigger="hover"
                                                    >
                                                        {obj.topic}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* <strong>Expiry Date:</strong> 25/3/2021 <br></br> */}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default UpdatesPage;
