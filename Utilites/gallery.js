const fs = require("fs");

const saveFile = async (req, res, next) => {
  console.log(req.files);
  if (!req.files) {
    next();
  } else {
    let file = req.files.file;
    let filename = new Date().valueOf() + "_" + file.name;
    file.mv(`./upload/${filename}`);
    req.body["image"] = filename;
    next();
  }
};

const saveFiles = async (req, res, next) => {
  let files = req.files.file;
  fileArray = [];
  files.forEach((file) => {
    let filename = new Date().valueOf() + "_" + file.name;
    file.mv(`./upload/${filename}`);
    fileArray.push(filename);
  });
  req.body["images"] = fileArray.join(",");
};

const delteFiles = async (filename) => {
  fs.unlinkSync(`./upload/${filename}`);
};

module.exports = {
  saveFile,
  saveFiles,
};
