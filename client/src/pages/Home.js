import React, { useEffect, useState } from "react";
import List from "../components/List";
import axios from "../helpers/axios";

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/list/public-lists").then((res) => {
      setData(res.data.data);
    });
  }, [data.length]);

  return (
    <div className="container d-flex flex-column">
      <h5 className="text-center">
        Lister is an app to create and share lists such as these...
      </h5>
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
        <>Nothing was found to show here.</>
      )}
    </div>
  );
};
