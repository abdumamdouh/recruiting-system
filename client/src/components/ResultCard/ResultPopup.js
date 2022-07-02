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
function ResultPopup({ setOpenResult, values }) {
    const rows = [...values];
    const columns = [
        { field: "applicantName", headerName: "Applicant Name", width: 150 },
        { field: "score", headerName: "Score  (%)", width: 80 }
    ];
    return (
        <div className="customize-exam-overlay">
            <div className="customize-exam-popupBackground">
                <div className="customize-exam-popupContainer">
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
                            getRowId={row => row.applicantName}
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
