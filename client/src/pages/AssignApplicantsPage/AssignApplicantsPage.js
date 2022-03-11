import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {assignExamAction} from '../../redux/actions/exam'
 

const AssignApplicantsPage = () => {
    const dispatch = useDispatch();
    const job = useSelector(state=>state.job)
    const jobId= job.id
    const [selectionModel, setSelectionModel] = React.useState([]);
    //mcqId
    const { id } = useParams();
    const handleApplicants=(params)=>{
        console.log(job.applicants)
        console.log('r', rows)
        console.log(params.id)
        console.log('roww', params.row)
        console.log('ss', id)
    }
    const rows = [...job.applicants];
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'userName', headerName: 'User Name', width: 130 },
        { field: 'score', headerName: 'Screening result', width: 130 },
    //     { field: 'action', headerName: 'Action', width: 130,
    //     renderCell:(params)=>{
    //         return(
    //             <button className="btn btn-primary" onClick={()=>handleApplicants(params)}>Assign Exam</button>
    //         )
    //     }
    // },
      ];
    const handleAllApplicants = ()=>{
        console.log(job.applicants)
        console.log('selection', selectionModel)
        console.log('jobID',jobId)
        dispatch(assignExamAction(jobId,id,selectionModel))
    }
    return (
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
    setSelectionModel(newSelectionModel);
  }}
  selectionModel={selectionModel}
      />
        <button className="btn btn-primary" style={{marginTop: '20px'}} onClick={handleAllApplicants}> Assign Exam to  Applicants</button>
    </div>
    );
}

export default AssignApplicantsPage;
