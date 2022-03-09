import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getJobExamsAction} from '../../redux/actions/exam'
const UploadedExams = () => {
    const dispatch = useDispatch();
    const jobId = useSelector(state => state.job.id);
    const { MCQs } = useSelector(state => state.uploadedExams);
    useEffect(() => {
        dispatch(getJobExamsAction(jobId));
    }, [dispatch]);
    const handleAssign=()=>{
        console.log('ay 7aga')
    }
    if(MCQs!== undefined){
        return (
           
            <div>
                {MCQs.map((m, index) => (
                    <ul style={{ listStyle: "none" }}>
                        {" "}
                        <li key={m.MCQId}>
                           {m.MCQ.topic}
                           <button style={{ marginLeft: "20px" }} className="btn btn-primary" onClick={handleAssign}>Assign Exam to Applicants</button>
                        </li>{" "}
                    </ul>
                ))}
            </div>
        )}
        else
        return (<div>loading</div>)
}

export default UploadedExams;
