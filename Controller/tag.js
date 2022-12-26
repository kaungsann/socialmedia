const DB = require("../Model/tag");

const helper = require("../Utilites/helper");

const all = async (req, res, next) => {
  let results = await DB.find();
  helper.helper(res, "all tag info", results);
};
const add = async (req, res, next) => {
  let findInfo = await DB.findOne({ name: req.body.name });
  if (findInfo) {
    next(new Error("You have been used this name"));
  } else {
    let results = await new DB(req.body).save();
    helper.helper(res, "add tag info ", results);
  }
};

const getSingle = async (req, res, next) => {
  if (getTag) {
    helper.helper(res, "user tag only post", getTag);
  } else {
    next(new Error("Not found with that id in tag"));
  }
};
const path = async (req, res, next) => {
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
  path,
  deleteTag,
};
