const mongoose = require("mongoose");
const Travels = require("../models/Travels");
// const User = require("../models/User");
const SendsShema = new mongoose.Schema(
  {
    poster_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    travel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Travels",
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
    },

    start_country: {
      type: String,
    },
    end_country: {
      type: String,
    },
    status_from_poster: {
      type: String, //accepted or pending or rejected
    },
    status_of_receiving: {
      type: String, // yes or peding or no
    },
    thing_to_send: {
      typr: String,
    },
    kilo: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Senders = mongoose.model("Send", SendsShema);
module.exports = Senders;
