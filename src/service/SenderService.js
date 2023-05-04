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
        let array = [];
        let ids = [];
        for await (item of data) {
          ids.push(item.travel_id);
        }
        const ids1 = ids.map((id) => new ObjectID(id));
        const searchCriteria = { _id: { $in: ids1 } };
        const travel = await Travels.find(searchCriteria);
        data.forEach((item) => {
          let match = travel.find((item1) => {
            return item.travel_id === item1.id;
          });
          let object = {
            _id: item._id,
            start_country: item.start_country,
            end_country: item.end_country,
            status_from_poster: item.status_from_poster,
            status_of_receiving: item.status_of_receiving,
            start_date: match.depart_date,
            end_date: match.arrival_date,
          };
          array.push(object);
        });
        resolve(array);
      } else if (!start_country && end_country) {
        const data = await Senders.find({
          end_country: end_country,
          sender_id: sender_id,
        });
        let array = [];
        let ids = [];
        for await (item of data) {
          ids.push(item.travel_id);
        }
        const ids1 = ids.map((id) => new ObjectID(id));
        const searchCriteria = { _id: { $in: ids1 } };
        const travel = await Travels.find(searchCriteria);
        data.forEach((item) => {
          let match = travel.find((item1) => {
            return item.travel_id === item1.id;
          });
          let object = {
            _id: item._id,
            start_country: item.start_country,
            end_country: item.end_country,
            status_from_poster: item.status_from_poster,
            status_of_receiving: item.status_of_receiving,
            start_date: match.depart_date,
            end_date: match.arrival_date,
          };
          array.push(object);
        });
        resolve(array);
      } else if (start_country && !end_country) {
        const data = await Senders.find({
          start_country: start_country,
          sender_id: sender_id,
        });
        let array = [];
        let ids = [];
        for await (item of data) {
          ids.push(item.travel_id);
        }
        const ids1 = ids.map((id) => new ObjectID(id));
        const searchCriteria = { _id: { $in: ids1 } };
        const travel = await Travels.find(searchCriteria);
        data.forEach((item) => {
          let match = travel.find((item1) => {
            return item.travel_id === item1.id;
          });
          let object = {
            _id: item._id,
            start_country: item.start_country,
            end_country: item.end_country,
            status_from_poster: item.status_from_poster,
            status_of_receiving: item.status_of_receiving,
            start_date: match.depart_date,
            end_date: match.arrival_date,
          };
          array.push(object);
        });
        resolve(array);
      } else {
        const data = await Senders.find({
          sender_id: sender_id,
        });
        let array = [];
        let ids = [];
        for await (item of data) {
          ids.push(item.travel_id);
        }
        const ids1 = ids.map((id) => new ObjectID(id));
        const searchCriteria = { _id: { $in: ids1 } };
        const travel = await Travels.find(searchCriteria);
        data.forEach((item) => {
          let match = travel.find((item1) => {
            return item.travel_id === item1.id;
          });
          let object = {
            _id: item._id,
            start_country: item.start_country,
            end_country: item.end_country,
            status_from_poster: item.status_from_poster,
            status_of_receiving: item.status_of_receiving,
            start_date: match.depart_date,
            end_date: match.arrival_date,
          };
          array.push(object);
        });
        resolve(array);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { Asksend, ShommySends };
