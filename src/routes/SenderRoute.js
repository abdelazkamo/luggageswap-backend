const express = require("express");
const Sendrouter = express.Router();

const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const { secretKey } = require("../../config");
const { Asksend } = require("../service/SenderService");
Sendrouter.post("/create/:travel_id", async (req, res) => {
  try {
    const body = req.body;
    const travel_id = req.params.travel_id;
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    const user_id = claims.id;

    // const user = await Users.findById(user_id);
    const travel = await Asksend(travel_id, user_id, body);
    res.json({ msg: "travel created  successfully", travel });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = Sendrouter;
