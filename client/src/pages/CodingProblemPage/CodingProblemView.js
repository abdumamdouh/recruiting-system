import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCodingProblemByIdAction } from "../../redux/actions/codingProblemBank";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import "./View.scss"
import CardPopup from "./CardPopup";

const CodingProblemView = (props) => {

    const {id} =useParams('id')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCodingProblemByIdAction(id));
        // console.log("execcc");
    }, [dispatch]);
    const [modalOpen, setModalOpen] = useState(false);

    const jobId = useSelector((state) => state.job.id);

    const { codingProblem } = useSelector((state) => state.codingProblems);
    console.log(id)






if(codingProblem!==undefined){
    const {testcases}=codingProblem

    return(
     
    
        <div>
        {modalOpen && (
            <CardPopup
                setOpenModal={setModalOpen}
                id={id}
                jobId={jobId}
                message="Uploaded successfully!"
            />
        )}
        <h3 className="title">{codingProblem?.title}</h3>
        <div
            style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                margin: "0.2rem"
            }}
        >
            <div
                style={{
                    flexFlow: "column",
                    width: "85%",
                    textAlign: "justify"
                }}
            >
                <div>{codingProblem?.description}</div>
                {codingProblem.testcases.map(
                    ({ inputs, outputs }, count = 1) => {
                        return (
                            <div
                                style={{
                                    marginTop: "0.8rem"
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold"
                                    }}
                                >{`Example${
                                    codingProblem.testcases
                                        .length > 1
                                        ? ` ${++count}`
                                        : ""
                                }:`}</span>
                                <pre
                                    style={{
                                        backgroundColor:
                                            "#f7f9fa",
                                        padding: "0.4rem",
                                        display: "grid",
                                        gridRowGap:
                                            "0.2rem",
                                        fontSize: "1rem",
                                        marginTop: "0.8rem"
                                    }}
                                >
                                    <span>
                                        <strong>
                                            Input:
                                        </strong>{" "}
                                        {inputs}
                                    </span>
                                    <span>
                                        <strong>
                                            Output:
                                        </strong>{" "}
                                        {outputs}
                                    </span>
                                </pre>
                            </div>
                        );
                    }
                )}
                <div style={{ marginTop: "0.8rem" }}>
                    <span
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold"
                        }}
                    >
                        Constraints:
                    </span>
                    <ul>
                        <li>
                            <pre
                                style={{
                                    backgroundColor:
                                        "#f7f9fa",
                                    padding: "0.4rem",
                                    display: "grid",
                                    gridRowGap: "0.2rem",
                                    fontSize: "1rem",
                                    marginTop: "0.8rem"
                                }}
                            >
                                <div>
                                    <strong>
                                        Time Constraint:
                                    </strong>{" "}
                                    {`${codingProblem.timeConstraint} seconds`}
                                </div>
                            </pre>
                        </li>
                        <li>
                            <pre
                                style={{
                                    backgroundColor:
                                        "#f7f9fa",
                                    padding: "0.4rem",
                                    display: "grid",
                                    gridRowGap: "0.2rem",
                                    fontSize: "1rem",
                                    marginTop: "0.8rem"
                                }}
                            >
                                <div>
                                    <strong>
                                        Space Constraint:
                                    </strong>{" "}
                                    {`${codingProblem.memoryConstraint} MB`}
                                </div>
                            </pre>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <button  styel={{textAlign:'center'}}
                        className="btn btn-primary mb-2"
                        onClick={() => setModalOpen(true)}
                    >
                        Choose problem
                    </button>
    </div>
    
    
    
    
    )
    
    }
    else
    return (
        <Stack spacing={1}>
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" width={210} height={210} />
            <Skeleton variant="rectangular" width={210} height={210} />
        </Stack>
    );
}


export default CodingProblemView ;