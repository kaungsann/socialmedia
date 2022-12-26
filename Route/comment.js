const commentRouter = require("express").Router();
const commentController = require("../Controller/comment");
const { commentSchema } = require("../Utilites/schema");
const { saveFile } = require("../Utilites/gallery");
const { validBody, vaildToken } = require("../Utilites/vlaid");

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

  validBody(commentSchema),
  commentController.deleteComment
);

module.exports = commentRouter;
