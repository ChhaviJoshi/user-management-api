const userModel = require("../models/userModel");
const NodeCache = require("node-cache");

// Cache TTL: 60 seconds
const cache = new NodeCache({ stdTTL: 60 });

const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const cacheKey = `users_page_${page}_limit_${limit}`;

  try {
    if (cache.has(cacheKey)) {
      return res.json(cache.get(cacheKey));
    }

    const users = await userModel.getAllUsers(limit, offset);

    const responseData = {
      page: page,
      limit: limit,
      data: users,
    };

    cache.set(cacheKey, responseData);

    res.json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  // Authorization: Ensure user can only update their own account
  if (parseInt(id) !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You can only update your own account" });
  }

  try {
    const updatedUser = await userModel.updateUser(id, name, email);
    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Authorization: Ensure user can only delete their own account
  if (parseInt(id) !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You can only delete your own account" });
  }

  try {
    const deletedUser = await userModel.deleteUser(id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getUsers, updateUser, deleteUser };
