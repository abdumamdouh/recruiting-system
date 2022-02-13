import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import JobPost from "./JobPost";
import classes from "./Feed.module.scss"
import ReactPaginate from "react-paginate"
import {getJobsAction} from '../../redux/actions/jobs'


const Feed = () => {
    let job =[]
    const dispatch = useDispatch();
    const jobs = useSelector(state=> state.jobs)
    job = job.concat(jobs)
    console.log('ds',job)
    console.log(jobs)
    console.log(typeof(jobs))
    useEffect(() => {
        dispatch(getJobsAction(1))
      }, []);
    const array = [1,2,3,4,5.6,7,8,9,10]
      console.log(typeof(array))
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
