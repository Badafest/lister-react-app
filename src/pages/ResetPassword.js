import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import Toast from "../components/Toast";
import {
  validatePassword,
  validateUsername,
  validateEmail,
} from "../helpers/validation";
import axios from "../helpers/axios";

export default () => {
  const navigate = useNavigate();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validInputs, setValidInputs] = useState({
    username: true,
    password: true,
    email: true,
  });
  const [toastMessage, setToastMessage] = useState("");

  return (
    <div className="container d-flex flex-column justify-content-center my-2">
      <center>
        <h3>RESET PASSWORD</h3>
      </center>
      <UserForm
        login={false}
        handleSubmit={async (event) => {
          event.preventDefault();
          setDisableSubmit(true);

          const formData = new FormData(event.target);

          const username = formData.get("username");
          if (!validateUsername(username)) {
            setValidInputs({ ...validInputs, username: false });
            setValidated(true);
            setDisableSubmit(false);
            return 0;
          } else {
          }

          const password = formData.get("password");
          if (!validatePassword(password)) {
            setValidInputs({ ...validInputs, password: false });
            setValidated(true);
            setDisableSubmit(false);
            return 0;
          }

          const email = formData.get("email");
          if (!validateEmail(email)) {
            setValidInputs({ ...validInputs, email: false });
            setValidated(true);
            setDisableSubmit(false);
            return 0;
          }

          //send data to backend, and on successful signup navigate to login

          axios
            .post("/user/reset-password", {
              username,
              password,
              email,
            })
            .then((res) => {
              console.log(`${username}'s password is reset!`);

              //navigate to login
              navigate("/login");
            })
            .catch((err) => {
              setDisableSubmit(false);
              setToastMessage(
                (err.response &&
                  err.response.data &&
                  err.response.data.message) ||
                  err.message
              );
            });
        }}
        disableSubmit={disableSubmit}
        validated={validated}
        setValidated={setValidated}
        validInputs={validInputs}
      />
      {toastMessage.length ? (
        <Toast
          title={"Oops! Couldn't reset your password"}
          message={toastMessage}
          setMessage={setToastMessage}
        />
      ) : (
        ""
      )}
    </div>
  );
};
