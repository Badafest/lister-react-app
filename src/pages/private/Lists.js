import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import List from "../../components/List";
import { UserContext } from "../../context/User";

import axios from "../../helpers/axios";

export default () => {
  const navigate = useNavigate();
  const user = useContext(UserContext).userData;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user || !user.username || !user._id || !user.token) {
      navigate("/login");
    }
    axios.get("/list/user-lists").then((res) => {
      setData(res.data.data);
    });
  }, [user._id]);

  return (
    <div className="container d-flex flex-column">
      <h3 className="text-center">
        Welcome, {(user && user.username) || "dear"} !
      </h3>
      {data.length ? (
        <div className="d-flex flex-wrap">
          {data.map((list) => {
            return (
              <div className="container col-md-4 col-sm-8 p-2" key={list._id}>
                <List preview={true} list={list} />
              </div>
            );
          })}
        </div>
      ) : (
        <>It is so lonely here. Why dont you create a new list?</>
      )}
      <div className="d-flex justify-content-between">
        <Link to="/list/new">
          <button className="btn btn-sm btn-primary">New List</button>
        </Link>
      </div>
    </div>
  );
};
