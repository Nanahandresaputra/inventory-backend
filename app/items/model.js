const { model, Schema } = require("mongoose");

const itemSchema = Schema({
  name: {
    type: String,
    required: [true, "nama product harus diisi"],
  },
  unit: {
    type: Number,
    required: [true, "unit harus diisi"],
  },
  stok: {
    type: Number,
    required: [true, "stok harus diisi"],
  },
  harga_satuan: {
    type: Number,
    required: [true, "harga satuan harus diisi"],
  },
  image: {
    type: String,
    required: [true, "masukan gambar barang"],
  },
});
module.exports = model("Items", itemSchema);
