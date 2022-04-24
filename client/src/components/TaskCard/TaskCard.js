import React from "react";
import { useHistory } from "react-router-dom";
function TaskCard({ description, number }) {
    const history = useHistory();
    return (
        <div>
            <div class="card">
                <div class="card-header">Task {number + 1}</div>
                <div class="card-body">
                    <h5 class="card-title">Description:</h5>
                    <p class="card-text">{description}</p>
                    <button href="#" className="btn btn-primary">
                       Assign Task to Applicants
                    </button>
                   <div>
                   <button href="#" className="mt-3 btn btn-primary">
                       Assign Task to Candidates
                    </button>
                   </div>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
