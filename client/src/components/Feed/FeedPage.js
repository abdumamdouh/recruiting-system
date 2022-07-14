import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { Snackbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import JobPost from "./JobPost";
import classes from "./Feed.module.scss";
import ReactPaginate from "react-paginate";
import MuiAlert from "@mui/material/Alert";
import { getJobsAction, getRecruiterJobsAction } from "../../redux/actions/jobs";
import { getApplicantProfileAction } from "../../redux/actions/user";

const Feed = () => {
    const dispatch = useDispatch();
    const {type} = useSelector((state) => state.user.userInfo)
    console.log(type)
    useEffect(() => {
        if (localStorage.getItem("message")) {
            setOpen(true);
        }
        if(type === 'Applicant')
        {   dispatch(getJobsAction(1))}
         else
        {dispatch(getRecruiterJobsAction(1))}
        dispatch(getApplicantProfileAction());
    }, [dispatch]);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        localStorage.removeItem("message");
    };
    const Jobs = useSelector((state) => state.jobs.Jobs);
    const { Count } = useSelector((state) => state.jobs);
    //console.log('cc',Count)
    // const Count = 0;

    const [pageNumber, setPageNumber] = useState(1);

    // const pagesVisited = pageNumber*jobsPerPage

    const displayJobs = () => {};
    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
        dispatch(getJobsAction(selected + 1));
    };
    if (Jobs !== undefined) {
        return (
            <>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        {localStorage.getItem("message")}
                    </Alert>
                </Snackbar>
                {Jobs.length == 0 && <div className= "h-100 d-flex align-items-center justify-content-center"> <h1> There is no posted jobs yet</h1></div> }
                <div className={classes.list}>
                    {Jobs.map((job) => (
                        <JobPost job={job} />
                    ))}
                    <br />

                    {Jobs.length > 4 && <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={Math.ceil(Count / 10)}
                        onPageChange={changePage}
                        containerClassName={classes.paginationBttns}
                        previousLinkClassName={classes.previousBttn}
                        nextLinkClassName={classes.nextBttn}
                        disabledClassName={classes.paginationDisabled}
                        activeClassName={classes.paginationActive}
                    />}
                    
                </div>
            </>
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

export default Feed;
