import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../../components/ItemForm";
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

  const list_id = useParams()._id;
  return (
    <div className="container d-flex flex-column justify-content-center my-2">
      <ItemForm
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

          const data = { title };

          const description = formData.get("description");
          if (description.length) {
            data.description = description;
          }

          const image = event.target.querySelector("#userImage");
          const image_caption = formData.get("caption");
          if (image && image.src.length) {
            data.image = image.src;
            if (image_caption.length) {
              data.image_caption = image_caption;
            }
          }
          //send data to backend, and on successful login store user data as context and on local storage

          axios
            .put("/list/add/" + list_id, data)
            .then((res) => {
              console.log("Added item to list");
              //navigate to app
              navigate("/list/" + list_id);
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
