import express from "express";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Task from "../models/Task.js";

const router = express.Router();

// GET all comments or comments by userId or taskId
router.get("/", async (req, res) => {
  try {
    let comments;
    if (req.query.userId) {
      const user = await User.findById(req.query.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      comments = await Comment.find({ author: req.query.userId });
    } else if (req.query.taskId) {
      if (!(await Task.findById(req.query.taskId))) {
        return res.status(404).json({ message: "Task not found" });
      }
      comments = await Comment.find({ task: req.query.taskId });
      console.log(comments.length);
    } else {
      comments = await Comment.find();
    }
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// POST a new comment
router.post("/", async (req, res) => {
  const comment = req.body;
  const newComment = new Comment(comment);
  try {
    await newComment.save();
    const task = await Task.findById(comment.task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    // add the comment to the related task's schema
    task.comments.push(newComment._id);
    await task.save();
    // add the comment to the author's schema
    const author = await User.findById(comment.author);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    author.comments.push(newComment._id);
    await author.save();
    res.status(201).json(newComment);
  } catch (e) {
    if (e.name === "ValidationError") {
      return res.status(400).send("Validation failed: " + e.message);
    }
    res.status(409).json({ message: error.message });
  }
});

// GET a specific comment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// PUT to update a specific comment by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const comment = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, comment, {
      new: true,
    });
    if (!updatedComment) return res.status(404).send("Comment not found");
    // in the unlikely event that the author changed....
    const commenter = await User.findById(comment.author);
    if (!commenter) {
      return res.status(404).json({ message: "Commenter not found" });
    }
    // take the comment out of the commenter's schema
    commenter.comments.pull(updatedComment._id);
    await commenter.save();
    const newCommenter = await User.findById(comment.author);
    if (!newCommenter) {
      return res.status(404).json({ message: "Author not found" });
    }
    newCommenter.comments.push(updatedComment._id);
    res.json(updatedComment);
  } catch (e) {
    if (e.name === "ValidationError") {
      return res.status(400).send("Validation failed: " + e.message);
    }
    res.send(e).status(400);
  }
});

// DELETE a specific comment by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedComment = await Comment.findByIdAndDelete(id);
  if (!deletedComment) return res.status(404).send("Comment not found");
  const commenter = await User.findById(deletedComment.author);
  if (!commenter) {
    return res.status(404).json({ message: "Commenter not found" });
  }
  commenter.comments.pull(deletedComment._id);
  await commenter.save();
  res.json(deletedComment);
});

export default router;
