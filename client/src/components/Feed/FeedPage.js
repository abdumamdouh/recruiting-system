import React from "react";

import JobPost from "./JobPost";
import classes from "./Feed.module.scss"




const Feed = () => {

    const array = [1,2,3,4,5.6,7,8,9,10]

    return(
        <div className={classes.list}>{
            array.map(job=>(
                <JobPost/>
            ))
            }
            <JobPost/>
        </div>
    )

}


export default Feed
