import React from "react";
import { Button, Container } from "@material-ui/core";

import PageNotFoundGif from "../assets/images/404.gif";

const PageNotFound404 = (props) => {
    return (
        <Container className="da">
            <div
                style={{
                    margin: "auto",
                    width: "50%",
                    padding: "10px"
                }}
            >
                <img src={PageNotFoundGif} alt="pageNotFound" />
            </div>

            <div
                style={{
                    margin: "auto",
                    width: "50%",
                    padding: "10px"
                }}
            >
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        props.history.push("/");
                    }}
                >
                    Back
                </Button>
            </div>
        </Container>
    );
};

export default PageNotFound404;
