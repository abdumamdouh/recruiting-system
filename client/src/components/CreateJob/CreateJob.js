import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container, Grid, Typography } from "@material-ui/core";
import "./CreateJob.scss";
import TextFieldWrapper from "../Forms/TextFieldWrapper";
import SelectWrapper from '../Forms/SelectWrapper'
import ButtonWrapper from "../Forms/ButtonWrapper";
const initalFormState = { title: "", description: "",wpType:'', empType:'' };
const formValidation = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
   // wpType: Yup.string().required("Required"),
    //empType: Yup.string().required("Required"),
});
const workPlaceTypes = [{
    value: 'OnSite',
    label: 'On-Site',
  },
  {
    value: 'Hybrid',
    label: 'Hybrid',
  },
  {
    value: 'Remote',
    label: 'Remote',
  },]
const employmentTypes = [{
    value: 'fullTime',
    label: 'Full-time',
  },
  {
    value: 'partTime',
    label: 'Part-time',
  },
  {
    value: 'contract',
    label: 'Contract',
  },
  {
    value: 'internShip',
    label: 'InternShip',
  },]
export default function CreateJob() {
    return (
        <div className="jobForm">
            <Formik
                initialValues={{ ...initalFormState }}
                validationSchema={formValidation}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Your job post</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Job Title</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextFieldWrapper name="title" label="title"/>
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
                                rows={7}
                                defaultValue="Default Value"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>WorkPlace Type</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectWrapper name='wpType' label = 'Workplace Type' options= {workPlaceTypes}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Employment Type</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectWrapper name='empType' label = 'Employment Type' options= {employmentTypes}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonWrapper>
                                Submit Form
                            </ButtonWrapper>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </div>
    );
}
