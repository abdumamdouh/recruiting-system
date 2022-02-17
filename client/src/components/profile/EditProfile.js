import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateApplicantAction } from "../../redux/actions/user";
const EditProfile = ({ setOnEdit }) => {
    const initState = {
        firstName: "",
        lastName: "",
        userName: ""
    };
    const [userData, setUserData] = useState(initState);
    const { firstName, lastName, userName } = userData;

    // const [avatar, setAvatar] = useState('')

    let { user } = useSelector(state => state);
    let { userInfo } = user;
    const dispatch = useDispatch();

    // useEffect(() => {
    //     setUserData(user)
    // }, [user])

    const changeAvatar = e => {
        //     const file = e.target.files[0]
        //     const err = checkImage(file)
        //     if(err) return dispatch({
        //         type: GLOBALTYPES.ALERT, payload: {error: err}
        //     })
        //     setAvatar(file)
    };

    const handleInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        user = {
            ...userInfo,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userName: userData.userName
        };
        console.log(user);
        dispatch(updateApplicantAction(user));
        setOnEdit(false);
    };

    return (
        <div className="edit_profile">
            {/* <button className="btn btn-danger btn_close"
            onClick={() => setOnEdit(false)}>
                Close
            </button> */}

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input
                            type="file"
                            name="file"
                            id="file_up"
                            accept="image/*"
                            onChange={changeAvatar}
                        />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={handleInput}
                        />
                        <small
                            className="text-danger position-absolute"
                            style={{
                                top: "50%",
                                right: "5px",
                                transform: "translateY(-50%)"
                            }}
                        >
                            {firstName.length}/25
                        </small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={handleInput}
                        />
                        <small
                            className="text-danger position-absolute"
                            style={{
                                top: "50%",
                                right: "5px",
                                transform: "translateY(-50%)"
                            }}
                        >
                            {lastName.length}/25
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="userName">UserName</label>
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            name="userName"
                            value={userName}
                            onChange={handleInput}
                        />
                        <small
                            className="text-danger position-absolute"
                            style={{
                                top: "50%",
                                right: "5px",
                                transform: "translateY(-50%)"
                            }}
                        >
                            {userName.length}/25
                        </small>
                    </div>
                </div>

                {/* <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender}
                    className="custom-select text-capitalize"
                    onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
    </div>*/}

                <button className="btn btn-info w-100" type="submit">
                    Save
                </button>
                <button
                    style={{ marginTop: "10px" }}
                    className="btn btn-info w-100 btn-danger"
                    type="submit"
                    onClick={() => setOnEdit(false)}
                >
                    Close
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
