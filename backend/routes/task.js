import express from "express";
import Task from "../models/Task.js";
import User from "../models/User.js";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    if (req.query.status) {
      const { status } = req.query;
      const tasks = await Task.find({ status }).populate("assignedTo", "name");
      res.status(200).json(tasks);
    } else {
      const tasks = await Task.find({}).populate("assignedTo", "name");
      res.status(200).json(tasks);
    }
  } catch (e) {
    res.send(e).status(400);
  }
});

// POST a new task
router.post("/", async (req, res) => {
  try {
    const assigner = await User.findById(req.body.createdBy);
    if (!assigner) return res.status(404).send("Assigner not found");
    const assignee = await User.findById(req.body.assignedTo);
    if (!assignee) return res.status(404).send("Assignee not found");
    const task = new Task(req.body);
    assigner.created.push(task._id);
    assignee.assigned.push(task._id);
    await task.save();
    await assigner.save();
    await assignee.save();
    res.status(201).json(task);
  } catch (e) {
    res.send(e).status(400);
  }
});

// GET a specific task by id
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name",
        },
      })
      .populate("assignedTo", "name")
      .populate("createdBy", "name");

    if (!task) return res.status(404).send("Task not found");
    res.status(200).json(task);
  } catch (e) {
    res.send(e).status(400);
  }
});

// PUT an update to a task by id
router.put("/:id", async (req, res) => {
  try {
    const { created, ...updateData } = req.body;
    // Complicated way of finding the task and updating it without overwriting the "created" date
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    Object.assign(task, updateData, { lastModified: new Date() });
    await task.save();
    const assigner = await User.findById(task.createdBy);
    if (!assigner) return res.status(404).send("Assigner not found");
    const assignee = await User.findById(task.assignedTo);
    if (!assignee) return res.status(404).send("Assignee not found");
    assigner.created.pull(task._id);
    assignee.assigned.pull(task._id);
    await assigner.save();
    await assignee.save();
    const newAssigner = await User.findById(req.body.createdBy);
    if (!newAssigner) return res.status(404).send("Assigner not found");
    const newAssignee = await User.findById(req.body.assignedTo);
    if (!newAssignee) return res.status(404).send("Assignee not found");
    newAssigner.created.push(task._id);
    newAssignee.assigned.push(task._id);
    await newAssigner.save();
    await newAssignee.save();
    res.status(200).json(task);
  } catch (e) {
    res.send(e).status(400);
  }
});

// DELETE a task by id
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    const assigner = await User.findById(task.createdBy);
    if (!assigner) return res.status(404).send("Assigner not found");
    const assignee = await User.findById(task.assignedTo);
    if (!assignee) return res.status(404).send("Assignee not found");
    assigner.created.pull(task._id);
    assignee.assigned.pull(task._id);
    await assigner.save();
    await assignee.save();
    res.status(200).json(task);
  } catch (e) {
    res.send(e).status(400);
  }
});

export default router;
