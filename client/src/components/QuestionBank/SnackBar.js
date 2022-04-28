import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBar({ isDoubleClick, setisDoubleClick, error }) {
    // const [open, setOpen] = React.useState(isDoubleClick);

    const handleClick = () => {
        setisDoubleClick(true);
    };

    const handleClose = (event, reason) => {
        setisDoubleClick(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isDoubleClick}
            autoHideDuration={2000}
            onClose={handleClose}
        >
            {error ? (
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    The question is already added.
                </Alert>
            ) : (
                <Alert
                    sx={{ width: "100%" }}
                    onClose={handleClose}
                    severity="success"
                >
                    Created sucessfully!
                </Alert>
            )}
        </Snackbar>
    );
}
export default SnackBar;
