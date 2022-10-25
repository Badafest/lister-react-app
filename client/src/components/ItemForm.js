import React, { useState } from "react";

export default (props) => {
  const {
    handleSubmit = () => {
      console.log(
        "Submit button was pressed but handler function was not passed as prop"
      );
    },
    disableSubmit = false,
    validated = false,
    setValidated = () => {
      console.log(
        "No function was passed as prop to set validation state of form"
      );
    },
    validInputs = { title: true },
    defaultTitle = "",
    defaultDescription = "",
    defaultImage = "",
    defaultImageCaption = "",
  } = props;

  const [imgType, setImgType] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  return (
    <div className="container col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className={
              "form-control " +
              (validated && (validInputs.title ? "is-valid" : "is-invalid"))
            }
            id="title"
            aria-describedby="titleHelp"
            onFocus={() => {
              setValidated(false);
            }}
            defaultValue={defaultTitle}
            placeholder="Untitled"
            required
          />
          <div id="titleHelp" className="form-text">
            Keep your title short and sweet.
          </div>
          <div className="invalid-feedback">Title is required</div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            className={"form-control"}
            id="description"
            aria-describedby="descriptionHelp"
            onFocus={() => {
              setValidated(false);
            }}
            defaultValue={defaultDescription}
          />
          <div id="descriptionHelp" className="form-text">
            Write a short and meaningful description"
          </div>
        </div>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="imgType"
            onChange={() => {
              setImgType(!imgType);
            }}
          />
          <label className="form-check-label" htmlFor="imgType">
            Toggle to upload file in image
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image {imgType ? " [File]" : " [URL]"}
          </label>
          {imgType ? (
            <input
              type="file"
              accept="image/*"
              name="image"
              className={"form-control"}
              id="image"
              aria-describedby="imageHelp"
              defaultValue={defaultImage}
              onChange={(evt) => {
                const reader = new FileReader();
                reader.readAsDataURL(evt.target.files[0]);
                reader.onload = function(evt) {
                  setImageSrc(evt.target.result);
                };
                reader.onerror = function() {
                  console.log("Error in file upload");
                };
              }}
            />
          ) : (
            <input
              type="url"
              name="image"
              className={"form-control"}
              id="image"
              aria-describedby="imageHelp"
              defaultValue={defaultImage}
              onChange={(evt) => {
                setImageSrc(evt.target.value);
              }}
            />
          )}
        </div>

        <div className="mb-3">
          {imageSrc ? (
            <img
              id="userImage"
              src={imageSrc}
              className="img-thumbnail"
              alt="user uploaded"
            />
          ) : (
            ""
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="caption" className="form-label">
            Caption
          </label>
          <input
            type="text"
            name="caption"
            className={"form-control"}
            id="caption"
            aria-describedby="captionHelp"
            onFocus={() => {
              setValidated(false);
            }}
            defaultValue={defaultImageCaption}
          />
          <div id="captionHelp" className="form-text">
            Describe your image in a short sentence or phrase
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary w-50"
            disabled={disableSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
