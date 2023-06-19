const { Schema, model } = require("mongoose");

const costumerSchema = Schema({
  name: {
    type: String,
    required: [true, "nama harus diisi"],
  },
  contact: {
    type: Number,
    required: [true, "kontak harus diisi"],
  },
  email: {
    type: String,
    required: [true, "email harus diisi"],
  },
  alamat: {
    type: String,
  },
  diskon_fix: {
    type: Number,
  },
  image: {
    type: String,
    required: [true, "masukan file ktp"],
  },
});

module.exports = model("Costumers", costumerSchema);
