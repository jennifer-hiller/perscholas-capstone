import { Schema, model } from "mongoose";
const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  task: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Task",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.index({ author: 1 });

export default model("Comment", commentSchema);
