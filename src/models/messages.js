const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    mymessage_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    person_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    to_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    person_name: {
      type: String,
    },
    seen: {
      type: Boolean,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Messages = mongoose.model("Messages", MessageSchema);
module.exports = Messages;
