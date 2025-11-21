import Task from "../models/Tasks.js";
import User from "../models/Users.js";

// Create Task for a logged-in user
export const createTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { description, startDate, endDate } = req.body;

    const newTask = await Task.create({
      description,
      startDate,
      endDate,
      isCompleted: false,
      userId,
    });

    return res.status(200).json({
      message: "Task creation successful",
      task: newTask,
    });
  } catch (error) {
    console.error("createTask error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tasks = await Task.find({ userId }).sort({ startDate: 1 });

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error("getTasks error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const { description, startDate, endDate, isCompleted } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      { description, startDate, endDate, isCompleted },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("updateTask error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("deleteTask error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};