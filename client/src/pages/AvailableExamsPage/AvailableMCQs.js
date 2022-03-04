import React, { useState, useEffect } from 'react';
import {getExamsAction} from '../../redux/actions/exam'
import { useDispatch, useSelector } from "react-redux";
const AvailableMCQs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExamsAction());
    }, [dispatch]);
    return (
        <div>
            hello
        </div>
    );
}

export default AvailableMCQs;
