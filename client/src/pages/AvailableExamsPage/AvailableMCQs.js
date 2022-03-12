import React, { useState, useEffect } from "react";
import { getExamsAction } from "../../redux/actions/exam";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import "./AvailableMCQ.scss";
import ReactPaginate from "react-paginate";
 
const AvailableMCQs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExamsAction(1));
    }, [dispatch]);
    const { MCQs } = useSelector(state => state.exam);
    const { Count } = useSelector(state => state.exam);
    const mcqCount = MCQs.length 

    const [pageNumber, setPageNumber] = useState(1);

    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
        dispatch(getExamsAction(selected + 1));
    };
    console.log(MCQs);
    if(MCQs!== undefined){
    return (
       
        <div className="card-container">
            {MCQs.map((m, index) => (
                <ul style={{ listStyle: "none",padding:"10px", margin:"10px auto"}} className="examul">
                    {" "}
                    <li key={m.id} style={{marginLeft: '30px'}} className="examli">
                        <Card topic={m.topic} Count={Count} number={index+1} id={m.id} questions={m.questions}/>{" "}
                    </li>{" "}
                </ul>
            ))}

                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={Math.ceil(mcqCount / 10)}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />  
        </div>
    )}
    else
    return (<div>loading</div>)
};


export default AvailableMCQs;
