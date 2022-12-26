const tagRouter = require("express").Router();
const tagController = require("../Controller/tag");
const { saveFile } = require("../Utilites/gallery");
const { tagSchema } = require("../Utilites/schema");
const { validBody, vaildToken } = require("../Utilites/vlaid");

tagRouter.get("/", tagController.all);
tagRouter.post(
  "/",
  vaildToken,
  saveFile,
  validBody(tagSchema),
  tagController.add
);
tagRouter
  .route("/:id")
  .get(tagController.getSingle)
  .post(tagController.path)
  .delete(tagController.deleteTag);

module.exports = tagRouter;
