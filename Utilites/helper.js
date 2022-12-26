const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helper = (res, mes = "", result = []) => {
  res.json({
    con: true,
    mes,
    result,
  });
};

module.exports = {
  encode: (password) => bcrypt.hashSync(password),
  comparePassword: (plain, compar) => bcrypt.compareSync(plain, compar),
  madeToken: (payload) =>
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" }),
  helper,
};
