import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GaugeChart from "react-gauge-chart";
import ResultPopup from "./ResultPopup";
function ResultCard({ title, avg, values }) {
    const history = useHistory();
    const [openResult, setOpenResult] = useState(false);
    const showResults = () => {
        console.log(values);
        setOpenResult(true);
    };
    return (
        <div className="container">
            <div class="card" style={{ marginBottom: "10px" }}>
                <div class="card-header">{title}</div>
                <div class="card-body">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignContent: "center",
                            justifyContent: "center"
                        }}
                    >
                        <h5 class="card-title">Average Score</h5>
                        <GaugeChart
                            id="gauge-chart"
                            textColor="#333"
                            nrOfLevels={3}
                            arcsLength={[0.5, 0.3, 0.2]}
                            colors={["#EA4228", "#F5CD19", "#5BE12C"]}
                            needleColor="#999"
                            percent={Number(avg) / 100}
                            arcPadding={0.02}
                            hideText
                        />
                        <span
                            style={{
                                fill: "rgb(51, 51, 51)",
                                fontSize: "24.5455px",
                                alignSelf: "center"
                            }}
                        >{`${Number(avg)}/100`}</span>
                    </div>
                    {/* <p class="card-text">View applicants' results</p> */}

                    <div>
                        <button
                            href="#"
                            className="mt-3 btn btn-primary"
                            onClick={showResults}
                        >
                            Show Results
                        </button>
                    </div>
                    {openResult && (
                        <ResultPopup
                            setOpenResult={setOpenResult}
                            values={values}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResultCard;
