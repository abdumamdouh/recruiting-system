import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import SnackBar from "./SnackBar";
import classes from "./QuestionBank.module.scss";
import Question from "./Question";
import ReactPaginate from "react-paginate";
import { getTopic, getSubtopic, getQuestions } from "../../redux/actions/bank";
import QuestionsPopUp from "./QuestionsPopUp";
import CustomizeExamPopup from "./CustomizeExamPopUp";
import { Select } from "@mui/material";
import AddQuestion from "./AddQuestion";
// import { Formik, Form } from "formik";
// import SelectWrapper from "../Forms/SelectWrapper";
// import ButtonWrapper from "../Forms/ButtonWrapper";
// import { Container, Grid, Typography } from "@material-ui/core";

const QuestionBank = () => {
    const dispatch = useDispatch();

    const [forchange, setForchange] = useState("");
    //for opening questions popup
    const [modalOpen, setModalOpen] = useState(false);
    //for opening create exam popup
    const [openExam, setOpenExam] = useState(false);
    //for opening Add question one by one
    const [openQuestion, setOpenQuestion] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [isDisabled, setDisabled] = useState(true);
    const [isDoubleClick, setisDoubleClick] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        dispatch(getTopic());
        // console.log("execcc");
    }, [forchange]);
    const openQuestions = () => {
        setModalOpen(true);
    };
    const openCustomizeExam = () => {
        setOpenExam(true);
    };
    //Add Question one by one
    const addQuestion = () => {
        setOpenQuestion(true);
    };
    const enableButtons = () => {
        setDisabled(false);
    };
    //const Jobs = useSelector(state => state.jobs.Jobs);

    const bank = useSelector((state) => state.bank);

    //console.log("imm bannnnnnnnnnk  ", bank);
    // const selectedQuestions = [];
    const html = (text) => {
        const e1 = document.createElement("ul");
        e1.innerHTML = text;
        //console.log(e1.textContent);
        return e1;
    };

    // &#9679;

    function getChoices(params) {
        return `${params.value.join("*")}`;
    }

    function isOverflown(element) {
        return (
            element.scrollHeight > element.clientHeight ||
            element.scrollWidth > element.clientWidth
        );
    }

    const GridCellExpand = React.memo(function GridCellExpand(props) {
        const { width, value } = props;
        const wrapper = React.useRef(null);
        const cellDiv = React.useRef(null);
        const cellValue = React.useRef(null);
        // const liValue = React.useRef(null);
        const [anchorEl, setAnchorEl] = React.useState(null);
        const [showFullCell, setShowFullCell] = React.useState(false);
        const [showPopper, setShowPopper] = React.useState(false);

        const handleMouseEnter = () => {
            const isCurrentlyOverflown = isOverflown(cellValue.current);
            // console.log(isOverflow(liValue.current));
            setShowPopper(isCurrentlyOverflown);
            setAnchorEl(cellDiv.current);
            setShowFullCell(true);
        };

        const handleMouseLeave = () => {
            setShowFullCell(false);
        };

        React.useEffect(() => {
            if (!showFullCell) {
                return undefined;
            }

            function handleKeyDown(nativeEvent) {
                // IE11, Edge (prior to using Bink?) use 'Esc'
                if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
                    setShowFullCell(false);
                }
            }

            document.addEventListener("keydown", handleKeyDown);

            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }, [setShowFullCell, showFullCell]);

        return (
            <Box
                ref={wrapper}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    alignItems: "center",
                    lineHeight: "24px",
                    width: 1,
                    height: 1,
                    position: "relative",
                    display: "flex"
                }}
            >
                <Box
                    ref={cellDiv}
                    sx={{
                        height: 1,
                        width,
                        display: "block",
                        position: "absolute",
                        top: 0
                    }}
                />
                <Box
                    ref={cellValue}
                    sx={{
                        // whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >
                    {value.split("*").length > 1
                        ? value.split("*").map((element) => (
                              <div
                                  style={{
                                      display: "list-item",
                                      listStylePosition: "inside",
                                      //   overflow: "hidden",
                                      textOverflow: "ellipsis"
                                  }}
                                  key={Math.random().toString()}
                                  //   ref={liValue}
                              >
                                  {element}
                              </div>
                          ))
                        : value}
                </Box>
                {showPopper && (
                    <Popper
                        open={showFullCell && anchorEl !== null}
                        anchorEl={anchorEl}
                        style={{ width, marginLeft: -17 }}
                    >
                        <Paper
                            elevation={1}
                            style={{
                                minHeight: wrapper.current.offsetHeight - 3
                            }}
                        >
                            <Typography
                                variant="body2"
                                style={{
                                    padding: 8,
                                    overflowWrap: "break-word",
                                    // whiteSpace: "pre-wrap",
                                    // wordBreak: "break-all",
                                    hyphens: "auto"
                                }}
                            >
                                {value.split("*").length > 1
                                    ? value
                                          .split("*")
                                          .map((element) => (
                                              <li
                                                  key={Math.random().toString()}
                                              >
                                                  {element}
                                              </li>
                                          ))
                                    : value}
                            </Typography>
                        </Paper>
                    </Popper>
                )}
            </Box>
        );
    });

    GridCellExpand.propTypes = {
        value: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired
    };

    function renderCellExpand(params) {
        return (
            <GridCellExpand
                value={params.value || ""}
                width={params.colDef.computedWidth}
            />
        );
    }

    renderCellExpand.propTypes = {
        /**
         * The column of the row that the current cell belongs to.
         */
        colDef: PropTypes.object.isRequired,
        /**
         * The cell value, but if the column has valueGetter, use getValue.
         */
        value: PropTypes.string.isRequired
    };

    //const categories=["software"]
    const { Count } = useSelector((state) => state.jobs);
    const [pageNumber, setPageNumber] = useState(1);
    const [view, setView] = useState("");

    const [subtopic, setSubtopic] = useState("");

    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
        //dispatch(getJobsAction(selected + 1));
    };

    const columns = [
        {
            field: "question",
            headerName: "Question",
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: renderCellExpand
        },
        {
            field: "choices",
            headerName: "Choices",
            width: 110,
            sortable: false,
            filterable: false,
            valueGetter: getChoices,
            renderCell: renderCellExpand
            // renderCell: (params) => (
            //     // console.log(params.value);
            //     <ul>
            //         {params.value.map((choice) => {
            //             console.log(params);
            //             // params.value = choice;
            //             return (
            //                 <li
            //                     onMouseEnter={() =>
            //                         renderCellExpand({
            //                             value: choice,
            //                             defCol: {
            //                                 computedWidth:
            //                                     params.defCol.computedWidth
            //                             }
            //                         })
            //                     }
            //                 >
            //                     {choice}
            //                 </li>
            //             );
            //         })}
            //     </ul>
            // )
        },
        {
            field: "answer",
            headerName: "Answer",
            description: "This column has a value getter and is not sortable.",
            width: 160,
            sortable: false,
            filterable: false,
            renderCell: renderCellExpand
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
            subtopic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        },
        {
            internalId: 2,
            category: "s",
            subtopic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Medium"
        },
        {
            internalId: 3,
            category: "s",
            subtopic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Hard"
        },
        {
            internalId: 4,
            category: "s",
            subtopic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Not specified"
        },
        {
            internalId: 5,
            category: "s",
            subtopic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        },
        {
            internalId: 6,
            category: "s",
            subtopic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        },
        {
            internalId: 7,
            category: "s",
            subtopic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        },
        {
            internalId: 8,
            category: "s",
            subtopic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        },
        {
            internalId: 9,
            category: "s",
            subtopic: "Snow",
            question: "Jon",
            choices: ["dsd", "sdd", "fdfd", "ffgf"],
            answer: "dsd",
            difficulty: "Easy"
        }
    ];

    // const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const secondFilter = ["java", "C++"];

    const filtervalues = {
        category: "",
        subtopic: ""
    };

    const handleView = (e) => {
        dispatch(getSubtopic(e.target.value, setView));
        setView(e.target.value);
    };

    const bringquestions = (e) => {
        dispatch(getQuestions(e.target.value, view, setSubtopic));
        setSubtopic(e.target.value);
    };

    if (bank.hasOwnProperty("topic")) {
        return (
            <div style={{ height: 400 }}>
                <SnackBar
                    isDoubleClick={isDoubleClick}
                    setisDoubleClick={setisDoubleClick}
                    error={true}
                />

                <SnackBar
                    isDoubleClick={success}
                    setisDoubleClick={setSuccess}
                    error={false}
                />

                {modalOpen && (
                    <QuestionsPopUp
                        setOpenModal={setModalOpen}
                        message="test"
                        SQuestions={selectedQuestions}
                        handleDelete={(id) => {
                            //console.log("alo", id);
                            const filtered = selectedQuestions.filter(
                                (question) => question.id !== id
                            );
                            const filteredID = questions.filter(
                                (i) => i !== id
                            );
                            // console.log("alo", selectedQuestions);
                            //console.log("alo", filtered);
                            setSelectedQuestions(filtered);
                            setQuestions(filteredID);
                        }}
                    />
                )}
                {openExam && (
                    <CustomizeExamPopup
                        setOpenExam={setOpenExam}
                        questions={questions}
                        setSuccess={setSuccess}
                    />
                )}
                {openQuestion && (
                    <AddQuestion
                        setSuccess={setSuccess}
                        selectedQuestions={selectedQuestions}
                        setSelectedQuestions={setSelectedQuestions}
                        view={view}
                        setView={setView}
                        subtopicProp={subtopic}
                        setSubtopicProp={setSubtopic}
                        setOpenQuestion={setOpenQuestion}
                    />
                )}
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
                <div>
                    <h4 style={{ marginTop: "1.2rem" }}>
                        Add Question one by one
                    </h4>
                    <div>
                        {" "}
                        <button
                            className="btn btn-primary"
                            onClick={addQuestion}
                            style={{ marginTop: "5px", marginBottom: "10px" }}
                        >
                            {" "}
                            Add Question
                        </button>{" "}
                    </div>
                </div>
                <h4>Choose from the questions bank.</h4>
                <label>Topic</label>
                <select
                    name="topic"
                    onChange={handleView}
                    className="custom-select text-capitalize"
                    style={{ marginBottom: "0.5rem" }}
                >
                    <option>--Select topic--</option>
                    {bank.topic.topics.map((topic) => {
                        return (
                            <option key={topic} value={topic} name="topic">
                                {topic}
                            </option>
                        );
                    })}
                </select>

                {view !== "" ? (
                    <div>
                        <label>Subtopic</label>
                        <select
                            name="subtopic"
                            onChange={bringquestions}
                            className="custom-select text-capitalize"
                            style={{ marginBottom: "1rem" }}
                            // defaultValue={subtopic}
                        >
                            <option>--Select Subtopic--</option>
                            {bank.hasOwnProperty("subtopic") &&
                                bank.subtopic.subtopics.map((subtopic) => {
                                    return (
                                        <option
                                            key={subtopic}
                                            value={subtopic}
                                            name="subtopic"
                                        >
                                            {subtopic}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                ) : null}
                {bank.hasOwnProperty("question") && (
                    <>
                        <DataGrid
                            density="comfortable"
                            rows={bank.question.questions}
                            getRowId={(row) => row.id}
                            rowHeight={rows[0].choices.length * 25}
                            columns={columns}
                            pageSize={5}
                            disableColumnSelector={true}
                            sx={{
                                "& .MuiDataGrid-cell:focus-within": {
                                    outline: "none"
                                }
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
                            onRowClick={(params) => {
                                if (selectedQuestions.includes(params.row)) {
                                    // <SnackBar setOpen={true} />;
                                    setisDoubleClick(true);
                                    // console.log("error");
                                } else {
                                    enableButtons();
                                    const hambola = [
                                        ...selectedQuestions,
                                        params.row
                                    ];
                                    setSelectedQuestions(hambola);
                                    questions.push(params.row.id);
                                    //console.log("selec", selectedQuestions);
                                    setQuestions(questions);
                                    // console.log("questions", questions);
                                    //console.log(selectedQuestions);
                                }
                            }}
                        />
                    </>
                )}
                <div className="footer" style={{ marginTop: "20px" }}>
                    <button
                        style={{ marginBottom: "20px" }}
                        className="btn btn-primary ml"
                        // id="submitBtn"
                        onClick={openQuestions}
                        disabled={!selectedQuestions.length}
                    >
                        Preview Questions
                    </button>
                    <button
                        style={{ marginBottom: "20px" }}
                        className="btn btn-primary ml"
                        // id="submitBtn"
                        onClick={openCustomizeExam}
                        disabled={!selectedQuestions.length}
                    >
                        Create Exam
                    </button>
                </div>

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
