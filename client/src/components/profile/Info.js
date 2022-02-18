import React, { useState,useEffect } from "react";
import EditProfile from "./EditProfile";
import EditQualifications from "./EditQualifications";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getApplicantProfileAction,getRecruiterProfileAction } from "../../redux/actions/user";
import './info.scss'

const Info = props => {

    const dispatch = useDispatch();


    useEffect(() => {
        if(userInfo.type==="Applicant")
        dispatch(getApplicantProfileAction())
        else dispatch(getRecruiterProfileAction())

      }, []);




    const [onEdit, setOnEdit] = useState(false);
    const [onEditQF, setOnEditQF] = useState(false);
    const {userInfo} = useSelector(state => state.user);
    const history = useHistory();
    const changeRoute = () => {
        history.push(`/createjob`);
    };



    return (
        <>
            <div className="card" style={{ width: "50rem", height: "80%" }}>
                <div className="card-header">Turing</div>
                <div className="list-group list-group-flush">
                    <li className="list-group-item">
                        {" "}
                        <h4 className="card-title" style={{'color': '#001233'}}>
                            {userInfo.firstName} {userInfo.lastName}
                        </h4>
                        <h6 className="card-subtitle mb-2 text-muted">
                            {userInfo.userName}
                        </h6>
                        <p className="text-muted">
                            {" "}
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-envelope"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                </svg>{" "}
                               <span className="card-subtitle mb-2 text-muted"> {userInfo.email} </span>
                            </div>
                        </p>
                    </li>
                </div>

                {userInfo.position !== undefined && (
                    <li className="list-group-item">
                        <h4 className="card-title" style={{'color': '#001233'}}>Position</h4>
                        <p className="card-text" style={{'color': '#33415c'}}> {userInfo.position}</p>
                    </li>
                )}

                {userInfo.major !== undefined && (
                    <li className="list-group-item">
                        <h4 className="card-title" style={{'color': '#001233'}}>Major</h4>
                        <p className="card-text" style={{'color': '#33415c'}}> {userInfo.major}</p>
                    </li>
                )}

                {userInfo.level !== undefined && (
                    <li className="list-group-item">
                        <h4 className="card-title" style={{'color': '#001233'}}>Level</h4>
                        <p className="card-text" style={{'color': '#33415c'}}> {userInfo.level}</p>
                    </li>
                )}

                {userInfo.yearsOfExperience !== undefined && (
                    <li className="list-group-item">
                        <h4 className="card-title" style={{'color': '#001233'}}>Years of Experience</h4>
                        <p className="card-text" style={{'color': '#33415c'}}> {userInfo.yearsOfExperience}</p>
                    </li>
                )}

                {userInfo.type === 'Applicant' && 
                (
                    <li
                        className="list-group-item"
                        style={{ "borderBottom": "0px" }}
                    >
                        <h4 className="card-title" style={{'color': '#001233'}}>Qualifications</h4>
                        <div className= "row">
                           <div class="column">  <h6 className="md" > Skill</h6> </div> 
                           <div class="column"> <h6 className="md">Level</h6> 
                            </div>
                            </div>
                            {/* {userInfo.qualifications!==undefined &&userInfo.qualifications.map(q => (
                           <div className= "row">
                           <div class="column">  <span className="card-text" style={{'color': '#33415c'}}> {Object.keys(q)}</span> </div> 
                           <div class="column"> 
                            {Object.values(q)==1 && <span className="card-text" style={{'color': '#33415c'}}> Beginner</span>}
                            {Object.values(q)==2 && <span className="card-text" style={{'color': '#33415c'}}> Experienced</span>}
                            {Object.values(q)==3 && <span className="card-text" style={{'color': '#33415c'}}> Advanced</span>}
                            {Object.values(q)==4 && <span className="card-text" style={{'color': '#33415c'}}> Expert</span>}
                            </div>
                            </div>
                        ))} */}
                        <br></br>
                    </li>
                )}

                {userInfo.company !== undefined && (
                    <li className="list-group-item" style={{'borderBottom': '0px'}}>
                        {" "}
                        <h4 className="card-title" style={{'color': '#001233'}}>Company</h4>
                        <p className="card-text" style={{'color': '#33415c'}}> {userInfo.company}</p>
                    </li>
                )}

                {
                    <li
                        className="list-group-item"
                        style={{ "border-bottom": "0px" }}
                    >
                        <button
                            style={{ marginBottom: "10px", marginTop: "5px", "color": "#023e7d",
                                    'border': '1px solid'}}
                            className="btn  inline"
                            onClick={() => setOnEdit(true)}
                        >
                            Edit Profile
                        </button>
                        {userInfo.position === undefined && (
                            <button
                                style={{
                                    display: "inline-block",
                                    marginLeft: "10px", 
                                    "color": "#023e7d",
                                    'border': '1px solid'
                                }}
                                className="btn  inline"
                                onClick={() => setOnEditQF(true)}
                            >
                                Edit Qualifications
                            </button>
                        )}
                        {userInfo.yearsOfExperience === undefined && (
                            <button
                                style={{
                                    display: "inline-block",
                                    marginLeft: "10px",
                                    "color": "#023e7d",
                                    'border': '1px solid'
                                }}
                                className="btn inline"
                                onClick={changeRoute}
                            >
                                Create job post
                            </button>
                        )}
                    </li>
                }
                {onEdit && <EditProfile setOnEdit={setOnEdit} />}
                {/* {userInfo.position == undefined && (
                    
                    <button
                        style={{ marginTop: "-5px", display: "inline-block" }}
                        className="btn btn-outline-info inline"
                        onClick={() => setOnEditQF(true)}
                    >
                        Edit Qualifications
                    </button>
                )} */}
                {onEditQF && (
                    <EditQualifications setOnEditQualifications={setOnEditQF} />
                )}
            </div>
        </>
    );
};
//creating new branch
export default Info;
