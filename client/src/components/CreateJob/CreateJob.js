import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Container, Grid, Typography } from "@material-ui/core";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import "./CreateJob.scss";
import { createJobAction } from "../../redux/actions/jobs";
import TextFieldWrapper from "../Forms/TextFieldWrapper";
import SelectWrapper from "../Forms/SelectWrapper";
import ButtonWrapper from "../Forms/ButtonWrapper";
import AddRequirements from "./AddRequirements";
const initalFormState = {
    title: "",
    description: "",
    workPlaceType: "",
    employmentType: "",
    careerLevel: "",
    yearsOfExperience: "",
    //maxYearsOfExperience: "",
    stack: [],
    place: "",
    company: ""
};
const formValidation = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required")
    // workPlaceType: Yup.string().required("Required"),
    // employmentType: Yup.string().required("Required"),
});
const useStyles = makeStyles(theme => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
        alignItems: "center"
    }
}));
const workPlaceTypes = [
    {
        value: "OnSite",
        label: "On-Site"
    },
    {
        value: "Hybrid",
        label: "Hybrid"
    },
    {
        value: "Remote",
        label: "Remote"
    }
];
const employmentTypes = [
    {
        value: "fullTime",
        label: "Full-time"
    },
    {
        value: "partTime",
        label: "Part-time"
    },
    {
        value: "contract",
        label: "Contract"
    },
    {
        value: "internShip",
        label: "InternShip"
    }
];
const careerLevels = [
    { value: "Senior", label: "Senior" },
    { value: "junior", label: "Junior" },
    { value: "Intern", label: "Intern" },
    { value: "Mid-Level", label: "Mid-Level" },
    { value: "Staff-Engineer", label: "Staff-Engineer" }
];
const years = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" }
];

export default function CreateJob(props) {
    const redirect = () => {
        const fromObj = props.location.state || {
            from: { pathname: "/Feed" }
        };

        const path = fromObj.from.pathname;
        props.history.push(path);
    };
    const dispatch = useDispatch();
    const classes = useStyles();
    var [stackOptions, setStackOptions] = useState([]);
    const [addQualifications, setOnAddQualifications] = useState(false);
    const [requirements, setRequirements] = useState([]);
    return (
        <Grid container>
            <Container maxWidth="md" fluid={true}>
                <div className="jobForm" style={{ alignItems: "center" }}>
                    <Formik
                        initialValues={{ ...initalFormState }}
                        validationSchema={formValidation}
                        onSubmit={values => {
                            const middleIndex = Math.ceil(
                                stackOptions.length / 2
                            );
                            const secondHalf = stackOptions
                                .slice()
                                .splice(-middleIndex);
                            console.log("sn", secondHalf);
                            values.stack = [...secondHalf];
                            dispatch(createJobAction(values, redirect));
                            console.log(values);
                        }}
                    >
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {/* <p style={{'color': '#ffff'}}> gjbbjjnnnnn</p> */}
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <p style={{'color': '#ffff'}}> gjbbjjnnnnn</p> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>Job Title</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldWrapper
                                        name="title"
                                        label="title"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography>Job Description</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldWrapper
                                        name="description"
                                        id="outlined-multiline-static"
                                        label="description"
                                        multiline
                                        rows={4}
                                        defaultValue="Default Value"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>Place</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldWrapper
                                        name="place"
                                        label="place"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>WorkPlace Type</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectWrapper
                                        name="workPlaceType"
                                        label="Workplace Type"
                                        options={workPlaceTypes}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>Employment Type</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectWrapper
                                        name="employmentType"
                                        label="Employment Type"
                                        options={employmentTypes}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>Career Level</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectWrapper
                                        name="careerLevel"
                                        label="Career Level"
                                        options={careerLevels}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>Years Of Experience</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectWrapper
                                        name="yearsOfExperience"
                                        label=" Years Of Experience"
                                        options={years}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <button
                                        type="button"
                                        style={{
                                            marginTop: "5px",
                                            display: "inline-block",
                                            "color": "#023e7d",
                                            'border': '1px solid'
                                        }}
                                        className="btn btn-outline inline"
                                        onClick={() =>
                                            setOnAddQualifications(true)
                                        }
                                    >
                                        Add Requirements
                                    </button>
                                </Grid>
                                <Grid item xs={12}>
                                    {requirements.length !== 0 && (
                                        <div>
                                            <p style={{ fontWeight: "bold",  'color':'#001845' }}>
                                                Requirements & Desired level for every requirement{" "}
                                            </p>
                                        </div>
                                    )}
                                    {requirements.map((req, index) => {
                                        return (
                                            <div className="form-outline">
                                                <label
                                                    className="form-label"
                                                    for="typeText"
                                                    key={req}
                                                >
                                                    {req}
                                                </label>
                                                {/* <input
                                                    id="typeText"
                                                    className="form-control"
                                                    //className="weight"
                                                    key={req}
                                                    value={requirements[req]}
                                                    type="text"
                                                    onChange={e => {
                                                        setStackOptions(
                                                            state => [
                                                                ...state,
                                                                {
                                                                    [req]:
                                                                        e.target
                                                                            .value
                                                                }
                                                            ]
                                                        );
                                                        //console.log(stackOptions)
                                                    }}
                                                /> */}
                                                <br />
                                                <FormControl style={{minWidth: 240}}>
                                                <InputLabel id="test-select-label">Requirement Level</InputLabel>
                                                    <Select
                                                        // labelId="demo-simple-select-label"
                                                        // id="demo-simple-select"
                                                        key={req}
                                                        value={requirements[req]}
                                                        label="aaaaaaa"
                                                        onChange={e => {
                                                            setStackOptions(state => [
                                                                ...state,
                                                                {
                                                                    [req]:
                                                                        e.target
                                                                            .value
                                                                }
                                                            ]);
                                                           // console.log(skills);
                                                        }}
                                                    >
                                                        <MenuItem value={1}>
                                                            Beginner
                                                        </MenuItem>
                                                        <MenuItem value={2}>
                                                            Experienced
                                                        </MenuItem>
                                                        <MenuItem value={3}>
                                                            Advanced
                                                        </MenuItem>
                                                        <MenuItem value={4}>
                                                            Expert
                                                        </MenuItem>
                                                    </Select>
                                                    </FormControl>
                                               
                                            </div>
                                        );
                                    })}
                                </Grid>

                                <Grid item xs={5}>
                                    <ButtonWrapper style={{'marginTop':'20px' }}>Submit Form</ButtonWrapper>
                                </Grid>
                                <Grid item xs={12}></Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </div>
                {addQualifications && (
                    <AddRequirements
                        setOnAddQualifications={setOnAddQualifications}
                        setRequirements={setRequirements}
                        setStackOptions={setStackOptions}
                    />
                )}
            </Container>
        </Grid>
    );
}
