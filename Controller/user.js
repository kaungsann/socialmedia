const Helper = require("../Utilites/helper");

const DB = require("../Model/user");

const all = async (req, res, next) => {
  let results = await DB.find().select("-__v -password ");
  Helper.helper(res, "get data ", results);
};

const register = async (req, res, next) => {
  let name = await DB.findOne({ name: req.body.name });
  if (name) {
    next("Name is already in use");
  }
  let email = await DB.findOne({ email: req.body.email });
  if (email) {
    next("Email is already in use");
  }
  let phone = await DB.findOne({ phone: req.body.phone });
  if (phone) {
    next("Phone number is already in use");
  }
  req.body.password = Helper.encode(req.body.password);

  let registerUser = await new DB(req.body).save();
  Helper.helper(res, "post on server  data ", registerUser);
};

const login = async (req, res, next) => {
  const emailUser = await DB.findOne({ email: req.body.email });
  console.log(emailUser);
  if (emailUser) {
    let results = Helper.comparePassword(req.body.password, emailUser.password);
    if (results) {
      let user = emailUser.toObject();
      delete user.password;
      user.token = Helper.madeToken(user);
      Helper.helper(res, "login successful", user);
    } else {
      next(
        new Error("Your are email & password is something wrong ,pls try again")
      );
    }
  } else {
    next(new Error("You need to first Register"));
  }
};

const path = async (req, res, next) => {
  let findId = await DB.findById(req.params.id);
  if (findId) {
    await DB.findByIdAndUpdate(findId._id, req.body);
    let results = await DB.findById(findId._id);
    Helper.helper(res, "foud your id ", results);
  } else {
    next(new Error("not found user id "));
  }
};

const getSingle = async (req, res, next) => {
  let findId = await DB.findById(req.params.id).select("-password -__v ");
  Helper.helper(res, "this is user get single info", findId);
};

const deleteUser = async (req, res, next) => {
  await DB.findByIdAndDelete(req.params.id);
  Helper.helper(res, "Delete your all info ");
};

module.exports = {
  login,
  register,
  all,
  path,
  getSingle,
  deleteUser,
};
