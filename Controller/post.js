const DB = require("../Model/post");
const commentDB = require("../Model/comment");
const Helper = require("../Utilites/helper");

const post = async (req, res, next) => {
  console.log(req.body.user);
  let userId = req.body.user._id;
  delete req.body.user;
  req.body.user = userId;
  let results = await new DB(req.body).save();
  Helper.helper(res, "user post text", results);
};
const allPost = async (req, res, next) => {
  let findPost = await DB.find();
  Helper.helper(res, "all post in here", findPost);
};
const getSingle = async (req, res, next) => {
  let post = await DB.findById(req.params.id).populate("user").select("-__v");
  let comDb = await commentDB.find({ postId: post._id });
  post = post.toObject();
  post.comment = comDb;

  if (post) {
    Helper.helper(res, "get single user post", post);
  } else {
    next(new Error("user post with that id"));
  }
};
const pathData = async (req, res, next) => {
  let findID = await DB.findById(req.params.id);
  if (findID) {
    await DB.findByIdAndUpdate(findID._id, req.body);
    let results = await DB.findById(findID._id);
    Helper.helper(res, "update user post info", results);
  } else {
    next(new Error("you can't update the other  user post info"));
  }
};
const deletePost = async (req, res, next) => {
  // await DB.findByIdAndDelete(req.params.id);
  // Helper.helper(res, "delete user post");
  let dele = await DB.findById(req.params.id);
  if (dele) {
    await DB.findByIdAndDelete(dele._id);
    Helper.helper(res, "delete user post");
  } else {
    next(new Error("Post ID is not found"));
  }
};
const paginate = async (req, res, next) => {
  let page = req.params.page;
  let pages = page === 1 ? 0 : page - 1;
  let limit = Number(process.env.POST_LIMIT);
  let postStartCount = limit * pages;
  let posts = await DB.find().skip(postStartCount).limit(limit);
  console.log("page is ", postStartCount);
  Helper.helper(res, "this is all post show in user", posts);
};

const byPost = async (req, res, next) => {
  let findId = await DB.find({ user: req.params.id });
  if (findId) {
    Helper.helper(res, "get user only post ", findId);
  } else {
    next(new Error("Not user post id not found"));
  }
};
const addLike = async (req, res, next) => {
  let findID = await DB.findById(req.params.id);
  if (findID) {
    findID.like = findID.like + 1;
    await DB.findByIdAndUpdate(findID._id, findID);
    let results = await DB.findById(req.params.id);
    Helper.helper(res, "add like user post ", results);
  }
};
const reduceLike = async (req, res, next) => {
  let findID = await DB.findById(req.params.id);
  if (findID) {
    findID.like = findID.like - 1;
    await DB.findByIdAndUpdate(findID._id, findID);
    let results = await DB.findById(req.params.id);
    Helper.helper(res, "add like user post ", results);
  }
};
const toggleLike = async (req, res, next) => {
  let findID = await DB.findById(req.params.id);
  if (findID) {
    if (req.params.page == 0) {
      findID.like = findID.like - 1;
    } else {
      findID.like = findID.like + 1;
    }

    await DB.findByIdAndUpdate(findID._id, findID);
    let results = await DB.findById(req.params.id);
    Helper.helper(res, "add like user post ", results);
  }
};

module.exports = {
  post,
  allPost,
  getSingle,
  pathData,
  deletePost,
  byPost,
  paginate,
  addLike,
  reduceLike,
  toggleLike,
};
