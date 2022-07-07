import React, { useState } from "react";
import "../QuestionBank/CustomizeExamPopup.scss";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { pickExamAction } from "../../redux/actions/exam";
function ResultPopup({ setOpenResult, results }) {
    const data = results.overallScore.map(
        ({
            applicantId,
            applicantName,
            codingProblemsScore,
            mcqsScore,
            tasksScore,
            overallScore
        }) => {
            const codingProblems = codingProblemsScore.reduce((obj, itr) => {
                obj[results.codingProblemsResults[itr.codingProblemId].title] =
                    itr.score;
                return obj;
            }, {});
            const MCQs = mcqsScore.reduce((obj, itr) => {
                obj[results.mcqsResults[itr.MCQId].title] = itr.score;
                return obj;
            }, {});
            const tasks = tasksScore.reduce((obj, itr) => {
                obj[results.tasksResults[itr.TaskId].title] = itr.score;
                return obj;
            }, {});
            return {
                id: applicantId,
                name: applicantName,
                ...MCQs,
                ...codingProblems,
                ...tasks,
                overallScore
            };
        }
    );
    const rows = [...data];

    let keys = [];
    let col = [];
    if (data) keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
        col.push({ key: Object.keys(data)[i], name: data[i] });
    }
    let columns2 = [];
    let columns = [];
    columns2 = col.map((d) => ({ field: d.name, width: 80 }));

    const arrayofFields = Object.keys(columns2[0].field);
    const b = arrayofFields.slice(1);
    // columns = b.map((d) => ({ field: d }));
    columns = b.map((key) => {
        if (key === "name") {
            return { field: "name", headerName: "Applicant name" };
        } else if (key === "overallScore") {
            return { field: "overallScore", headerName: "Total score" };
        }
        return { field: key };
    });
    console.log(columns);

    return (
        <div className="customize-exam-overlay">
            <div className="customize-exam-popupBackground">
                <div
                    className="customize-exam-popupContainer"
                    style={{ width: "700px" }}
                >
                    <div className="customize-exam-titleCloseBtn">
                        <button
                            onClick={() => {
                                setOpenResult(false);
                            }}
                        >
                            x
                        </button>
                    </div>
                    <div className="body">
                        <DataGrid
                            style={{ height: "60vh", width: "100%" }}
                            getRowId={(row) => row.id}
                            rows={rows}
                            columns={columns}
                            pageSize={50}
                            rowsPerPageOptions={[10]}
                        />
                    </div>

                    <div className="footer">
                        <button
                            onClick={() => {
                                setOpenResult(false);
                            }}
                            id="cancelBtn"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultPopup;
