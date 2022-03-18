import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import classes from "./QuestionBank.module.scss";
import Question from "./Question";
import ReactPaginate from "react-paginate";
import { getCategory, getTopic } from "../../redux/actions/bank";
// import { Formik, Form } from "formik";
// import SelectWrapper from "../Forms/SelectWrapper";
// import ButtonWrapper from "../Forms/ButtonWrapper";
// import { Container, Grid, Typography } from "@material-ui/core";

const QuestionBank = () => {
    const dispatch = useDispatch();

    const [forchange, setForchange] = useState("");

    useEffect(() => {
        dispatch(getCategory());
        console.log("execcc");
    }, [forchange]);

    //const Jobs = useSelector(state => state.jobs.Jobs);

    const bank = useSelector((state) => state.bank);

    console.log("imm bannnnnnnnnnk  ", bank);

    //const categories=["software"]
    const { Count } = useSelector((state) => state.jobs);
    const [pageNumber, setPageNumber] = useState(1);
    const [view, setView] = useState("");

    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
        //dispatch(getJobsAction(selected + 1));
    };

    const columns = [
        {
            field: "category",
            headerName: "Category",
            width: 90,
            sortable: false,
            filterable: false
        },
        {
            field: "topic",
            headerName: "Topic",
            width: 150,
            sortable: false,
            filterable: false
        },
        {
            field: "question",
            headerName: "Question",
            width: 150,
            sortable: false,
            filterable: false
        },
        {
            field: "choices",
            headerName: "Choices",
            width: 110,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                // console.log(params.value);
                <ul>
                    {params.value.map((choice) => (
                        <li>{choice}</li>
                    ))}
                </ul>
            )
        },
        {
            field: "answer",
            headerName: "Answer",
            description: "This column has a value getter and is not sortable.",
            width: 160,
            sortable: false,
            filterable: false
        },
        {
            field: "difficulty",
            headerName: "Difficulty",
            sortable: true,
            filterable: false,
            sortComparator: (a, b) => {
                const difficulty = ["Easy", "Medium", "Hard", "Not specified"];
                return difficulty.indexOf(a) - difficulty.indexOf(b);
            },
            width: 160,
            renderCell: (params) => {
                // console.log(value);
                if (params.value === "Easy") {
                    return (
                        <span style={{ color: "#027D6F" }}>{params.value}</span>
                    );
                } else if (params.value === "Medium") {
                    return (
                        <span style={{ color: "#FFC01E" }}>{params.value}</span>
                    );
                } else if (params.value === "Hard") {
                    return (
                        <span style={{ color: "#FF375F" }}>{params.value}</span>
                    );
                } else {
                    return <span>{params.value}</span>;
                }
            }
        }
    ];

    const rows = [
        {
            internalId: 1,
            category: "s",
            topic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        },
        {
            internalId: 2,
            category: "s",
            topic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Medium"
        },
        {
            internalId: 3,
            category: "s",
            topic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Hard"
        },
        {
            internalId: 4,
            category: "s",
            topic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Not specified"
        },
        {
            internalId: 5,
            category: "s",
            topic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        },
        {
            internalId: 6,
            category: "s",
            topic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        },
        {
            internalId: 7,
            category: "s",
            topic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        },
        {
            internalId: 8,
            category: "s",
            topic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        },
        {
            internalId: 9,
            category: "s",
            topic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        }
    ];

    const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const secondFilter = ["java", "C++"];

    const filtervalues = {
        category: "",
        topic: ""
    };

    const handleView = (e) => {
        setView(e.target.value);
        dispatch(getTopic(e.target.value));
    };

    const bringquestions = () => {};

    if (bank.hasOwnProperty("category")) {
        return (
            <div style={{ height: 400 }}>
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

                <lable>Category</lable>
                <select
                    name="category"
                    onChange={handleView}
                    className="custom-select text-capitalize"
                >
                    <option>--Select category--</option>
                    {bank.category.categories.map((category) => {
                        return (
                            <option
                                key={category}
                                value={category}
                                name="category"
                            >
                                {category}
                            </option>
                        );
                    })}
                </select>

                {view !== "" ? (
                    <div>
                        <lable>topic</lable>
                        <select
                            name="topic"
                            onChange={bringquestions}
                            className="custom-select text-capitalize"
                        >
                            <option>--Select topic--</option>
                            {bank.hasOwnProperty("topic") &&
                                bank.topic.topics.map((topic) => {
                                    return (
                                        <option
                                            key={topic}
                                            value={topic}
                                            name="category"
                                        >
                                            {topic}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                ) : null}
                <DataGrid
                    density="comfortable"
                    rows={rows}
                    getRowId={(row) => row.internalId}
                    rowHeight={rows[0].choices.length * 25}
                    columns={columns}
                    pageSize={5}
                    disableColumnSelector={true}
                    sx={{
                        "& .MuiDataGrid-cell:focus-within": { outline: "none" }
                    }}
                    sortingOrder={["asc", "desc"]}
                    initialState={{
                        sorting: {
                            sortModel: [
                                {
                                    field: "difficulty",
                                    sort: "asc"
                                }
                            ]
                        }
                    }}
                />

                {/* <div className={classes.list}> */}
                {/* {questions.map(question => (
                        <Question key={question} question={question} />
                        ))} */}
                {/* <br />
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
                    </div>
                    />*/}
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
