import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import moment from "moment";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
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
    const {userInfo} = useSelector(state => state.user)
    const [showTaskMark, setShowTaskMark] = useState(false);
    const [feedBack, setFeedBack] = useState("");
    const [ApplicantId,setApplicantId]=useState()
    const [score,setScore] = useState(0)
    const download = (event, uploadedTask, type) => {
        const a = event.target;
        console.log(event.target);
        const array = new Uint8Array(uploadedTask);
        const blob = new Blob([array], { type: type.mime });
        const url = window.URL.createObjectURL(blob);
        a.setAttribute("href", url);
        //set extension
        a.setAttribute("download", `submission.${type.ext}`);
    };
    const setMark = (id) => {
        setShowTaskMark(true);
        setApplicantId(id)
    };
    const submitMark = async() => {
        
        const Marks = [{
            applicantId:ApplicantId,
            score: score,
            feedback: feedBack
        }];
        const body ={JobId,TaskId,Marks}
        try {
            console.log(userInfo.token);
            const rawResponse = await fetch(`http://localhost:5000/setTaskMark`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                },
                body: JSON.stringify(body)
            });
            const data = await rawResponse;
            console.log(data);
            //TODO: condition for success
            if(data.status ===200){ showSuccessMessage();}
            setShowTaskMark(false)
            setScore(0)
            setFeedBack('')
        } catch (error) {
            console.error("Error:", error);
        }
        console.log(JobId)
        console.log(TaskId)
        console.log(Marks);
        
    }
    let data =
        submissions.loading !== true &&
        submissions.loading !== false &&
        Object.keys(submissions).length !== 0
            ? submissions.map((s, index) => ({
                  id: s.ApplicantId,
                  createdAt: moment
                      .parseZone(s.createdAt)
                      .utc("-02:00")
                      .format("D[/]M[/]YYYY,h:mm a"),
                  feedback: s.feedback !== null ? s.feedback : "_______",
                  score: s.score !== null ? s.score : "_______",
                  uploadedTask: s.uploadedTask.data,
                  type: s.type
              }))
            : null;
    console.log("arr", data);

    const rows = data !== null ? [...data] : null;
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const columns = [
        { field: "id", headerName: "ID", width: 40 },
        { field: "createdAt", headerName: "Submitted At", width: 160 },
        { field: "score", headerName: "Score", width: 70 },
        { field: "feedback", headerName: "Feedback", width: 130 },
        {
            field: "action",
            headerName: "Submissions",
            width: 160,
            renderCell: params => {
                return (
                    <a
                        href="#"
                        onClick={event =>
                            download(
                                event,
                                params.row.uploadedTask,
                                params.row.type
                            )
                        }
                    >
                        Download Submissions
                    </a>
                );
            }
        },
        {
            field: "setScore",
            headerName: "Mark",
            width: 100,
            renderCell: params => {
                return (
                    <button className="btn btn-primary" onClick={()=>setMark(params.row.id)}>
                        set Mark
                    </button>
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
                        message="Mark is Added successfully!"
                    />
                )}
                <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1 }}>
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
                </div>
                {showTaskMark && (
                    <div>
                        <div>
                            <label>
                                {" "}
                                Add Score and feedback for task submissions
                            </label>
                        </div>
                        <label>Score</label>
                        <div className="position-relative">
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Score"
                                type="number"
                                
                                value={score}
                                onChange={e => setScore(e.target.value)}
                            />
                        </div>
                        <label>Feedback</label>
                        <div className="position-relative">
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Feedback"
                                fullWidth
                                multiline
                                maxRows={4}
                                value={feedBack}
                                onChange={e => setFeedBack(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary mt-2" onClick={submitMark}>
                        Add Mark
                    </button>
                    </div>
                )}
            </div>
        );
    } else
        return (
            <Stack spacing={1}>
                <Skeleton variant="text" />
                <Skeleton variant="rectangular" width={210} height={210} />
                <Skeleton variant="rectangular" width={210} height={210} />
            </Stack>
        );
};

export default TaskReviewPage;
