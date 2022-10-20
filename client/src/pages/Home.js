import React, { useContext } from "react";
import { UserContext } from "../context/User";

export default () => {
  return (
    <div className="container col-md-8 offset-md-2">
      <h1>HOME</h1>
      <pre>{JSON.stringify(useContext(UserContext))}</pre>
    </div>
  );
};
