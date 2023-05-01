const mongoose = require("mongoose");
const User = require("../models/User");
const Travelschema = new mongoose.Schema(
  {
    poster_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    departure_point: {
      type: String,
      required: true,
      trim: true,
    },
    arrival_point: {
      type: String,
      required: true,
      trim: true,
    },
    depart_date: {
      type: String,
      required: true,
      trim: true,
    },
    arrival_date: {
      type: String,
      required: true,
      trim: true,
    },
    depart_time: {
      type: String,
      required: true,
      trim: true,
    },
    arrival_time: {
      type: String,
      required: true,
      trim: true,
    },
    can_take: {
      type: String,
      required: true,
      trim: true,
    },
    my_price: {
      type: String,
      required: true,
      trim: true,
    },
    max_kilos: {
      type: String,
      required: true,
    },
    meet_point: {
      type: String,
      required: true,
      trim: true,
    },
    max_number_ofday: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Travels = mongoose.model("Travels", Travelschema);
module.exports = Travels;
