import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const CodingProblemView = (props) => {

    const id =useParams('id')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch();
        // console.log("execcc");
    }, [dispatch]);

    console.log(id)




return(

    <div>
       <h3></h3>
    </div>






)

}

export default CodingProblemView ;