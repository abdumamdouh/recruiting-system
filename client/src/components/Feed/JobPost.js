import React, {useState, useEffect} from "react";
import classes from "./Feed.module.scss"
import { useHistory} from 'react-router-dom'
import {  useSelector } from "react-redux";
import Button from "@mui/material/Button";

const JobPost = ({job}) => {
    const history = useHistory()
    const [photo,setPhoto]= useState()
    const [imgUrl, setImgUrl] = useState();
    const state = useSelector((state) => state);
    const fetchData = async()=> {
        try {
            const rawResponse = await fetch(
                'http://localhost:5000/Recruiter/me/avatar',
                {
                    method: "GET",
                    // headers: {
                    //     // Accept: "application/json",
                    //     // "Content-Type": "data:image/jpeg;base64",
                    //     Authorization: "Bearer " + state.user.userInfo.token
                    // }
                }
            );
            const data = await rawResponse.blob();
            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onloadend = () => {
              const base64data = reader.result;
              setImgUrl(base64data);
            };
            console.log(data);
            setPhoto(data);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    const handleRedirect = ()=>{
        history.push(`/feed/job/${job.id}`);
    }
    //console.log(job)
    return(
        <div className={classes.job} onClick={handleRedirect}>
            {/* <img
            src={'./mentor.png'}
            alt='logo'
            className={classes.image}/> */}
            {/* <img
            src={`data:image/jpeg;base64,${photo}`}
            alt='logo'
            className={classes.image}/> */}
            <img
            src={imgUrl} 
            alt='logo'
            className={classes.image}/>
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
