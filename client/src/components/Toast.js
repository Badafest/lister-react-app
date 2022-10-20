import React from "react";

export default (props) => {
  const { title, message, setMessage } = props;
  return (
    <div className="alert alert-danger col-md-6 offset-md-3 my-5" role="alert">
      <div className="d-flex justify-content-between">
        <span className="fw-light">{title}</span>
        <button
          className="btn-close"
          onClick={() => {
            setMessage("");
          }}
        ></button>
      </div>
      <div className="color-danger">{message}</div>
    </div>
  );
};
