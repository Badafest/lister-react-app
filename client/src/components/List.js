import React from "react";
import moment from "moment";
import ListItem from "./ListItem";
import { Link } from "react-router-dom";

export default (props) => {
  const {
    list = {
      items: [
        {
          title: "Click on '+' to begin adding items...",
          description:
            "This is just an example. To delete this, simply click 'X' button on the bottom right. Other items in this list are just mumbo jumbo.",
          image:
            "https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_960_720.jpg",
          image_caption: "Oh, and yeah! You can add image too.",
        },
        {
          title: "Just a random item",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          title: "Just a random item",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          title: "Just a random item",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
  } = props;

  return (
    <div className="container  shadow-sm border rounded p-1">
      <div className="d-flex justify-content-between ">
        <div>🖋 {list.author}</div>
        <div>
          <span className="fw-light">
            updated {moment(list.updatedAt).fromNow()}
          </span>
          <span>{list.isPublic ? "🌎" : "🔒"}</span>
        </div>
      </div>
      <ol className="list-group list-group-numbered">
        {preview ? (
          <ListItem item={list.items[0]} key="0" />
        ) : (
          list.items.map((item, index) => (
            <ListItem item={item} editable={true} key={index} />
          ))
        )}
      </ol>
      {preview && (
        <Link
          to={`/list/${list._id}`}
          className="text-decoration-none text-success"
        >
          See more
        </Link>
      )}
    </div>
  );
};
