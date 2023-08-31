const express = require("express");
const TravelRouter = express.Router();
const Travels = require("../models/Travels");
const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const { secretKey } = require("../../config");
const {
  CreateTravel,
  LookupMyTravels,
  UpdateTravel,
  CancelTravel,
  showTravelToPublics,
} = require("../service/TravelService");
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

    const user = await Users.findById(user_id);
    const travel = await CreateTravel(user, body);
    res.json({ msg: "travel created  successfully", travel });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
}); //Lookup all my trips ///////////////////////////////
TravelRouter.get("/myTravels", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    const user_id = claims.id;
    const Trips = await LookupMyTravels(user_id);

    res.json({ msg: "travels fetched  successfully", Trips });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
//update my trips before the day passed
TravelRouter.put("/update/:id", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    const travelID = req.params.id;
    const body = req.body;
    const data = await UpdateTravel(travelID, body);
    res.json({ msg: "travels updated  successfully", data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
// cancel trip
TravelRouter.delete("/delete/:id", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, secretKey);

    if (!claims) {
      res.status(401).json({ message: "Unauthenticated" });
      return;
    }
    const travelID = req.params.id;

    const data = await CancelTravel(travelID);
    res.json({ msg: "travels deleted  successfully", data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
//////show all the travels to the public
TravelRouter.get("/allthetravels", async (req, res) => {
  try {
    const body = req.query;
    const page = parseInt(body.page || "1");
    const itemsPerPage = parseInt(body.itemsPerPage || "10");
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const data = await showTravelToPublics(
      body.departure_point,
      body.arrival_point,
      body.depart_date,
      body.arrival_date,
      body.max_number_ofday,
      start,
      end
    );
    res.json({ msg: "travels deleted  successfully", data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = TravelRouter;
