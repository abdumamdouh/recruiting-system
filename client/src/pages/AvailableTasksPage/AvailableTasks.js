import React, { useState, useEffect } from "react";
import { getTaskAction } from "../../redux/actions/task";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../../components/TaskCard/TaskCard";
import "./AvailableTasks.scss";
import ReactPaginate from "react-paginate";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
const AvailableTasks = () => {
    const {id} = useSelector(state => state.job)
    console.log('jobid', id)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTaskAction(id));
    }, [dispatch]);
    const { tasks } = useSelector(state => state);

    // const { Count } = useSelector(state => state.exam);

    const [pageNumber, setPageNumber] = useState(1);

    // const changePage = ({ selected }) => {
    //     setPageNumber(selected + 1);
    //     dispatch(getExamsAction(selected + 1));
    // };

    if (Object.entries(tasks).length !== 0 && tasks!== undefined && tasks.relatedToThisJob!== undefined && tasks.createdPrevByYou!== undefined) {
        const {relatedToThisJob } = tasks
        console.log('related', relatedToThisJob)
        const {createdPrevByYou} = tasks
        return (
            <div>
            <h6>Tasks Related to this Job</h6>
                <div className="card-container">
                    {relatedToThisJob.map((m, index) => (
                        <ul
                            style={{
                                listStyle: "none",
                                padding: "10px",
                                margin: "10px auto"
                            }}
                            className="examul"
                        >
                            {" "}
                            <li
                                key={index}
                                style={{ marginLeft: "30px" }}
                                className="examli"
                            >
                                <TaskCard
                                    id={m.id}
                                    description={m.description}
                                    title={m.title}
                                    number={index}
                                />{" "}
                                {/* <TaskCard  Count={Count} number={(pageNumber-1)*4+(index+1)} id={m.id} owned={m.recruiterId == RecruiterId? true:false} Rec={RecruiterId} questions={m.questions}/>{" "} */}
                            </li>{" "}
                        </ul>
                    ))}
                </div>
            <h6>Tasks Created Previously by you </h6>
                <div className="card-container">
                    {createdPrevByYou.map((m, index) => (
                        <ul
                            style={{
                                listStyle: "none",
                                padding: "10px",
                                margin: "10px auto"
                            }}
                            className="examul"
                        >
                            {" "}
                            <li
                                key={index}
                                style={{ marginLeft: "30px" }}
                                className="examli"
                            >
                                <TaskCard
                                    id={m.id}
                                    description={m.description}
                                    title={m.title}
                                    number={index}
                                />{" "}
                                {/* <TaskCard  Count={Count} number={(pageNumber-1)*4+(index+1)} id={m.id} owned={m.recruiterId == RecruiterId? true:false} Rec={RecruiterId} questions={m.questions}/>{" "} */}
                            </li>{" "}
                        </ul>
                    ))}
                </div>
                {/* <div className="footer">
        <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={Math.ceil(Count/4)}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />  
        </div> */}
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

export default AvailableTasks;
