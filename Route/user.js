const userRouter = require("express").Router();
const userController = require("../Controller/user");
const { userData, id } = require("../Utilites/schema");
const { validBody, vaildToken, validParams } = require("../Utilites/vlaid");

userRouter.get("/", userController.all);
userRouter.post("/register", validBody(userData), userController.register);
userRouter.post("/", userController.login);

userRouter
  .route("/:id")
  .post(vaildToken, validParams(id, "id"), userController.path)
  .get(vaildToken, userController.getSingle)
  .delete(vaildToken, userController.deleteUser);
module.exports = userRouter;
