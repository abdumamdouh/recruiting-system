import React, { useState, useEffect } from "react";
import { getExamsAction } from "../../redux/actions/exam";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import "./AvailableMCQ.scss";
import ReactPaginate from "react-paginate";
 
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
       
        <div className="container card-container">
            {MCQs.map((m, index) => (
                <ul style={{ listStyle: "none" }} className="examul">
                    {" "}
                    <li key={m.id} style={{marginLeft: '30px'}} className="examli">
                        <Card topic={m.topic} Count={Count} number={index+1} id={m.id} questions={m.questions}/>{" "}
                    </li>{" "}
                </ul>
            ))}

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
    )}
    else
    return (<div>loading</div>)
};


export default AvailableMCQs;
