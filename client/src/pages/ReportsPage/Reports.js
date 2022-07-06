import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Slider from "react-slick";
import ResultCard from "../../components/ResultCard/ResultCard";
import { getJobResultsAction } from "../../redux/actions/jobs";
import  ResultPopup from '../../components/ResultCard/ResultPopup'
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Text
} from "recharts";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            onClick={onClick}
            className={className}
            style={{ display: "block" }}
        >
            <i
                style={{
                    border: "solid black",
                    borderWidth: "0 3px 3px 0",
                    display: "inline-block",
                    padding: "3px",
                    transform: "rotate(-45deg)"
                }}
            ></i>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            onClick={onClick}
            className={className}
            style={{ display: "block", left: "-15px" }}
        >
            <i
                style={{
                    border: "solid black",
                    borderWidth: "0 3px 3px 0",
                    display: "inline-block",
                    padding: "3px",
                    transform: "rotate(135deg)"
                }}
            ></i>
        </div>
    );
}
const Reports = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        swipeToSlide: true,
        className: "slides"
    };
    const [resultstate, setResults] = useState({});
    const [mcqResult, setMcqResult] = useState([]);
    const [taskResult, setTaskResult] = useState([]);
    const [codingResult, setCodingResult] = useState([]);
    const [loading, setLoading] = useState(false);
    let colorIndex = 0;
    const state = useSelector((state) => state);
    const { id } = state.job;
    const dispatch = useDispatch();
    const results = useSelector((state) => state.results);
    useEffect(() => {
        dispatch(getJobResultsAction(id, setLoading));

        if (loading == true) {
            setValues();
        }
    }, [dispatch, loading]);
    const M = results.mcqsResults;
    const T = results.tasksResults;
    const C = results.codingProblemsResults;
    const palette = [
        "#16BAC5",
        "#94A3AE",
        "#5FBFF9",
        "#293758",
        "#521765",
        "#171D1C",
        "#5863F8"
    ];
    //over all score results
    const [openResult, setOpenResult] = useState(false);
    const showResults = () => {
        
        setOpenResult(true);
    };
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
    const CustomizedAxisTick = ({ x, y, payload }) => {
        return (
            <Text
                x={x}
                y={y}
                width={40}
                textAnchor="middle"
                verticalAnchor="start"
            >
                {payload.value}
            </Text>
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

    if (results !== undefined && loading == true) {
        const data = results.overallScore.map(
            ({ applicantName, codingProblemsScore, mcqsScore, tasksScore }) => {
                const codingProblems = codingProblemsScore.reduce(
                    (obj, itr) => {
                        obj[
                            results.codingProblemsResults[
                                itr.codingProblemId
                            ].title
                        ] = itr.score;
                        return obj;
                    },
                    {}
                );
                const MCQs = mcqsScore.reduce((obj, itr) => {
                    obj[results.mcqsResults[itr.MCQId].title] = itr.score;
                    return obj;
                }, {});
                const tasks = tasksScore.reduce((obj, itr) => {
                    obj[results.tasksResults[itr.TaskId].title] = itr.score;
                    return obj;
                }, {});
                return {
                    name: applicantName,
                    ...MCQs,
                    ...codingProblems,
                    ...tasks
                };
            }
        );
        const MCQs = Object.keys(results.mcqsResults).map(
            (key) => results.mcqsResults[key].title
        );
        const codingProblems = Object.keys(results.codingProblemsResults).map(
            (key) => results.codingProblemsResults[key].title
        );
        // const tasks = Object.keys(results.tasksResults).map(
        //     (key) => results.tasksResults[key].title
        // );
        // let data = [];
        // for (let i = 0; i < 8; i++) {
        //     data.push({ name: "Mohamed Mohamed", s: 40, a: 20 });
        // }
        console.log(results.overallScore[0].overallScore + 200);
        
        return (
            <div style={{ marginTop: "40px", marginBottom: "60px" }}>
                <div
                    style={{
                        display: "flex",
                        alignSelf: "center",
                        justifyContent: "flex-start",
                        flexDirection: "column"
                    }}
                >
                    <h5 style={{ marginLeft: "2rem" }} class="card-title">
                        Overall Score
                    </h5>
                    <ResponsiveContainer width="120%" height={400}>
                        <BarChart width={150} height={40} data={data}>
                            <XAxis
                                dataKey="name"
                                interval={0}
                                tick={<CustomizedAxisTick />}
                            />
                            <YAxis
                                domain={[
                                    0,
                                    Math.ceil(
                                        results.overallScore[0].overallScore /
                                            10
                                    ) *
                                        10 +
                                        20
                                ]}
                            />
                            <Tooltip
                                formatter={(value, name, props) => [
                                    value,
                                    `${name} (${
                                        MCQs.includes(name)
                                            ? "MCQ"
                                            : codingProblems.includes(name)
                                            ? "Coding Problem"
                                            : "Task"
                                    })`
                                ]}
                            />
                            <Legend
                                verticalAlign="top"
                                height={36}
                                formatter={(value, entry, index) =>
                                    `${value} (${
                                        MCQs.includes(value)
                                            ? "MCQ"
                                            : codingProblems.includes(value)
                                            ? "Coding Problem"
                                            : "Task"
                                    })`
                                }
                            />
                            {Object.keys(data[0])
                                .filter((assessment) => assessment !== "name")
                                .map((assessment, index, { length }) => (
                                    <Bar
                                        dataKey={`${assessment}`}
                                        barSize={40}
                                        stackId="a"
                                        fill={palette[index % 7]}
                                        label={
                                            index === length - 1
                                                ? renderCustomBarLabel
                                                : ""
                                        }
                                    />
                                ))}
                            {/* <Bar dataKey="S" stackId="a" fill="#8884d8" />
                            <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <div>
                            <button
                                href="#"
                                className="mt-3 btn btn-primary mb-3"
                                style={{marginLeft: '50px'}}
                                onClick={showResults}
                            >
                                Show All Results
                            </button>
                        </div>
                        {openResult && (
                            <ResultPopup
                                setOpenResult={setOpenResult}
                                results={results}
                            />
                        )}
                        {console.log(data)}
                <div>
                    <Slider {...settings}>
                        <div>
                            {/* <br /> */}
                            <h4>MCQ </h4>
                            {mcqResult.map((item, index) => (
                                <ResultCard
                                    key={index}
                                    title={item.title}
                                    avg={
                                        results.avgMCQsScore[index]
                                            .average_MCQ_score
                                    }
                                    values={item.values}
                                    fill={palette[colorIndex++]}
                                />
                            ))}
                        </div>
                        <div>
                            <h4>Coding problems</h4>
                            <div>
                                {codingResult.map((item, index) => (
                                    <ResultCard
                                        key={index}
                                        title={item.title}
                                        avg={
                                            results.avgCodingProblemsScore[
                                                index
                                            ].average_CodingProblem_score
                                        }
                                        values={item.values}
                                        fill={palette[colorIndex++]}
                                    />
                                ))}
                            </div>
                            <br />
                        </div>
                        <div>
                            <h4>Task </h4>
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
                                        fill={palette[colorIndex++]}
                                    />
                                ))}
                            </div>
                        </div>
                    </Slider>
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
