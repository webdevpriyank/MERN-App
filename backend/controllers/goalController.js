const asyncHandler = require("express-async-handler");
const Goal = require("./../models/goalModel");
const User = require("./../models/userModel");

// @desc    Get Goals
// @route   GET /api/v1/goals
// @access  Private
const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find({ user: req.user.id });
  if (!goals) {
    return res.status(400).json({
      success: false,
      message: "No goals found",
    });
  }
  res.status(200).json({
    success: true,
    data: goals,
  });
});

// @desc    Set Goal
// @route   POST /api/v1/goals
// @access  Private
const setGoal = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    // res.status(400).json({ "message": "Goal text is required" })
    res.status(400);
    throw new Error("Goal text is required");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  if (!goal) {
    return res.status(400).json({
      success: false,
      message: "No goals found",
    });
  }
  res.status(200).json({
    success: true,
    data: goal,
  });
});

// @desc    Update Goal
// @route   GET /api/v1/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  // Check if the user is the owner of the goal
  if (!user) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Make sure the goal belongs to the user before updating
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedGoal);
})

// @desc    Delete Goal
// @route   GET /api/v1/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  // Check if the user is the owner of the goal
  if (!user) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Make sure the goal belongs to the user before updating
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
  res.status(200).json(deletedGoal);
})

// @desc    Export the goalController
module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
