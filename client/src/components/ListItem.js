import React, { useState } from "react";

export default (props) => {
  const { item, initialCollapse = true, editable = false } = props;
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
                        src={item.image}
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
                      setCrossed(!crossed);
                    }}
                  >
                    {crossed ? "Uncross" : "Cross"}
                  </button>
                  <button className="btn btn-sm btn-primary m-1">Edit</button>
                  <button className="btn btn-sm btn-danger m-1">Delete</button>
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
