import React, { useContext, useState } from "react";
import { UserContext } from "../context/User";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { validatePassword, validateUsername } from "../helpers/validation";
import axios from "../helpers/axios";
import Toast from "../components/Toast";

export default () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validInputs, setValidInputs] = useState({
    username: true,
    password: true,
  });
  const [toastMessage, setToastMessage] = useState("");

  return (
    <div className="container d-flex flex-column justify-content-center my-2">
      <center>
        <h3>LOG IN</h3>
      </center>
      <UserForm
        login={true}
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
          }

          const password = formData.get("password");
          if (!validatePassword(password)) {
            setValidInputs({ ...validInputs, password: false });
            setValidated(true);
            setDisableSubmit(false);
            return 0;
          }

          //send data to backend, and on successful login store user data as context and on local storage

          axios
            .post("/user/login", {
              username,
              password,
            })
            .then((res) => {
              const userData = res.data.data;
              console.log(`${username} is logged in successfully!`);

              //update local storage
              localStorage.setItem("user", JSON.stringify(userData));

              //update context
              userContext.setUserData(userData);

              //navigate to app
              navigate("/app");
            })
            .catch((err) => {
              setDisableSubmit(false);
              const message =
                (err.response &&
                  err.response.data &&
                  err.response.data.message) ||
                err.message;
              console.log(err);
              setToastMessage(message);
            });
        }}
        disableSubmit={disableSubmit}
        validated={validated}
        setValidated={setValidated}
        validInputs={validInputs}
      />
      <div>
        <center>
          <div className="my-4">
            <Link
              to="/password-reset"
              className="text-primary text-decoration-none"
            >
              Forgot Password? Click here to reset.
            </Link>
          </div>
        </center>
      </div>
      {toastMessage.length ? (
        <Toast
          title={"Oops! Couldn't log you in"}
          message={toastMessage}
          setMessage={setToastMessage}
        />
      ) : (
        ""
      )}
    </div>
  );
};
