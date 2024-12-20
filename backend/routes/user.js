import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    // don't send back users' passwords
    users.forEach((user) => {
      user.password = undefined;
    });
    res.status(200).json(users);
  } catch (e) {
    res.send(e).status(400);
  }
});

// POST to create User
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    if (e.name === "ValidationError") {
      return res.status(400).send("Validation failed: " + e.message);
    }
    res.send(e).status(400);
  }
});

// GET user's info, optionally passing query params to get the user's assigned and created tasks, and comments
router.get("/:id", async (req, res) => {
  try {
    let user;
    if (req.query.assignedTo) {
      user = await User.findById(req.params.id).populate("created");
    } else if (req.query.assigned) {
      user = await User.findById(req.params.id).populate("assigned");
    } else if (req.query.comments) {
      user = await User.findById(req.params.id).populate("comments");
    } else {
      user = await User.findById(req.params.id)
        .populate("created")
        .populate("assigned")
        .populate({
          path: "comments",
          populate: {
            path: "task",
          },
        });
    }
    // don't send back user's password
    user.password = undefined;
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user);
  } catch (e) {
    res.send(e).status(400);
  }
});

// PUT: update user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.status(404).send("User not found");
    res.status(200).json(updatedUser);
  } catch (e) {
    if (e.name === "ValidationError") {
      return res.status(400).send("Validation failed: " + e.message);
    }
    res.send(e).status(400);
  }
});

// delete user - will fail if the user has tasks assigned
// In fact, never use this. I will make a "disabled" field in the future which means the user will always exist in the database once created.
router.delete("/:id", async (req, res) => {
  try {
    // find any tasks assigned to the user
    const assignedTasks = await Task.find({ assignedTo: req.params.id });
    if (assignedTasks.length > 0)
      return res.status(400).send("User has assigned tasks - reassign them");
    // find any tasks created by the user
    const createdTasks = await Task.find({ createdBy: req.params.id });
    if (createdTasks.length > 0)
      return res
        .status(400)
        .send(
          "User has created tasks - edit them so they are assigned to someone else"
        );
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send("User not found");
    res.status(200).json(deletedUser);
  } catch (e) {
    res.send(e).status(400);
  }
});

// POST: authenticate a user
router.post("/login", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.password !== req.body.password) {
      return res.status(401).send("Invalid password");
    }
    res.status(201).json(user);
  } catch (e) {
    res.send(e).status(400);
  }
});
export default router;
