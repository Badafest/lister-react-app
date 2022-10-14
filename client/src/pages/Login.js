import React from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { validatePassword, validateUsername } from "../helpers/validation";

export default () => {
  const navigate = useNavigate();
  return (
    <div className="container d-flex flex-column justify-content-center my-2">
      <center>
        <h3>LOG IN</h3>
      </center>
      <UserForm
        login={true}
        handleSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);

          const username = formData.get("username");
          if (!validateUsername(username)) {
            //replace by some toast function
            console.log(
              "Username should contain lowercase alphabets, digits or !,@,#,$,%,_ only."
            );
            return 0;
          }

          const password = formData.get("password");
          if (!validatePassword(password)) {
            //replace by some toast function
            console.log(
              "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
            );
            return 0;
          }
          //send data to backend, and on successful login store user data as context and on local storage
          console.log(`${username} is logged in successfully!`);
          navigate("/app");
        }}
      />
    </div>
  );
};
