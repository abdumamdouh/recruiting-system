import React from 'react';
import { useHistory } from "react-router-dom";

import './Card.scss'
const Card = (props) => {
    const history = useHistory();
    //redirect to questions' page
    const handleClick =()=>{
        history.push(`/exam/${props.id}`);
    }
    console.log(props.number)
    return (
        <div className="card" style={{width: '18rem'}}>
        <div className="card-body">
          <h4 className="card-title">Exam {props.number}</h4>
          <h6 className="card-subtitle mb-2 text-muted">Exam topic: {props.topic}</h6>
          <p className="card-text">This Exam consists of {props.questions.length} questions</p>
         <button class="btn btn-primary" onClick={handleClick}>View MCQ Exam</button>
        </div>
      </div>
    );
}

export default Card;
