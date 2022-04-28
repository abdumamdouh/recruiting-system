import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import "./QuestionsPopUp.scss";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

function QuestionsPopUp({ setOpenModal, message, SQuestions, handleDelete }) {
    // const questions = useSelector((state) => state.bank.question.questions);
    console.log("hghgfh", SQuestions);
    const [rows, setRows] = React.useState(SQuestions);
    function getChoices(params) {
        return `${params.value.join("*")}`;
    }

    function isOverflown(element) {
        return (
            element.scrollHeight > element.clientHeight ||
            element.scrollWidth > element.clientWidth
        );
    }

    const deleteQuestion = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
            console.log(id);
            handleDelete(id);
        },
        []
    );

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
    const columns = React.useMemo(
        () => [
            {
                field: "question",
                headerName: "Question",
                width: 150,
                sortable: false,
                filterable: false,
                editable: true,
                renderCell: renderCellExpand
            },
            {
                field: "choices",
                headerName: "Choices",
                width: 110,
                sortable: false,
                filterable: false,
                editable: true,
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
                description:
                    "This column has a value getter and is not sortable.",
                width: 160,
                sortable: false,
                filterable: false,
                editable: true,
                renderCell: renderCellExpand
            },
            {
                field: "difficulty",
                headerName: "Difficulty",
                sortable: true,
                filterable: false,
                sortComparator: (a, b) => {
                    const difficulty = [
                        "Easy",
                        "Medium",
                        "Hard",
                        "Not specified"
                    ];
                    return difficulty.indexOf(a) - difficulty.indexOf(b);
                },
                width: 160,
                renderCell: (params) => {
                    // console.log(value);
                    if (params.value === "Easy") {
                        return (
                            <span style={{ color: "#027D6F" }}>
                                {params.value}
                            </span>
                        );
                    } else if (params.value === "Medium") {
                        return (
                            <span style={{ color: "#FFC01E" }}>
                                {params.value}
                            </span>
                        );
                    } else if (params.value === "Hard") {
                        return (
                            <span style={{ color: "#FF375F" }}>
                                {params.value}
                            </span>
                        );
                    } else {
                        return <span>{params.value}</span>;
                    }
                }
            },
            {
                field: "actions",
                type: "actions",
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => {
                            console.log(params.row.id);
                            // deleteQuestion(params.row.id);
                            handleDelete(params.row.id);
                        }}
                    />
                ]
            }
        ],
        [handleDelete]
    );
    return (
        <div className="question-overlay">
            <div className="modal-questionBackground">
                <div className="modal-questionContainer">
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            x
                        </button>
                    </div>
                    {/* <div className="title">
          <h3>Are You Sure You Want to Continue?</h3>
        </div> */}
                    <div className="body">
                        <DataGrid
                            density="comfortable"
                            rows={SQuestions}
                            getRowId={(SQuestions) => SQuestions.id}
                            rowHeight={SQuestions[0]?.choices.length * 25}
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
                        />
                    </div>
                    <div className="footer">
                        <button
                            onClick={() => {
                                setOpenModal(false);
                            }}
                            id="cancelBtn"
                        >
                            Close
                        </button>
                        {/* <button>Continue</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionsPopUp;
