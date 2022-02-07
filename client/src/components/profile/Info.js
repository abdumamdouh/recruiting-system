import React, { useState, useEffect } from "react";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import Followers from "./Followers";
import Following from "./Following";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Info = (/*{ id, auth, profile, dispatch }*/) => {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);

    // const [showFollowers, setShowFollowers] = useState(false);
    // const [showFollowing, setShowFollowing] = useState(false);

    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user]);
        } else {
            const newData = profile.users.filter((user) => user._id === id);
            setUserData(newData);
        }
    }, [id, auth, dispatch, profile.users]);

    useEffect(() => {
        if (onEdit) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true });
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false });
        }
    }, [onEdit, dispatch]);

    return (
        <div className="info">
            {
                // userData.map(user => (
                <div className="info_container">
                    <Avatar /*src={user.avatar}*/ size="supper-avatar" />

                    <div className="info_content">
                        <div className="info_content_title">
                            <h2>username</h2>
                            <button
                                className="btn btn-outline-info"
                                onClick={() => setOnEdit(true)}
                            >
                                Edit Profile
                            </button>
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

                        <h6>
                            Abdulrahman Mamdouh{" "}
                            <span className="text-danger">mobile</span>
                        </h6>
                        <p className="m-0">address</p>
                        <h6 className="m-0">email</h6>
                        <a href="#" target="_blank" rel="noreferrer">
                            website
                        </a>
                        <p>story</p>
                    </div>

                    {onEdit && <EditProfile setOnEdit={setOnEdit} />}

                    {/* {showFollowers && (
                        <Followers
                            users={user.followers}
                            setShowFollowers={setShowFollowers}
                        />
                    )}
                    {showFollowing && (
                        <Following
                            users={user.following}
                            setShowFollowing={setShowFollowing}
                        />
                    )}
                     */}
                </div>
                // ))
            }
        </div>
    );
};

export default Info;
