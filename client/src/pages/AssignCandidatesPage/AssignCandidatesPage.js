import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { assignExamAction } from "../../redux/actions/exam";

import { useHistory } from "react-router-dom";
import Message from "../../components/modal/Message";
const CandidatesPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const job = useSelector(state => state.job);
    const user = useSelector(state=>state.user)
    const jobId = job.id;
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    //mcqId
    const { id } = useParams();
    const {t} = useParams()
    const handleApplicants = params => {
        console.log(job.applicants);
        console.log("r", rows);
        console.log(params.id);
        console.log("roww", params.row);
        console.log("ss", id);
    };
    const handleApplicantRedirect = (id) => {
        history.push(`/dashboard/applicant/${id}`);
    };
    const copyApplicants =
        job.applicants !== undefined ? [...job.applicants] : null;
    copyApplicants.length = Math.ceil(job.applicants.length / 2);
    const filteredApplicants = copyApplicants.filter(
        applicant => applicant.score !== 0
    );
    const handleAssignTask = async()=>{
        let task={jobId:jobId, task:{ TaskId: id,applicants:selectionModel}}
        const rawResponse = await fetch(
            `http://localhost:5000/assignTasks`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.userInfo.token
                },
                body: JSON.stringify(task)
            }
        );
        const data = await rawResponse;
        if(data.status ===200){
            showSuccessMessage()
        }
    }
    const handleAssignProblem = async()=>{
        let codingProblem={jobId:jobId, codingProblem:{ codingProblemId: id,applicants:selectionModel}}
        const rawResponse = await fetch(
            `http://localhost:5000/assignTasks`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.userInfo.token
                },
                body: JSON.stringify(codingProblem)
            }
        );
        const data = await rawResponse;
        if(data.status ===200){
            showSuccessMessage()
        }
    }
    const rows = [...filteredApplicants];
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "userName", headerName: "User Name", width: 130 },
        { field: "score", headerName: "Screening result", width: 130 },
            { field: 'action', headerName: 'Action', width: 130,
            renderCell:(params)=>{
                return(
                    <button className="btn btn-primary" onClick={()=> handleApplicantRedirect(
                        params.id
                    )}>show profile</button>
                
                    
                )
            }
        },
    ];
    const showSuccessMessage = () => {
        setModalOpen(true);
    };
    const handleAllApplicants = () => {
        dispatch(
            assignExamAction(jobId, id, selectionModel, showSuccessMessage)
        );
    };
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
                checkboxSelection
                onSelectionModelChange={newSelectionModel => {
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
            />
  
           {t === 'MCQ' &&  <button
                className="btn btn-primary"
                style={{ marginTop: "20px" }}
                onClick={handleAllApplicants}
            >
                {" "}
                Assign MCQ to Candidates
            </button>}
           {t === 'task' &&  <button className="btn btn-primary" style={{marginTop: '20px',marginLeft: '20px'}} onClick={handleAssignTask}> Assign Task to  Candidates</button>}
           {t === 'codingProblem' &&  <button className="btn btn-primary" style={{marginTop: '20px',marginLeft: '20px'}} onClick={handleAssignProblem}> Assign Problem to  Candidates</button>}
        </div>
    );
};

export default CandidatesPage;
