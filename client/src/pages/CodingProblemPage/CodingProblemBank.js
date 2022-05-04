import React, { useState, useEffect } from "react";
import { getCodingProblemsAction } from "../../redux/actions/codingProblemBank";
import { useDispatch, useSelector } from "react-redux";
import CodingProblemSample from "./CodingProblemSample";
import "./CodingProblemBank.scss";
import ReactPaginate from "react-paginate";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const CodingProblemBank = () => {
    const dispatch = useDispatch();
    const { RecruiterId } = useSelector((state) => state.job);
    useEffect(() => {
        dispatch(getCodingProblemsAction(1));
    }, [dispatch]);
    const { codingProblems } = useSelector((state) => state.codingProblems);
    const { Count } = useSelector((state) => state.exam);

    const [pageNumber, setPageNumber] = useState(1);

    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
        dispatch(getCodingProblemsAction(selected + 1));
    };
    console.log(codingProblems);
    if (codingProblems !== undefined) {
        return (
            <div>
                <div className="card-container">
                    {codingProblems.map((m, index) => (
                        <ul
                            style={{
                                listStyle: "none",
                                padding: "10px",
                                margin: "10px auto"
                            }}
                            className="examul"
                        >
                            {" "}
                            <li
                                key={m.id}
                                style={{ marginLeft: "30px" }}
                                className="examli"
                            >
                                <CodingProblemSample
                                    title={m.title}
                                    number={(pageNumber - 1) * 4 + (index + 1)}
                                    id={m.id}
                                    owned={
                                        m.recruiterId === RecruiterId
                                            ? true
                                            : false
                                    }
                                    Rec={RecruiterId}
                                    memoryConstraint={m.memoryConstraint}
                                    timeConstraint={m.timeConstraint}
                                    duration={m.duration}
                                    description={m.description}
                                />{" "}
                            </li>{" "}
                        </ul>
                    ))}
                </div>
                <div className="footer">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={Math.ceil(Count / 4)}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
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

export default CodingProblemBank;
