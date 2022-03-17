import React, {useState, useEffect} from "react";
import classes from "./QuestionBank.module.scss"
import { useHistory} from 'react-router-dom'

const Question = ({question}) => {
    const history = useHistory()
    return(
        <div className={classes.job}>
 
    
            <div className={classes.jobInfo}>
                
            </div>

        </div>

    )

}


export default Question
