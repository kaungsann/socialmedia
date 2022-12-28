const DB = require("../Model/tag");
const userData = require("../Model/user");
const helper = require("../Utilites/helper");

const all = async (req, res, next) => {
  let results = await DB.find();
  helper.helper(res, "all tag info", results);
};
const add = async (req, res, next) => {
  let results = await new DB(req.body).save();
  helper.helper(res, "add tag info ", results);
};

const getSingle = async (req, res, next) => {
  let tag = await DB.findById(req.params.id);
  if (tag) {
    helper.helper(res, "get tag user", tag);
  } else {
    next(new Error("Tag user is not found"));
  }
};
const pathTag = async (req, res, next) => {
  let findId = await DB.findById(req.params.id);
  if (findId) {
    await DB.findByIdAndUpdate(findId._id, req.body);
    let updatePath = await DB.findById(findId._id);
    helper.helper(res, "user cannot update this tag", updatePath);
  }
};

const deleteTag = async (req, res, next) => {
  let deleteTa = await DB.findById(req.params.id);
  if (deleteTa) {
    await DB.findByIdAndDelete(deleteTa._id);
    helper.helper(res, "Delete tag info");
  } else {
    next(new Error(" delete in tag info"));
  }
};

module.exports = {
  all,
  add,
  getSingle,
  pathTag,
  deleteTag,
};
