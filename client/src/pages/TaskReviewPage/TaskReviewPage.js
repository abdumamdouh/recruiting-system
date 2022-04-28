import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { getTaskSubmissionsAction } from "../../redux/actions/task";
import Message from "../../components/modal/Message";
const TaskReviewPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const job = useSelector(state => state.job);
    const JobId = job.id;
    const TaskId = id;
    const submissions = useSelector(state => state.taskSubmissions);
    const download = (event,uploadedTask,type) => {
        const a = event.target;
        console.log(event.target) 
        const array = new Uint8Array(uploadedTask);
        const blob = new Blob([array]  , {type: type.mime}  );
        const url = window.URL.createObjectURL(blob);
        a.setAttribute("href", url);
        //set extension
        a.setAttribute("download", `helper.${type.ext}`);
    };
    let data =
        (submissions.loading !== true &&  Object.keys(submissions).length !== 0)
            ? submissions.map((s, index) => ({
                  id: s.ApplicantId,
                  createdAt:  moment.parseZone(s.createdAt)
                    .utc("-02:00")
                    .format("D[/]M[/]YYYY,h:mm a"),
                  feedback: s.feedback !== null ? s.feedback : "_______",
                  score: s.score!== null ? s.score: "_______",
                  uploadedTask: s.uploadedTask.data,
                    type: s.uploadedTask.type
              }))
            : null;
    console.log("arr", data);
   
    const rows = data !== null ? [...data] : null;
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "createdAt", headerName: "Submitted At", width: 160 },
        { field: "score", headerName: "Score", width: 130 },
        { field: "feedback", headerName: "Feedback", width: 130 },
        {
            field: "action",
            headerName: "Action",
            width: 130,
            renderCell: params => {
                console.log(params)
                return (
                    <a href="#" onClick={(event)=>download(event,params.row.uploadedTask,params.row.type)}>
                    Download helper files
                </a>
                );
            }
        }
    ];
    const showSuccessMessage = () => {
        setModalOpen(true);
    };
    useEffect(() => {
        dispatch(getTaskSubmissionsAction(JobId, TaskId));
    }, [dispatch]);
    if (rows !== null) {
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
    } else return <div> hahah</div>;
};

export default TaskReviewPage;
