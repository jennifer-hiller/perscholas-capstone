import { Schema, model, now } from "mongoose";
const taskSchema = new Schema({
  created: {
    type: Date,
    default: now,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
  },
  lastModified: {
    type: Date,
    default: now,
  },
  severity: {
    type: String,
    enum: ["Low", "Moderate", "High", "Showstopper"],
    required: true,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do",
    required: true,
  },
});

taskSchema.index({ createdBy: 1, assignedTo: 1 });
taskSchema.index({ status: 1 });

export default model("Task", taskSchema);
