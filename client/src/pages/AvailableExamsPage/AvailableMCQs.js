import React, { useState, useEffect } from "react";
import { getExamsAction } from "../../redux/actions/exam";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import "./AvailableMCQs";
const AvailableMCQs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExamsAction());
    }, [dispatch]);
    const { MCQs } = useSelector(state => state.exam);
    const { Count } = useSelector(state => state.exam);
    console.log(MCQs);
    if(MCQs!== undefined){
    return (
       
        <div>
            {MCQs.map((m, index) => (
                <ul style={{ listStyle: "none" }}>
                    {" "}
                    <li key={m.id}>
                        <Card topic={m.topic} Count={Count} number={index+1} id={m.id} questions={m.questions}/>{" "}
                    </li>{" "}
                </ul>
            ))}
        </div>
    )}
    else
    return (<div>loading</div>)
};


export default AvailableMCQs;
