import axios from "../helpers/axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default (props) => {
  const {
    item,
    item_index = 0,
    list_id = null,
    initialCollapse = true,
    editable = false,
  } = props;
  const [showDetails, setShowDetails] = useState(initialCollapse);
  const [crossed, setCrossed] = useState(item.crossed);

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className={"ms-2 me-auto w-100"}>
        <div className="d-flex justify-content-between align-items-center">
          <span
            className={`${
              crossed ? "text-decoration-line-through text-muted" : ""
            }`}
          >
            {item.title}
          </span>
          <span
            className="btn btn-sm btn-outline-secondary"
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            {showDetails ? " ▲ " : " ▼ "}
          </span>
        </div>
        <div>
          {showDetails ? (
            <>
              <div
                className={`mt-2 ${
                  crossed ? "text-decoration-line-through text-muted" : ""
                }`}
              >
                {item.description}
              </div>
              {item.image && (
                <div>
                  <div className="d-flex justify-content-center">
                    <div className="col-md-6 mt-1">
                      <img
                        src={item.image.url || item.image}
                        className="img-fluid img-thumbnail"
                        alt={item.imageCaption}
                      ></img>
                    </div>
                  </div>
                  <p
                    className={`fw-light text-secondary text-center ${
                      crossed ? "text-decoration-line-through text-muted" : ""
                    }`}
                  >
                    {item.image_caption}
                  </p>
                </div>
              )}
              {editable ? (
                <div className="d-flex justify-content-end mt-1 border-top">
                  <button
                    className="btn btn-sm btn-success m-1"
                    onClick={() => {
                      axios
                        .patch(
                          "/list/cross/" +
                            list_id +
                            "?item=" +
                            item_index +
                            "&cross=" +
                            !crossed
                        )
                        .then((res) => {
                          setCrossed(res.data.data.crossed);
                        });
                    }}
                  >
                    {crossed ? "Uncross" : "Cross"}
                  </button>

                  <Link
                    to={
                      "/list/edit-item/" +
                      list_id +
                      "?item=" +
                      item_index +
                      "&title=" +
                      item.title +
                      "&description=" +
                      item.description +
                      "&image=" +
                      (item.image && item.image.url) +
                      "&caption=" +
                      item.caption
                    }
                  >
                    <button className="btn btn-sm btn-primary m-1">Edit</button>
                  </Link>

                  <button
                    className="btn btn-sm btn-danger m-1"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure? Deleted items cannot be recovered."
                        )
                      ) {
                        axios
                          .delete(
                            "/list/delete-item/" +
                              list_id +
                              "?item=" +
                              item_index
                          )
                          .then((res) => {
                            console.log("Deleted item");
                            window.location.reload();
                          });
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </li>
  );
};
