const jwt = require("jsonwebtoken");
const DB = require("../Model/user");

module.exports = {
  validBody: (schema) => {
    return (req, res, next) => {
      let results = schema.validate(req.body);
      if (results.error) {
        next(new Error(results.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validParams: (schema, name) => {
    return (req, res, next) => {
      let obj = {};
      obj[`${name}`] = req.params[`${name}`];
      let results = schema.validate(obj);
      if (results.error) {
        next(new Error(results.error.details[0].message));
      } else {
        next();
      }
    };
  },

  vaildToken: async (req, res, next) => {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];

      let decodeUser = jwt.decode(token, process.env.SECRET_KEY);
      let user = await DB.findById(decodeUser._id).select("-password");
      if (user) {
        req.body["user"] = user;
        next();
      } else {
        next(new Error("Token error"));
      }
    } else {
      next(new Error("you need to tokenization"));
    }
  },
};
