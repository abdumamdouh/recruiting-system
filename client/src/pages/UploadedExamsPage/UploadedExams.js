import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getJobExamsAction } from "../../redux/actions/exam";
const UploadedExams = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const jobId = useSelector(state => state.job.id);
    const { MCQs } = useSelector(state => state.uploadedExams);
    const t = 'MCQ'
    useEffect(() => {
        dispatch(getJobExamsAction(jobId));
    }, [dispatch]);
    const handleAssign = id => {
        history.push(`/dashboard/uploadedexams/assignapplicants/${t}/${id}`);
    };
    const handleAssignCanidate = id => {
        history.push(`/dashboard/uploadedexams/assigncandidates/${t}/${id}`);
    };
    if (MCQs !== undefined) {
        return (
            <div>
                {MCQs.map((m, index) => (
                    <ul style={{ listStyle: "none" }}>
                        {" "}
                        <li key={m.MCQId}>
                            <div class="row" style={{ marginTop: "10px" }}>
                                <div style={{ marginLeft: "40px" }}> Exam: {m.MCQ.title}</div>
                                <div class="column">
                                    {" "}
                                    <button
                                        style={{ marginLeft: "20px" }}
                                        className="btn btn-primary"
                                        onClick={() => handleAssign(m.MCQId)}
                                    >
                                        Assign Exam to Applicants
                                    </button>
                                </div>
                                <div class="column">
                                    {" "}
                                    <button
                                        style={{ marginLeft: "20px" }}
                                        className="btn btn-primary"
                                        onClick={() => handleAssignCanidate(m.MCQId)}
                                    >
                                        Assign Exam to Candidates
                                    </button>
                                </div>
                            </div>{" "}
                        </li>{" "}
                    </ul>
                ))}
            </div>
        );
    } else return <div>loading</div>;
};

export default UploadedExams;
