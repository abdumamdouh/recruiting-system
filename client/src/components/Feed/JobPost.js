import React from "react";
import classes from "./Feed.module.scss"





const JobPost = () => {

    return(
        <div className={classes.job}>
            <img
            src={'./mentor.png'}
            alt='logo'
            className={classes.image}/>
            <div className={classes.jobInfo}>
                <div>
                    <span>job title</span>
                    <br/>
                    @ Mentor graphics
                    <div>
                    Heliopolis, Cairo, Egypt
                    </div>
                    <div className={classes.time}>
                      5 days ago</div>
                    <div className={classes.employmentType}>
                      Full Time</div>
                    <p>
                    this is a job
                    </p>

                </div>
                
                <div className='jobIcons'>
                    
                    

                </div>


                    
                

            </div>


        </div>

    )

}


export default JobPost