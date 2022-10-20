import React, { useState } from "react";

export default (props) => {
  const { item, editable = false } = props;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold d-flex align-items-center">
          <span className="me-2">{item.title}</span>
          <span
            className="btn btn-sm btn-outline-secondary "
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
              <div>{item.description}</div>
              {item.image && (
                <div>
                  <div className="d-flex justify-content-center">
                    <div className="col-md-6 ">
                      <img
                        src={item.image}
                        className="img-fluid img-thumbnail"
                        alt={item.imageCaption}
                      ></img>
                    </div>
                  </div>
                  <p className="fw-light text-secondary text-center">
                    {item.image_caption}
                  </p>
                </div>
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
