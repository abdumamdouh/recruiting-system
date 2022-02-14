import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import JobPost from "./JobPost";
import classes from "./Feed.module.scss"
import ReactPaginate from "react-paginate"
import {getJobsAction} from '../../redux/actions/jobs'


const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobsAction(1))
  }, []);
    let job =[]
    const Jobs = useSelector(state=> state.jobs.Jobs)
    const {Count} = useSelector(state=>state.jobs)
    //console.log('cc',Count)
    job = job.concat(Jobs)
   // const Count = 0;


    

    const[pageNumber,setPageNumber]=useState(1)


   // const pagesVisited = pageNumber*jobsPerPage

    const displayJobs = ()=>{

    }
    const changePage = ({selected})=>{
        setPageNumber(selected+1);
       dispatch(getJobsAction(selected+1))
    }

    return(
        
            <div className={classes.list}>{
                        job.map(job=>(
            <JobPost job={job}/>
                        ))
                        }
                        <br />
                        <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={Math.ceil(Count/10)}
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
