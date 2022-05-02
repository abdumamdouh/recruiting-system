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


    const { codingProblem } = useSelector((state) => state.codingProblems);
    console.log(id)






if(codingProblem!==undefined){
    const {testcases}=codingProblem

    return(
    
        <div>
           <h3>{codingProblem.name}</h3>
           <div>
               <p>
                time limit: {codingProblem.timeConstraint} seconds
               </p>
           </div> <p>
                memory limit: {codingProblem.memoryConstraint} MegaBytes
               </p>


           <div>
               <p>
               {codingProblem.description}
               </p>
           </div>
           <div>
               {
                   testcases.map((testcase,index)=>{
                       return(
                            <div>
                                testcase {index+1}
                                
                                <p>
                                <span>input array: {testcase.inputs} </span>
                                <span>output array: {testcase.outputs}</span>
                                </p>
                           
                               
                            </div>
                       )
                   })

               }
           </div>
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