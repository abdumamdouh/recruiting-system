import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import classes from "./QuestionBank.module.scss"
import Question from "./Question"
import ReactPaginate from "react-paginate";
import { getCategory } from "../../redux/actions/bank";
// import { Formik, Form } from "formik";
// import SelectWrapper from "../Forms/SelectWrapper";
// import ButtonWrapper from "../Forms/ButtonWrapper";
// import { Container, Grid, Typography } from "@material-ui/core";


const QuestionBank = () => {
    
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const Jobs = useSelector(state => state.jobs.Jobs);
    const {categories} = useSelector(state => state.bank.category);

    const { Count } = useSelector(state => state.jobs);
    const [pageNumber, setPageNumber] = useState(1);
    const [view,setView]=useState('notsw');

    
    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
       // dispatch(getJobsAction(selected + 1));
    };





    const questions=[1,2,3,4,5,6,7,8,9,10]
    const secondFilter=["java","C++"]


    const filtervalues={
        category:'',
        topic:''
    }

  const  handleView =(e)=>{
      setView(e.target.value)

  }

  const bringquestions =()=>{

  }

    if (categories !== undefined) {
        return (

            <div>
{/* 
                <div>

                <Formik
                        initialValues={filtervalues}
                      //  onSubmit={}
                    >
                        <Form>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <Typography>category</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectWrapper
                                        name="category"
                                        label="category"
                                        options={filters}
                                        
                                    />
                                </Grid>

                                {}

                                <Grid item xs={5}>
                                    <ButtonWrapper style={{'marginTop':'20px' }}>show</ButtonWrapper>
                                </Grid>
                                <Grid item xs={12}></Grid>
                            </Grid>
                        </Form>
                    </Formik>


                </div> */}
                        <lable>
                            Category
                        </lable>
                        <select
                           
                            name="category"
                            onChange={handleView}
                            className="custom-select text-capitalize"
                        >
                            <option>--Select category--</option>
                           {
                               categories.map(category=>{
                                   return(
                                       <option key={category}
                                       value={categories}
                                       name="category">
                                           {category}
                                       </option>
                                   )
                               })
                           }
                            
                        </select>

                        {view==="software"?
                            <div>
                                <lable>
                                    topic
                                </lable>
                                <select
                                
                                    name="topic"
                                    onChange={bringquestions}
                                    className="custom-select text-capitalize"
                                >
                                    <option>--Select topic--</option>
                                    <option value="java">
                                        java 
                                    </option>
                                    <option value="c++">c++</option>
                                    <option value="testing">testing</option>
                                    
                                </select>

                            </div>
                            :
                            null
                        }

                <div className={classes.list}>
                    {/* {questions.map(question => (
                        <Question key={question} question={question} />
                        ))} */}
                    <br />
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={Math.ceil(Count / 10)}
                        onPageChange={changePage}
                        containerClassName={classes.paginationBttns}
                        previousLinkClassName={classes.previousBttn}
                        nextLinkClassName={classes.nextBttn}
                        disabledClassName={classes.paginationDisabled}
                        activeClassName={classes.paginationActive}
                        />
                </div>
             </div>
        );
    } else
        return (
            <Stack spacing={1}>
                <Skeleton variant="text" />
                <Skeleton variant="rectangular" width={210} height={210} />
                <Skeleton variant="rectangular" width={210} height={210} />
            </Stack>
        );
};

export default QuestionBank;
