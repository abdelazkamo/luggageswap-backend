const express = require("express");
const TravelRouter = express.Router();
const Travels = require("../models/Travels");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../../config");
//create a schedule
TravelRouter.post("/create", async (req, res) => {
  try {
    const body = req.body;

    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    const user_id = claims.id;
    body["poster_id"] = user_id;
    const date1Str = body.depart_date;
    const date2Str = body.arrival_date;

    const date1 = Date.parse(date1Str);
    const date2 = Date.parse(date2Str);

    const diffInMs = Math.abs(date2 - date1);
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    body["max_number_ofday"] = diffInDays;

    const travel = new Travels(body);
    travel.save();
    res.json({ msg: "travel created  successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = TravelRouter;
