import React, {useState, useEffect} from "react";
import classes from "./Feed.module.scss"
import { useHistory} from 'react-router-dom'
import {  useSelector } from "react-redux";
import Button from "@mui/material/Button";

const JobPost = ({job}) => {
    const history = useHistory()
  
    const handleRedirect = ()=>{
        history.push(`/feed/job/${job.id}`);
    }
    const avatar =job.Recruiter.avatar!==null?job.Recruiter.avatar: null
    const base64String = job.Recruiter.avatar!==null?btoa(String.fromCharCode(...new Uint8Array(avatar.data))): '';
    //console.log(job)
    return(
        <div className={classes.job} onClick={handleRedirect}>
     { job.Recruiter.avatar!==null &&
       
            <img
            src={`data:image/jpeg;base64,${base64String}`}
            alt='logo'
            className={classes.image}/>}
    
            <div className={classes.jobInfo}>
                <div>
                    <span>{job.title}</span>
                    <br/>
                    {job.Recruiter.company}
                    <div>
                    {job.place}
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
