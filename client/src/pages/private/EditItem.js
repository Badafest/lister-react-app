import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
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

  const [searchParams] = useSearchParams();

  const userData = useContext(UserContext).userData;

  useEffect(() => {
    if (!userData || !userData.username || !userData._id || !userData.token) {
      navigate("/login");
    }
  }, [userData._id]);

  const { _id } = useParams();
  const [item, title, description, image, caption] = Array.from(
    searchParams.values()
  ).map((value) => (value === "undefined" ? "" : value));

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
          console.log(data);

          axios
            .patch("/list/edit-item/" + _id + "?item=" + item, data)
            .then((res) => {
              console.log("Edited item");
              //navigate to app
              navigate("/list/" + _id);
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
        defaultTitle={title}
        defaultDescription={description}
        defaultImage={image}
        defaultImageCaption={caption}
      />
      <div className="container d-flex justify-content-center p-2">
        <Link to={"/list/" + _id}>
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
        </Link>
      </div>
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
