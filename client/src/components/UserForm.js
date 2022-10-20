import React from "react";
export default (props) => {
  const {
    login = false,
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
    validInputs = { username: true, email: true, password: true },
  } = props;

  return (
    <div className="container col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} noValidate>
        {login ? (
          <></>
        ) : (
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className={
                "form-control " +
                (validated && (validInputs.email ? "is-valid" : "is-invalid"))
              }
              id="email"
              aria-describedby="emailHelp"
              onFocus={() => {
                setValidated(false);
              }}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
            <div className="invalid-feedback">
              Your email is an address that looks like "johndoe@example.com"
            </div>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className={
              "form-control " +
              (validated && (validInputs.username ? "is-valid" : "is-invalid"))
            }
            id="username"
            aria-describedby="usernameHelp"
            onFocus={() => {
              setValidated(false);
            }}
          />
          <div id="usernameHelp" className="form-text">
            Your username is unique and public.
          </div>
          <div className="invalid-feedback">
            Username cannot be empty and should contain lowercase alphabets,
            digits or !,@,#,$,%,_ only.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className={
              "form-control " +
              (validated && (validInputs.password ? "is-valid" : "is-invalid"))
            }
            id="password"
            onFocus={() => {
              setValidated(false);
            }}
          />
          <div className="invalid-feedback">
            Password must contain minimum eight characters, at least one
            uppercase letter, one lowercase letter and one number.
          </div>
        </div>
        {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            name="check"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
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
