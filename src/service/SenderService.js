const Senders = require("../models/sends");
const Travels = require("../models/Travels");
const Users = require("../models/User");
//////////create sender /////////////////////////////////
const Asksend = async (travel_id, sender_id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      body["travel_id"] = travel_id;
      body["sender_id"] = sender_id;
      body["status_from_poster"] = "pending";
      body["status_of_receiving"] = "pending";
      const send = await Senders(body);
      const ok = await send.save();
      resolve(ok);
    } catch (error) {
      reject(error);
    }
  });
};
//////////////showmysends////////////////////////::
const ShommySends = async (start_country, end_country, sender_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (start_country && end_country) {
        const data = await Senders.find({
          start_country: start_country,
          end_country: end_country,
          sender_id: sender_id,
        });
        let ids = [];
        for await (item of data) {
          ids.push(item.travel_id);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { Asksend };
