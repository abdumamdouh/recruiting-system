import React from "react";
import {useHistory} from 'react-router-dom'
function HomePage() {
    const history= useHistory()
    const handleApplicant = ()=>{
        history.push('/signup-applicant')
    }
    const handleRecruiter = ()=>{
        history.push('/signup-recruiter')
    }

  return (
    <>
      {/* <h1>
            Home
        </h1> */}
      <p>Find Your next opportunity</p>
      <button onClick={handleApplicant}> Apply as an applicant </button>
      <button onClick={handleRecruiter}> Apply as a recruiter </button>
    </>
  );
}

export default HomePage;
