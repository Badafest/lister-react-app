const List = require("../models/List");
const User = require("../models/User");

const getPublicList = async (req, res) => {
  const { _id } = req.params;
  try {
    const list = await List.findById(_id).populate("author", "_id username");
    if (list) {
      if (list.isPublic) {
        res.json({
          ok: true,
          data: list,
        });
      } else {
        res.status(500).json({
          ok: false,
          message: "The list is private.",
        });
      }
    } else {
      res.status(500).json({
        ok: false,
        message: "No list found",
      });
    }
  } catch (err) {
    console.log("ERROR IN GET PUBLIC LIST => ", err);
    res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const getPrivateList = async (req, res) => {
  const list_id = req.params._id;
  const user_id = req.user._id;
  try {
    const list = await List.findById(list_id).populate(
      "author",
      "_id username"
    );
    if (list) {
      if (list.isPublic) {
        res.json({
          ok: true,
          data: list,
        });
      } else {
        const author = await User.findById(list.author);
        if (author) {
          if (String(author._id) === user_id) {
            res.json({
              ok: true,
              data: list,
            });
          } else {
            res.status(500).json({
              ok: false,
              message: "Not permitted to view private list",
            });
          }
        } else {
          res.status(500).json({
            ok: false,
            message: "Author was not found.",
          });
        }
      }
    } else {
      res.status(500).json({
        ok: false,
        message: "No list found",
      });
    }
  } catch (err) {
    console.log("ERROR IN FETCHING PRIVATE LIST => ", err);
    res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const getUserLists = async (req, res) => {
  const user_id = req.user._id;
  const lists = await List.find({ author: user_id }).populate(
    "author",
    "_id username"
  );

  res.json({
    ok: true,
    data: lists,
  });
};

const getPublicLists = async (req, res) => {
  const lists = await List.find({ isPublic: true }).populate(
    "author",
    "_id username"
  );
  res.json({
    ok: true,
    data: lists,
  });
};

const createList = async (req, res) => {
  const listData = req.body;
  if (listData.title && listData.author) {
    try {
      const list = await List.create(listData);
      const { _id, title } = list;
      res.json({
        ok: true,
        data: { _id, title },
      });
    } catch (err) {
      console.log("ERROR IN CREATE LIST => ", err);
      res.status(500).json({
        ok: false,
        message:
          err.code === 11000
            ? `${Object.keys(err.keyValue)[0]} is already taken`
            : err.message,
      });
    }
  } else {
    res.status(500).json({
      ok: false,
      message: "Error occurred due to bad request body",
    });
  }
};

module.exports = {
  createList,
  getPublicList,
  getPrivateList,
  getUserLists,
  getPublicLists,
};
