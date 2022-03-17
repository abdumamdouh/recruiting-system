import React, {useState, useEffect} from "react";
import classes from "./QuestionBank.module.scss"
import { useHistory} from 'react-router-dom'

const Question = ({question}) => {
    const answers=["answer1","answer2","answer3","answer4"]


    const history = useHistory()
    return(
        <div className={classes.question}>
            <div className={classes.questionInfo}>
                How old are you ?    
            </div>
            <br/>
            <div>

            {answers.map(answer=>{
                return(
                <span className={classes.radio} >
                    <input className={classes.radio}
                        type="radio"
                        name={answer}
                        value={answer}/>
                    <label>
                        {answer}
                    </label>        
                </span>
                )
            })}
            </div>
        </div>

    )

}


export default Question
