import React from "react";
import { Navigate } from "react-router-dom";

export default () => {
  if (true) {
    //REPLACE THIS TRUE BY USER'S TOKEN IN LOCAL STORAGE OR CONTEXT
    return <Navigate to="/login" />;
  }
  return (
    <div className="container col-md-8 offset-md-2">
      <h3>TO DO List of User</h3>
    </div>
  );
};
