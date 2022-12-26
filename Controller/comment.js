const DB = require("../Model/comment");
const Helper = require("../Utilites/helper");

const all = async (req, res, next) => {
  let allComment = await DB.find();
  Helper.helper(res, "get all comment", allComment);
};

const addComment = async (req, res, next) => {
  let addCom = await new DB(req.body).save();
  Helper.helper(res, "store comment data in server ", addCom);
};
const deleteComment = async (req, res, next) => {
  let findID = await DB.findById(req.params.id);
  if (findID) {
    await DB.findByIdAndDelete(findID._id);
    Helper.helper(res, "Delete comment done");
  }
};

module.exports = {
  all,
  addComment,
  deleteComment,
};
