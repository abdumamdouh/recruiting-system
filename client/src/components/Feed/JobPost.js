import React from "react";
import classes from "./Feed.module.scss"
import {NavLink, useHistory} from 'react-router-dom'
import Button from "@mui/material/Button";

const JobPost = ({job}) => {
    const history = useHistory()

    const handleRedirect = ()=>{
        history.push(`/feed/job/${job.id}`);
    }
    //console.log(job)
    return(
        <div className={classes.job} onClick={handleRedirect}>
            <img
            src={'./mentor.png'}
            alt='logo'
            className={classes.image}/>
            <div className={classes.jobInfo}>
                <div>
                    <span>{job.title}</span>
                    <br/>
                    @ Mentor graphics
                    <div>
                    Heliopolis, Cairo, Egypt
                    </div>
                    <div className={classes.time}>
                      5 days ago</div>
                    <div className={classes.employmentType}>
                      {job.employmentType}</div>
                    <p> 
                    {job.careerLevel}
                    </p>
                    <Button variant='contained' onClick={handleRedirect}>View Job</Button>
                </div>
                
                <div className='jobIcons'>
                    
                    

                </div>


                    
                

            </div>

        </div>

    )

}


export default JobPost
