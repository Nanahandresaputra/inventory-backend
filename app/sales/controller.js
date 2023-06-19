const Sales = require("./model");
const uuid4 = require("uuid4");
const Items = require("../items/model");
const Costumers = require("../costumer/model");

const index = async (req, res, next) => {
  try {
    const sales = await Sales.find().populate("costumer").populate("items");
    return res.json(sales);
  } catch (err) {
    next(err);
  }
};

// const indexOne = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const sales = await Sales.findById(id);
//     return res.json(sales);
//   } catch (err) {
//     next(err);
//   }
// };

const store = async (req, res, next) => {
  try {
    let payload = req.body;

    if (payload.costumer) {
      let costumers = await Costumers.findOne({ name: { $regex: payload.costumer, $options: "i" } });
      if (costumers) {
        payload = { ...payload, costumer: costumers._id };
      } else {
        delete payload.costumer;
      }
    }

    if (payload.items && payload.items.length > 0) {
      let items = await Items.find({ name: { $in: payload.items } });
      if (items.length) {
        payload = { ...payload, items: items.map((item) => item._id) };
      } else {
        delete payload.items;
      }
    }

    let transactionCode = uuid4();
    let sales = new Sales({ ...payload, kode_transaksi: `TRK-${transactionCode}`, tanggal_transaksi: new Date(), qty: 0 });
    await sales.save();
    return res.json(sales);
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
    const sales = await Sales.findByIdAndDelete(id);
    return res.json(sales);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, store, destroy };
