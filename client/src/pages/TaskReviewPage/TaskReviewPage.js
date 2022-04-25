import React,  { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getTaskSubmissionsAction} from '../../redux/actions/task'
const TaskReviewPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const job = useSelector(state=>state.job)
    const JobId= job.id
    const TaskId = id

    useEffect(() => {
        dispatch(getTaskSubmissionsAction(TaskId,JobId));
    }, [dispatch]);
    return (
        <div>
            jdjdjjd
        </div>
    );
}

export default TaskReviewPage;
