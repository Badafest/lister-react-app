import React from "react";
export default (props) => {
  const {
    login = false,
    handleSubmit = () => {
      console.log(
        "Submit button was pressed but handler function was not passed as prop"
      );
    },
  } = props;
  return (
    <div className="container col-md-6 offset-md-3">
      <form onSubmit={handleSubmit}>
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
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
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
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
          />
          <div id="usernameHelp" className="form-text">
            Your username is unique and public.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
          />
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
