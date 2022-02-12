import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
const SelectWrapper = ({
    name,options,
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name)
    const handleChange = e => {
    setFieldValue(name, e.target.value)
    }
    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        variant: 'outlined',
        fullWidth: true,
        onChange: handleChange
      };
      if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
      }
    
    return (
        <TextField {...configSelect}>
              {options.map((option) => {
        return (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        )
      })}
        </TextField>
    );
}

export default SelectWrapper;
