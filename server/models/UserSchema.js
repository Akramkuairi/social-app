import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  mode: {
    type: String,
    default: "dark",
  },
  description: {
    type: String,
    default: "",
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    required: true,
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    required: true,
    default: [],
  },

  city: {
    type: String,

    default: "",
  },
  country: {
    type: String,

    default: "",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
