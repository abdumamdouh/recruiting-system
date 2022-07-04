import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ResultCard from "../../components/ResultCard/ResultCard";
import { getJobResultsAction } from "../../redux/actions/jobs";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
const Reports = () => {
    const [resultstate, setResults] = useState({});
    const [mcqResult, setMcqResult] = useState([]);
    const [taskResult, setTaskResult] = useState([]);
    const [codingResult, setCodingResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const state = useSelector((state) => state);
    const { id } = state.job;
    const dispatch = useDispatch();
    const results = useSelector((state) => state.results);
    const M = results.mcqsResults;
    const T = results.tasksResults;
    const C = results.codingProblemsResults;
    const data = results.overallScore.map(
        ({ applicantName, overallScore }) => ({
            name: applicantName,
            uv: overallScore,
            pv: 2400,
            amt: 2400
        })
    );
    const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
        return (
            <text
                x={x + width / 2}
                y={y}
                fill="#666"
                textAnchor="middle"
                dy={-6}
            >{`${value}`}</text>
        );
    };
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
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center"
                }}
            >
                <div>
                    {" "}
                    <div>
                        <br />
                        <h4>MCQ results</h4>
                        {mcqResult.map((item, index) => (
                            <ResultCard
                                key={index}
                                title={item.title}
                                avg={
                                    results.avgMCQsScore[index]
                                        .average_MCQ_score
                                }
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
                                    avg={
                                        results.avgCodingProblemsScore[index]
                                            .average_CodingProblem_score
                                    }
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
                                    avg={
                                        results.avgTasksScore[index]
                                            .average_Task_score
                                    }
                                    values={item.values}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignSelf: "center",
                        flexDirection: "column"
                    }}
                >
                    <h5 style={{ marginLeft: "2rem" }} class="card-title">
                        Overall Score
                    </h5>
                    <ResponsiveContainer width={600} height={400}>
                        <BarChart width={150} height={40} data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar
                                dataKey="uv"
                                barSize={40}
                                fill="#8884d8"
                                isAnimationActive={false}
                                label={renderCustomBarLabel}
                            />
                        </BarChart>
                    </ResponsiveContainer>
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
