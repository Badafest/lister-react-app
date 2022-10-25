import React, { useState } from "react";
import moment from "moment";
import ListItem from "./ListItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";

export default (props) => {
  const navigate = useNavigate();
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
      ],
      author: "Anonymous",
      isPublic: true,
      likes: [],
      _id: "default",
      createdAt: "2022-10-20T08:50:04.068+00:00",
      updatedAt: "2022-10-20T12:06:02.242+00:00",
      __v: 0,
    },
    preview = true,
    editable = false,
    user_id = null,
  } = props;

  const [liked, setLiked] = useState(list.likes.includes(user_id));
  const [likes, setLikes] = useState(list.likes.length);

  return (
    <div className="container  shadow-sm border rounded p-1">
      <div className="mb-1 p-1 fw-bold text-center border-bottom">
        {list.title}
      </div>
      <div className="mb-1 p-1 fw-light d-flex justify-content-end align-items-center border-bottom">
        <span>{likes > 0 ? likes : "No likes yet"}</span>
        {list.isPublic && user_id ? (
          <span
            className="p-1 fs-5"
            style={{ cursor: "pointer" }}
            onClick={async () => {
              const res = await axios.patch(`/list/like/${list._id}`);
              setLiked(!liked);
              setLikes(res.data.data.likes.length);
            }}
          >
            {liked ? "❤️" : "🖤"}
          </span>
        ) : (
          <span className="fs-5">{likes > 0 ? "❤️" : ""}</span>
        )}
      </div>
      <div className="d-flex justify-content-between p-1 fw-light">
        <div>🖋 {list.author.username || list.author}</div>
        <div>
          <span>updated {moment(list.updatedAt).fromNow()}</span>
          <span>{list.isPublic ? "🌎" : "🔒"}</span>
        </div>
      </div>
      {list.items.length ? (
        <ol className="list-group list-group-numbered">
          {preview ? (
            <ListItem item={list.items[0]} editable={editable} key="0" />
          ) : (
            list.items.map((item, index) => (
              <ListItem
                item={item}
                list_id={list._id}
                item_index={index}
                initialCollapse={false}
                editable={editable}
                key={index}
              />
            ))
          )}
        </ol>
      ) : (
        <div className="text-center">
          {editable
            ? "Please add items to see them here..."
            : "This list has no items."}
        </div>
      )}
      {preview ? (
        <Link
          to={`/list/${list._id}`}
          className="text-decoration-none text-primary"
        >
          See more...
        </Link>
      ) : (
        <div
          className={`d-flex justify-content-${
            list.isPublic ? "between" : "end"
          } m-2 p-2 rounded border border-gray-700`}
        >
          <div></div>
          {editable ? (
            <div>
              <Link to={`/list/add/${list._id}`}>
                <span className="btn btn-sm btn-outline-primary m-1">
                  Add Item
                </span>
              </Link>
              <Link
                to={`/list/edit/${list._id}_${list.title}_${list.isPublic}`}
              >
                <span className="btn btn-sm btn-outline-success m-1">
                  Edit List
                </span>
              </Link>
              <span
                className="btn btn-sm btn-outline-danger m-1"
                onClick={async () => {
                  if (
                    window.confirm(
                      "Are you sure? You can not recover the list once deleted."
                    )
                  ) {
                    await axios.delete(`/list/delete/${list._id}`, {
                      data: {
                        images: list.items.map((item) => item.image),
                      },
                    });
                    navigate("/app");
                  } else {
                    return 0;
                  }
                }}
              >
                Delete List
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
