import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function TaskCard({ description, number,id,title }) {
    const history = useHistory();
    const TaskId = id
    const JobId = useSelector(state => state.job.id);
    const t ='task'
    const handleAssign = id => {
        console.log("ay 7aga");
        history.push(`/dashboard/uploadedexams/assignapplicants/${t}/${id}`);
    };
    const handleAssignCanidate = id => {
        console.log("ay 7aga");
        history.push(`/dashboard/uploadedexams/assigncandidates/${t}/${id}`);
    };
    const handleReviewSubmission = id => {
        console.log("ay 7aga");
        history.push(`/dashboard/uploadedexams/reviewsubmissions/${id}`);
    };
    return (
        <div>
            <div class="card">
                <div class="card-header">Task {number + 1}</div>
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{description}</p>
                    <button href="#" className="btn btn-primary"
                     onClick={() => handleAssign(id)}>
                       Assign Task to Applicants
                    </button>
                    <button href="#" className=" btn btn-primary"
                    style={{marginRight: '5px', marginTop: '7px'}}
                    onClick={() => handleAssignCanidate(id)}>
                       Assign Task to Candidates
                    </button>
                   <div>
                  
                   <button href="#" className="mt-3 btn btn-primary"
                    onClick={() => handleReviewSubmission(id)}>
                      Review Task Submissions
                    </button>
                   </div>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
