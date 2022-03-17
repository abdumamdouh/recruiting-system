import React, {useState, useEffect} from "react";
import classes from "./Feed.module.scss"
import { useHistory} from 'react-router-dom'
import {  useSelector } from "react-redux";
import Button from "@mui/material/Button";

const Question = ({question}) => {
    const history = useHistory()
    //console.log(job)
    return(
        <div className={classes.job}>
 
    
            <div className={classes.jobInfo}>
                
            </div>

        </div>

    )

}


export default Question
