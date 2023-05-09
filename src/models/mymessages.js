const mongoose = require("mongoose");

const MymessagesSchema = mongoose.Schema(
  {
    person1_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    person2_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    person1name: {
      type: String,
    },

    person2name: {
      type: String,
    },
  },
  { timestamps: true }
);
const Mymessages = mongoose.model("Mymessages", MymessagesSchema);
module.exports = Mymessages;
