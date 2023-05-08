const express = require("express");
const Sendrouter = express.Router();
const Sender = require("../models/sends");
const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const { secretKey } = require("../../config");
const {
  Asksend,
  ShommySends,
  TravelSenders,
} = require("../service/SenderService");
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
Sendrouter.post("/showmysends", async (req, res) => {
  try {
    const body = req.body;

    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    const user_id = claims.id;

    // const user = await Users.findById(user_id);
    const travel = await ShommySends(
      body.start_country,
      body.end_country,
      user_id
    );
    res.json({ msg: "travel created  successfully", travel });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
//when i receive my laguage
Sendrouter.put("/receive/:send_id", async (req, res) => {
  try {
    const id = req.params.send_id;
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    const user_id = claims.id;
    status_of_receiving = {
      status_of_receiving: "yes",
    };
    const travel = await Sender.findByIdAndUpdate(id, status_of_receiving);
    res.json({ msg: "lagguage received  successfully", travel });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
//i travel who accept the sender request
Sendrouter.put("/receive/:send_id", async (req, res) => {
  try {
    const id = req.params.send_id;
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    const user_id = claims.id;
    status_from_poster = {
      status_from_poster: "accepted",
    };
    const travel = await Sender.findByIdAndUpdate(id, status_from_poster);
    res.json({ msg: "lagguage received  successfully", travel });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
///if you want to see the people for a travel (pending)
Sendrouter.get("/view_travel_sender/:travel_id", async (req, res) => {
  try {
    const travel_id = req.params.travel_id;
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    status_from_poster = "pending";
    const user_id = claims.id;
    const data = await TravelSenders(travel_id, status_from_poster);
    res.json({ msg: "lagguage received  successfully", data });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
///if you want to see the people for a travel (accepted)
Sendrouter.get("/view_travel_sender/:travel_id", async (req, res) => {
  try {
    const travel_id = req.params.travel_id;
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    status_from_poster = "accepted";
    const user_id = claims.id;
    const data = await TravelSenders(travel_id, status_from_poster);
    res.json({ msg: "lagguage received  successfully", data });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = Sendrouter;
