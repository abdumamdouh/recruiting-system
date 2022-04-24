import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Message from "../../components/modal/Message";
import { updateApplicantAction } from "../../redux/actions/user";
import { createQuestion } from "../../redux/actions/exam";
import { getTopic, getSubtopic, getQuestions } from "../../redux/actions/bank";
const AddQuestion = ({
    setOpenQuestion,
    view,
    setView,
    subtopicProp,
    setSubtopicProp,
    setSelectedQuestions,
    selectedQuestions,
    setSuccess
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [completeQuestion, setCompleteQuestion] = useState({});
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [subtopic, setSubtopic] = useState("");
    const [completeQuestionWId, setCompleteQuestionWId] = useState({});
    const difficulties = [
        {
            value: "Easy",
            label: "Easy",
            color: "#027D6F"
        },

        {
            value: "Medium",
            label: "Medium",
            color: "#FFC01E"
        },
        {
            value: "Hard",
            label: "Hard",
            color: "#FF375F"
        }
    ];

    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState([]);

    const addInputField = () => {
        setInputFields([
            ...inputFields,
            {
                choice: ""
            }
        ]);
    };
    const removeInputFields = (index) => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    };
    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...inputFields];
        list[index][name] = value;
        setInputFields(list);
        console.log(inputFields);
    };
    const chooseSubtopic = () => {
        if (view !== "") {
            dispatch(getTopic(view, setView));
        }
    };
    const chooseQuestions = () => {
        console.log("topicc", subtopicProp);

        if (subtopicProp !== "") {
            dispatch(getQuestions(subtopicProp, view, setSubtopicProp));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let completeQuestion = {
            question: question,
            topic: topic,
            difficulty: difficulty,
            answer: answer,
            subtopic: subtopic,
            choices: inputFields.map((a) => a["choice"])
        };
        setCompleteQuestion(completeQuestion);
        console.log(completeQuestion);
        console.log("top", subtopicProp);
        if (
            completeQuestion.question === "" ||
            completeQuestion.choices === [] ||
            completeQuestion.answer === ""
        ) {
            setModalOpen(true);
        } else {
            // setSelectedQuestions([...selectedQuestions, completeQuestion])
            console.log("selected", selectedQuestions);
            dispatch(
                createQuestion(
                    completeQuestion,
                    chooseSubtopic,
                    chooseQuestions,
                    selectedQuestions,
                    setSelectedQuestions
                )
            );
            setOpenQuestion(false);
            setSuccess(true);
        }
    };

    return (
        <div className="edit_profile" style={{ zIndex: 200 }}>
            {/* <button className="btn btn-danger btn_close"
                onClick={() => setOnEdit(false)}>
                    Close
                </button> */}
            {modalOpen && (
                <Message
                    setOpenModal={setModalOpen}
                    message="Make sure to fill all fields first"
                />
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Question</label>
                    <div className="position-relative">
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Question"
                            multiline
                            maxRows={4}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Choices</label>
                    <div className="position-relative">
                        <div className="col-sm-8">
                            {inputFields.map((data, index) => {
                                const { choice } = data;
                                return (
                                    <div className="row my-3" key={index}>
                                        <div className="col">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    onChange={(evnt) =>
                                                        handleChange(
                                                            index,
                                                            evnt
                                                        )
                                                    }
                                                    value={choice}
                                                    name="choice"
                                                    className="form-control"
                                                    placeholder="choice"
                                                />
                                            </div>
                                        </div>

                                        <div className="col">
                                            {inputFields.length !== 1 ? (
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={removeInputFields}
                                                >
                                                    Remove
                                                </button>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="row">
                                <div className="col-sm-12">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={addInputField}
                                    >
                                        Add Choice
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>
                        Topic{" "}
                        <span style={{ color: "#827F7E" }}>(Optional)</span>
                    </label>
                    <div className="position-relative">
                        <TextField
                            id="outlined-basic"
                            label="Topic"
                            variant="outlined"
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>
                        Subtopic{" "}
                        <span style={{ color: "#827F7E" }}>(Optional)</span>
                    </label>
                    <div className="position-relative">
                        <TextField
                            id="outlined-basic"
                            label="Subtopic"
                            variant="outlined"
                            onChange={(e) => setSubtopic(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: "0.6rem" }}>Difficulty</label>
                    <div className="position-relative">
                        <div>
                            <TextField
                                id="outlined-select"
                                select
                                InputProps={{
                                    style: {
                                        color:
                                            difficulty === "Easy"
                                                ? "#027D6F"
                                                : difficulty === "Medium"
                                                ? "#FFC01E"
                                                : "#FF375F"
                                    }
                                }}
                                label="Difficulty"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                {difficulties.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                        sx={{ color: option.color }}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: "0.6rem" }}>Answer</label>
                    <div className="position-relative">
                        <div>
                            <TextField
                                id="outlined-select"
                                select
                                style={{ minWidth: 120 }}
                                label="Answer"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            >
                                {inputFields.map((option) => (
                                    <MenuItem
                                        key={option.choice}
                                        value={option.choice}
                                    >
                                        {option.choice}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                </div>

                <button
                    className="btn btn-info w-100"
                    type="submit"
                    onChange={handleSubmit}
                >
                    Save
                </button>
                <button
                    style={{ marginTop: "10px" }}
                    className="btn btn-info w-100 btn-danger"
                    type="submit"
                    onClick={() => setOpenQuestion(false)}
                >
                    Close
                </button>
            </form>
        </div>
    );
};

export default AddQuestion;
