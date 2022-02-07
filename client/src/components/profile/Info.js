import React, { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import { useDispatch, useSelector } from "react-redux";

const Info = () => {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);

    // const [showFollowers, setShowFollowers] = useState(false);
    // const [showFollowing, setShowFollowing] = useState(false);

    const user = useSelector((state) => state.user);
    const { record } = user.userInfo;

    return (
        <div className="info">
            {
                <div className="info_container">
                    <div className="info_content">
                        <div className="info_content_title">
                            <h2>{record.firstName}</h2>
                            {
                                <button
                                    className="btn btn-outline-info"
                                    onClick={() => setOnEdit(true)}
                                >
                                    Edit Profile
                                </button>
                            }
                        </div>

                        <div className="follow_btn">
                            <span
                                className="mr-4"
                                onClick={() => setShowFollowers(true)}
                            >
                                Followers
                            </span>
                            <span
                                className="ml-4"
                                onClick={() => setShowFollowing(true)}
                            >
                                Following
                            </span>
                        </div>

                        <h6>
                            {record.firstName}
                            {record.lastName}
                            <span className="text-danger">012</span>
                        </h6>
                        <p className="m-0">{record.position}</p>
                        <h6 className="m-0">{record.email}</h6>
                        <a href={"sssss"} target="_blank" rel="noreferrer">
                            website
                        </a>
                        <p>story</p>
                    </div>

                    {/* <div className="follow_btn">
                            <span
                                className="mr-4"
                                onClick={() => setShowFollowers(true)}
                            >
                                {user.followers.length} Followers
                            </span>
                            <span
                                className="ml-4"
                                onClick={() => setShowFollowing(true)}
                            >
                                {user.following.length} Following
                            </span>
                        </div> */}
                </div>
            }
        </div>
    );
};

export default Info;
