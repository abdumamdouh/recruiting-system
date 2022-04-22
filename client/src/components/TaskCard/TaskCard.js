import React from "react";

function TaskCard({ description, number }) {
    return (
        <div>
            <div class="card">
                <div class="card-header">Task {number + 1}</div>
                <div class="card-body">
                    <h5 class="card-title">Description:</h5>
                    <p class="card-text">{description}</p>
                    <a href="#" class="btn btn-primary">
                        choose Task
                    </a>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
