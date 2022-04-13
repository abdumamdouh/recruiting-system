import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { updateApplicantAction } from "../../redux/actions/user";
const AddQuestion = ({ setOpenQuestion }) => {
    const [completeQuestion, setCompleteQuestion] = useState({});
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [topic, setTopic] = useState("");
    const difficulties = [
        {
            value: "Easy",
            label: "Easy"
        },

        {
            value: "Medium",
            label: "Medium"
        },
        {
            value: "Hard",
            label: "Hard"
        }
    ];

    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState([
    ]);

    const addInputField = () => {
        setInputFields([
            ...inputFields,
            {
                choice: ""
            }
        ]);
    };
    const removeInputFields = index => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    };
    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...inputFields];
        list[index][name] = value;
        setInputFields(list);
        console.log(inputFields)
    };

    const handleSubmit = e => {
        e.preventDefault();
        let completeQuestion = {
            question: question,
            category: category,
            difficulty: difficulty,
            answer: answer,
            topic: topic,
            choices:inputFields.map(a=>a['choice'])
        };
        setCompleteQuestion(completeQuestion);
        console.log(completeQuestion);
        setOpenQuestion(false);
    };

    return (
        <div className="edit_profile">
            {/* <button className="btn btn-danger btn_close"
                onClick={() => setOnEdit(false)}>
                    Close
                </button> */}

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
                            onChange={e => setQuestion(e.target.value)}
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
                                                    onChange={evnt =>
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
                    <label>Category</label>
                    <div className="position-relative">
                        <TextField
                            id="outlined-basic"
                            label="Category"
                            variant="outlined"
                            onChange={e => setCategory(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Topic</label>
                    <div className="position-relative">
                        <TextField
                            id="outlined-basic"
                            label="Topic"
                            variant="outlined"
                            onChange={e => setTopic(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Difficulty</label>
                    <div className="position-relative">
                        <div>
                            <TextField
                                id="outlined-select"
                                select
                                label="diff"
                                value={difficulty}
                                onChange={e => setDifficulty(e.target.value)}
                            >
                                {difficulties.map(option => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Answer</label>
                    <div className="position-relative">
                        <TextField
                            id="outlined-basic"
                            label="Answer"
                            variant="outlined"
                            onChange={e => setAnswer(e.target.value)}
                        />
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
