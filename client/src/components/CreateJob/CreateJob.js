import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
    stack: []
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
        alignItems: 'center'
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

export default function CreateJob() {
    const classes = useStyles();
    var [stackOptions, setStackOptions] = useState([]);
    const [addQualifications, setOnAddQualifications] = useState(false);
    const [requirements, setRequirements] = useState([]);
    return (
        <Grid container >
            <Container maxWidth="md" fixed>
                <div className='jobForm' style={{alignItems: 'center'}}>
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
                            console.log(values);
                        }}
                    >
                        <Form>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>gjbbjjnnnnn</Grid>
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

                                <Grid item xs={5}>
                                    <button
                                        type="button"
                                        style={{
                                            marginTop: "5px",
                                            display: "inline-block"
                                        }}
                                        className="btn btn-outline-info inline"
                                        onClick={() =>
                                            setOnAddQualifications(true)
                                        }
                                    >
                                        Add Requirements
                                    </button>
                                </Grid>
                                <Grid item xs={12}>
                              {requirements.length!==0 && <div>
                               <p style={{fontWeight: 'bold'}}>Requirements & weights </p>
                               <p>Enter weight for every requirement in numbers </p>
                                
                                <span style={{marginRight: '50px', marginBottom: '10px'}}>Req</span>
                                <span>Weight</span>
                               
                                
                                </div>
                                }
                                    {requirements.map((req, index) => {
                                        return (
                                            <div>
                                            
                                                <label key={req}>{req}</label>
                                                <input className= 'weight'
                                                    key={req}
                                                    value={requirements[req]}
                                                    type="text"
                                                    onChange={e => {
                                                        setStackOptions(
                                                            state => [
                                                                ...state,
                                                                {
                                                                    [req]:e.target.value
                                                                }
                                                            ]
                                                        );
                                                        //console.log(stackOptions)
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}

                                </Grid>
                                
                                <Grid item xs={5}>
                                    <ButtonWrapper>Submit Form</ButtonWrapper>
                                </Grid>
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
