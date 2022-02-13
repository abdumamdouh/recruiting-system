import React, { useState } from "react";

import JobPost from "./JobPost";
import classes from "./Feed.module.scss"
import ReactPaginate from "react-paginate"




const Feed = () => {

    const array = [1,2,3,4,5.6,7,8,9,10]

    const[pageNumber,setPageNumber]=useState(1)


   // const pagesVisited = pageNumber*jobsPerPage

    const displayJobs = ()=>{

    }
    const changePage = ({selected})=>{
        setPageNumber(selected+1);
    return(
        
            <div className={classes.list}>{
                        array.map(job=>(
                            <JobPost/>
                        ))
                        }
                        <h3>{pageNumber}</h3>
                        <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={6}
                        onPageChange={changePage}
                        containerClassName={classes.paginationBttns}
                        previousLinkClassName={classes.previousBttn}
                        nextLinkClassName={classes.nextBttn}
                        disabledClassName={classes.paginationDisabled}
                        activeClassName={classes.paginationActive} />
                    

            </div>
                 
       
       
    )

}


export default Feed
