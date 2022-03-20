import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBar({ isDoubleClick, setisDoubleClick }) {
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
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
            >
                Already Added
            </Alert>
        </Snackbar>
    );
}
export default SnackBar;
