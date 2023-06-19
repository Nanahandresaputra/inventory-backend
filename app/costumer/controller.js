const Costumers = require("./model");
const path = require("path");
const fs = require("fs");
const config = require("../../config/config");

const index = async (req, res, next) => {
  try {
    const costumers = await Costumers.find();
    return res.json(costumers);
  } catch (err) {
    next(err);
  }
};

const indexOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const costumers = await Costumers.findById(id);
    return res.json(costumers);
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    let payload = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
      let fileName = req.file.filename + "." + originalExt;
      let target_path = path.resolve(`${config.rootPath}/public/images/costumers/${fileName}`);

      let src = fs.createReadStream(tmp_path);
      let dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on("end", async () => {
        try {
          let costumers = new Costumers({ ...payload, image: fileName });
          await costumers.save();
          return res.json(costumers);
        } catch (err) {
          fs.unlinkSync(target_path);
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
      let costumers = new Costumers(payload);
      await costumers.save();
      return res.json(costumers);
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
    let { id } = req.params;
    let payload = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];

      let fileName = req.file.filename + "." + originalExt;
      let target_path = path.resolve(`${config.rootPath}/public/images/costumers/${fileName}`);

      let src = fs.createReadStream(tmp_path);
      let dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on("end", async () => {
        try {
          let costumers = await Costumers.findById(id);
          let currentImage = `${config.rootPath}/public/images/costumers/${costumers.image}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }
          costumers = await Costumers.findByIdAndUpdate(id, { ...payload, image: fileName }, { new: true, runValidators: true });

          return res.json(costumers);
        } catch (err) {
          fs.unlinkSync(target_path);
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

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const costumers = await Costumers.findByIdAndDelete(id);
    let currentImage = `${config.rootPath}/public/images/costumers/${costumers.image}`;
    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }
    return res.json(costumers);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, indexOne, store, update, destroy };
