const commentRouter = require("express").Router();
const commentController = require("../Controller/comment");
const { commentSchema, id } = require("../Utilites/schema");
const { saveFile } = require("../Utilites/gallery");
const { validBody, vaildToken, validParams } = require("../Utilites/vlaid");

commentRouter.get("/", commentController.all);

commentRouter.post(
  "/",
  vaildToken,
  saveFile,
  validBody(commentSchema),
  commentController.addComment
);

commentRouter.delete(
  "/:id",
  vaildToken,
  validParams(id, "id"),
  commentController.deleteComment
);

module.exports = commentRouter;
