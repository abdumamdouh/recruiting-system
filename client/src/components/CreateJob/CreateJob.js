import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@mui/material/Rating";
import { useField, useFormikContext } from "formik";
import Select from "react-select";
import "./CreateJob.scss";
import TextFieldWrapper from "../Forms/TextFieldWrapper";
import SelectWrapper from "../Forms/SelectWrapper";
import ButtonWrapper from "../Forms/ButtonWrapper";
import AddRequirements from "./AddRequirements";
const initalFormState = {
    title: "",
    description: "",
    wpType: "",
    empType: "",
    careerLevel: "",
    minYearsOfExperience: "",
    maxYearsOfExperience: "",
    stack: [],
    toggle: false,
    checked: [],
    simpleControlled: 0
};
const formValidation = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required")
    // wpType: Yup.string().required("Required"),
    // empType: Yup.string().required("Required"),
});
const useStyles = makeStyles(theme => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
        height: "70%"
    }
}));
const options = [
    { value: "1", label: "HTML5/CSS3" },
    { value: "2", label: "NodeJs" },
    { value: "3", label: "MongoDB" },
    { value: "4", label: "MySQL" }
    // "PostgreSQL",
    // "Python",
    // "PHP",
    // "DotNet",
    // "Java",
    // "C/C++",
    // "Ruby-on-Rails",
    // "Unity",
    // "R",
    // "JavaScript",
    // "AngularJs",
    // "Angular",
    // "TypeScript",
    // "ReactJs",
    // "VueJs",
    // "React-Native",
    // "Kotlin",
    // "Flutter",
    // "Xamarin",
    // "Ionic",
    // "PhoneGap",
    // "iOS",
    // "Objective",
    // "C",
    // "Swift",
    // "Android",
    // "Docker",
    // "Electron",
    // "Rust",
    // "Scala",
    // "Go"
];
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

export default function CreateJob() {
    const [value, setValue] = React.useState(0);
    var { stack } = initalFormState;
    const classes = useStyles();
    const [qualification, setQualification] = useState(false);
    var [stackOptions, setStackOptions] = useState(stack);
    const [addQualifications, setOnAddQualifications] = useState(false);
    const handleChange = e => {
        console.log([...e]);

        //  console.log(stackOptions)
    };
    return (
        <Grid container>
            <Container maxWidth="md">
                <div className={classes.formWrapper}>
                    <Formik
                        initialValues={{ ...initalFormState }}
                        validationSchema={formValidation}
                        onSubmit={values => {
                            console.log(values);
                        }}
                    >
                        <Form>
                            <Grid container spacing={1}>
                                {/* <Grid item xs={4}>
                            <Typography>Your job post</Typography>
                        </Grid> */}
                                <Grid item xs={6}>
                                    <Typography>Job Title</Typography>
                                </Grid>
                                <Grid item xs={6}>
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
                                    <Typography>WorkPlace Type</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectWrapper
                                        name="wpType"
                                        label="Workplace Type"
                                        options={workPlaceTypes}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>Employment Type</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectWrapper
                                        name="empType"
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
                                <Grid item xs={4}>
                                    <SelectWrapper
                                        name="minYearsOfExperience"
                                        label="Min Years Of Experience"
                                        options={years}
                                    />
                                </Grid>

                                <Grid item xs={1}>
                                    {" "}
                                    <p
                                        style={{
                                            fontSize: "25px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {" "}
                                        to
                                    </p>{" "}
                                </Grid>
                                <Grid item xs={4}>
                                    <SelectWrapper
                                        name="maxYearsOfExperience"
                                        label="Max Years Of Experience"
                                        options={years}
                                    />
                                </Grid>
                                {/* <Grid items xs={4}>
                                    <div id="checkbox-group">Checked</div>
                                    <div
                                        role="group"
                                        aria-labelledby="checkbox-group"
                                    >
                                        {options.map(o => (
                                            <div>
                                                <label>
                                                    <Field
                                                        type="checkbox"
                                                        name="checked"
                                                        value={o.label}
                                                    />
                                                    {o.label}
                                                </label>
                                                <Rating
                                                    name={o.label}
                                                    value={value}
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        setValue(newValue);
                                                    }}
                                                />
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                </Grid> */}
                                {/* <Grid item xs={4}>
                            <Select isMulti
                               // name= 'stacks'
                                options={options}
                                displayValue="label"
                               onChange= {handleChange}
                            />
                        </Grid> */}

                                <Grid item xs={5}>
                                    <ButtonWrapper>Submit Form</ButtonWrapper>
                                </Grid>
                                <Grid item xs={5}>
                        <button
                        style={{ marginTop: "-5px", display: "inline-block" }}
                        className="btn btn-outline-info inline"
                        onClick={() => setOnAddQualifications(true)}
                    >
                        Add Qualifications
                    </button>
                        </Grid> 
                            </Grid>
                        </Form>
                    </Formik>
                </div>
                {addQualifications && (
                    <AddRequirements
                     setOnAddQualifications={setOnAddQualifications} options={options}/>
                )}
            </Container>
        </Grid>
    );
}
