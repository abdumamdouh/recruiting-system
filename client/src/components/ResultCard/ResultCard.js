import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ResultCard({ title, values }) {
    const history = useHistory();
    const showResults = () => {
        console.log(values);
    };
    return (
        <div className="container">
            <div class="card" style={{ marginBottom: "10px" }}>
                <div class="card-header">{title}</div>
                <div class="card-body">
                    {/* <h5 class="card-title">{title}</h5> */}
                    <p class="card-text">view applicants' results</p>

                    <div>
                        <button
                            href="#"
                            className="mt-3 btn btn-primary"
                            onClick={showResults}
                        >
                            Show Results
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultCard;
