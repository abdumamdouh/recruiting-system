import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import classes from "./QuestionBank.module.scss"
import Question from "./Question"
import ReactPaginate from "react-paginate";

const QuestionBank = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getJobsAction(1));
    // }, [dispatch]);

    const Jobs = useSelector(state => state.jobs.Jobs);
    const { Count } = useSelector(state => state.jobs);
    //console.log('cc',Count)
    // const Count = 0;
    const questions=[1,2,3,4,5,6,7,8,9,10]
    const [pageNumber, setPageNumber] = useState(1);


    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
       // dispatch(getJobsAction(selected + 1));
    };
    if (Jobs !== undefined) {
        return (
            <div className={classes.list}>
                {questions.map(question => (
                    <Question question={question} />
                ))}
                <br />
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={Math.ceil(Count / 10)}
                    onPageChange={changePage}
                    containerClassName={classes.paginationBttns}
                    previousLinkClassName={classes.previousBttn}
                    nextLinkClassName={classes.nextBttn}
                    disabledClassName={classes.paginationDisabled}
                    activeClassName={classes.paginationActive}
                />
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

export default QuestionBank;
