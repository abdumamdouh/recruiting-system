import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    ComposedChart,
    ReferenceLine,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Text,
    Label
} from "recharts";
import GaugeChart from "react-gauge-chart";
import ResultPopup from "./ResultPopup";
function ResultCard({ title, avg, values, fill }) {
    const history = useHistory();
    console.log(fill);
    const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
        return (
            <text
                x={x + width / 2}
                y={y}
                fill="#666"
                textAnchor="middle"
                dy={-6}
            >{`${Number(Number(value).toFixed(2))}`}</text>
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
                fill="#666"
            >
                {payload.value}
            </Text>
        );
    };
    const data = values.map(({ applicantName, score }) => ({
        name: applicantName,
        score
    }));
    return (
        <div className="container">
            <div
                class="card"
                style={{
                    minWidth: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "10px"
                }}
            >
                <div class="card-header">{title}</div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "space-around"
                    }}
                    className="row"
                >
                    {" "}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "space-around"
                        }}
                        className=" card-body"
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignSelf: "center",
                                justifyContent: "center"
                            }}
                            className="column"
                        >
                            <h5 class="card-title">
                                Average Score of the Assessment
                            </h5>
                            <GaugeChart
                                id="gauge-chart"
                                textColor="#333"
                                nrOfLevels={3}
                                arcsLength={[0.5, 0.3, 0.2]}
                                colors={["#EA4228", "#F5CD19", "#5BE12C"]}
                                needleColor="#999"
                                percent={Number(avg) / 100}
                                arcPadding={0.02}
                                hideText
                            />
                            <span
                                style={{
                                    fill: "rgb(51, 51, 51)",
                                    fontSize: "24.5455px",
                                    alignSelf: "center"
                                }}
                            >{`${Number(Number(avg).toFixed(2))}/100`}</span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignSelf: "center",
                                flexDirection: "column"
                            }}
                            className="column"
                        >
                            <h5
                                style={{ marginLeft: "2rem" }}
                                class="card-title"
                            >
                                Applicants' Score
                            </h5>
                            <ResponsiveContainer width={459} height={300}>
                                <ComposedChart
                                    width={150}
                                    height={40}
                                    data={data}
                                >
                                    <XAxis
                                        dataKey="name"
                                        interval={0}
                                        tick={<CustomizedAxisTick />}
                                    />
                                    <YAxis
                                        domain={[
                                            0,
                                            (dataMax) =>
                                                Math.ceil(dataMax / 10) * 10 +
                                                20
                                        ]}
                                    />
                                    <Bar
                                        dataKey="score"
                                        barSize={40}
                                        fill={fill}
                                        isAnimationActive={false}
                                        label={renderCustomBarLabel}
                                    />
                                    <ReferenceLine
                                        y={avg}
                                        stroke={
                                            Number(avg) / 100 < 0.5
                                                ? "#EA4228"
                                                : Number(avg) / 100 < 0.8
                                                ? "#F5CD19"
                                                : "#5BE12C"
                                        }
                                        strokeDasharray="3 3"
                                    >
                                        <Label
                                            value="Avg"
                                            position="insideBottomRight"
                                            fill="#666"
                                            dy={-3}
                                        />
                                    </ReferenceLine>
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                        {/* <p class="card-text">View applicants' results</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultCard;
