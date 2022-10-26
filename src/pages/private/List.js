import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/User";
import List from "../../components/List";

import axios from "../../helpers/axios";

export default () => {
  const navigate = useNavigate();
  const user = useContext(UserContext).userData;
  const [data, setData] = useState("Fetching List...");
  const { _id } = useParams();

  useEffect(() => {
    if (!user || !user.username || !user._id || !user.token) {
      navigate("/login");
    }
    axios.get("/list/private-data/" + _id).then((res) => {
      setData(res.data.data);
    });
  }, [user._id]);

  return (
    <div className="container col-md-6 offset-md-3 p-3">
      {data.items && (
        <List
          preview={false}
          editable={data.author._id === user._id}
          list={data}
          user_id={user._id}
        />
      )}
    </div>
  );
};
