const express = require("express");
const MessageRouter = express.Router();
const jwt = require("jsonwebtoken");
const { secretKey } = require("../../config");
const {
  Mydiscussions,
  Showamessage,
  CreateMessages1,
} = require("../service/MymessagesServices");
const { findById } = require("../models/mymessages");
//show the discusions of the connected person
MessageRouter.get("/discution", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    const user_id = claims.id;
    const discussions = await Mydiscussions(user_id);
    res.json({ msg: "discussions fetched  successfully", discussions });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
//show messages of a discussion
MessageRouter.get("/messages/:discu_id", async (req, res) => {
  try {
    const discussion_id = req.params.discu_id;
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    const user_id = claims.id;
    const messages = await Showamessage(discussion_id);
    res.json({ msg: "discussions fetched  successfully", messages });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
//create a new message in a discussion
MessageRouter.get("/createmessage/:discu_id", async (req, res) => {
  try {
    const discussion_id = req.params.discu_id;
    const cookie = req.cookies["jwt"];
    const body = req.body;

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    const user_id = claims.id;
    const user = await findById(user_id);
    const connected_name = user.name;
    const message = await CreateMessages1(
      user_id,
      discussion_id,
      body.discussion_with_id,
      connected_name,
      body.message
    );
    res.json({ msg: "discussions fetched  successfully", message });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = MessageRouter;
