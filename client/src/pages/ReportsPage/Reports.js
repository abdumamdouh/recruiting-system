import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ResultCard from "../../components/ResultCard/ResultCard";
import { getJobResultsAction } from "../../redux/actions/jobs";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
const Reports = () => {
    const [resultstate, setResults] = useState({});
    const [mcqResult, setMcqResult] = useState([]);
    const [taskResult, setTaskResult] = useState([]);
    const [codingResult, setCodingResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const state = useSelector(state => state);
    const { id } = state.job;
    const dispatch = useDispatch();
    const results = useSelector(state => state.results);
    const M = results.mcqsResults;
    const T = results.tasksResults;
    const C = results.codingProblemsResults;
    const setValues = () => {
        for (const [key, value] of Object.entries(M)) {
            setMcqResult([...[value]]);
        }
        for (const [key, value] of Object.entries(C)) {
            setCodingResult([...[value]]);
        }
        for (const [key, value] of Object.entries(T)) {
            setTaskResult([...[value]]);
        }
    };
    useEffect(() => {
        dispatch(getJobResultsAction(id, setLoading));
        console.log(loading);
        if (loading == true) {
            setValues();
        }
    }, [dispatch, loading]);

    if (results !== undefined && loading == true) {
        return (
            <div>
                {" "}
                <div>
                    <br />
                    <h4>MCQ results</h4>
                    {mcqResult.map((item, index) => (
                        <ResultCard
                            key={index}
                            title={item.title}
                            values={item.values}
                        />
                    ))}
                </div>
                <div>
                    <h4>Coding problems results</h4>
                    <div>
                        {codingResult.map((item, index) => (
                            <ResultCard
                                key={index}
                                title={item.title}
                                values={item.values}
                            />
                        ))}
                    </div>
                    <br />
                </div>
                <div>
                    <h4>Task results</h4>
                    <div>
                        {taskResult.map((item, index) => (
                            <ResultCard
                                key={index}
                                title={item.title}
                                values={item.values}
                            />
                        ))}
                    </div>
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

export default Reports;
