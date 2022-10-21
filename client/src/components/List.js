import React from "react";
import moment from "moment";
import ListItem from "./ListItem";
import { Link } from "react-router-dom";

export default (props) => {
  const {
    list = {
      title: "Default List",
      items: [
        {
          title: "Click on 'Add Item' to begin adding items",
          description:
            "This is just an example. To delete this item, simply click 'Delete' button on the bottom right. Other items in this list are just mumbo jumbo.",
          image:
            "https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_960_720.jpg",
          image_caption: "Oh, and yeah! You can add image too.",
          crossed: false,
        },
        {
          title: "Just a random item",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          crossed: true,
        },
        {
          title: "Just a random item",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          crossed: false,
        },
        {
          title: "Just a random item",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          crossed: false,
        },
      ],
      author: "Anonymous",
      isPublic: true,
      shares: 912,
      _id: "default",
      createdAt: "2022-10-20T08:50:04.068+00:00",
      updatedAt: "2022-10-20T12:06:02.242+00:00",
      __v: 0,
    },
    preview = true,
    editable = false,
  } = props;

  return (
    <div className="container  shadow-sm border rounded p-1">
      <div className="mb-1 p-1 fw-bold text-center border-bottom">
        {list.title}
      </div>
      <div className="mb-1 p-1 fw-light text-center border-bottom">
        Shared <span className="fw-bold">{list.shares}</span> times
      </div>
      <div className="d-flex justify-content-between p-1 fw-light">
        <div>🖋 {list.author}</div>
        <div>
          <span>updated {moment(list.updatedAt).fromNow()}</span>
          <span>{list.isPublic ? "🌎" : "🔒"}</span>
        </div>
      </div>
      <ol className="list-group list-group-numbered">
        {preview ? (
          <ListItem item={list.items[0]} editable={editable} key="0" />
        ) : (
          list.items.map((item, index) => (
            <ListItem
              item={item}
              initialCollapse={false}
              editable={editable}
              key={index}
            />
          ))
        )}
      </ol>
      {preview ? (
        <Link
          to={`/list/${list._id}`}
          className="text-decoration-none text-primary"
        >
          See more...
        </Link>
      ) : editable ? (
        <div className="d-flex justify-content-between m-2 p-2 rounded border border-gray-700">
          <div>
            <span className="btn btn-sm btn-success m-1">Share List</span>
          </div>
          <div>
            <span className="btn btn-sm btn-outline-primary m-1">Add Item</span>
            <span className="btn btn-sm btn-outline-success m-1">
              Edit List
            </span>
            <span className="btn btn-sm btn-outline-danger m-1">
              Delete List
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
