const postRouter = require("express").Router();

const postController = require("../Controller/post");
const { id, userPost, page } = require("../Utilites/schema");
const { vaildToken, validParams, validBody } = require("../Utilites/vlaid");
const { saveFile } = require("../Utilites/gallery");

postRouter.post(
  "/",
  vaildToken,
  saveFile,
  validBody(userPost),
  postController.post
);

postRouter.get("/", vaildToken, postController.allPost);
postRouter.get(
  "/bypost/:id",
  vaildToken,
  validParams(id, "id"),
  postController.byPost
);
postRouter.get("/paginate/:page", postController.paginate);

postRouter.post("/addlike/:id", validParams(id, "id"), postController.addLike);
postRouter.post(
  "/reducelike/:id",
  validParams(id, "id"),
  postController.reduceLike
);
postRouter.post(
  "/like/toggle/:id/:page",
  validParams(id, "id"),
  postController.toggleLike
);

postRouter
  .route("/:id")
  .get(vaildToken, validParams(id, "id"), postController.getSingle)
  .post(vaildToken, validParams(id, "id"), postController.pathData)
  .delete(vaildToken, validParams(id, "id"), postController.deletePost);

module.exports = postRouter;
