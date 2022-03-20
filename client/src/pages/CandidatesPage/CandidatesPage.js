import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Message from "../../components/modal/Message";
const CandidatesPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const job = useSelector(state => state.job);
    const jobId = job.id;
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    //mcqId
    const { id } = useParams();

    const handleApplicantRedirect = id => {
        history.push(`/dashboard/applicant/${id}`);
    };
    const copyApplicants =
        job.applicants !== undefined ? [...job.applicants] : null;
    copyApplicants.length = Math.ceil(job.applicants.length / 2);
    const filteredApplicants = copyApplicants.filter(
        applicant => applicant.score !== 0
    );

    const rows = [...filteredApplicants];
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "userName", headerName: "User Name", width: 130 },
        { field: "score", headerName: "Screening result %", width: 140 },
        {
            field: "action",
            headerName: "Profile",
            width: 130,
            renderCell: params => {
                return (
                    // <button className="btn btn-primary" onClick={()=> handleApplicantRedirect(
                    //     params.id
                    // )}>show profile</button>
                    <Button
                        variant="text"
                        style={{ color: "black" }}
                        onClick={() => handleApplicantRedirect(params.id)}
                        endIcon={<SendIcon />}
                    >
                        profile
                    </Button>
                );
            }
        }
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            {modalOpen && (
                <Message
                    setOpenModal={setModalOpen}
                    message="Assigned successfully!"
                />
            )}
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={50}
                rowsPerPageOptions={[10]}
                onSelectionModelChange={newSelectionModel => {
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
            />
        </div>
    );
};

export default CandidatesPage;
