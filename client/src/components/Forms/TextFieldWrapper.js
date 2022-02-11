import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";
const TextFieldWrapper = ({ name, ...otherprops }) => {
    const [field,mata] = useField(name)
    const configTextField = {
        ...field,
        ...otherprops,
        fullWidth: true,
        variant: "outlined"
    };
    if (mata && mata.touched && mata.error) {
        configTextField.error = true;
        configTextField.helperText = mata.error;
      }
    return <TextField {...configTextField} />;
};

export default TextFieldWrapper;
