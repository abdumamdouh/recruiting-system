import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

import classes from "./Header.module.scss";
import { logoutUserAction } from "../../../redux/actions/user";
function Header() {
    const [menuOpen, setMenuOpen] = useState(true);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined
    });
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 760 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const handleMenu = () => {
        setMenuOpen((p) => !p);
    };

    // const handleLogOut = async () => {
    //     // console.log("Log Out");

    //     try {
    //         const rawResponse = await fetch(`http://localhost:5000/logout`, {
    //             method: "POST",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + user.userInfo.token
    //             }
    //         });
    //         const data = await rawResponse.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error.message);
    //     }

    //     dispatch(logoutUserAction());
    //     // console.log(user);
    // };
    const handleLogOut=()=>{
        dispatch(logoutUserAction());
    }
    return (
        <header className={classes.header}>
            <div className={classes.header__content}>
                <h2 className={classes.header__content__logo}>Job Coach</h2>

                <nav
                    className={`${classes.header__content__nav} ${
                        menuOpen ? classes.isMenu : ""
                    }`}
                >
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/feed">Feed</Link>
                        </li>

                        {user.hasOwnProperty("userInfo") &&
                            user.userInfo.hasOwnProperty("type") && (
                                <li>
                                    <Link to="/account">Account</Link>
                                </li>
                            )}

                        {user.hasOwnProperty("userInfo") &&
                            user.userInfo.hasOwnProperty("type") &&
                            user.userInfo.type === "Applicant" && (
                                <li>
                                    <Link to="/updates">
                                        Assessments{" "}
                                        {user && (
                                            <>
                                                {/* <span
                                                    style={{
                                                        border: "1px red solid",
                                                        backgroundColor: "red",
                                                        color: "white",
                                                        borderRadius: "70px",
                                                        padding: "1px"
                                                    }}
                                                >
                                                    2
                                                </span> */}
                                                {user.userInfo.hasOwnProperty(
                                                    "hasAssessments"
                                                ) && (
                                                    <NotificationsIcon color="error" />
                                                )}
                                            </>
                                        )}
                                    </Link>
                                </li>
                            )}

                        {((user.hasOwnProperty("userInfo") &&
                            !user.userInfo.hasOwnProperty("type")) ||
                            !user.hasOwnProperty("userInfo")) && (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}

                        {user.hasOwnProperty("userInfo") &&
                            user.userInfo.hasOwnProperty("type") && (
                                <li onClick={handleLogOut}>
                                    <Link to="/">
                                        <span >
                                            Logout
                                        </span>
                                    </Link>
                                </li>
                            )}
                    </ul>
                </nav>
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={handleMenu} />
                    ) : (
                        <AiOutlineClose onClick={handleMenu} />
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
