const Travels = require("../models/Travels");

// const ShowTravel = async (
//   departure_point,
//   arrival_point,
//   depart_date,
//   arrival_date,

//   can_take,
//   lowest_price,
//   verify_profile,
//   max_number_ofday
// ) => {
//   new Promise(async (resolve, reject) => {
//     try {
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// Create a travel plan ///////////////////////////////////////////////////////////////////////////////////////////////////////
const CreateTravel = async (user, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user_name = user.name;
      const user_id = user.id;
      const user_status = user.Verify;
      body["poster_id"] = user_id;
      body["traveler_name"] = user_name;
      body["Traveler_status"] = user_status;
      const date1Str = body.depart_date;
      const date2Str = body.arrival_date;

      const date1 = Date.parse(date1Str);
      const date2 = Date.parse(date2Str);

      const diffInMs = Math.abs(date2 - date1);
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      body["max_number_ofday"] = diffInDays;

      const travel = new Travels(body);
      const ok = await travel.save();
      resolve(ok);
    } catch (error) {
      reject(error);
    }
  });
};
// Lookup All my travels that I have done
const LookupMyTravels = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Travels.find({ poster_id: user_id }).sort({
        createdAt: -1,
      });

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
// Update my travel
const UpdateTravel = async (travelID, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataToupdate = await Travels.findByIdAndUpdate(travelID, data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
/// cancel a Travel //////////////////////////////////////////////////::::::::
const CancelTravel = async (travelID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Travels.findByIdAndDelete(travelID);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { CreateTravel, LookupMyTravels, UpdateTravel, CancelTravel };
