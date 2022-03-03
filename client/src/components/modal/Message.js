import React from "react";
import "./modal.scss";

function Message({ setOpenModal, message }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        {/* <div className="title">
          <h3>Are You Sure You Want to Continue?</h3>
        </div> */}
        <div className="body">
          <p>{message}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
           close
          </button>
          {/* <button>Continue</button> */}
        </div>
      </div>
    </div>
  );
}

export default Message;