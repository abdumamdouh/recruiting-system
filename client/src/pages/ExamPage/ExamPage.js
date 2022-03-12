import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./ExamPage.scss";
const ExamPage = () => {
    const { id } = useParams();
    const { MCQs } = useSelector(state => state.exam);
    const { Count } = useSelector(state => state.exam);

    const MCQ = MCQs.filter(m => m.id == id);
    console.log(id);
    console.log(MCQ);
    //     const initData =[...MCQ]
    //     const data= initData.map(q=>q.questions)
    //     console.log('dd',data)
    //     const columns=[{
    //         title:'Question', field:'question'
    //     },
    // {
    //     title:'Answer', field:'answer'
    // }]
    return (
        <div>
            {MCQ.map((m, index) => (
                <div className="table-responsive table-container">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">question</th>
                                <th scope="col">choices</th>
                                <th scope="col">answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {m.questions.map((q, index) => (
                                <tr>
                                    <td>
                                        {`${index + 1}.`}
                                        {q.question}
                                    </td>
                                    <td>
                                        {q.choices.map(c => (
                                            <span>{`{${c}},`}</span>
                                        ))}
                                    </td>
                                    <td>{q.answer}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default ExamPage;

