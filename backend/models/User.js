import { Schema, model } from "mongoose";
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20,
  },
  created: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  assigned: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

userSchema.index({ username: 1 });

export default model("User", userSchema);
