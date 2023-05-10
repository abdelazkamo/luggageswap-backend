const Mymessages = require("../models/mymessages");
const Messages = require("../models/messages");
const Users = require("../models/User");
//create a discussion
const CreateMessages = async (
  person1_id,
  person2_id,
  person1name,
  person2name
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cheick = await Mymessages.findOne({
        person1_id: person1_id,
        person2_id: person2_id,
      });
      const mymessageid = cheick._id;
      if (cheick !== null) {
        const person = await Users.findById(person1_id);
        const name = person.name;
        const message = new Messages({
          mymessage_id: mymessageid,
          person_id: person1_id,
          to_id: person2_id,
          person_name: name,
          seen: false,
          message:
            "Salut J'ai fait mon enregistrement a votre voyage Veuillez acceptez ma demande!",
        });
        const ok = await message.save();
        resolve(ok);
      } else {
        const mymessage1 = new Mymessages({
          person1_id: person1_id,
          person2_id: person2_id,
          person1name: person1name,
          person2name: person2name,
        });
        const ok = await mymessage1.save();
        const mymessage2 = new Mymessages({
          _id: ok._id,
          person1_id: person2_id,
          person2_id: person1_id,
          person1name: person2name,
          person2name: person1name,
        });
        mymessage2.save();
        const person = await Users.findById(person1_id);
        const name = person.name;
        const message = new Messages({
          mymessage_id: ok._id,
          person_id: person1_id,
          to_id: person2_id,
          person_name: name,
          seen: false,
          message:
            "Salut J'ai fait mon enregistrement a votre voyage Veuillez acceptez ma demande!",
        });
        const ok1 = await message.save();
        resolve(ok1);
      }
    } catch (error) {
      reject(error);
    }
  });
};
//show all the people with whome i discuss
const Mydiscussions = async (myid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = Mymessages.find({ person1_id: myid });
      let array = [];
      for await (item of data) {
        let object = {
          discussion_id: item._id,
          discussion_with_id: item.to_id,
          discussion_with: item.person2name,
        };
        array.push(object);
      }
      resolve(array);
    } catch (error) {
      reject(error);
    }
  });
};
//show the discussions of a message
const Showamessage = async (mymessage_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Messages.updateMany(
        { mymessage_id: mymessage_id, seen: false },
        { seen: true }
      );
      const data = await Messages.find({ mymessage_id: mymessage_id });
      let array = [];
      for await (item of data) {
        let object = {
          id: item._id,
          sender_id: item.person_id,
          receiver_id: to_id,
          message: item.message,
        };
        array.push(object);
      }
      resolve(array);
    } catch (error) {
      reject(error);
    }
  });
};
//creat a new message in a discussion
const CreateMessages1 = async (
  conneted_id,
  discussion_id,
  person2_id,
  connected_name,
  message
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Messages({
        mymessage_id: discussion_id,
        person_id: conneted_id,
        to_id: person2_id,
        seen: false,
        person_name: connected_name,
        message: message,
      });
      const ok = await data.save();
      resolve(ok);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  CreateMessages,
  Mydiscussions,
  Showamessage,
  CreateMessages1,
};
