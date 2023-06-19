const Items = require("./model");
const fs = require("fs");
const config = require("../../config/config");
const path = require("path");

const index = async (req, res, next) => {
  try {
    const items = await Items.find();
    return res.json(items);
  } catch (err) {
    next(err);
  }
};

const indexOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Items.findById(id);
    return res.json(item);
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const payload = req.body;
    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
      let fileName = req.file.filename + "." + originalExt;
      let target_path = path.resolve(config.rootPath, `public/images/items/${fileName}`);

      let src = fs.createReadStream(tmp_path);
      let dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on("end", async () => {
        try {
          let items = new Items({ ...payload, image: fileName });
          await items.save();
          return res.json(items);
        } catch (err) {
          fs.unlinkSync(target_path);
          console.log("anjay");
          if (err && err.name === "ValidationError") {
            res.json({
              error: 1,
              message: err.message,
              fields: err.errors,
            });
          }
          next(err);
        }
      });

      src.on("error", () => {
        next();
      });
    } else {
      let items = new Items(payload);
      await items.save();
      return res.json(items);
    }
  } catch (err) {
    if (err && err.name === "ValidationError") {
      res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
      let fileName = req.file.filename + "." + originalExt;
      let target_path = path.resolve(config.rootPath, `public/images/items/${fileName}`);

      let src = fs.createReadStream(tmp_path);
      let dest = fs.createWriteStream(target_path);

      src.pipe(dest);
      src.on("end", async () => {
        try {
          let items = await Items.findById(id);
          let currentImage = `${config.rootPath}/public/images/items/${items.image}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }
          items = await Items.findByIdAndUpdate(id, { ...payload, image: fileName }, { new: true, runValidators: true });
          return res.json(items);
        } catch (err) {
          fs.unlinkSync(target_path);
          if (err && err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors,
            });
          }
          next(err);
        }
      });

      src.on("error", () => {
        next();
      });
    } else {
      let items = await Items.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
      return res.json(items);
    }
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const items = await Items.findByIdAndDelete(id);
    let currentImage = `${config.rootPath}/public/images/items/${items.image}`;
    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }
    return res.json(items);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, indexOne, store, update, destroy };
