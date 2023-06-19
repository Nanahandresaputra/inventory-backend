const { Schema, model } = require("mongoose");

const saleSchema = Schema({
  kode_transaksi: {
    type: String,
    required: true,
  },
  tanggal_transaksi: {
    type: String,
    required: true,
  },
  costumer: {
    type: Schema.Types.ObjectId,
    ref: "Costumers",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Items",
    },
  ],
  qty: {
    type: Number,
    required: true,
  },
  total_harga: {
    type: Number,
    required: true,
  },
});

module.exports = model("Sales", saleSchema);
