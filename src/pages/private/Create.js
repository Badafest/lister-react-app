import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListForm from "../../components/ListForm";
import Toast from "../../components/Toast";
import axios from "../../helpers/axios";
import { UserContext } from "../../context/User";

export default () => {
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validInputs, setValidInputs] = useState({ title: true });
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  const userData = useContext(UserContext).userData;

  useEffect(() => {
    if (!userData || !userData.username || !userData._id || !userData.token) {
      navigate("/login");
    }
  }, [userData._id]);

  return (
    <div className="container d-flex flex-column justify-content-center my-2">
      <ListForm
        handleSubmit={async (event) => {
          event.preventDefault();
          setDisableSubmit(true);

          const formData = new FormData(event.target);

          const title = formData.get("title");

          if (!title || !title.length) {
            setValidInputs({ title: false });
            setValidated(true);
            setDisableSubmit(false);
            return 0;
          }

          //send data to backend, and on successful login store user data as context and on local storage
          const isPublic =
            formData.get("isPublic") != null &&
            formData.get("isPublic") === "on";

          const author = userData._id;

          axios
            .post("/list/create", { title, isPublic, author })
            .then((res) => {
              console.log("Created a list");

              //navigate to app
              navigate("/list/" + res.data.data._id);
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
      {toastMessage.length ? (
        <Toast
          title={"Oops! Couldn't create your list"}
          message={toastMessage}
          setMessage={setToastMessage}
        />
      ) : (
        ""
      )}
    </div>
  );
};
