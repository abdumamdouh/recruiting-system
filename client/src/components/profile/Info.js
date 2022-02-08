import React, { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import EditQualifications from "./EditQualifications";
import { useDispatch, useSelector } from "react-redux";
import classes from "./profile.scss";

const Info = () => {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);
    const [onEditQF, setOnEditQF] = useState(false);

    const user = useSelector(state => state.user);
    const { record } = user.userInfo;
    // useEffect(() => {

    //         setUserData(user)

    // }, [user])
    return (
        <>
            <div className="card" style={{ width: "50rem", height: "90%" }}>
                <div className="card-header">Turing</div>
                <div className="list-group list-group-flush">
                    <li className="list-group-item">
                        {" "}
                        <h4 className="card-title">
                            {record.firstName} {record.lastName}
                        </h4>
                        <h6 className="card-subtitle mb-2 text-muted">
                            {record.userName}
                        </h6>
                        <p className="card-text">
                            {" "}
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-envelope"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                </svg>{" "}
                                {record.email}
                            </div>
                        </p>
                    </li>
                </div>

                {record.position !== undefined && (
                    <li className="list-group-item">
                        <h4 className="card-title">Position</h4>
                        <p className="card-text"> {record.position}</p>
                    </li>
                )}

                {record.major !== undefined && (
                    <li className="list-group-item">
                        <h4 className="card-title">Major</h4>
                        <p className="card-text"> {record.major}</p>
                    </li>
                )}

                <div className="list-group list-group-flush">
                    {record.level !== undefined && (
                        <li className="list-group-item">
                            <h4 className="card-title">Level</h4>
                            <p className="card-text"> {record.level}</p>
                        </li>
                    )}
                </div>

                <div className="list-group list-group-flush">
                    {record.yearsOfExperience !== undefined && (
                        <li className="list-group-item">
                            <h4 className="card-title">Years of Experience</h4>
                            <p className="card-text">
                                {" "}
                                {record.yearsOfExperience}
                            </p>
                        </li>
                    )}
                </div>

                {record.qualifications !== undefined && (
                    <li className="list-group-item">
                        <h4 className="card-title">Qualifications</h4>
                        {record.qualifications.programmingLanguages.map(q => (
                            <p className="card-text"> {q}</p>
                        ))}
                    </li>
                )}

                {record.company !== undefined && (
                    <li className="list-group-item">
                        {" "}
                        <h4 className="card-title">Company</h4>
                        <p className="card-text"> {record.company}</p>
                    </li>
                )}

                {
                    <button
                        style={{ marginBottom: "20px", marginTop: "20px" }}
                        className="btn btn-outline-info inline"
                        onClick={() => setOnEdit(true)}
                    >
                        Edit Profile
                    </button>
                }
                {onEdit && <EditProfile setOnEdit={setOnEdit} />}
                {record.position == undefined && (
                    <button
                        style={{ marginTop: "-5px", display: "inline-block" }}
                        className="btn btn-outline-info inline"
                        onClick={() => setOnEditQF(true)}
                    >
                        Edit Qualifications
                    </button>
                )}
                {onEditQF && (
                    <EditQualifications setOnEditQualifications={setOnEditQF} />
                )}
            </div>
        </>
    );
};

export default Info;
