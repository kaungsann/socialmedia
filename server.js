require("dotenv").config();
const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");

const server = express();

const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

server.use(express.json());
server.use(fileUpload());

const userRouter = require("./Route/user");
const postRouter = require("./Route/post");
const tagRouter = require("./Route/tag");
const commentRouter = require("./Route/comment");
const { saveFile, saveFiles } = require("./Utilites/gallery");

server.post("/gallery", saveFile);

server.use("/user", userRouter);
server.use("/post", postRouter);
server.use("/tag", tagRouter);
server.use("/comment", commentRouter);
server.use("/upload", express.static(path.join(__dirname, "upload")));
server.get("*", (req, res) => {
  res.send({
    mes: "No Route Found",
  });
});

server.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({
    con: false,
    mes: err.message,
  });
});

server.listen(7000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
