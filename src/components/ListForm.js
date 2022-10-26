import React from "react";
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
    defaultTitle = "Untitled",
    defaultIsPublic = true,
  } = props;

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
            required
          />
          <div id="titleHelp" className="form-text">
            Keep your title short and sweet.
          </div>
          <div className="invalid-feedback">Title is required</div>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            name="isPublic"
            className="form-check-input"
            id="isPublic"
            defaultChecked={defaultIsPublic}
          />
          <label className="form-check-label" htmlFor="isPublic">
            Make your list Public ?
          </label>
          <div id="isPublicHelp" className="form-text">
            The list will be visible to everyone, but only you will be able to
            edit or delete it.
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
