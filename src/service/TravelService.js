const Travels = require("../models/Travels");

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
//show and filter all the travels
const showTravelToPublics = async (
  departure_point,
  arrival_point,
  depart_date,
  arrival_date,
  max_number_ofday,
  start,
  end // Number of documents to fetch per page
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = {
        departure_point: departure_point,
        arrival_point: arrival_point,
      };
      if (depart_date) {
        query["depart_date"] = depart_date;
      }
      if (arrival_date) {
        query["arrival_date"] = arrival_date;
      }
      if (max_number_ofday) {
        query["max_number_ofday"] = { $lte: max_number_ofday };
      }

      // Fetch data with pagination using skip and limit
      let data = await Travels.find(query)
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(end - start);

      let array = [];
      for await (item of data) {
        let object = {
          travel_id: item._id,
          departure_point: item.departure_point,
          arrival_point: item.arrival_point,
          depart_date: item.depart_date,
          arrival_date: item.arrival_date,
          depart_time: item.depart_time,
          arrival_time: item.arrival_time,
          can_take: item.can_take,
          my_price: item.my_price,
          max_kilos: item.max_kilos,
          meet_point: item.meet_point,
          traveler_name: item.traveler_name,
        };
        array.push(object);
      }
      resolve(array);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  CreateTravel,
  LookupMyTravels,
  UpdateTravel,
  CancelTravel,
  showTravelToPublics,
};
