import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCodingProblemByIdAction } from "../../redux/actions/codingProblemBank";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const CodingProblemView = (props) => {

    const {id} =useParams('id')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCodingProblemByIdAction(id));
        // console.log("execcc");
    }, [dispatch]);


    const { selected } = useSelector((state) => state.codingProblems);
    console.log(id)






if(selected!==undefined){

    return(
    
        <div>
           <h3>{selected.name}</h3>
        </div>
    
    
    
    
    
    
    )
    
    }
    else
    return (
        <Stack spacing={1}>
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" width={210} height={210} />
            <Skeleton variant="rectangular" width={210} height={210} />
        </Stack>
    );
}


export default CodingProblemView ;